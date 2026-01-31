---
created: 2026-01-11 09:58
tags:
---
### 简介
虚拟环境的概念在 conda 中已经很熟悉了，是解决版本冲突，增强项目可重复性的重要方法。

R 中实现虚拟环境的方式是使用 **renv 包**。使用 renv 创建的 project 有如下两个重要文件：
- `renv.lock`: json 格式文件，记录使用的所有包的版本信息。
- `renv` 文件夹: 安装的库将不再被存放至 R 目录下的 library/，而是存在项目文件夹下的 library/

对没有使用 renv 创建的项目，安装并导入 renv 包后，使用如下命令可以开启 renv。

```r
library(renv)
init() #
```

### 包管理
#### 安装 packages
直接使用 renv 进行包的安装会更加便利

```r
renv::install("tidyverse@2.0.0") #版本指定
renv::install("bioc::Biobase") #指定安装频道（bioconductor）
```

#### 记录 packages
记录包版本号及依赖关系使用 `snapshot()` 函数，**这是相当重要的函数**！数据将写入前述 `renv.lock` 函数。

```r 
renv::snapshot(type = 'all') #记录library中的所有包
renv::snapshot(type = 'implicit') #记录正在使用的包
```

#### 恢复(批量导入) packages
将 `renv.lock` 文件拖入一个新的项目目录时，使用 `restore()` 可以批量下载 `renv.lock` 文件中记录的所有包。

```
renv::restore()
```