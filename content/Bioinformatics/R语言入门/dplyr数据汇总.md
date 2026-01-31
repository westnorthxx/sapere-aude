---
created: 2026-01-10 10:17
tags:
---
### 简介
dplyr 提供了功能强大的数据汇总功能 `summarize()`，类似于 `summary()`。

与 dplyr 中的其他函数配合使用可以实现便利的分组计算，如 `group_by()` 等。`group_by()` 函数可以指定 tibble 中的因子，按因子的分类进行统计。

### 描述性统计

```r
mtcars |> group_by(cyl) |> summarise(mean(mpg), sd(mpg))
```

如果 `group_by()` 内的参数不是因子，将根据相同的数字自动生成分组。

``