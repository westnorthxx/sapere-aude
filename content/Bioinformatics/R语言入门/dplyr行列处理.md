---
created: 2026-01-09 15:54
tags:
---
### 提取行 slice()
使用切片函数 `select()` 可以对 tibble 进行行提取

```r
iris |> slice(1:3) #提取1-3行
```

### 提取列 select() / pull()
使用 `select()` 和 `pull()` 可以对 tibble 进行**列提取**

```r
iris |> select(Sepal.Length)
iris |> pull(Sepal.Length)
```

注意：`select()` 返回 tibble 而 `pull()` 返回向量！

> [!important]
> 通过 `select()` 的负索引可以实现列的删除。

**更重要的，这些函数还存在变体以实现更加复杂的功能**，对 tibble 的筛选就像 SQL 或 DQL 一样。

#### where()
这个函数可以对**列的属性**进行判断，比如**数据类型**等。

**需要注意**，`where()` 函数**只接受逻辑值**。因此 `where()` 中的函数的返回值只能是**逻辑值**

```r
iris |> select(where(is.factor))
```

#### rename_with ()
这个函数可以对列名进行批量的重命名，包括大小写转换等

```r
iris |> rename_with(toupper)
```

#### contain(),  starts_with (),  ends_with
这三个函数可以对**行名**进行精确的搜索：

```r
iris |> select(starts_with("Sep"))
iris |> select(ends_with("Width"))
iris |> select(contains("tal"))
```

#### 负索引
所有函数前支持 `!` 或 `-` 进行负索引

```r
iris |> select(!starts_with("Sep"))
iris |> select(-ends_with("Width"))
```

> [!important]-
> select () 等函数的功能是极度灵活的。这里只展示了部分使用方法

### 行列增加
call back：对于一般的数据框，增加行列使用 `rbind()` 和 `cbind()`。

而在 dplyr 中可以使用 `add_row()` & `add_column()`。

更重要的，可以使用 `mutate()` 函数。`mutate()` 可以**创造或改变变量(列)**（create or transform variables）。

```r
b <- c(1:150)
iris |> mutate(NewColumn = b) #通过新变量直接增加，注意变量长度需要匹配

iris |> mutate(Sepal.Length = b) #更改旧列
iris |> mutate(Sepal.Length.2 = Sepal.Length * 2) #在旧列基础上通过运算新增一列
iris |> mutate(Sepal.Length = Sepal.Length * 2) #直接改变原有列
```