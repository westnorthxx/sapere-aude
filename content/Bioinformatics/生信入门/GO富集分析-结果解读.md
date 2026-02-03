---
created: 2026-01-22 16:26
tags:
  - 生信基础
---
### 简介
在 GO 和 KEGG 富集分析中，有 4 个评价富集程度的重要结果：
1. GeneRatio
2. BgRatio
3. RichFactor
4. FoldEnrichment

这 4 个因素共同描述了**差异表达基因集**中，不同功能基因的富集程度。为了理解这四个结果，定义如下 4 个参数：
- $k$：差异基因集中，属于某个 GO term 的基因数量，即 counts
- $n$：差异基因集中，总共有注释到 GO 数据库的基因总数
- $M$：所有基因中，属于某个 GO term 的基因数量
- $N$：背景基因中，总共有注释到 GO 数据库的基因总数

![[image-175.png|477x292]]

### 1. GeneRatio：前景比
反映了**差异基因中**，有多少比例落在某个特定功能里

$$GeneRatio = \frac{k}{n}$$

说明**差异基因中**，某功能的富集程度。
### 2. BgRatio：背景比
反映了**基因组中**，有多少比例落在某个特定功能里

$$BgRatio = \frac{M}{N}$$

这个值是用来做统计检验的**基准**，反应了基因组中该功能的富集程度。如果 GeneRatio 显著高于 BgRatio，则富集显著。
### 3. RichFactor：富集因子
RichFactor 综合了上述两个比例，是一个反映富集强度的直观指标。

$$RichFactor = \frac{k}{M}$$

反映了差异基因中某 term 基因数占基因组中某 term 基因数。在 0-1 中取值。
### 4. FoldEnrichment：富集比
FoldEnrichment 是富集强度的直观指标，说明了某 term **差异基因的富集度比基因组中的富集度**高了多少倍。

$$Fold\ Enrichment = \frac{GeneRatio}{BgRatio} = \frac{k / n}{M / N}$$

若 >1，则可以说明该功能出现了过表达；若 <1，则说明该功能受到抑制