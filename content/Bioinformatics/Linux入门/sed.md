`sed` 意为*stream editor*，是 Linux 中强大的轻量文本编辑器，与 [[vim编辑器]]不同，它操作更加迅速，甚至有时不用打开文件

`sed` 命令的基本语法如下，需要注意 action 的选择

```bash
sed -options 'action' filename.txt
```

本节测试内容选择以下测试序列文件

![[seq.fa]]

### 选项
`sed` 重点在 action，选项较少

`-n` 选项将仅输出 `sed` 处理后的内容，如下

```bash
sed '2p' seq.fa|cat -n #可看见在全部内容被打印的同时，第二行被输出了两次
sed -n '2p' seq.fa #将只输出第二行
```

`-i.bak` 选项可以将 `sed` 处理后的结果覆写进如源文件，同时进行备份

> [!warning]
> 需要覆盖时，永远要使用 `-i.bak`

### 行动
#### 打印
`‘n,mp’` 可以选定打印某一行，注意 `-n` 选项

```bash
sed -n '2,5p' seq.fa #输出2至5行
```

#### 添加
`‘na something’` 可以在某一行**后**加入特定内容

```bash
sed '2a >newgene' seq.fa #在第二行后加入>newgene
```

若想要一次加入多条信息：
- 推荐直接换行

```bash
sed '2a >newgene \nATGGGCATG' seq.fa
#\n表示进行一个回车
```

#### 插入
`‘ni something’` 可以在某一行**前**加入特定内容，*就是在行前添加*

支持换行的操作

```bash
sed '3i >newgene \nATGGGCATG' seq.fa
#效果和'2a'完全一致
```

> [!tips]
> `sed` 命令中，对于字符串的操作都遵循如下结构
> `行动字母/(字符串或regex)/（字符串或regex）/行动字母`，比如
> - `s///g`：替换
> - `//d`：删除
#### 替换
`'nc something'` 可以将某行替换为新的内容

```bash
sed '35c xibeiweloveyou' seq.fa 
#将第35行内容替换为xibeiweloveyou
```

#### :LiCat:替换字符串
这是 `sed` 命令中难度较高的部分，结合[[正则表达式]]可以实现灵活的替换

字符串替换的语法与 [[vim编辑器]]中的存在一定相似

对全局进行替换， `'s/old/new/g'` 可以实现

```bash
sed 's/Traes/wheat/g' seq.fa
#将Traes替换为wheat
```

对于具体行的替换，同样相当简单：
- `'ns/old/new/g'` 可以实现对*某行* 的替换
- `'n,ms/old/new/g'` 可以实现对*某行至某行* 的替换
- `'n,m!s/old/new/g'` 可以实现对*非某行至某行* 的替换

对于**特定字符**的**一一替换**，而非整段匹配后替换， `y/old/new/` 可以实现
例如，进行一个互补链的生成

```bash
sed '3y/ATCG/TAGC/' seq.fa
#将第三行进行互补
```

> [!important]
> 在 `y//` 模式下，不用写最后一个 g。因为 `y//` 总是全局 (`g`) 的，即替换所有匹配项目

#### 删除
对于整行的删除，可以删除指定行号的行或使用 d 动作删除有匹配内容的行

```bash
sed '5d' seq.fa #指定删除行
sed '/Traes/d' seq.fa #删除匹配有Traes的行
```

对于字符的删除，采用的其实是*替换*思路

```bash
sed 's/Traes//g' seq.fa
```

#### 串联行动
使用 `;` 可以连接多个进行连接，例如先替后写入等等