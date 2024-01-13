import { html, nothing } from "../../utility/lit-core.min.js";
import { CustomElement } from "../../utility/utility.js";

const search_source_icon = {
  fourkhub: html`
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-badge-4k text-orange" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
     <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
     <path d="M3 5m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
     <path d="M7 9v2a1 1 0 0 0 1 1h1"></path>
     <path d="M10 9v6"></path>
     <path d="M14 9v6"></path>
     <path d="M17 9l-2 3l2 3"></path>
     <path d="M15 12h-1"></path>
      <title>4KHub搜索</title>
    </svg>`,
  tmdb: html`
    <!-- http://tabler-icons.io/i/square-letter-t -->
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-letter-t text-blue" width="24" height="24"
       viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
       stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
      <path d="M10 8h4"></path>
      <path d="M12 8v8"></path>
      <title>TMDB搜索</title>
    </svg>`,
  douban: html`
    <!-- http://tabler-icons.io/i/circle-letter-d -->
<!--    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-letter-d text-green" width="24" height="24"-->
<!--        viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"-->
<!--        stroke-linejoin="round">-->
<!--      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>-->
<!--      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>-->
<!--      <path d="M10 8v8h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-2z"></path>-->
<!--      <title>豆瓣搜索</title>-->
<!--    </svg>-->
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-douban text-green" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
     <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
     <path d="M4 20h16"></path>
     <path d="M5 4h14"></path>
     <path d="M8 8h8a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2z"></path>
     <path d="M16 14l-2 6"></path>
     <path d="M8 17l1 3"></path>
      <title>豆瓣搜索</title>
    </svg>
  `
}

export class LayoutSearchbar extends CustomElement {
  static properties = {
    layout_systemflag: { attribute: "layout-systemflag" },
    layout_username: { attribute: "layout-username" },
    layout_search_source: { attribute: "layout-search-source" },
    layout_userpris: { attribute: "layout-userpris", type: Array },
    _search_source: { state: true },
  };

  constructor() {
    super();
    this.layout_systemflag = "Docker";
    this.layout_username = "admin";
    this.layout_userpris = ["系统设置"];
    this.layout_search_source = "tmdb";
    this._search_source = "tmdb";
    this.classList.add("navbar", "fixed-top", "lit-searchbar");
  }

  firstUpdated() {
    this._search_source = localStorage.getItem("SearchSource") ?? this.layout_search_source;
    // 当前状态：是否模糊
    let blur = false;
    window.addEventListener("scroll", () => {
      const scroll_length = document.body.scrollTop || window.pageYOffset;
      // 滚动发生时改变模糊状态
      if (!blur && scroll_length >= 5) {
        // 模糊状态
        blur = true;
        this.classList.add("lit-searchbar-blur");
      } else if (blur && scroll_length < 5) {
        // 非模糊状态
       blur = false
       this.classList.remove("lit-searchbar-blur");
      }
    });

  }

  // 卸载事件
  disconnectedCallback() {
    super.disconnectedCallback();
  }

  get input() {
    return this.querySelector(".home_search_bar") ?? null;
  }

