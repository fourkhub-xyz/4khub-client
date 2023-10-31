import { html, nothing } from "../../utility/lit-core.min.js";
import { CustomElement, Golbal } from "../../utility/utility.js";

export class PageDiscovery extends CustomElement {
  static properties = {
    discovery_type: { attribute: "discovery-type" },
    pagefrom : { attribute: "type" },
    _slide_card_list: { state: true },
    _media_type_list: { state: true },
  };

  constructor() {
    super();
    this._slide_card_list = {};
    this._media_type_list = {
      "RANKING": [{
          type: "MOV",
          title:"正在热映",
          subtype :"dbom",
        },
        {
          type: "TRENDING",
          title:"TMDB流行趋势",
          subtype :"tmdb",
        },
        {
          type: "MOV",
          title:"TMDB最新电影",
          subtype :"nm",
        },
        {
          type: "TV",
          title:"TMDB最新电视剧",
          subtype :"nt",
        },
        {
          type: "MOV",
          title:"TMDB热门电影",
          subtype :"hm",
        },
        {
          type: "TV",
          title:"TMDB热门电视剧",
          subtype :"ht",
        },
        {
          type: "MOV",
          title:"豆瓣最新电影",
          subtype :"dbnm",
        },
        {
          type: "TV",
          title:"豆瓣最新电视剧",
          subtype :"dbzy",
        },
        {
          type: "MOV",
          title:"豆瓣热门电影",
          subtype :"dbhm",
        },
        {
          type: "TV",
          title:"豆瓣热门电视剧",
          subtype :"dbht",
        },
        {
          type: "TV",
          title:"豆瓣热门动画",
          subtype :"dbdh",
        },
        {
          type: "MOV",
          title:"豆瓣电影TOP250",
          subtype :"dbtop",
        },
        {
          type: "TV",
          title:"华语口碑剧集榜",
          subtype :"dbct",
        },
        {
          type: "TV",
          title:"全球口碑剧集榜",
          subtype :"dbgt",
        }
      ],
      "4KHUBVOD": [
        {
          type: "MOV",
          title:"最新影视",
          subtype :"ALLVOD",
        },
        {
          type: "MOV",
          title:"伦理/情色",
          subtype :"伦理/情色",
        },
        {
          type: "TV",
          title:"国产剧",
          subtype :"国产剧",
        },
        {
          type: "TV",
          title:"港台剧",
          subtype :"港台剧",
        },
        {
          type: "TV",
          title:"欧美剧",
          subtype :"欧美剧",
        },
        {
          type: "TV",
          title:"日韩剧",
          subtype :"日韩剧",
        },
        {
          type: "TV",
          title:"海外剧",
          subtype :"海外剧",
        },
        {
          type: "TV",
          title:"综艺",
          subtype :"综艺",
        },
        {
          type: "TV",
          title:"动漫",
          subtype :"动漫",
        },
        {
          type: "TV",
          title:"体育",
          subtype :"体育",
        },
        {
          type: "MOV",
          title:"纪录片",
          subtype :"纪录片",
        }
      ],
      "4KHUB": [
        {
          type: "MOV",
          title:"最新影视",
          subtype :"newmovie",
        },
        {
          type: "MOV",
          title:"麻豆傳媒",
          subtype :"madou",
        },
        {
          type: "MOV",
          title:"4K UHD电影",
          subtype :"4kuhd",
        },
        {
          type: "MOV",
          title:"4K电影",
          subtype :"4kmovie",
        },
        {
          type: "TV",
          title:"4K剧集",
          subtype :"4ktv",
        },
        {
          type: "TV",
          title:"4K纪录片",
          subtype :"4kdocumentary",
        },
        {
          type: "MOV",
          title:"韩国电影",
          subtype :"krmovie",
        },
        {
          type: "MOV",
          title:"高清影剧",
          subtype :"hdmovie",
        },
        {
          type: "TV",
          title:"美剧",
          subtype :"usatv",
        },
        {
          type: "TV",
          title:"韩剧",
          subtype :"krtv",
        },
        {
          type: "TV",
          title:"国产剧",
          subtype :"chinatv",
        }
      ],
      "BANGUMI": [
        {
          type: "TV",
          title:"星期一",
          subtype :"bangumi",
          week :"1",
        },
        {
          type: "TV",
          title:"星期二",
          subtype :"bangumi",
          week :"2",
        },
        {
          type: "TV",
          title:"星期三",
          subtype :"bangumi",
          week :"3",
        },
        {
          type: "TV",
          title:"星期四",
          subtype :"bangumi",
          week :"4",
        },
        {
          type: "TV",
          title:"星期五",
          subtype :"bangumi",
          week :"5",
        },
        {
          type: "TV",
          title:"星期六",
          subtype :"bangumi",
          week :"6",
        },
        {
          type: "TV",
          title:"星期日",
          subtype :"bangumi",
          week :"7",
        },
      ]
    }
  }

  firstUpdated() {
    for (const item of this._media_type_list[this.discovery_type]) {
      Golbal.get_cache_or_ajax(
          "get_recommend",
          self.discovery_type + item.title,
          {"pagefrom":this.pagefrom, "type": item.type, "subtype": item.subtype, "page": 1, "week": item.week},
          (ret) => {
            this._slide_card_list = {...this._slide_card_list, [item.title]: ret.Items};
          }
       );
    }
  }

  render() {
    return html`
      <div class="container-xl">
        ${this._media_type_list[this.discovery_type]?.map((item) => ( html`
          <custom-slide
            slide-title=${item.title}
            slide-click="javascript:navmenu('recommend?pagefrom=${this.pagefrom}&type=${item.type}&subtype=${item.subtype}&week=${item.week ?? ""}&title=${item.title}')"
            slide-click2="javascript:navmenu('recommend?pagefrom=${this.pagefrom}&type=${item.type}&subtype=${item.subtype}&week=${item.week ?? ""}&title=${item.title}')"
            lazy="normal-card"
            .slide_card=${this._slide_card_list[item.title]
              ? this._slide_card_list[item.title].map((card, index) => ( html`
                <normal-card
                  @fav_change=${(e) => {
                    Golbal.update_fav_data("get_recommend", item.subtype, (extra) => (
                      extra.Items[index].fav = e.detail.fav, extra
                    ));
                  }}
                  lazy=1
                  card-is_charge=${card.is_charge}
                  card-coins=${card.coin_price}
                  card-fourkhub_id=${card.fourkhub_id}
                  card-tmdbid=${card.id}
                  card-mediatype=${card.type}
                  card-subtype=${card.subtype}
                  card-showsub=1
                  card-image=${card.image}
                  card-fav=${card.fav}
                  card-vote=${card.vote}
                  card-year=${card.year}
                  card-title=${card.title}
                  card-overview=${card.overview}
                  card-restype=${card.media_type}
                  class="px-2"
                ></normal-card>`))
              : Array(20).fill(html`<normal-card-placeholder></normal-card-placeholder>`)
            }
          ></custom-slide>`
        ))}
      </div>
    `;
  }
}


window.customElements.define("page-discovery", PageDiscovery);