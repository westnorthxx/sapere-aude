---
时间: 2026-01-09
---

### 简介
对于 [[Tidyverse]] 和 [[tibble]]，一些数据处理常用 dplyr 包完成。这是一个重要的 tidyverse 核心包。

base R 中相当多的功能都能使用 dplyr 包进行替换，且语法更加简洁易懂。如下表所示：

| **dplyr 命令**                   | **Base R 命令**                                    | **注释**                     |
| ------------------------------ | ------------------------------------------------ | -------------------------- |
| `arrange(df, x)`               | `df[order(x), , drop = FALSE]`                   | 根据变量 `x` 对数据框进行**排序**      |
| `distinct(df, x)`              | `df[!duplicated(x), , drop = FALSE]`, `unique()` | 去除重复行，保留**唯一值**            |
| `filter(df, x)`                | `df[which(x), , drop = FALSE]`, `subset()`       | 根据条件 `x` **筛选**符合条件的行      |
| `mutate(df, z = x + y)`        | `df$z <- df$x + df$y`, `transform()`             | **新增**或修改列（基于现有列计算）        |
| `pull(df, 1)`                  | `df[[1]]`                                        | 提取第一列并转换为**向量**（按索引）       |
| `pull(df, x)`                  | `df$x`                                           | 提取名为 `x` 的列并转换为**向量**（按名称） |
| `rename(df, y = x)`            | `names(df)[names(df) == "x"] <- "y"`             | 修改列名（将 `x` **重命名**为 `y`）   |
| `relocate(df, y)`              | `df[union("y", names(df))]`                      | 改变列的**排列顺序**（将 `y` 移至前面）   |
| `select(df, x, y)`             | `df[c("x", "y")]`, `subset()`                    | **选取**特定的列（此处选取 `x` 和 `y`） |
| `select(df, starts_with("x"))` | `df[grepl("^x", names(df))]`                     | 按照匹配模式（如**以 x 开头**）选取列     |
| `summarise(df, mean(x))`       | `mean(df$x)`, `tapply()`, `aggregate()`, `by()`  | 对数据进行**聚合统计**（如计算平均值）      |
| `slice(df, c(1, 2, 5))`        | `df[c(1, 2, 5), , drop = FALSE]`                 | 通过行索引**切片**选取特定行           |

### 语法特征
dplyr 包有两种语法特征：
1. 函数名(tibble, option = argument, ... )
2. ! 或者使用 [[R管道]]：tibble |> 函数名()


### 使用技巧
- [[dplyr数据组成查看]]
- [[dplyr行列处理]]
- [[dplyr排序、筛选、去重]]
- [[dplyr数据汇总]]
- [[dplyr集合运算]]
