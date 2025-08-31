import projectConfig from '/docs/pagic.config.js';
export default {
    'prev': {
        "text": "设置推荐",
        "link": "guide/set_kv.html"
    },
    'next': {
        "text": "发布公告",
        "link": "guide/set_notice.html"
    },
    config: { "root": "/", ...projectConfig, branch: 'master' },
    'pagePath': "guide/set_freight.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "guide/set_freight.html",
    'title': "设置运费",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>设置运费</h1>\n<p>本程序默认所有的团购商品都是包邮的，根据本地快递站点的报价表，可针对一些特殊的地址增加额外的运费。</p>\n<h2 id="%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4">操作步骤<a class="anchor" href="#%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4">§</a></h2>\n<ol>\n<li>\n<p>点击左侧菜单的运费，进入运费列表。</p>\n</li>\n<li>\n<p>点击创建按钮。</p>\n</li>\n</ol>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116124532169.png" alt="image-20210116124532169"></p>\n<ol start="3">\n<li>在弹出框中输入省份名称与增加的运费，点击<strong>保存</strong>。</li>\n</ol>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116125748431.png" alt="image-20210116125748431"></p>\n<ol start="4">\n<li>运费保存成功后，您可以在运费列表中，看到新创建的运费。</li>\n</ol>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116125854021.png" alt="image-20210116125854021"></p>\n<ol start="5">\n<li>小程序端在下单时如果收货地址在设置了运费的省内，会额外增加运费。</li>\n</ol>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116130049471.png" alt="image-20210116130049471"></p>'
        } }),
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/docs/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "\u8BBE\u7F6E\u8FD0\u8D39"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>本程序默认所有的团购商品都是包邮的，根据本地快递站点的报价表，可针对一些特殊的地址增加额外的运费。</p>\n<h2 id="%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4">操作步骤<a class="anchor" href="#%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4">§</a></h2>\n<ol>\n<li>\n<p>点击左侧菜单的运费，进入运费列表。</p>\n</li>\n<li>\n<p>点击创建按钮。</p>\n</li>\n</ol>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116124532169.png" alt="image-20210116124532169"></p>\n<ol start="3">\n<li>在弹出框中输入省份名称与增加的运费，点击<strong>保存</strong>。</li>\n</ol>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116125748431.png" alt="image-20210116125748431"></p>\n<ol start="4">\n<li>运费保存成功后，您可以在运费列表中，看到新创建的运费。</li>\n</ol>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116125854021.png" alt="image-20210116125854021"></p>\n<ol start="5">\n<li>小程序端在下单时如果收货地址在设置了运费的省内，会额外增加运费。</li>\n</ol>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116130049471.png" alt="image-20210116130049471"></p>'
        } }),
    'toc': null,
    'author': "nasa.wang",
    'contributors': [
        "nasa.wang"
    ],
    'date': "2021-01-16T10:15:57.000Z",
    'updated': null,
    'excerpt': "本程序默认所有的团购商品都是包邮的，根据本地快递站点的报价表，可针对一些特殊的地址增加额外的运费。 操作步骤 1. 点击左侧菜单的运费，进入运费列表。 2. 点击创建按钮。 3. 在弹出框中输入省份名称与增加的运费，点击保存...",
    'cover': "https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116124532169.png",
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
