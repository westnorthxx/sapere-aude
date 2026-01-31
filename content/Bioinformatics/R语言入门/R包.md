### R 包是什么？
R 本身就由基础包和扩展包构成

一个 R 包中有：
- 函数
- 帮助文档
- 示例数据（maybe）
- 描述信息

R 包分为两类
- 源代码（source），`tar.gz`
- 二进制（binary），`zip` ，由源代码编译而来
> [!hint]
> Linux 和软件，R 和 R 包，conda 和 Bioconductor

### R 包的安装位置
使用 `.libPath` 可以查看 R 包安装的位置

一般在 R 安装目录的 library 文件夹

### R 包的安装
使用 `install.pakages("")` 命令可以进行包的安装，注意引号和大小写

使用 `lib` 选项可以指定包的安装路径
```r
install.packages("vcd", lib ="C:/Users/zhoux/Desktop/Rpacks")
```

用 `c()` 标识合集后，可以一次安装多个包
```r
install.packages(c("tidyr","dplyr","vcd"))
```
### R 包的加载
使用 `library()` 可以进行 R 包的加载

由于此时 R 包已经被下载，进行加载后不需要引号

### R 包的管理
R 包管理包括安装和删除
```r
remove.packages()
update.packages()
detach（"package:name", unload = TRUE）
find.package()
```
### R 包帮助信息的获取
`help()` 可以查看包的帮助
```r
help(package="name")
```
当然，包的官方网站也将给出重要的帮助