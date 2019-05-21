一，安装git
https://git-scm.com/downloads

二，配置git
git config --global user.name "your name"
git config --global user.email "your email"

三，到GitHub上创建Repository


四，创建本地分支
参见：https://baijiahao.baidu.com/s?id=1621628813408131040&wfr=spider&for=pc
git clone 项目地址
git checkout -b dev  分支名dev
	git branch dev
	git checkout dev

五，添加修改，也叫stage changed
git add GitHub.md

六，提交注释
git commit -m "update xxx"

七，推送分支，指定被推送的分支名
git push origin dev   分支名dev

八，合并指定分支到当前分支
git merge dev 将分支名dev合并到当前分支 
git merge master 将分支名master合并到当前分支 

九，更新到最新
git pull