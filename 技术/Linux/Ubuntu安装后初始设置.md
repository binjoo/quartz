---
title: Ubuntu安装后初始设置
tags:
  - Ubuntu
---

## 配置Root用户

```bash
$ sudo passwd root
New password:       # 此处输入 root 用户的登录密码（新设置密码）
Retype new password:    # 此处再次输入 root 用户的登录密码（确认与上面的密码输入一致）
passwd: password updated successfully
```

## 开启Root用户远程登录权限

```bash
$ vim /etc/ssh/sshd_config  # 编辑sshd_config文件
```

1. 按下`/`键，输入`PermitRootLogin`，回车。
2. 找到`PermitRootLogin`这一行，将`prohibit-password`改为`yes`。
3. 按下`Esc`键，输入`:wq`，回车。

```bash
$ service ssh restart  # 重启ssh服务
```

## 删除安装时的用户

首先需要退出需要删除的用户，否则会提示用户存在进程。 
```bash
$ pkill -u <username>  # 强制删除用户
$ userdel -r <username>  # 删除用户及目录
```

## 修改时区

```bash
$ timedatectl set-timezone Asia/Shanghai  # 设置时区为上海
```

## 修改镜像源

```bash
$ vim /etc/apt/sources.list.d/ubuntu.sources  # 编辑ubuntu.list文件
```

将`http://cn.archive.ubuntu.com/ubuntu/`替换为`https://mirrors.tuna.tsinghua.edu.cn/ubuntu`。

```bash
apt update  # 更新软件包列表
apt -y upgrade  # 升级软件包
```