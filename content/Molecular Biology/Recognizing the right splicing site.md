### 识别正确的剪接位点的途径
#### 边转录边剪接
- RNAP 的 CTD 上携带着剪接相关蛋白
- 5‘剪接位点一旦被转录，相关蛋白便结合，等待 3' 剪接位点出现
- 这样，在下一给剪接位点出现前，剪接便完成了

#### 外显子定义
- **SR 蛋白**结合外显子中的 **ESE 序列**（外显子剪接增强子）
- **SR 蛋白**募集 U1 至相邻 5'剪接位点，募集 U2AF（35） 至相邻 3‘剪接位点

``` mermaid
graph LR
A[Pol II CTD Ser2-P] --> B[招募 CPSF/CstF 至新生 RNA]
B --> C[识别 PAS AAUAAA + 下游 GU/U]
C --> D[CPSF73 切割 CA 位点]
D --> E[PAP 添加初始短 polyA 尾]
E --> F[PABPN1 结合并加速延伸]
F --> G[合成 200-250 nt polyA 尾]
G --> H[核输出+翻译激活]

```

``` python
print("hello world")
```
