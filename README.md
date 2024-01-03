# [https://www.4khub.xyz](https://www.4khub.xyz/) website client

[4khub-client](https://www.4khub.xyz/)是 `www.4khub.xyz`网站客户端，也是个人影视库；所有最新资源，VIP资源都在客户端发布，原网站只做部分资源展示，不再更新资源。客户端更有海量电影电视库提供方便搜索，下载，资源搜刮整理，消息通知，豆瓣订阅等功能。打造专属个人的影视库。

![https://raw.githubusercontent.com/fourkhub-xyz/4khub-client/main/Screenshot%20.png](https://raw.githubusercontent.com/fourkhub-xyz/4khub-client/main/Screenshot%20.png)

---

## 如何使用
### 首推Docker容器化安装（简单方便快捷）
[https://hub.docker.com/r/4khubxyz/4khub-client](https://hub.docker.com/r/4khubxyz/4khub-client)


### 安装包安装方法（会有系统依赖，需自行安装系统缺失的依赖软件）
**下载**：下载对应系统的软件包。

- Windows：`4khub-client_x86_64_windows.zip`
- Linux：`4khub-client_x86_64_linux.zip`
- 下载地址：[https://download.4khub.xyz/](https://download.4khub.xyz/) 用户名：admin 密码：admin

**解压**：unzip解压软件包到具体目录下。

**安装Python3环境和依赖包**：

- 下载python3安装包：[https://www.python.org/downloads/](https://www.python.org/downloads/)
- 查看是否安装成功：`python3 -V` 显示已经安装python版本
- 命令行执行安装最新依赖包：`pip3 install -r https://raw.githubusercontent.com/fourkhub-xyz/4khub-client/main/requirements.txt`


**安装配套工具**：

- Windows：媒体工具：[emby](https://emby.media/download.html)，下载工具：[aria2](https://github.com/aria2/aria2/releases/)
- Linux：媒体工具：[emby](https://emby.media/download.html)，下载工具：[aria2](https://github.com/aria2/aria2/releases/)

**运行客户端**：

- Windows：客户端目录下命令行执行：`python3 client_main.py`；或者直接双击`run.bat`执行
- Linux：客户端目录下命令行执行：`python3 client_main.py`；



## 功能简介：


### 1、资源搜索和订阅下载
* 汇聚全网最新最好看的资源，特供4KHub精品资源，4K UHD、4K蓝光原盘以及VIP资源。
* 站点RSS聚合，想看的加入订阅，资源自动实时追新追剧，自动下载。
* 通过微信、Telegram、Slack、Synology Chat或者WEB界面聚合资源搜索下载，最新热门资源一键搜索或者订阅。
* 与豆瓣联动，在豆瓣中标记想看后台自动检索下载，未出全的自动加入订阅。

### 2、媒体库整理
* 监控下载软件，下载完成后自动识别真实名称，硬链接到媒体库并重命名。
* 对目录进行监控，文件变化时自动识别媒体信息硬链接到媒体库并重命名。
* 解决保种与媒体库整理冲突的问题，专为中文环境优化，支持国产剧集和动漫，重命名准确率高，改名后Emby/Jellyfin/Plex完美刮削海报墙。

### 3、站点养护
* 全面的站点数据统计，实时监测你的站点流量情况。
* 全自动化托管养站，支持远程下载器（本工具内建刷流功能仅为日常养站使用，如果追求数据建议使用更加强大的刷流工具：<a href="https://github.com/vertex-app/vertex" target="_blank">Vertex</a>）。
* 站点每日自动登录保号。

### 4、消息服务
* 支持各种状态消息通知，让您及时获取最新影视动态信息。
* 支持微信、Telegram、Slack、Synology Chat、Bark、PushPlus、爱语飞飞等近十种渠道图文消息通知
* 支持通过微信、Telegram、Slack、Synology Chat远程控制订阅和下载。
* Emby/Jellyfin/Plex播放状态通知。

### 5、VIP内网穿透服务
* VIP会员额外提供内网穿透服务，让您随时随地可以方便观看私人影视库的内容和进行管理。
* 随时随地可以订阅，下载想看的影视内容，随时随地观看电影、电视，支持多端设备，打造真正属于个人的影视库。

---

欢迎加入官方Twitter
[![Twitter URL](https://img.shields.io/twitter/url/https/twitter.com/4khubxyz.svg?style=social&label=Follow%20%404khubxyz)](https://twitter.com/4khubxyz)

欢迎加入官方Telegram [@WWW_4KHUB_XYZ](https://t.me/www_4khub_xyz)
