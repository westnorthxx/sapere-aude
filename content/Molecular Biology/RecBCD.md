### RecBCD的功能
> The RecBCD enzyme processes broken DNA molecules to generate these regions of ssDNA. RecBCD also helps load the RecA strand-exchange protein onto these ssDNA ends. In addition, as we shall see, the multiple enzymatic activities of RecBCD provide a means for cells to “determine” whether to recombine with or destroy DNA molecules that enter a cell.

[[Molecular Biology of the Gene-7th.pdf#page=386&selection=28,0,36,61|Molecular Biology of the Gene-7th, 页面 386]]


### RecBCD 的结构
#### RecB
- 3' 向 5' 解旋酶
- 核酸酶
#### RecD
- 5' 向 3' 解旋酶
#### RecC
- 识别 **Chi 位点**

### Chi 位点
- Chi 位点（Crossover Hotspot Instigator）是调控 RecBCD 活动的序列，具有方向性
- Chi 位点的作用
	- 减缓 RecBCD 的速度
	- 改变 RecBCD 的外切酶活性
	- 标记内源/外源基因
		- 外源基因由于缺乏 Chi 位点，更容易被 RecBCD 直接降解；内源基因 Chi 位点极其常见，因此更多的被重组

### RecBCD 处理双链断裂的过程
- RecBCD 结合到 DSB 位置
- RecD 从 5' 向 3'解旋，RecB 从 3'到 5'解旋
	- 被解开的双链在 RecBCD 的作用下降解
	- RecD 解旋速度快于 RecB
	- 由于速度不匹配，RecB 处积累一个 DNA 环
- RecBCD 经过 Chi 位点后，复合体暂停，再以起始速度的 1/2 重启，发生三个变化
	- **外切酶活性变化**：不再从 3‘到 5‘切割，而从 5'到 3'切割
		- 形成 3'突出端的直接原因
	- RecB 处的 DNA 突出被卷进 RecB
		- 这样更利于 RecA 的装载
	- RecB、RecD 的移动速度反转，由 RecB 主导复合体前进
- RecB 辅助 RecA 结合到单链上
	- RecB 帮助 RecA 与 SSB 相比，有更高的 ssDNA 亲和力