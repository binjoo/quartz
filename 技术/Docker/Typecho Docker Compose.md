---
title: Typecho Docker Compose
tags:
  - Docker
  - Typecho
---

docker-compose.yml

```yaml
version: "3"
services:
  php:
    image: joyqi/typecho:1.2.1-php8.0-fpm
    restart: always
    environment:
      TYPECHO_SITE_URL: ${TYPECHO_SITE_URL}
      TYPECHO_DB_HOST: mysql
      TYPECHO_DB_PORT: 3306
      TYPECHO_DB_USER: ${MYSQL_USER}
      TYPECHO_DB_PASSWORD: ${MYSQL_PASSWORD}
      TYPECHO_DB_DATABASE: ${MYSQL_DATABASE}
    volumes:
      - /etc/localtime:/etc/localtime
      - ${PWD}/data/php:/app
    depends_on:
      mysql: 
        condition: service_healthy
    networks:
      - typecho_network
  mysql:
    image: mysql:5.7
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: ${MYSQL_DATABASE}
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
    ports:
      - ${GLOBAL_EXPOSE_MYSQL_PORT}:3306
    volumes:
      - /etc/localtime:/etc/localtime
      - ${PWD}/data/mysql:/var/lib/mysql
    networks:
      - typecho_network
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      timeout: 20s
      retries: 10
  nginx:
    image: nginx:1.25
    restart: always
    ports:
      - ${GLOBAL_EXPOSE_WEB_PORT}:80
      - ${GLOBAL_EXPOSE_WEB_SSL_PORT}:443
    volumes:
      - /etc/localtime:/etc/localtime
      - ${PWD}/data/php:/app
      - ${PWD}/data/nginx/html:/usr/share/nginx/html
      - ${PWD}/data/nginx/ssl:/etc/nginx/ssl
      - ${PWD}/data/nginx/logs:/var/log/nginx
      - ${PWD}/data/nginx/conf/nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - php
    networks:
      - typecho_network

networks:
  typecho_network: {}
```

.env

```ini
# Global
## http端口
GLOBAL_EXPOSE_WEB_PORT=80
## https端口
GLOBAL_EXPOSE_WEB_SSL_PORT=443
## mysql端口
GLOBAL_EXPOSE_MYSQL_PORT=3306

# Typecho
## 访问这个网址即可打开博客系统
TYPECHO_SITE_URL=http://192.168.56.201:8800

# MySQL
## 数据库root用户密码
MYSQL_ROOT_PASSWORD=***************
## 数据库名称
MYSQL_DATABASE=typecho
## 数据库账户
MYSQL_USER=typecho
## 数据库密码
MYSQL_PASSWORD=***************
```
:::