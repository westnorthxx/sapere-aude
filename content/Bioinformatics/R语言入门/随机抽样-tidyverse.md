---
created: 2026-01-10 18:36
tags:
---
### 简介
tidyverse 为二维数据的抽样提供了更简洁的语法，主要应用: 
-  `sample_n()`：按个数抽，默认抽**行**
- `sample_frac()`：按百分比抽，默认抽**行**

注意权重的设置

```r
iris |> sample_n(5)
iris |> sample_frac(0.1) #抽选10％
tibble(1:10) |> sample_frac(0.5, weight = c(0.9, rep(0.1,9)))
```