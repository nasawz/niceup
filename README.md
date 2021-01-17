# [NiceUp](https://github.com/nasawz/niceup)

<p align="center">
  <img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/Group.svg" alt="Logo">
  <h3 align="center">
    这是一款针对自媒体从业者专门开发的微信团购小程序。
  </h3>
  <p align="center">
    <br />
    <a href="https://nice-9goo8zpofac7bee9-1304765945.tcloudbaseapp.com/docs/showcase.html">
      <strong>✨ 在线示例 »</strong>
    </a>
    <br />
    <br />
    <a href="https://nice-9goo8zpofac7bee9-1304765945.tcloudbaseapp.com/docs/" target="_blank">文档</a>
    ·
    <a href="https://nice-9goo8zpofac7bee9-1304765945.tcloudbaseapp.com/docs/guide/login.html" target="_blank">用户手册</a>
    ·
    <a href="https://github.com/nasawz/niceup/issues">报告 Bug</a>
    ·
    <a href="https://github.com/nasawz/niceup/issues">特性建议</a>
  </p>
</p>

## 开发者信息

本应用由nasawz开发提供

微信: wangzhe127

## 部署

本项目基于腾讯开源项目 [CloudBase Framework](https://github.com/Tencent/cloudbase-framework) [![star](https://img.shields.io/github/stars/Tencent/cloudbase-framework?style=social)](https://github.com/Tencent/cloudbase-framework) 开发部署，支持一键云端部署。

[![](https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https%3A%2F%2Fgithub.com%2Fnasawz%2Fniceup&branch=master)

### 配置

查看[配置详解](https://nice-9goo8zpofac7bee9-1304765945.tcloudbaseapp.com/docs/install/environment_help.html)

- ENV_ID 您的云开发环境 Id
- administratorName 管理员账户名，账号名长度需要大于 4 位，支持字母和数字
- administratorPassword 管理员账号密码，8~32位，密码支持字母、数字、字符、不能由纯字母或存数字组成
- deployManagePath 管理端部署路径，如 /manage/，建议使用根路径 /
- private_key_id 自定义登录密钥ID
- private_key 自定义登录密钥Key
- mini_appid 小程序ID
- mini_privateKey 小程序密钥
- mini_pub_privateKey 小程序发布密钥(Base64后)


## 开发

你也可以下载项目后，使用 [CloudBase CLI](https://docs.cloudbase.net/cli-v1/intro.html) 在终端中一键部署。

```
npx @cloudbase/cli framework deploy -e 环境id
```

- /cloud/functions  云函数目录
- /manage  管理端源码目录
- /mini    小程序源码目录

## 界面截图

- [管理端界面](https://nice-9goo8zpofac7bee9-1304765945.tcloudbaseapp.com/docs/screenshot/manage.html)
- [小程序界面](https://nice-9goo8zpofac7bee9-1304765945.tcloudbaseapp.com/docs/screenshot/mini.html)

## 技术栈

- ❤️ React
- ❤️ Taro
- ❤️ TypeScript
- ❤️ Node.js + [CloudBase](https://cloudbase.net)

## 使用案例

<table>
  <tr>
    <td align="center">
    <a href="https://space.bilibili.com/28469448">
      <img src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/gh_e9d13050155d_344%20(2).jpg" width="100px;" alt="享瘦灵食岛"/>
      <br /><sub><b>享瘦灵食岛</b></sub></a>
    </td>
  </tr>
</table>

## 注意事项

1. <span style="color:red;">云开发必须是由小程序端创建</span>
2. <span style="color:red;">云开发必须开通按量付费模式</span>
3. 使用支付功能需要在微信开发者工具中绑定商户号并且对退款API进行授权


## 参考文档

- [用户手册](https://nice-9goo8zpofac7bee9-1304765945.tcloudbaseapp.com/docs/guide/login.html)
- [配置详解](https://nice-9goo8zpofac7bee9-1304765945.tcloudbaseapp.com/docs/install/environment_help.html)
- [CloudBase Framework 文档](https://docs.cloudbase.net/framework/)
- [Taro文档](https://taro-docs.jd.com/)
- [VantUI组件库](https://vant-contrib.gitee.io/vant-weapp/#/intro)

## Licence

开源协议文档请参阅 [LICENSE](./LICENSE)
