> [!important]
> 文件查找的三个关键命令 `find`、`locate` 和 `which`

### `find` 命令
#### 基本语法
和一般语法不同，`find` 命令语法如下
```bash
find [pathnames] [expression] [action]
```
1. 参数
	1. pathnames 为搜索起始的绝对/相对路径，`find` 参数在选项前面哦
2. 选项：expression
	1. expresssion 即[[布尔逻辑表达式]]，默认是 `AND` 的关系
3. 选项：action
	1. 文件被定位后的操作，默认是满足的路径输出至终端、

#### `-name` 选项
`-name` 可以匹配文件名

例如，在 `~/findxb/` 下搜索. md 文件
```bash
find ~/findxb/ -name '*'.md
#注意通配符需要使用''，路径为搜索的范围
```

#### `-ls` 选项
和 `ls -l` 命令很相似，用长信息列表输出搜索结果
```bash
find ~/ -name '*'.md -ls
#在家目录下搜索.md文件，并以列表输出
```

#### `-size` 选项
`-size` 可以匹配文件大小，规则如下
```bash
find ~/ -size +1 #匹配大于1个512字节（0.5k）的数据
find ~/ -size -1 #匹配大于1个512字节（0.5k）的数据
```
- 符号：大于，小于或等于
- **单位**：大小为 512 字节的数据块
- 数字：N 倍单位

#### `-type` 选项
`-type` 可以查找文件类型
- `d` 目录
- `f` 文件

#### time 选项
time 包括 `atime` 访问时间，`ctime` 创建时间，`mtime` 修改时间，和 dataview 是一样的
```bash
find ~/ -ctime +1
```
- 符号：大于、小于或等于
- 数字：天数（支持小数）

#### `-exec` 选项
`-exec` 选项将为查找到的所有文件执行指定命令，`{} 、；` 的写法相当诡异

有点像[[管道符]]
```bash
find ~/ -name '*'.md -exec rm {} \;
```

`-ok` 与 `-exec` 相似，但是在执行前会进行询问
> [!tips]
> 别忘了[[重定向]]于[[管道符]]和 `find` 的联用