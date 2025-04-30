---
title: 安装Nginx并配置自动启动
tags:
  - Nginx
---

> 操作系统：CentOS 7.6

## 下载

下载页面：[http://nginx.org/en/download.html](http://nginx.org/en/download.html)

选择合适的版本进行下载，推荐`Stable version`。

```shell
wget http://nginx.org/download/nginx-1.26.2.tar.gz
```

## 安装

```shell
yum install -y gcc-c++ pcre pcre-devel zlib zlib-devel openssl openssl-devel
```

```shell
tar -zxvf nginx-1.26.2.tar.gz -C /usr/local
```

```shell
cd /usr/local/nginx-1.26.2/
```

```shell
./configure --without-http_gzip_module --with-http_sub_module --with-http_stub_status_module --with-http_ssl_module
```

```shell
make & make install
```

## 开机启动

```shell
cd /lib/systemd/system/
vim nginx.service
```

```ini
[Unit]
Description=nginx 
After=network.target 
   
[Service] 
Type=forking 
ExecStart=/usr/local/nginx/sbin/nginx
ExecReload=/usr/local/nginx/sbin/nginx reload
ExecStop=/usr/local/nginx/sbin/nginx quit
PrivateTmp=true 
   
[Install] 
WantedBy=multi-user.target
```

```shell
systemctl enable nginx.service
```

## 命令

- `systemctl start nginx.service`启动nginx
- `systemctl stop nginx.service`结束nginx
- `systemctl restart nginx.service`重启nginx