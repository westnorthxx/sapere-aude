### 直接读入 (最常用)
使用 readr 包读入的表格都是 tibble 结构的。readr 是另一个 [[Tidyverse]] 的核心包。

注意 readr 包的函数使用 `_` 而非 `.`

```r
read_csv("mtcars.csv")
```

### tibble()
使用 `tibble()` 函数可以使用**两个向量**创建 tibble，类似[[创建数据框]]。

### 数据结构转换
`as_tibble()` 可以直接将数据框等数据转换为 tibble。注意转换后默认行名会丢失。

使用 `rownames_to_colum()` 函数将行名添加至第一列，再进行转换可以保留行名，虽然一般情况下用不上。

```r
as_tibble(iris)
as_tibble(rownames_to_colum(mtcars))
```
