### 简介
**Ras-MAPK 通路**绝对是重难点中的重难点。

通过 Ras 蛋白与酶联受体的作用引发 MAP 磷酸化级联反应，信号从细胞膜表面，通过一系列蛋白的磷酸化，最终传进细胞核。

几乎所有 RTKs 和细胞因子受体都能介导 Ras-MAP 激酶信号通路。
### 通路组分
Ras-MAP 通路的组分较多，需要结合各个名称的全称理解其功能与特点：

| 名称   | 英文、全称                             | 功能             |
| ---- | --------------------------------- | -------------- |
| RTK  | 受体酪氨酸激酶，receptor tyrosine kinase  | 受体             |
| Grb2 | NA                                | 接头蛋白           |
| Sos  | sons of sevenless                 | Ras - GEF      |
| Ras  | 鼠肉瘤基因，rat sarcoma                 | 单体 G 蛋白，一类原癌基因 |
| MAP  | 丝裂原活化蛋白，Mitogen-Activated Protein | 磷酸化传递体         |


### 通路传导过程
#### RTK 的激活
RTK 被激活，招募**接头蛋白**准备活化 Ras：
1. 信号分子与 RTK 结合，引发 RTK 的**二聚化**，拉近的两个 monomer 因此可以发生反应。
2. 二聚化的 RTK monomer的胞内段间发生**自磷酸化**，磷酸化位点为**接头蛋白**的募集提供了位点。
3. 接头蛋白，以 Grb2 为例，通过 *SH2* 结构域结合到 RTK 的磷酸化位点，其上的两个 SH3 位可以进一步招募 Ras-GEF

#### Ras 的激活
Ras-GEF 被**接头蛋白**招募，进而帮助 Ras 将 GDP 置换为 GTP
1. Ras-GEF，以 Sos 为例，上的 proline-rich region 结合到 Grb2 的 *SH3* 结构域，进而被招募。正确定位的 Sos 可以与 Ras 互作。
2. Sos 的 Ras-GEF 结构域催化 Ras 将 GDP 置换为 GTP，进而活化 Ras。

#### MAP 磷酸化级联反应
以活化的 Ras 为起点，依次发生的磷酸化级联反应
1. 活化的 Ras（Ras-GTP）激活 MAPKKK
2. MAPKKK 磷酸化 MAPKK
3. MAPKK 磷酸化 MAPK
4. MAPK 磷酸化靶蛋白，即效应蛋白

注意，MAPK 更类似与一个统称，在不同通路中发挥类似功能的成员都可以被视作 MAPKKK,  MAPKK et. al. 
通过**支架蛋白**，不同组分间的 MAPKKK etc. 可以独立运行，避免不必要的 cross-talk

![[image-97.png]]

> [!question]- 为什么需要MAP 级联？
> 研究证明 Ras 蛋白的活化时间相当短暂，通过MAP 磷酸化级联，可以很大程度扩大信号，并通过磷酸化阻止蛋白降解，延长信号时间

#### 信号终止
Ras 信号有若干方法进行终止：
- Ras 自身的 GTP 活性[^1]
- 磷酸酶
- MAPK 的反馈抑制

前述 *Ras* 全称为 Rat Sarcoma，即一个原癌基因。没错，Ras 的持续激活将直接导致 MAP 磷酸化级联的持续激活，进而简介导致有丝分裂持续激活，引发癌症。

*Ras* 是人类鉴定的第一个原癌基因 




[^1]: 在没有 GAP 时，Ras 等 G 蛋白也可以水解 GTP，尽管会更慢
