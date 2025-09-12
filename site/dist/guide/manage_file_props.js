import projectConfig from '/docs/pagic.config.js';
export default {
    'prev': {
        "text": "管理订单",
        "link": "guide/manage_order.html"
    },
    'next': {
        "text": "其他功能",
        "link": "guide/others.html"
    },
    config: { "root": "/", ...projectConfig, branch: 'master' },
    'pagePath': "guide/manage_file.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "guide/manage_file.html",
    'title': "管理文件",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>管理文件</h1>\n<p>在系统中所有上传的文件都会自动的归入此模块，这里可以实现对云开发的云存储文件进行管控。</p>\n<h2 id="%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4">操作步骤<a class="anchor" href="#%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4">§</a></h2>\n<ol>\n<li>\n<p>点击左侧菜单的文件，进入文件列表。</p>\n</li>\n<li>\n<p>点击左侧的复选框可进行批量删除操作，或点击右侧删除按钮对单个文件进行删除。</p>\n</li>\n</ol>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116162015682.png" alt="image-20210116162015682"></p>'
        } }),
    'head': React.createElement("link", { href: "/favicon.ico", rel: "icon", type: "image/png" }),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/docs/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "\u7BA1\u7406\u6587\u4EF6"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>在系统中所有上传的文件都会自动的归入此模块，这里可以实现对云开发的云存储文件进行管控。</p>\n<h2 id="%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4">操作步骤<a class="anchor" href="#%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4">§</a></h2>\n<ol>\n<li>\n<p>点击左侧菜单的文件，进入文件列表。</p>\n</li>\n<li>\n<p>点击左侧的复选框可进行批量删除操作，或点击右侧删除按钮对单个文件进行删除。</p>\n</li>\n</ol>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116162015682.png" alt="image-20210116162015682"></p>'
        } }),
    'toc': null,
    'author': "nasa.wang",
    'contributors': [
        "nasa.wang"
    ],
    'date': "2021-01-16T10:15:57.000Z",
    'updated': null,
    'excerpt': "在系统中所有上传的文件都会自动的归入此模块，这里可以实现对云开发的云存储文件进行管控。 操作步骤 1. 点击左侧菜单的文件，进入文件列表。 2. 点击左侧的复选框可进行批量删除操作，或点击右侧删除按钮对单个文件进行删除。...",
    'cover': "https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116162015682.png",
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
