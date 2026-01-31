### `uniq` 命令
`uniq` 命令可以**清除相邻**的重复行，可以和 `sort` 联用，这是最常用的方法

```bash
sort filename | uniq -c
```

> [!important]
> 这个做法的概念是先将重复行 `sort` 到一起, 再用 `uniq` 去除重复行并进行计数

#### 行数统计
`-c` 选项（count）可以统计所有行出现**次数**

```bash
uniq -c
```

#### 只显示重复行
`-d` 选项（duplication）可以只输出重复行，与 `-c` 联用统计重复行的重复次数

#### 只显示出现一次行
`-u` 选项（unique 之 unique）可以只输出只出现一次的行

#### 忽略大小写
`-i` 选项（ignore）可以忽略大小写