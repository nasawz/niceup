import projectConfig from '/docs/pagic.config.js';
export default {
    'prev': {
        "text": "查看备货",
        "link": "guide/manage_psn.html"
    },
    'next': {
        "text": "管理文件",
        "link": "guide/manage_file.html"
    },
    config: { "root": "/", ...projectConfig, branch: 'HEAD' },
    'pagePath': "guide/manage_order.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "guide/manage_order.html",
    'title': "管理订单",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>管理订单</h1>\n<p>要实现对的的管控。</p>\n<h2 id="%E6%93%8D%E4%BD%9C">操作<a class="anchor" href="#%E6%93%8D%E4%BD%9C">§</a></h2>\n<p>点击左侧菜单的订单，进入订单列表。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116154756164.png" alt="image-20210116154756164"></p>\n<h3 id="%E5%85%B3%E9%97%AD%E8%AE%A2%E5%8D%95">关闭订单<a class="anchor" href="#%E5%85%B3%E9%97%AD%E8%AE%A2%E5%8D%95">§</a></h3>\n<p>对未付款的订单可进行关闭操作，点击订单左侧的复选框，再点击上方出现的关闭按钮即可完成关闭订单操作。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116155042192.png" alt="image-20210116155042192"></p>\n<h3 id="%E4%BF%AE%E6%94%B9%E6%94%B6%E8%B4%A7%E4%BA%BA%E4%BF%A1%E6%81%AF">修改收货人信息<a class="anchor" href="#%E4%BF%AE%E6%94%B9%E6%94%B6%E8%B4%A7%E4%BA%BA%E4%BF%A1%E6%81%AF">§</a></h3>\n<p>对已付款的订单，可修改其收货人信息。 点击右侧操作按钮，在弹出的菜单中选择地址。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116155428818.png" alt="image-20210116155428818"></p>\n<p>在弹出框中输入新的收件人信息，点击<strong>保存</strong>。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116155758348.png" alt="image-20210116155758348"></p>\n<p>在订单列表中可以看到修改后的收件人信息。</p>\n<h3 id="%E5%8F%91%E8%B4%A7">发货<a class="anchor" href="#%E5%8F%91%E8%B4%A7">§</a></h3>\n<p>对已付款的订单，可进行发货。 点击右侧操作按钮，在弹出的菜单中选择发货。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116160054450.png" alt="image-20210116160054450"></p>\n<p>在弹出框中针对各个商品可输入对应的快递单号信息。<code>注：“保存并发送通知可再小程序端发送一条订单发货提醒给用户”</code></p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116160248865.png" alt="image-20210116160248865"></p>\n<h3 id="%E9%80%80%E6%AC%BE">退款<a class="anchor" href="#%E9%80%80%E6%AC%BE">§</a></h3>\n<p>对已付款并且未发货的订单，可进行退款。 点击右侧操作按钮，在弹出的菜单中选择退款。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116160928917.png" alt="image-20210116160928917"></p>\n<p>退款仅支持全单退款，需要在弹出框中进行二次确认。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116161109470.png" alt="image-20210116161109470"></p>'
        } }),
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/docs/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "\u7BA1\u7406\u8BA2\u5355"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>要实现对的的管控。</p>\n<h2 id="%E6%93%8D%E4%BD%9C">操作<a class="anchor" href="#%E6%93%8D%E4%BD%9C">§</a></h2>\n<p>点击左侧菜单的订单，进入订单列表。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116154756164.png" alt="image-20210116154756164"></p>\n<h3 id="%E5%85%B3%E9%97%AD%E8%AE%A2%E5%8D%95">关闭订单<a class="anchor" href="#%E5%85%B3%E9%97%AD%E8%AE%A2%E5%8D%95">§</a></h3>\n<p>对未付款的订单可进行关闭操作，点击订单左侧的复选框，再点击上方出现的关闭按钮即可完成关闭订单操作。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116155042192.png" alt="image-20210116155042192"></p>\n<h3 id="%E4%BF%AE%E6%94%B9%E6%94%B6%E8%B4%A7%E4%BA%BA%E4%BF%A1%E6%81%AF">修改收货人信息<a class="anchor" href="#%E4%BF%AE%E6%94%B9%E6%94%B6%E8%B4%A7%E4%BA%BA%E4%BF%A1%E6%81%AF">§</a></h3>\n<p>对已付款的订单，可修改其收货人信息。 点击右侧操作按钮，在弹出的菜单中选择地址。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116155428818.png" alt="image-20210116155428818"></p>\n<p>在弹出框中输入新的收件人信息，点击<strong>保存</strong>。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116155758348.png" alt="image-20210116155758348"></p>\n<p>在订单列表中可以看到修改后的收件人信息。</p>\n<h3 id="%E5%8F%91%E8%B4%A7">发货<a class="anchor" href="#%E5%8F%91%E8%B4%A7">§</a></h3>\n<p>对已付款的订单，可进行发货。 点击右侧操作按钮，在弹出的菜单中选择发货。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116160054450.png" alt="image-20210116160054450"></p>\n<p>在弹出框中针对各个商品可输入对应的快递单号信息。<code>注：“保存并发送通知可再小程序端发送一条订单发货提醒给用户”</code></p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116160248865.png" alt="image-20210116160248865"></p>\n<h3 id="%E9%80%80%E6%AC%BE">退款<a class="anchor" href="#%E9%80%80%E6%AC%BE">§</a></h3>\n<p>对已付款并且未发货的订单，可进行退款。 点击右侧操作按钮，在弹出的菜单中选择退款。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116160928917.png" alt="image-20210116160928917"></p>\n<p>退款仅支持全单退款，需要在弹出框中进行二次确认。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116161109470.png" alt="image-20210116161109470"></p>'
        } }),
    'toc': React.createElement("aside", { dangerouslySetInnerHTML: {
            __html: '<nav class="toc"><ol><li><a href="#%E6%93%8D%E4%BD%9C">操作</a><ol><li><a href="#%E5%85%B3%E9%97%AD%E8%AE%A2%E5%8D%95">关闭订单</a></li><li><a href="#%E4%BF%AE%E6%94%B9%E6%94%B6%E8%B4%A7%E4%BA%BA%E4%BF%A1%E6%81%AF">修改收货人信息</a></li><li><a href="#%E5%8F%91%E8%B4%A7">发货</a></li><li><a href="#%E9%80%80%E6%AC%BE">退款</a></li></ol></li></ol></nav>'
        } }),
    'author': undefined,
    'contributors': [],
    'date': "2021-01-15T12:38:38.394Z",
    'updated': null,
    'excerpt': "要实现对的的管控。 操作 点击左侧菜单的订单，进入订单列表。 关闭订单 对未付款的订单可进行关闭操作，点击订单左侧的复选框，再点击上方出现的关闭按钮即可完成关闭订单操作。 修改收货人信息 对已付款的订单，可修改其收货...",
    'cover': "https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116154756164.png",
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
