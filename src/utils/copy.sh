#!/bin/sh
cd  /Users/huangzhongyuan/learn/node-bk/logs
# 拷贝 access.log => 2022.11.12.access.log
cp access.log $(date +%Y-%m-%d).access.log
# 清空文件内容
echo "" > access.log


/Users/huangzhongyuan/learn/node-bk/src/utils/copy.sh