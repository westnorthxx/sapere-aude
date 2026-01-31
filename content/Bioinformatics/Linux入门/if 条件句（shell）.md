if 语句的基本语法如下所示

```bash
#!/bin/bash
if (condition)
then
	statements
elif
	statements
elif
	statements
else
	statements
fi
```

如下例子

```bash
if (($1<$2)) #注意判断式要单独用括号括起来
then
    echo "good afternoon xibei, it's cold here buddy!!"
else
	echo "good evening, brother!"
fi
```