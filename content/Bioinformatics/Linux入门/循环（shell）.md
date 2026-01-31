### for 循环
#### 取值列表循环
使用取值列表进行循环的方法和 python 中的 `range` 相似，基本示例如下
```bash
for i in {1..10}
do
	echo "xibei meow"
done
```

#### 计次循环
使用计次循环和的和 C 语言相似，基本示例如下
```bash
for((i=1;i<=10;i+=2))
do
	echo "xibei meow"
done
```

### while 循环
`while` 循环基本写法如下
```bash
i=0
while ((i<=100))
do
	echo "meow"
done
```

`while` 可与[[管道符]]和 `ls` 联用，连续执行 `.sh` 命令

### 循环终端
#### break
跳出循环
#### continue
跳出当前循环