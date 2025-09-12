import projectConfig from '/docs/pagic.config.js';
export default {
    'prev': {
        "text": "管理文件",
        "link": "guide/manage_file.html"
    },
    'next': undefined,
    config: { "root": "/", ...projectConfig, branch: 'master' },
    'pagePath': "guide/others.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "guide/others.html",
    'title': "其他功能",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>其他功能</h1>\n<h2 id="%E5%AF%BC%E8%88%AA">导航<a class="anchor" href="#%E5%AF%BC%E8%88%AA">§</a></h2>\n<p>点击左侧菜单的锁定按钮可对导航菜单进行锁定、解锁操作。在解锁状态下，点击左上角按钮可切换菜单的显示状态。</p>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>解锁</th>\n<th>锁定</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116164118749.png" alt="image-20210116164118749"></td>\n<td><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116164210213.png" alt="image-20210116164210213"></td>\n</tr>\n</tbody>\n</table></div>\n<h2 id="%E7%BD%AE%E9%A1%B6%E8%8F%9C%E5%8D%95">置顶菜单<a class="anchor" href="#%E7%BD%AE%E9%A1%B6%E8%8F%9C%E5%8D%95">§</a></h2>\n<p>点击左侧导航菜单右侧的Pin按钮，可对菜单进行置顶。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116164405127.png" alt="image-20210116164405127"></p>\n<h2 id="%E4%B8%BB%E9%A2%98">主题<a class="anchor" href="#%E4%B8%BB%E9%A2%98">§</a></h2>\n<p>本系统内置亮色与暗色两套主题，点击右上角的刷子按钮可进行选择切换。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116164444555.png" alt="image-20210116164444555"></p>'
        } }),
    'head': React.createElement("link", { href: "/favicon.ico", rel: "icon", type: "image/png" }),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/docs/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "\u5176\u4ED6\u529F\u80FD"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h2 id="%E5%AF%BC%E8%88%AA">导航<a class="anchor" href="#%E5%AF%BC%E8%88%AA">§</a></h2>\n<p>点击左侧菜单的锁定按钮可对导航菜单进行锁定、解锁操作。在解锁状态下，点击左上角按钮可切换菜单的显示状态。</p>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>解锁</th>\n<th>锁定</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116164118749.png" alt="image-20210116164118749"></td>\n<td><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116164210213.png" alt="image-20210116164210213"></td>\n</tr>\n</tbody>\n</table></div>\n<h2 id="%E7%BD%AE%E9%A1%B6%E8%8F%9C%E5%8D%95">置顶菜单<a class="anchor" href="#%E7%BD%AE%E9%A1%B6%E8%8F%9C%E5%8D%95">§</a></h2>\n<p>点击左侧导航菜单右侧的Pin按钮，可对菜单进行置顶。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116164405127.png" alt="image-20210116164405127"></p>\n<h2 id="%E4%B8%BB%E9%A2%98">主题<a class="anchor" href="#%E4%B8%BB%E9%A2%98">§</a></h2>\n<p>本系统内置亮色与暗色两套主题，点击右上角的刷子按钮可进行选择切换。</p>\n<p><img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116164444555.png" alt="image-20210116164444555"></p>'
        } }),
    'toc': React.createElement("aside", { dangerouslySetInnerHTML: {
            __html: '<nav class="toc"><ol><li><a href="#%E5%AF%BC%E8%88%AA">导航</a></li><li><a href="#%E7%BD%AE%E9%A1%B6%E8%8F%9C%E5%8D%95">置顶菜单</a></li><li><a href="#%E4%B8%BB%E9%A2%98">主题</a></li></ol></nav>'
        } }),
    'author': "nasa.wang",
    'contributors': [
        "nasa.wang"
    ],
    'date': "2021-01-16T10:15:57.000Z",
    'updated': null,
    'excerpt': "导航 点击左侧菜单的锁定按钮可对导航菜单进行锁定、解锁操作。在解锁状态下，点击左上角按钮可切换菜单的显示状态。 解锁 锁定 置顶菜单 点击左侧导航菜单右侧的Pin按钮，可对菜单进行置顶。 主题 本系统内置亮色与暗色两套主...",
    'cover': "https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210116164118749.png",
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
