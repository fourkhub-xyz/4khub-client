import { LitElement } from "./lit-core.min.js";

export class CustomElement extends LitElement {

  // 兼容前进后退时重载
  connectedCallback() {
    super.connectedCallback();
    this.innerHTML = "";
  }

  // 过滤空字符
  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, Golbal.repNull(newValue));
  }

  // 不使用影子dom
  createRenderRoot() {
    return this;
  }

}

export class Golbal {

  // 没有图片时
  static noImage = "../static/img/no-image.png";
  static noImage_person = "../static/img/person.png";

  // 转换传值的空字符情况
  static repNull(value) {
    if (!value || value == "None" || value == "null" || value == "undefined") {
      return "";
    } else {
      return value;
    }
  }

  // 是否触摸屏设备
  static is_touch_device() {
    return "ontouchstart" in window;
  }

  static convert_mediaid(tmdbid) {
    if (typeof(tmdbid) === "number") {
      tmdbid = tmdbid + "";
    }
    return tmdbid
  }

  // 订阅按钮被点击时
  static lit_love_click(title, year, media_type, tmdb_id, fav, remove_func, add_func, pagefrom, fourkhub_id) {
    if (fav == "1"){
      show_ask_modal("是否确定将 " + title + " 从订阅中移除？", function () {
        hide_ask_modal();
        remove_rss_media(title, year, media_type, "", "", tmdb_id, remove_func);
      });
    } else {
      if (pagefrom == '4KHUBVIP'){
        console.log("vip订阅 params:" + " pagefrom:" + pagefrom + " fourkhub_id:"+fourkhub_id + " tmdb_id:" + tmdb_id)
        ajax_post("check_is_vip", {}, function (ret) {
          if (ret.is_vip) {
            show_ask_modal("是否确定用5金币购买并订阅： " + title + " ？ 已经成功购买的不会重复扣费", function () {
              hide_ask_modal();
              const mediaid = Golbal.convert_mediaid(tmdb_id);

              ajax_post("buy_4khub_id", {fourkhub_id: fourkhub_id,tmdb_id: tmdb_id}, function (ret) {
                if (ret.status === 1) {
                  //购买成功,开始订阅，同普通流程
                  if (media_type == "MOV" || media_type == "电影") {
                    add_rss_media(title, year, media_type, mediaid, "", "", add_func,fourkhub_id);
                  } else {
                    ajax_post("get_tvseason_list", {'tmdbid': mediaid, 'title': title,'fourkhub_id':fourkhub_id}, function (ret) {
                      if (ret.seasons.length === 1) {
                        add_rss_media(title, year, "TV", mediaid, "", ret.seasons[0].num, add_func,fourkhub_id);
                      } else if (ret.seasons.length > 1) {
                        show_rss_seasons_modal(title, year, "TV", mediaid, ret.seasons, add_func);
                      } else {
                        show_fail_modal(title + " 添加RSS订阅失败：未查询到季信息！");
                      }
                    });
                  }

                } else if(ret.status === 2) {
                  show_fail_modal("支付失败！请到 会员中心-订单中心 里继续进行支付");
                } else {
                  show_fail_modal(title + " 购买失败！");
                }
              });

            });
          } else {
            show_fail_modal( " VIP会员资源，请至 会员中心-我的会员 购买VIP！");
          }
        });
      }
      else {
        show_ask_modal("是否确定订阅： " + title + "？", function () {
          hide_ask_modal();
          const mediaid = Golbal.convert_mediaid(tmdb_id);
          //console.log("普通订阅 params:" + "{tmdbid:" + mediaid + ", title:" + title + ", media_type:" + media_type + ", year:" + year +"}")
          if (media_type == "MOV" || media_type == "电影" || "MOVIE" == media_type) {
            add_rss_media(title, year, media_type, mediaid, "", "", add_func,fourkhub_id);
          } else {
            ajax_post("get_tvseason_list", {'tmdbid': mediaid, 'title': title,'fourkhub_id':fourkhub_id}, function (ret) {
              if (ret.seasons.length === 1) {
                //console.log(ret)
                add_rss_media(title, year, "TV", mediaid, "", ret.seasons[0].num, add_func,fourkhub_id);
              } else if (ret.seasons.length > 1) {
                show_rss_seasons_modal(title, year, "TV", mediaid, ret.seasons, add_func);
              } else {
                show_fail_modal(title + " 添加RSS订阅失败：未查询到季信息！");
              }
            });
          }
        });
      }
    }
  }

