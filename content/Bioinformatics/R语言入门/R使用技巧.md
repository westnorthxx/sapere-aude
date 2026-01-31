---
created: 2026-01-11 15:00
tags:
---
### 赋值 + 打印
使用 `()` 包裹赋值语句相当于简写了一个 `print()` 函数。可以在赋值后直接打印变量，即时检查赋值情况。

```r
(a <- runif(10))
```

### 包目录增减

```r
.libPath() #获取目录
.libPath(new = c(.libPath, "path/to/new"))
```

### 包迁移
通过 . RData 文件的加载和循环的构建，可以利用包名列表快速实现包在设备间的迁移：

```r
#老
old_list <- unname(installed.packages()[ , 1])
save(old, 'old_list.Rdata')

#新
load("old_list.Rdata")
new_list <- unname(installed.packages()[ , 1])
for (i in setdiff(old_list, new_list)) {
	install.packages(i)
}
```

注意 `unname()` 函数可以清除 `installed.packages()` 返回的矩阵的行名。

使用 [[R虚拟环境]]可能更加便利。

### 查看包内的函数
查看包内函数结合帮助文档可以快速定位帮助资源。

```r
ls(package:pheatmap)
```

此前，`ls()` 用作查看变量列表。如果使用 ai，该功能可能没有意义。

### from import
包名 `::` 函数名的方式可以在不加载包的时候单独引用包里的一个函数。常用于 renv 包和 BiocManager 包

```r
renv::init()
BiocManager::install("DESeq2")
```

### example()
`example()` 函数可以自动执行帮助文档中的示例，有助于学习和理解。比直接阅读帮助文档更具有交互性。

```r
example(pheatmap)
```

### 快速获取选项参数
帮助文档往往显得过长，使用 `args()` 函数可获取选项参数

```r
args(pheatmap)
```