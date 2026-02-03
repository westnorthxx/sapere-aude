---
created: 2026-01-14 21:45
tags:
  - linux技能
---
### 简介
基因组注释文件(gff3) 中，第 9列是以 `;` 分隔的**键值对**，这类键值对需要使用 `split()` 函数进行拆分来提取

### 实例
某 gff3 的第 9 列如下，现提取 biotype 对应的内容

```text
ID=transcript:AT1G01010.1;Parent=gene:AT1G01010;Name=NAC001-201;biotype=protein_coding;tag=Ensembl_canonical;transcript_id=AT1G01010.1
```

awk 脚本如下

```awk
BEGIN {
	FS = "\t"
	OFS = "\t"
}
{
	split($9, dv_pairs, ";") # 以分号分割第9列，分隔产生数据存储进入dv_pairs数组中
	split(dv_pairs[4, biotype_pairs, "="]) # 以等号分割biotype=protein_coding，分隔产生数据存储进入biotype_pairs数组中
	print biotype[2] # 数组中第二位是biotype指向的内容
}
```

命令

```bash
zcat file.gff3 | awk -f script.awk
```