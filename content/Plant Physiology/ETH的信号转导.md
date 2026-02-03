> [!tips]
> 和大多数植物生长物质一样，ETH 的信号转导服从抑制-抑制的规律。本文档信号通路以*A. thaliana* 为例
### 信号转导组分
#### 受体
ETH 受体是一种**ER膜蛋白**，该家族中有多个基因，不同受体可对不同量乙烯在不同时间做出反应

ETH 与受体的结合需要如 $\ce{Cu^2+}$ 等金属离子的存在

*A. thaliana* 的 ETH 受体称为 **ETR** 家族，分为两个亚家族共 5 个组分
- Subfamily 1
	- ETR1
	- ERS1
- Subfamily 2
	- EIN4
	- ETR2
	- ERS2

> [!warning]
> ETH 受体的定位在**内质网膜**上，这是少见的


#### 信号传递组分
##### CTR1
CTR1 是位于 ETR1 下游的**负调控**因子。这是一种类 Raf 蛋白，通过磷酸化下游底物起到**抑制** ETH 生理效应的作用
##### EIN2
EIN2 是 CTR1 下游的第一个**正调控**因子。EIN2 同样定位在**内质网膜**上，通过质膜侧 C 端的剪切来传递信号。在 CTR1 活化状态下，EIN2 被磷酸化，无法被剪切
##### EIN3
EIN3 是定位在**核**中的 TF，一般无 ETH 时被泛素化降解，可以激活 ETH 响应基因的表达
##### ERF1
ERF1 也是一种 TF，受 EIN3 激活，可以激活 ETH 响应基因的表达

### 无 ETH 时
1. 无 ETH 时，ETR1 激活 CTR1
2. 激活的 CTR1 磷酸化 EIN2
3. 磷酸化的 EIN2 C 端无法被剪切，不入核
4. 核中的 EIN3 被泛素化降解，无 ETH 响应

### 有 ETH 时
1. 有 ETH 时，ETR1 与 ETH 结合变构，导致 CTR1 失活
2. EIN2 不再被磷酸化，C 端被剪切并入核
3. 入核的 EIN2 抑制 EIN3 的泛素化降解，并结合 EBF1/EBF2 mRNA 的 3'-UTR，这同样抑制 EIN3 的泛素降解途径
4. EIN3 激活部分 ETH 响应基因，同时激活 ERF1，进一步激活其他 ETH 响应基因

### A picture is worth  a thousand words
![[image-70.png]]

![[image-71.png]]