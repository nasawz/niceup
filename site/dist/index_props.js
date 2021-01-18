import projectConfig from '/docs/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig, branch: 'master' },
    'pagePath': "README.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "index.html",
    'title': undefined,
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p align="center" style="padding: 50px 0px">\n  <img height="100px" src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/Group.svg" center />\n</p>\n<p>这是一款针对自媒体从业者专门开发的微信团购小程序。</p>\n<h2 id="%E5%BC%80%E5%8F%91%E8%80%85%E4%BF%A1%E6%81%AF">开发者信息<a class="anchor" href="#%E5%BC%80%E5%8F%91%E8%80%85%E4%BF%A1%E6%81%AF">§</a></h2>\n<p>本应用由nasawz开发提供</p>\n<p>微信: wangzhe127</p>\n<h2 id="%E9%83%A8%E7%BD%B2">部署<a class="anchor" href="#%E9%83%A8%E7%BD%B2">§</a></h2>\n<p>本项目基于腾讯开源项目 <a href="https://github.com/Tencent/cloudbase-framework">CloudBase Framework</a> <a href="https://github.com/Tencent/cloudbase-framework"><img src="https://img.shields.io/github/stars/Tencent/cloudbase-framework?style=social" alt="star"></a> 开发部署，支持一键云端部署。</p>\n<p><a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&amp;appUrl=https%3A%2F%2Fgithub.com%2Fnasawz%2Fniceup&amp;branch=master"><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/67f5a389f1ac6f3b4d04c7256438e44f.svg" alt=""></a></p>\n<h3 id="%E9%85%8D%E7%BD%AE">配置<a class="anchor" href="#%E9%85%8D%E7%BD%AE">§</a></h3>\n<p>查看<a href="./install/environment_help.html">配置详解</a></p>\n<ul>\n<li>ENV_ID 您的云开发环境 Id</li>\n<li>administratorName 管理员账户名，账号名长度需要大于 4 位，支持字母和数字</li>\n<li>administratorPassword 管理员账号密码，8~32位，密码支持字母、数字、字符、不能由纯字母或存数字组成</li>\n<li>deployManagePath 管理端部署路径，如 /manage/，建议使用根路径 /</li>\n<li>private_key_id 自定义登录密钥ID</li>\n<li>private_key 自定义登录密钥Key</li>\n<li>mini_appid 小程序ID</li>\n<li>mini_privateKey 小程序密钥</li>\n<li>mini_pub_privateKey 小程序发布密钥(Base64后)</li>\n</ul>\n<h2 id="%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9">注意事项<a class="anchor" href="#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9">§</a></h2>\n<ol>\n<li><span style="color:red;">云开发必须是由小程序端创建</span></li>\n<li><span style="color:red;">云开发必须开通按量付费模式</span></li>\n<li>使用支付功能需要在微信开发者工具中绑定商户号并且对退款API进行授权</li>\n</ol>'
        } }),
    'head': React.createElement("link", { href: "/favicon.ico", rel: "icon", type: "image/png" }),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/docs/index.js", type: "module" })),
    'contentTitle': undefined,
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p align="center" style="padding: 50px 0px">\n  <img height="100px" src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/Group.svg" center />\n</p>\n<p>这是一款针对自媒体从业者专门开发的微信团购小程序。</p>\n<h2 id="%E5%BC%80%E5%8F%91%E8%80%85%E4%BF%A1%E6%81%AF">开发者信息<a class="anchor" href="#%E5%BC%80%E5%8F%91%E8%80%85%E4%BF%A1%E6%81%AF">§</a></h2>\n<p>本应用由nasawz开发提供</p>\n<p>微信: wangzhe127</p>\n<h2 id="%E9%83%A8%E7%BD%B2">部署<a class="anchor" href="#%E9%83%A8%E7%BD%B2">§</a></h2>\n<p>本项目基于腾讯开源项目 <a href="https://github.com/Tencent/cloudbase-framework">CloudBase Framework</a> <a href="https://github.com/Tencent/cloudbase-framework"><img src="https://img.shields.io/github/stars/Tencent/cloudbase-framework?style=social" alt="star"></a> 开发部署，支持一键云端部署。</p>\n<p><a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&amp;appUrl=https%3A%2F%2Fgithub.com%2Fnasawz%2Fniceup&amp;branch=master"><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/67f5a389f1ac6f3b4d04c7256438e44f.svg" alt=""></a></p>\n<h3 id="%E9%85%8D%E7%BD%AE">配置<a class="anchor" href="#%E9%85%8D%E7%BD%AE">§</a></h3>\n<p>查看<a href="./install/environment_help.html">配置详解</a></p>\n<ul>\n<li>ENV_ID 您的云开发环境 Id</li>\n<li>administratorName 管理员账户名，账号名长度需要大于 4 位，支持字母和数字</li>\n<li>administratorPassword 管理员账号密码，8~32位，密码支持字母、数字、字符、不能由纯字母或存数字组成</li>\n<li>deployManagePath 管理端部署路径，如 /manage/，建议使用根路径 /</li>\n<li>private_key_id 自定义登录密钥ID</li>\n<li>private_key 自定义登录密钥Key</li>\n<li>mini_appid 小程序ID</li>\n<li>mini_privateKey 小程序密钥</li>\n<li>mini_pub_privateKey 小程序发布密钥(Base64后)</li>\n</ul>\n<h2 id="%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9">注意事项<a class="anchor" href="#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9">§</a></h2>\n<ol>\n<li><span style="color:red;">云开发必须是由小程序端创建</span></li>\n<li><span style="color:red;">云开发必须开通按量付费模式</span></li>\n<li>使用支付功能需要在微信开发者工具中绑定商户号并且对退款API进行授权</li>\n</ol>'
        } }),
    'toc': null,
    'author': "nasa.wang",
    'contributors': [
        "nasa.wang"
    ],
    'date': "2021-01-16T10:15:57.000Z",
    'updated': "2021-01-17T05:08:46.000Z",
    'excerpt': "这是一款针对自媒体从业者专门开发的微信团购小程序。 开发者信息 本应用由nasawz开发提供 微信: wangzhe127 部署 本项目基于腾讯开源项目 CloudBase Framework 开发部署，支持一键云端部署。 配置 查看配置详解 - ENV_ID 您的...",
    'cover': "https://img.shields.io/github/stars/Tencent/cloudbase-framework?style=social"
};
