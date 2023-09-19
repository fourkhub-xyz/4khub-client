import { NormalCardPlaceholder } from "./placeholder.js"; export { NormalCardPlaceholder };

import { html, nothing } from "../../utility/lit-core.min.js";
import { CustomElement, Golbal } from "../../utility/utility.js";
import { observeState } from "../../utility/lit-state.js";
import { cardState } from "./state.js";

export class NormalPersonCard extends observeState(CustomElement) {

  static properties = {
    tmdb_id: { attribute: "card-tmdbid" },
    res_type: { attribute: "card-restype" },
    media_type: { attribute: "card-mediatype" },
    subtype: { attribute: "card-subtype" },
    show_sub: '1',
    cnname: { attribute: "card-cnname" },
    fav: '1',
    date: { attribute: "card-date" },
    vote: { attribute: "card-vote" },
    image: { attribute: "card-image" },
    overview: { attribute: "card-overview" },
    year: { attribute: "card-year" },
    site: { attribute: "card-site" },
    weekday: { attribute: "card-weekday" },
    lazy: {},
    _placeholder: { state: true },
    _card_id: { state: true },
    _card_image_error: { state: true },
    pagefrom: { attribute: "card-pagefrom" },
    coins: { attribute: "card-coins" },
    is_charge: 'true',
      fourkhub_id: { attribute:"card-fourkhub_id" },
      personid: { attribute:"card-personid" },
      subtitle: { attribute:"card-title" }

  };

  constructor() {
    super();
    this.lazy = "0";
    this._placeholder = true;
    this._card_image_error = false;
    this._card_id = Symbol("normalCard_data_card_id");
  }

  _render_left_up() {
    if (this.weekday || this.res_type) {
      let color;
      let text;
      if (this.weekday) {
        color = "bg-orange";
        text = this.weekday;
      } else if (this.res_type) {
        color = this.res_type === "电影" ? "bg-lime" : "bg-blue";
        text = this.res_type;
      }
      return html`
        <span class="badge badge-pill ${color}" style="position: absolute; top: 10px; left: 10px">
          ${text}
        </span>`;
    } else {
      return nothing;
    }
  }

  _render_right_up() {
     if (this.fav == "2") {
      return html`
        <div class="badge badge-pill bg-green" style="position:absolute;top:10px;right:10px;padding:0;">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check" width="24" height="24"
               viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
               stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M5 12l5 5l10 -10"></path>
          </svg>
        </div>`;
    } else if (this.vote && this.vote != "0.0" && this.vote != "0") {
      return html`
      <div class="badge badge-pill bg-purple"
           style="position: absolute; top: 10px; right: 10px">
        ${this.vote}
      </div>`;
    } else {
      return nothing;
    }
  }


  _render_bottom() {
      return html`
            <div class="d-flex justify-content-between">
                <!--原搜索资源占位符，免费资源-->
              <a class="text-muted" title="搜索资源" @click=${(e) => { e.stopPropagation() }}
                 href='javascript:media_search("${this.tmdb_id}", "${this.title}", "${this.media_type}", "${this.subtype}")'>
                <span class="icon-pulse text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="24" height="24"
                      viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                      stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <circle cx="10" cy="10" r="7"></circle>
                    <line x1="21" y1="21" x2="15" y2="15"></line>
                  </svg>
                </span>
              </a>
                <!--原搜索资源占位符end，免费资源-->
              <div class="ms-auto">
                <div class="text-muted" title=${this.fav == "1" ? '取消订阅' : "加入订阅" } style="cursor: pointer" @click=${this._loveClick}>
                  <span class="icon-pulse text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart ${this.fav == "1" ? "icon-filled text-red" : ""}" width="24" height="24"
                        viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                        stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>`;
  }

