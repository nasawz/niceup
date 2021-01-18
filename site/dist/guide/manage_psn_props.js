import projectConfig from '/docs/pagic.config.js';
export default {
    'prev': {
        "text": "发布公告",
        "link": "guide/set_notice.html"
    },
    'next': {
        "text": "管理订单",
        "link": "guide/manage_order.html"
    },
    config: { "root": "/", ...projectConfig, branch: 'master' },
    'pagePath': "guide/manage_psn.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "guide/manage_psn.html",
    'title': "查看备货",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>查看备货</h1>\n<p>在每一个团购周期结束后，UP主就需要统计粉丝们订购的商品。备货模块能从各个维度展示需要备货的信息。</p>\n<h2 id="%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4">操作步骤<a class="anchor" href="#%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4">§</a></h2>\n<ol>\n<li>点击左侧菜单的备货，进入备货列表。</li>\n</ol>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116145821522.png" alt="image-20210116145821522"></p>\n<ol start="2">\n<li>设定筛选条件</li>\n</ol>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>商品条件</th>\n<th>订购状态</th>\n<th>发货方</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116145943975.png" alt="image-20210116145943975"></td>\n<td><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116145959799.png" alt="image-20210116145959799"></td>\n<td><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116150016417.png" alt="image-20210116150016417"></td>\n</tr>\n</tbody>\n</table></div>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>关键词</th>\n<th>时间范围</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116150349727.png" alt="image-20210116150349727"></td>\n<td><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116150359752.png" alt="image-20210116150359752"></td>\n</tr>\n</tbody>\n</table></div>\n<ol start="3">\n<li>\n<p>设置导出数据结构</p>\n<p>默认情况下姓名、电话、地址 是分为三列的。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116150557638.png" alt="image-20210116150557638"></p>\n<p>但有的商家要的发货清单 姓名电话地址要连起来为一例。点击右上角的设置按钮，点击整合收货地址。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116150703855.png" alt="image-20210116150703855"></p>\n</li>\n<li>\n<p>数据导出</p>\n<p>点击右上角的数据导出按钮，浏览器会提示下载一个csv格式的数据文件。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116150900152.png" alt="image-20210116150900152"></p>\n</li>\n</ol>'
        } }),
    'head': React.createElement("link", { href: "/favicon.ico", rel: "icon", type: "image/png" }),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/docs/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "\u67E5\u770B\u5907\u8D27"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>在每一个团购周期结束后，UP主就需要统计粉丝们订购的商品。备货模块能从各个维度展示需要备货的信息。</p>\n<h2 id="%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4">操作步骤<a class="anchor" href="#%E6%93%8D%E4%BD%9C%E6%AD%A5%E9%AA%A4">§</a></h2>\n<ol>\n<li>点击左侧菜单的备货，进入备货列表。</li>\n</ol>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116145821522.png" alt="image-20210116145821522"></p>\n<ol start="2">\n<li>设定筛选条件</li>\n</ol>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>商品条件</th>\n<th>订购状态</th>\n<th>发货方</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116145943975.png" alt="image-20210116145943975"></td>\n<td><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116145959799.png" alt="image-20210116145959799"></td>\n<td><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116150016417.png" alt="image-20210116150016417"></td>\n</tr>\n</tbody>\n</table></div>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>关键词</th>\n<th>时间范围</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116150349727.png" alt="image-20210116150349727"></td>\n<td><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116150359752.png" alt="image-20210116150359752"></td>\n</tr>\n</tbody>\n</table></div>\n<ol start="3">\n<li>\n<p>设置导出数据结构</p>\n<p>默认情况下姓名、电话、地址 是分为三列的。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116150557638.png" alt="image-20210116150557638"></p>\n<p>但有的商家要的发货清单 姓名电话地址要连起来为一例。点击右上角的设置按钮，点击整合收货地址。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116150703855.png" alt="image-20210116150703855"></p>\n</li>\n<li>\n<p>数据导出</p>\n<p>点击右上角的数据导出按钮，浏览器会提示下载一个csv格式的数据文件。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116150900152.png" alt="image-20210116150900152"></p>\n</li>\n</ol>'
        } }),
    'toc': null,
    'author': "nasa.wang",
    'contributors': [
        "nasa.wang"
    ],
    'date': "2021-01-16T10:15:57.000Z",
    'updated': null,
    'excerpt': "在每一个团购周期结束后，UP主就需要统计粉丝们订购的商品。备货模块能从各个维度展示需要备货的信息。 操作步骤 1. 点击左侧菜单的备货，进入备货列表。 2. 设定筛选条件 商品条件 订购状态 发货方 关键词 时间范围 3. 设置导...",
    'cover': "https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116145821522.png",
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
