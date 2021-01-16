import projectConfig from '/docs/pagic.config.js';
export default {
    'prev': {
        "text": "数据统计",
        "link": "guide/statistics.html"
    },
    'next': {
        "text": "创建商品",
        "link": "guide/add_product.html"
    },
    config: { "root": "/", ...projectConfig, branch: 'HEAD' },
    'pagePath': "guide/set_tag.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "guide/set_tag.html",
    'title': "设置标签",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>设置标签</h1>\n<p>标签分类是商品的必要属性，在添加商品之前必先对标签进行设置。同时标签也会展示在小程序首页的重要位置。</p>\n<h2 id="%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4">操作步骤<a class="anchor" href="#%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4">§</a></h2>\n<ol>\n<li>\n<p>点击左侧菜单的标签，进入标签列表。</p>\n</li>\n<li>\n<p>点击创建按钮。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210115232011116.png" alt="image-20210115232011116"></p>\n</li>\n<li>\n<p>在弹出框中输入名称、排序信息，点击<strong>保存</strong>。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210115232129830.png" alt="image-20210115232129830"></p>\n</li>\n<li>\n<p>标签保存成功后，您可以在标签列表中，看到新创建的标签。</p>\n</li>\n<li>\n<p>新创建的标签默认是不展示的，需要手动点击上架按钮。</p>\n</li>\n</ol>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116000507331.png" alt="image-20210116000507331"></p>\n<ol start="6">\n<li>\n<p>上架成功后可以在小程序端看到新创建的标签。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116000752537.png" alt="image-20210116000752537"></p>\n</li>\n</ol>'
        } }),
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/docs/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "\u8BBE\u7F6E\u6807\u7B7E"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>标签分类是商品的必要属性，在添加商品之前必先对标签进行设置。同时标签也会展示在小程序首页的重要位置。</p>\n<h2 id="%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4">操作步骤<a class="anchor" href="#%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4">§</a></h2>\n<ol>\n<li>\n<p>点击左侧菜单的标签，进入标签列表。</p>\n</li>\n<li>\n<p>点击创建按钮。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210115232011116.png" alt="image-20210115232011116"></p>\n</li>\n<li>\n<p>在弹出框中输入名称、排序信息，点击<strong>保存</strong>。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210115232129830.png" alt="image-20210115232129830"></p>\n</li>\n<li>\n<p>标签保存成功后，您可以在标签列表中，看到新创建的标签。</p>\n</li>\n<li>\n<p>新创建的标签默认是不展示的，需要手动点击上架按钮。</p>\n</li>\n</ol>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116000507331.png" alt="image-20210116000507331"></p>\n<ol start="6">\n<li>\n<p>上架成功后可以在小程序端看到新创建的标签。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116000752537.png" alt="image-20210116000752537"></p>\n</li>\n</ol>'
        } }),
    'toc': null,
    'author': undefined,
    'contributors': [],
    'date': "2021-01-15T12:38:38.394Z",
    'updated': null,
    'excerpt': "标签分类是商品的必要属性，在添加商品之前必先对标签进行设置。同时标签也会展示在小程序首页的重要位置。 操作步骤 1. 点击左侧菜单的标签，进入标签列表。 2. 点击创建按钮。 3. 在弹出框中输入名称、排序信息，点击保存。 ...",
    'cover': "https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210115232011116.png",
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
