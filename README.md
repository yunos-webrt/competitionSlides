competitionSlides
=================

云os首届html5应用开发大赛宣讲ppt

使用方法：

1. 克隆代码

2. 进入到[pptfolder]中，输入命令：npm install更新全部modules。

3. 等待更新完相关的modules后，输入命令：node app即可运行。

4. 用Chrome浏览器（必须）打开http://localhost:8080，应该可以看到ppt

5. 下面安装remote，访问[http://developer.yunos.com](http://developer.yunos.com),确保云OS手机可以成功连接，并已经打开了手机上“设置”->“启动开发者模式”。

6. 打开“工具”->“一键安装”，选择[pptfolder]\webroot\remote目录。点击“一键安装”

7. 等出现“安装至手机”提示框后，点击“安装至手机”按钮。 
8. 等待安装成功后，就可以看到手机桌面上有“幻灯遥控器”图标，点击打开。
9. 刚进入时会要求输入node服务器IP地址，可以在node服务器所在电脑上通过ipconfig或ifconfig查看。注意，要确保云OS手机和node服务器运行在一个无线网内且彼此可以正常ping通。（注意加上端口号）
