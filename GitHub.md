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

五，添加修改
git add GitHub.md

六，推送分支，指定被推送的分支名
git push origin dev   分支名dev

七，合并指定分支到当前分支
git merge dev 将分支名dev合并到当前分支 
git merge master 将分支名master合并到当前分支 