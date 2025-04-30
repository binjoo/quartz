---
title: Docker镜像导入导出
tags:
  - Docker
---
## 导出单个镜像

```bash
docker save -o <文件路径> <镜像名称>:<标签>
```

## 导出多个镜像

```bash
docker save -o <文件路径> <镜像名称>:<标签> <镜像名称>:<标签>
```

## 导入镜像

```bash
docker load -i <文件路径>
```