  render() {
    return html`
      <style>

        .lit-searchbar {
          background-color: rgba(0,0,0,0)!important;
          border-right: none!important;
          box-shadow: none!important;
        }

        .lit-searchbar-blur {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter:blur(8px);
        }

        .theme-dark .lit-searchbar-blur {
          background-color: rgba(29,39,59,0.6)!important;
        }

        .theme-light .lit-searchbar-blur {
          background-color: rgba(231,235,239,0.7)!important;
        }

      </style>
      <div class="container-fluid nav-search-bar">
        <div class="d-flex flex-row flex-grow-1 align-items-center py-1">
          <!-- 导航展开按钮 -->
          <layout-navbar-button></layout-navbar-button>
          <!-- 搜索栏 -->
          <div class="input-group input-group-flat mx-2">
            <span class="input-group-text form-control-rounded">
              <a href="#" class="link-secondary"
                @click=${ () => {
                  //this._search_source = this._search_source === "tmdb" ? "douban" : "tmdb";
                  if (this._search_source === "tmdb"){
                    this._search_source = "douban";
                  } else if (this._search_source === "douban") {
                    this._search_source = "fourkhub";
                  } else {
                    this._search_source = "tmdb";
                  }
                  localStorage.setItem("SearchSource", this._search_source);
                }}>
                ${search_source_icon[this._search_source]}
              </a>
            </span>
            <input type="text" class="home_search_bar form-control form-control-rounded" placeholder="搜索电影、电视剧" autocomplete="new-password"
              @keypress=${ (e) => {
                if(e.which === 13 && this.input.value){
                  navmenu("recommend?type=SEARCH&title=搜索结果&subtitle=" + this.input.value + "&keyword=" + this.input.value + "&source=" + this._search_source);
                  this.input.value = "";
                }
              }}>
            <span class="input-group-text form-control-rounded">
              <a href="javascript:show_search_advanced_modal()" class="link-secondary">
                <!-- http://tabler-icons.io/i/adjustments -->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <circle cx="6" cy="10" r="2"></circle>
                  <line x1="6" y1="4" x2="6" y2="8"></line>
                  <line x1="6" y1="12" x2="6" y2="20"></line>
                  <circle cx="12" cy="16" r="2"></circle>
                  <line x1="12" y1="4" x2="12" y2="14"></line>
                  <line x1="12" y1="18" x2="12" y2="20"></line>
                  <circle cx="18" cy="7" r="2"></circle>
                  <line x1="18" y1="4" x2="18" y2="5"></line>
                  <line x1="18" y1="9" x2="18" y2="20"></line>
                </svg>
              </a>
            </span>
          </div>
            
            <div class="nav-item dropdown me-2 icon-pulse">
                <a href='https://t.me/www_4khub_xyz' title="加入官方Telegram频道，和小姐姐随时交流" target="_blank" rel="noreferrer" class="nav-link d-flex lh-1 text-reset ms-1 p-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-telegram" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                         <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                         <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4"></path>
                    </svg>
                </a>
            </div>
            
            <div class="nav-item dropdown me-2 icon-pulse">
                <a href='https://twitter.com/4khubxyz?t=w7DjRb66j1WGxGKaUkIaLQ&s=09' title="加入官方Twitter，及时获取最新消息" target="_blank" rel="noreferrer" class="nav-link d-flex lh-1 text-reset ms-1 p-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-twitter" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                         <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                         <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z"></path>
                    </svg>
                </a>
            </div>
            
            <div class="icon-demo-icon">
                <div class="icon-item-new"></div>
                <div class="nav-item dropdown me-2 icon-pulse">
                    <a href="javascript:navmenu('gongao')" title="公告" class="nav-link d-flex lh-1 text-reset ms-1 p-0">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message {{ class }}" width="24" height="24"
                           viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                           stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4"></path>
                            <line x1="8" y1="9" x2="16" y2="9"></line>
                            <line x1="8" y1="13" x2="14" y2="13"></line>
                        </svg>
                    </a>
                </div>
            </div>
<!--            <div class="nav-item dropdown me-2">-->
<!--                <a href="javascript:navmenu('help')" title="帮助文档" class="nav-link d-flex lh-1 text-reset ms-1 p-0">-->
<!--                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-book" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">-->
<!--                       <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>-->
<!--                       <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0"></path>-->
<!--                       <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0"></path>-->
<!--                       <path d="M3 6l0 13"></path>-->
<!--                       <path d="M12 6l0 13"></path>-->
<!--                       <path d="M21 6l0 13"></path>-->
<!--                    </svg>-->
<!--                </a>-->
<!--            </div>-->
            
          <!-- 头像 -->
          <div class="nav-item dropdown me-2">
              <a href="#" class="nav-link d-flex lh-1 text-reset ms-1 p-0" data-bs-toggle="dropdown">
                <!-- http://tabler-icons.io/i/user -->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user"
                    width="24" height="24" viewBox="0 0 24 24"
                    stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                </svg>
              </a>
              <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <a class="dropdown-item hide-theme-dark" href="?theme=dark" role="button">暗黑风格</a>
                <a class="dropdown-item hide-theme-light" href="?theme=light" role="button">明亮风格</a>
                <div class="dropdown-divider"></div>
                ${this.layout_userpris.includes("系统设置")
                ? html`
                    <a class="dropdown-item" data-bs-toggle="offcanvas" href="#offcanvasEnd" role="button"
                      aria-controls="offcanvasEnd">消息中心</a>
                    <a class="dropdown-item" href="javascript:show_logging_modal()" role="button">实时日志</a>
                    <div class="dropdown-divider"></div>
                    ${["Docker", "Synology"].includes(this.layout_systemflag)
                    ? html`
                      <a href="javascript:restart()" class="dropdown-item">重启</a>
                      <a href="javascript:update()" class="dropdown-item">更新</a>`
                    : nothing }
                  `
                : nothing }
                  <a href="javascript:navmenu('help')" class="dropdown-item">帮助文档</a>
                <a href="javascript:logout()" class="dropdown-item">
                  注销 <span class="text-muted mx-3">${this.layout_username}</span>
                </a>
              </div>
            </div>
          </div>
      </div>
    `;
  }

}


window.customElements.define("layout-searchbar", LayoutSearchbar);