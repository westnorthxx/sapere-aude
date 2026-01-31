### 分类
R 自带的文件格式分为以下两类
1. **RDS**，R Data Set，存储单个数据集
2. **RData**，存储多个数据集，也存储 workspace imagery，即当前 environment 中的所有数据集

![[image-62.png]]

### 使用 R 内置文件格式的原因
尽管有 xlsx，csv 等多种文件格式，但 R 自带的文件格式有如下几种有点
1. 文件体积小
2. 便于分享使用

### 使用方法
使用 `save` 函数可以将数据集保存为 RDS 与 RData 格式
```r
save(a, file = "a.rds")
save(a, b, file = "a.RData")
```

使用 `read.rds` 和 `load` 函数可以读取和加载 RDS 与 RData 格式
```r
x <- readRDS("a.rds")
load("a.RData")
```
