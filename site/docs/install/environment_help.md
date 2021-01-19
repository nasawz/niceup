# 安装


## 环境变量
### ENV_ID

在微信小程序中开通云开发。开通成功后复制下环境ID`ENV_ID`
![image-20210114112602007](https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210114112602007.png)

### mini_appid & mini_privateKey
进入“开发管理 > 开发设置 > 开发者ID”，复制下AppID(小程序ID)、AppSecret(小程序密钥)	备用。
![image-20210114154407612](https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210114154407612.png)

### mini_pub_privateKey
进入“开发管理 > 开发设置 > 小程序代码上传”，生成小程序代码上传密钥下载，临时关闭IP白名单。使用 [小程序部署密钥转换小工具](https://framework-1258016615.tcloudbaseapp.com/mp-key-tool/)  将下载的密钥转换为base64格式的密钥信息备用。
![image-20210114183204685](https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210114183204685.png)


### private_key_id & private_key
登录腾讯云环境 选择微信公众号登录，在待选列表中选择新建的小程序。
![image-20210114113153365](https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210114113153365.png)

进入“云开发 CloudBase > 环境 > 登录授权” 下载自定义登录的私钥备用
![image-20210114152606167](https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210114152606167.png)


- administratorName 管理员账户名，账号名长度需要大于 4 位，支持字母和数字
- administratorPassword 管理员账号密码，8~32位，密码支持字母、数字、字符、不能由纯字母或存数字组成
- deployManagePath 管理端部署路径，如 /manage/，建议使用根路径 /

---

## 配置环境
用微信开发者工具打开本项目输入您自己的小程序appid，进入云开发控制台开通静态网站功能
![image-20210114175326215](https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/image-20210114175326215.png)


---

## 一键部署

**管理端**：[![](https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https%3A%2F%2Fgithub.com%2Fnasawz%2Fniceup&branch=master)

**小程序：**[![](https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https%3A%2F%2Fgithub.com%2Fnasawz%2Fniceup&branch=mini)

