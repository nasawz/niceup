import projectConfig from '/docs/pagic.config.js';
export default {
    'prev': {
        "text": "设置标签",
        "link": "guide/set_tag.html"
    },
    'next': {
        "text": "设置推荐",
        "link": "guide/set_kv.html"
    },
    config: { "root": "/", ...projectConfig, branch: 'master' },
    'pagePath': "guide/add_product.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "guide/add_product.html",
    'title': "创建商品",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>创建商品</h1>\n<p>要实现对售卖的团购商品进行管控。</p>\n<h2 id="%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4">操作步骤<a class="anchor" href="#%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4">§</a></h2>\n<ol>\n<li>\n<p>点击左侧菜单的商品，进入商品列表。</p>\n</li>\n<li>\n<p>点击创建按钮。</p>\n</li>\n</ol>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116110656184.png" alt="image-20210116110656184"></p>\n<ol start="3">\n<li>在弹出框中输入标题、价格、图片等信息，点击<strong>保存</strong>。</li>\n</ol>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116111059807.png" alt="image-20210116111059807"></p>\n<ol start="4">\n<li>\n<p>商品保存成功后，您可以在商品列表中，看到新创建的商品。</p>\n</li>\n<li>\n<p>接下来为新创建的商品添加规格，点击商品右侧操作菜单下的规格按钮。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116113304173.png" alt="image-20210116113304173"></p>\n</li>\n<li>\n<p>在新弹出的规格列表中点击右上角的创建按钮。</p>\n</li>\n</ol>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116113409363.png" alt="image-20210116113409363"></p>\n<ol start="7">\n<li>\n<p>在弹出框中输入标题、价格、重量、成本等信息，点击<strong>保存</strong>。<code>注：三方代表这个商品是由商家直接发货，无需up自行发货，这里的设置会影响“备货”模块的数据导出</code></p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116113833745.png" alt="image-20210116113833745"></p>\n</li>\n<li>\n<p>规格保存成功后，您可以在规格列表中，看到新创建的规格。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116125024901.png" alt="image-20210116125024901"></p>\n</li>\n<li>\n<p>新创建的商品默认是不展示的，需要手动点击上架按钮。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116114005295.png" alt="image-20210116114005295"></p>\n</li>\n<li>\n<p>上架成功后可以在小程序端看到新创建的商品。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/Group%202.jpg" alt="image-20210116114336832"></p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116125243181.png" alt="image-20210116125243181"></p>\n</li>\n</ol>'
        } }),
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/docs/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "\u521B\u5EFA\u5546\u54C1"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>要实现对售卖的团购商品进行管控。</p>\n<h2 id="%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4">操作步骤<a class="anchor" href="#%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4">§</a></h2>\n<ol>\n<li>\n<p>点击左侧菜单的商品，进入商品列表。</p>\n</li>\n<li>\n<p>点击创建按钮。</p>\n</li>\n</ol>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116110656184.png" alt="image-20210116110656184"></p>\n<ol start="3">\n<li>在弹出框中输入标题、价格、图片等信息，点击<strong>保存</strong>。</li>\n</ol>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116111059807.png" alt="image-20210116111059807"></p>\n<ol start="4">\n<li>\n<p>商品保存成功后，您可以在商品列表中，看到新创建的商品。</p>\n</li>\n<li>\n<p>接下来为新创建的商品添加规格，点击商品右侧操作菜单下的规格按钮。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116113304173.png" alt="image-20210116113304173"></p>\n</li>\n<li>\n<p>在新弹出的规格列表中点击右上角的创建按钮。</p>\n</li>\n</ol>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116113409363.png" alt="image-20210116113409363"></p>\n<ol start="7">\n<li>\n<p>在弹出框中输入标题、价格、重量、成本等信息，点击<strong>保存</strong>。<code>注：三方代表这个商品是由商家直接发货，无需up自行发货，这里的设置会影响“备货”模块的数据导出</code></p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116113833745.png" alt="image-20210116113833745"></p>\n</li>\n<li>\n<p>规格保存成功后，您可以在规格列表中，看到新创建的规格。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116125024901.png" alt="image-20210116125024901"></p>\n</li>\n<li>\n<p>新创建的商品默认是不展示的，需要手动点击上架按钮。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116114005295.png" alt="image-20210116114005295"></p>\n</li>\n<li>\n<p>上架成功后可以在小程序端看到新创建的商品。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/Group%202.jpg" alt="image-20210116114336832"></p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116125243181.png" alt="image-20210116125243181"></p>\n</li>\n</ol>'
        } }),
    'toc': null,
    'author': "nasa.wang",
    'contributors': [
        "nasa.wang"
    ],
    'date': "2021-01-16T10:15:57.000Z",
    'updated': null,
    'excerpt': "要实现对售卖的团购商品进行管控。 操作步骤 1. 点击左侧菜单的商品，进入商品列表。 2. 点击创建按钮。 3. 在弹出框中输入标题、价格、图片等信息，点击保存。 4. 商品保存成功后，您可以在商品列表中，看到新创建的商品。 5....",
    'cover': "https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116110656184.png",
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
