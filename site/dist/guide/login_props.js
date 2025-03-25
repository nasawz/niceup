import projectConfig from '/docs/pagic.config.js';
export default {
    'prev': undefined,
    'next': {
        "text": "数据统计",
        "link": "guide/statistics.html"
    },
    config: { "root": "/", ...projectConfig, branch: 'HEAD' },
    'pagePath': "guide/login.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "guide/login.html",
    'title': "登录系统",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>登录系统</h1>\n<p>输入之前一键部署时设置的帐号密码登录系统。</p>\n<ul>\n<li>administratorName 管理员账户名，账号名长度需要大于 4 位，支持字母和数字</li>\n<li>administratorPassword 管理员账号密码，8~32位，密码支持字母、数字、字符、不能由纯字母或存数字组成</li>\n</ul>\n<hr>\n<h2 id="%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4">操作步骤<a class="anchor" href="#%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4">§</a></h2>\n<ol>\n<li>使用电脑输入部署成功后的管理网址，进入登录页面。</li>\n<li>输入帐号密码，回车。</li>\n<li>进入统计页面，可以查看系统整体的商品已经销售情况。</li>\n</ol>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210115231445036.png" alt="image-20210115231445036"></p>'
        } }),
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/docs/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "\u767B\u5F55\u7CFB\u7EDF"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>输入之前一键部署时设置的帐号密码登录系统。</p>\n<ul>\n<li>administratorName 管理员账户名，账号名长度需要大于 4 位，支持字母和数字</li>\n<li>administratorPassword 管理员账号密码，8~32位，密码支持字母、数字、字符、不能由纯字母或存数字组成</li>\n</ul>\n<hr>\n<h2 id="%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4">操作步骤<a class="anchor" href="#%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4">§</a></h2>\n<ol>\n<li>使用电脑输入部署成功后的管理网址，进入登录页面。</li>\n<li>输入帐号密码，回车。</li>\n<li>进入统计页面，可以查看系统整体的商品已经销售情况。</li>\n</ol>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210115231445036.png" alt="image-20210115231445036"></p>'
        } }),
    'toc': null,
    'author': undefined,
    'contributors': [],
    'date': "2021-01-15T12:38:38.394Z",
    'updated': null,
    'excerpt': "输入之前一键部署时设置的帐号密码登录系统。 - administratorName 管理员账户名，账号名长度需要大于 4 位，支持字母和数字 - administratorPassword 管理员账号密码，8~32位，密码支持字母、数字、字符、不能由纯字母或存数字...",
    'cover': "https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210115231445036.png",
    'sidebar': [
        {
            "text": "登录系统",
            "link": "guide/login.html",
            "pagePath": "guide/login.md"
        },
        {
            "text": "数据统计",
            "link": "guide/statistics.html",
            "pagePath": "guide/statistics.md"
        },
        {
            "text": "设置标签",
            "link": "guide/set_tag.html",
            "pagePath": "guide/set_tag.md"
        },
        {
            "text": "创建商品",
            "link": "guide/add_product.html",
            "pagePath": "guide/add_product.md"
        },
        {
            "text": "设置推荐",
            "link": "guide/set_kv.html",
            "pagePath": "guide/set_kv.md"
        },
        {
            "text": "设置运费",
            "link": "guide/set_freight.html",
            "pagePath": "guide/set_freight.md"
        },
        {
            "text": "发布公告",
            "link": "guide/set_notice.html",
            "pagePath": "guide/set_notice.md"
        },
        {
            "text": "查看备货",
            "link": "guide/manage_psn.html",
            "pagePath": "guide/manage_psn.md"
        },
        {
            "text": "管理订单",
            "link": "guide/manage_order.html",
            "pagePath": "guide/manage_order.md"
        },
        {
            "text": "管理文件",
            "link": "guide/manage_file.html",
            "pagePath": "guide/manage_file.md"
        },
        {
            "text": "其他功能",
            "link": "guide/others.html",
            "pagePath": "guide/others.md"
        }
    ]
};
