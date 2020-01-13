#! /bin/bash
echo "shell 传递的参数实例"
echo "第一个参数是:$1"
echo "一共有$#个参数"
echo "这些参数分别是:$*"
echo "这些参数用双引号的方式打印出来$@"
echo "当前脚本运行的进程ID号:$$"

