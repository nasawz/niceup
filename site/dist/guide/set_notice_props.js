import projectConfig from '/docs/pagic.config.js';
export default {
    'prev': {
        "text": "设置运费",
        "link": "guide/set_freight.html"
    },
    'next': {
        "text": "查看备货",
        "link": "guide/manage_psn.html"
    },
    config: { "root": "/", ...projectConfig, branch: 'HEAD' },
    'pagePath': "guide/set_notice.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "guide/set_notice.html",
    'title': "发布公告",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>发布公告</h1>\n<p>要实现对小程序内页公告信息的管控。</p>\n<h2 id="%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4">操作步骤<a class="anchor" href="#%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4">§</a></h2>\n<ol>\n<li>\n<p>点击左侧菜单的公告，进入公告列表。</p>\n</li>\n<li>\n<p>点击创建按钮。</p>\n</li>\n</ol>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116143425883.png" alt="image-20210116143425883"></p>\n<ol start="3">\n<li>\n<p>在弹出框中输入公告内容、配色、图标、以及公告需要展示的页面，点击<strong>保存</strong>。</p>\n<p>公告展示页面有：</p>\n<ul>\n<li>提交订单页面</li>\n<li>商品详情页面</li>\n<li>购物车页面</li>\n</ul>\n<p>可分别对这些页面设置公告</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116144729040.png" alt="image-20210116144729040"></p>\n</li>\n<li>\n<p>公告保存成功后，您可以在公告列表中，看到新创建的公告。</p>\n</li>\n<li>\n<p>新创建的公告默认是不展示的，需要手动点击展示按钮。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116144921563.png" alt="image-20210116144921563"></p>\n</li>\n<li>\n<p>展示成功后可在小程序中看到对应的公告。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116145108722.png" alt="image-20210116145108722"></p>\n</li>\n</ol>'
        } }),
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/docs/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "\u53D1\u5E03\u516C\u544A"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>要实现对小程序内页公告信息的管控。</p>\n<h2 id="%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4">操作步骤<a class="anchor" href="#%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4">§</a></h2>\n<ol>\n<li>\n<p>点击左侧菜单的公告，进入公告列表。</p>\n</li>\n<li>\n<p>点击创建按钮。</p>\n</li>\n</ol>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116143425883.png" alt="image-20210116143425883"></p>\n<ol start="3">\n<li>\n<p>在弹出框中输入公告内容、配色、图标、以及公告需要展示的页面，点击<strong>保存</strong>。</p>\n<p>公告展示页面有：</p>\n<ul>\n<li>提交订单页面</li>\n<li>商品详情页面</li>\n<li>购物车页面</li>\n</ul>\n<p>可分别对这些页面设置公告</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116144729040.png" alt="image-20210116144729040"></p>\n</li>\n<li>\n<p>公告保存成功后，您可以在公告列表中，看到新创建的公告。</p>\n</li>\n<li>\n<p>新创建的公告默认是不展示的，需要手动点击展示按钮。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116144921563.png" alt="image-20210116144921563"></p>\n</li>\n<li>\n<p>展示成功后可在小程序中看到对应的公告。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116145108722.png" alt="image-20210116145108722"></p>\n</li>\n</ol>'
        } }),
    'toc': null,
    'author': undefined,
    'contributors': [],
    'date': "2021-01-15T12:38:38.394Z",
    'updated': null,
    'excerpt': "要实现对小程序内页公告信息的管控。 操作步骤 1. 点击左侧菜单的公告，进入公告列表。 2. 点击创建按钮。 3. 在弹出框中输入公告内容、配色、图标、以及公告需要展示的页面，点击保存。 公告展示页面有： - 提交订单页面 - 商...",
    'cover': "https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116143425883.png",
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
