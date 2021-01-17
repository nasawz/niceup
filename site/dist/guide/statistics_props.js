import projectConfig from '/docs/pagic.config.js';
export default {
    'prev': {
        "text": "登录系统",
        "link": "guide/login.html"
    },
    'next': {
        "text": "设置标签",
        "link": "guide/set_tag.html"
    },
    config: { "root": "/", ...projectConfig, branch: 'master' },
    'pagePath': "guide/statistics.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "guide/statistics.html",
    'title': "数据统计",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>数据统计</h1>\n<p>登录之后默认会进入统计页面，这里可根据时间维度展示一定时间段内的销售情况。</p>\n<h2 id="%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4">操作步骤<a class="anchor" href="#%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4">§</a></h2>\n<p>点击左侧菜单的首页或左上角的LOGO，可进入数据统计页面。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116162923088.png" alt="image-20210116162923088"></p>'
        } }),
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/docs/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "\u6570\u636E\u7EDF\u8BA1"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>登录之后默认会进入统计页面，这里可根据时间维度展示一定时间段内的销售情况。</p>\n<h2 id="%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4">操作步骤<a class="anchor" href="#%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4">§</a></h2>\n<p>点击左侧菜单的首页或左上角的LOGO，可进入数据统计页面。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116162923088.png" alt="image-20210116162923088"></p>'
        } }),
    'toc': null,
    'author': "nasa.wang",
    'contributors': [
        "nasa.wang"
    ],
    'date': "2021-01-16T10:15:57.000Z",
    'updated': null,
    'excerpt': "登录之后默认会进入统计页面，这里可根据时间维度展示一定时间段内的销售情况。 操作步骤 点击左侧菜单的首页或左上角的LOGO，可进入数据统计页面。 ",
    'cover': "https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116162923088.png",
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
