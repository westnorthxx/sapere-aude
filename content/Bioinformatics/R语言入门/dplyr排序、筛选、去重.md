---
created: 2026-01-10 09:34
tags:
---
### 排列
dplyr 包提供的排序语法更加直接排序语法

```r
mtcars |> arrange(cyl, desc(mpg)) |> print(n = 32)
```

### 去重
dplyr 中使用 `unique()` 的近义词 `distinct()` 进行去重

```r
#生成有重复tibble
df <- tibble(
+   x <-sample(1:10, 100, replace = TRUE),
+   y <-sample(1:10, 100, replace = TRUE))
```

去重，只输出去重的列；或者同时进行多个去重.

```r
df |> distinct(x)
df |> distinct(x)
```

去重，保留未修改的列。

```r
df |> distinct(x, .keep_all = TRUE)
```

### 筛选
使用 `filter()` 可以进行筛选。这与 `select()` 功能看起来存在相似性，但有以下不同：
- `filter()` 对**每列的值进行处理**
- `select()` 对**列名**进行处理

```r
starwars |> filter(sex = "male") |> relocate(sex, .after = name)
```

注意受用 `relocate()` 函数可以将列（此处为重排序的列）移动至更便于阅读的位置