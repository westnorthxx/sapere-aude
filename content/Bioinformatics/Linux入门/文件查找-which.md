`which` 命令可以查找**命令**的路径

可以快捷的检查 R 包等环境的配置

```bash
zhoux@westnorth:~$ which which
/usr/bin/which
#定位自己
```

which 不能定位作为[[别名]]的命令
```bash
which cd
#无输出结果
```