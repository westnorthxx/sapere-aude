### 引入
为模拟生信中常见的工作环境，在  `~/linux_practice/files` 目录下使用 `touch` 创建一系列不同拓展名的文件，如下
```bash
zhoux@westnorth:~/linux_practice/files$ ls -lh
total 0
-rw-r--r-- 1 zhoux zhoux 0 Dec  4 08:32 2021.matrix
-rw-r--r-- 1 zhoux zhoux 0 Dec  4 08:32 2022.matrix
-rw-r--r-- 1 zhoux zhoux 0 Dec  4 08:32 scRNA.script.R
-rw-r--r-- 1 zhoux zhoux 0 Dec  4 08:32 script.R
-rw-r--r-- 1 zhoux zhoux 0 Dec  4 08:33 script.r
-rw-r--r-- 1 zhoux zhoux 0 Dec  4 08:33 train1.md
-rw-r--r-- 1 zhoux zhoux 0 Dec  4 08:33 train2.md
-rw-r--r-- 1 zhoux zhoux 0 Dec  4 08:31 xb.R1.fastq
-rw-r--r-- 1 zhoux zhoux 0 Dec  4 08:31 xb.R2.fastq
-rw-r--r-- 1 zhoux zhoux 0 Dec  4 08:31 xb.scRNA.fastq
```

> [!question]
> 如何一次列出所有. fastq 文件？

使用*通配符* 即可一次列出所有. fastq 文件，如下
```bash
zhoux@westnorth:~/linux_practice/files$ ls *fastq
#此处的*就是 通配符
xb.R1.fastq  xb.R2.fastq  xb.scRNA.fastq
```

---

### 通配符
通配符也可以叫做万能字符，万能牌（直译），用于**匹配文件名**，这是它与[[正]]

通配符含义汇总如下表

| 通配符      | 含义                | 解释                           |
| -------- | ----------------- | ---------------------------- |
| *        | 匹配**任意字符** *任意次*  | \*在搜索式中代表任意个字符               |
| ？        | 匹配**任意字符**一次      | ？在搜素式中代表一个字符                 |
| \[abc\]  | 匹配 abc 中一个字母一次    |                              |
| \[a-z\]  | 匹配**小写字母**中一个字母一次 |                              |
| \[A-Z\]  | 匹配**大写字母**中一个字母一次 |                              |
| \[0-9\]  | 匹配**任一数字**一次      | \[012\]为 0，1，2 三个数字匹配一次，举一反三 |
| \[^0-9\] | 不匹配括号中的内容         |                              |
对同样的目录，实例如下
#### \* 、？
```bash
zhoux@westnorth:~/linux_practice/files$ ls *matrix
2021.matrix  2022.matrix
# * 在此处代表2021. or 2022.
zhoux@westnorth:~/linux_practice/files$ ls 202?.matrix
2021.matrix  2022.matrix
# ? 在此处代表 1 or 2
zhoux@westnorth:~/linux_practice/files$ ls 20??.matrix
2021.matrix  2022.matrix
# ?? 在此处代表 21 或 22
```
#### \[abc\]、\[a-z\]、\[A-Z\]
```bash
zhoux@westnorth:~/linux_practice/files$ ls [rst]*
# 通配符在此处的含义为：以[rst]三个字母之一开头（因为只匹配一次）的所有文件（因为*覆盖了任意字符任意次）
scRNA.script.R  script.R  script.r  train1.md  train2.md

zhoux@westnorth:~/linux_practice/files$ ls script.[A-Z]
script.R
# [A-Z]匹配所有大写字母
zhoux@westnorth:~/linux_practice/files$ ls script.[a-z]
script.r
# [a-z]匹配所有小写字母
```
#### 取反符号 ^
```bash
zhoux@westnorth:~/linux_practice/files$ ls -l [^a-z]*
-rw-r--r-- 1 zhoux zhoux 0 Dec  4 08:32 2021.matrix
-rw-r--r-- 1 zhoux zhoux 0 Dec  4 08:32 2022.matrix
```
> [!important]
> 对于取反符号
> - \[^0-9\]* 意味不由数字开头，即以字母为开头
> - \[a-z\]* 意味不由小写字母开头，即以**大写字母、数字为开头**
> 取反是针对所有 string 的

---
> [!summary]
> 总结:: 通配符是文件名索引中的“万能符”