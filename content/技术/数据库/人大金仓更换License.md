---
title: 人大金仓更换License
tags:
  - 数据库
  - 人大金仓
---

1. `find -name license.dat`查看`license.dat`的所在路径；
2. 打开[数据库授权文件](https://www.kingbase.com.cn/xzzx/index.htm)，下载所需的授权文件；
3. 把新`license.dat`上传至服务器任意目录；
4. 对新`license.dat`授权，执行`chown -R kingbase:kingbase license.dat`（用什么用户安装的用户权限给到哪个用户）
5. 执行`su kingbase`切换到**kingbase**用户，把新`license.dat`覆盖旧`license.dat`；
6. 重启数据库。

https://help.kingbase.com.cn/v8/install-updata/license-information/license-information-4.html