  render() {
    return html`
      <div class="card card-sm lit-normal-card rounded-4 cursor-pointer ratio shadow-sm"
           @click=${() => { if (Golbal.is_touch_device()){ cardState.more_id = this._card_id } } }
           @mouseenter=${() => { if (!Golbal.is_touch_device()){ cardState.more_id = this._card_id } } }
           @mouseleave=${() => { if (!Golbal.is_touch_device()){ cardState.more_id = undefined } } }>
        ${this._placeholder ? NormalCardPlaceholder.render_placeholder() : nothing}
        <div ?hidden=${this._placeholder} class="rounded-4">
          <img class="card-img rounded-4" alt="" style="box-shadow:0 0 0 1px #888888; display: block; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover;"
             src=${this.lazy == "1" ? "" : this.image ?? Golbal.noImage}
             @error=${() => { if (this.lazy != "1") {this.image = Golbal.noImage; this._card_image_error = true} }}
             @load=${() => { this._placeholder = false }}/>
          ${this._render_left_up()}
          ${this._render_right_up()}
        </div>
        <div ?hidden=${cardState.more_id != this._card_id && this._card_image_error == false}
             class="card-img-overlay rounded-4 ms-auto"
             style="background-color: rgba(0, 0, 0, 0.5); box-shadow:0 0 0 1px #dddddd;"
             @click=${() => { 
                 //var url = `/recommend?pagefrom=${this.pagefrom}&subtype=person&type=MOV&personid=${this.personid}&title=${this.cnname}&subtitle=参演作品`
                 var url = `/fourkhub_vip_person_products?pagefrom=${this.pagefrom}&person_cnname=${this.cnname}&person_name=${this.overview}`
                 console.log(url)
                 navmenu(url)
             }}>
          <div style="cursor: pointer">
            ${this.cnname
            ? html`
              <h2 class="lh-sm text-white"
                  style="margin-bottom: 5px; -webkit-line-clamp:3; display: -webkit-box; -webkit-box-orient:vertical; overflow:hidden; text-overflow: ellipsis;">
                <strong>${this.cnname}</strong>
              </h2>`
            : nothing }
            ${this.overview
            ? html`
              <p class="lh-sm text-white"
                 style="margin-bottom: 5px; -webkit-line-clamp:6; display: -webkit-box; -webkit-box-orient:vertical; overflow:hidden; text-overflow: ellipsis;">
                ${this.overview}
              </p>`
            : nothing }
            
          </div>
            <!-- ${this._render_bottom()}-->
        </div>
      </div>
    `;
  }

  _fav_change() {
    const options = {
      detail: {
        fav: this.fav
      },
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent("fav_change", options));
  }


  _shopping_cart(e){
      e.stopPropagation();//阻止页面跳转
      console.log(this.fourkhub_id);
      var coins = this.coins
      var fourkhub_id = this.fourkhub_id
      var pagefrom = this.subtype
      var title = this.title
      var year = this.year
      var media_type = this.media_type
      var tmdbid = this.tmdbid
      var fav = this.fav

      Golbal.lit_buy_click(title, year, media_type, tmdbid, fav,
                  () => {
                    fav = "0";
                    this._fav_change();
                  },
                  () => {
                    fav = "1";
                    this._fav_change();
                  },pagefrom,fourkhub_id, coins);
  }

  _loveClick(e) {
      var pagefrom = this.pagefrom
      var fourkhub_id = this.fourkhub_id
      var subtype = this.subtype
      var title = this.title
      var year = this.year
      var media_type = this.media_type
      var tmdbid = this.tmdbid
      var fav = this.fav
      if (subtype === '4KHUBVIP'){
          pagefrom = subtype
      }
        e.stopPropagation();
        Golbal.lit_love_click(title, year, media_type, tmdbid, fav,
          () => {
            fav = "0";
            this._fav_change();
          },
          () => {
            fav = "1";
            this._fav_change();
          },pagefrom,fourkhub_id);

  }
  
}

window.customElements.define("normal-person-card", NormalPersonCard);