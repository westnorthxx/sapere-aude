关于 `-r` 选项具体起一个什么作用，可以看以下例子

使用 `rm -ri ./copy/` 命令删除一个目录，看看电脑在做什么
```bash
zhoux@westnorth:~/linux_practice/files$ rm -ri copy
rm: descend into directory 'copy'? y
rm: remove regular empty file 'copy/2021.matrix'? y
rm: remove regular empty file 'copy/xb.R1.fastq'? y
rm: remove regular empty file 'copy/xb.R2.fastq'? y
rm: remove regular empty file 'copy/xb.scRNA.fastq'? y
rm: remove regular empty file 'copy/2022.matrix'? y
rm: remove directory 'copy'? y
```
可见，先询问是否进入目录，再依次删除文件，最后清除空目录，即如下逻辑
- 如果是目录，则进入
- 如果是空目录，则删除
- 如果文件，则删除