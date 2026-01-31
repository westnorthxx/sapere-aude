如果掌握了本章内容，[[压缩]]中的内容就可以忘记了
### `tar` 命令
`tar` ，即 tap archive，有多个常用的选项，如下表

| 选项   | 含义         |
| ---- | ---------- |
| `-c` | 简历新文件      |
| `-v` | 显示详细信息     |
| `-f` | 指定文件       |
| `-x` | 解包         |
| `-z` | 压缩为 `.gz`  |
| `-j` | 压缩为 `.bz2` |
#### 简单打包
使用 `-cvf` 选项，简单打包将不会进行压缩，可能没什么用

> [!important]
> 注意先写新生成文件名，再写源文件名


```bash
zhoux@westnorth:~/linux_practice$ tar -cvf ./compress.tar ./compress/
./compress/
./compress/tbc.1.txt
./compress/tbc.1.txt.zip
./compress/tbc.copy.txt
./compress/compress.pack
./compress/tbc.txt
```

#### 压缩为 `.gz`
使用 `-z` 可将打包压缩为 `.gz` 文件
```bash
 tar -cvzf compress.tar compress/
```

#### 压缩为 `.bz2`
使用 `-j` 可将打包压缩为 `.bz2` 文件
```bash
tar -cvfj compress.tar compress/
```
#### 解包
使用 `-x` 可以进行解包