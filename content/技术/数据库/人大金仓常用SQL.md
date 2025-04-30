---
title: 人大金仓常用SQL
tags:
  - 数据库
  - 人大金仓
---

## 导出

`./sys_dump -Usystem -T ypzs_prod.drug_dtc -Fc ypzs -f /data/backup/db/ypzs_prod20240515.dump`

`./sys_dump -Usystem -t ypzs_prod.drug_dtc -Fc ypzs -f /data/backup/db/ypzs_prod.drug_dtc20250408.dump`

## 导入
`./sys_restore -Usystem -d ypzs /root/backup/db/ypzs_prod20240515.dump

## 修改表主键字段数据类型

> 测试161966095条数据，执行51分钟。

`ALTER TABLE ypzs_prod.drug_dtc ALTER COLUMN id TYPE bigint USING id::bigint;`

`ALTER SEQUENCE ypzs_prod.drug_dtc_id_seq2 as bigint MAXVALUE 9223372036854775807;`