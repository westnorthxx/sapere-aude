`awk` 为三位开发者名字的首字母，是文本处理的重要工具

基本格式如下

```bash
awk [选项] '匹配规则{执行命令}' 文件名
```

其中 `'匹配规则{执行命令}'` 可以通过脚本文件传入

对列的指定依靠
> [!important]
> 注意单引号和执行命令的双引号

### 选项
#### 指定分隔符
`awk` 默认的分隔符是**空格**和**tab**，这点和 [[文本切分|cut]] 命令相同

`-F` 选项可以对分隔符进行指定

```bash
awk -F, {print $2} file.csv
#处理csv文件时，指定逗号为分隔符
```

### 行动
#### 打印
使用 print 命令可以打印特定的列，这与 [[文本切分|cut]] 命令不同在默认情况下，打印出的两行**没有分隔符**

printf 与 print 类似，但在输出后**不进行换行**, 可以用来使输出格式更加灵活

```bash
awk -F, '{print $1 $3}' test.csv #打印第1、3列
awk -F, '{print $0}' test.csv #打印整个文件
awk -F, '{printf $1","$3"\n"}' test.csv #打印第1、3列，使用,分隔并换行
```

#### BEGIN 与 END
`BEGIN` 命令可以在处理**任何输入前先**执行一些命令

例如

```bash
awk 'BEGIN{FS=","}{printf $1"\t"$2"\n"}' awk_practice.csv
awk -F,  '{printf $1"\t"$2"\n"}' awk_practice.csv
#使用BEGIN进行分隔符的指定，以上两条命令等价
```

`END` 同理，在最后执行

#### 条件语句
条件语句用法相当灵活，支持 `if`，`for` 等等，用圆括号括起来，写在执行命令的 `{}`**内部**

```bash
awk -F, '{if($1>=5)print $2 $4}' awk_practice.csv
awk -F, '{for(i=1;i<=3;i++)printf($i);print""}' awk_practice.csv #for循环可以打印中间几列的内容
awk -F, '{$1=$2="";print($0)}' awk_practice.csv #将第1，2列的内容赋值为空并打印，即删除第一和第二列
```

#### 变量
在 `awk` 命令中使用的变量有以下三种
- NR：当前处理行号
- FNR：当前文件读了多少行
	- 同时处理多个文件
- NF：**N**umber of **F**ields，当前行的**字段**总数（列数）