  // 购买按钮被点击时
  static lit_buy_click(title, year, media_type, tmdb_id, fav, remove_func, add_func,pagefrom,fourkhub_id,coins,vod_id) {
    if (fav == "1"){
      show_ask_modal("是否确定将 " + title + " 从订阅中移除？", function () {
        hide_ask_modal();
        remove_rss_media(title, year, media_type, "", "", tmdb_id, remove_func);
      });
    } else {
      console.log("pagefrom:"+pagefrom+" vod_id:"+vod_id)
      //if (pagefrom == '4KHUBVIP' || pagefrom == "4KHUBSEARCHE" || pagefrom == "4KHUBVOD"||pagefrom=='4KHUB_RANK'){
        ajax_post("check_is_vip", {}, function (ret) {
          if (ret.is_vip) {
            show_ask_modal("是否确定用"+coins+"金币购买并订阅： " + title + " ？ 已经成功购买的不会重复扣费", function () {
              hide_ask_modal();
              const mediaid = Golbal.convert_mediaid(tmdb_id);

              ajax_post("buy_4khub_id", {fourkhub_id: fourkhub_id, pagefrom: pagefrom}, function (ret) {
                if (ret.status === 1) {
                  console.log("media_type:"+media_type)
                  //购买成功,开始订阅，同普通流程
                  if (media_type == "MOV" || media_type == "电影" || media_type == "MOVIE") {
                    add_rss_media(title, year, media_type, mediaid, "", "", add_func,fourkhub_id);
                  } else {
                    ajax_post("get_tvseason_list", {'tmdbid': mediaid, 'title': title,'fourkhub_id':fourkhub_id}, function (ret) {
                      if (ret.seasons.length === 1) {
                        add_rss_media(title, year, "TV", mediaid, "", ret.seasons[0].num, add_func,fourkhub_id);
                      } else if (ret.seasons.length > 1) {
                        show_rss_seasons_modal(title, year, "TV", mediaid, ret.seasons, add_func);
                      } else {
                        show_fail_modal(title + " 添加RSS订阅失败：未查询到季信息！");
                      }
                    });
                  }

                } else if(ret.status === 2) {
                  show_fail_modal("支付失败！请到 会员中心-订单中心 里继续进行支付");
                } else {
                  show_fail_modal(title + " 购买失败！");
                }
              });

            });
          } else {
            show_fail_modal( " VIP会员资源，请至 会员中心-我的会员 购买VIP！");
          }
        });
      //}
      //else {
      //}
    }
  }

  // 保存额外的页面数据
  static save_page_data(name, value) {
    const extra = window.history.state?.extra ?? {};
    extra[name] = value;
    window_history(false, extra);
  }

  // 获取额外的页面数据
  static get_page_data(name) {
    return window.history.state?.extra ? window.history.state.extra[name] : undefined;
  }
  
  // 判断直接获取缓存或ajax_post
  static get_cache_or_ajax(api, name, data, func) {
    const ret = Golbal.get_page_data(api + name);
    //console.log("读取:", api + name, ret);
    if (ret) {
      func(ret);
    } else {
      const page = window.history.state?.page;
      ajax_post(api, data, (ret) => {
        // 页面已经变化, 丢弃该请求
        if (page !== window.history.state?.page) {
          //console.log("丢弃:", api + name, ret);
          return
        }
        Golbal.save_page_data(api + name, ret);
        //console.log("缓存:", api + name, ret);
        func(ret)
      });
    }
  }

  // 共用的fav数据更改时刷新缓存
  static update_fav_data(api, name, func=undefined) {
    const key = api + name;
    let extra = Golbal.get_page_data(key);
    if (extra && func) {
      extra = func(extra);
      Golbal.save_page_data(key, extra);
      //console.log("更新fav", extra);
    }
  }

}