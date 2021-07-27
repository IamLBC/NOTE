# <p align = "center"> Git 笔记 <font size = 4></font></p>

## 比较

> 集中式(svn)

    svn因为每次存的都是差异 需要的硬盘空间会相对的小一点  可是回滚的速度会很慢
    优点:
        代码存放在单一的服务器上 便于项目的管理
    缺点:
        服务器宕机: 员工写的代码得不到保障
        服务器炸了: 整个项目的历史记录都会丢失

## 分布式(git)

    git每次存的都是项目的完整快照 需要的硬盘空间会相对大一点
        (Git团队对代码做了极致的压缩 最终需要的实际空间比svn多不了太多 可是Git的回滚速度极快)
    优点:
        完全的分布式
    缺点:
        学习起来比SVN陡峭

## 基础

    clear ：清除屏幕
    echo 'test content'：往控制台输出信息 echo 'test content' > test.txt
    ll ：将当前目录下的 子文件&子目录平铺在控制台
    find 目录名： 将对应目录下的子孙文件&子孙目录平铺在控制台
    find 目录名 -type f ：将对应目录下的文件平铺在控制台
    rm 文件名 ： 删除文件
    mv 源文件 重命名文件: 重命名
    cat 文件的 url : 查看对应文件的内容
    vim 文件的 url(在英文模式下)
    按 i 进插入模式 进行文件的编辑
    按 esc 键&按:键 进行命令的执行
    q! 强制退出（不保存）
    wq 保存退出
    set nu 设置行号

    git config
        --system --list 系统级配置
        --global --list 系统用户配置
        --local --list  仓库配置
    git config --global user.name "lbc"
    git config --global user.email 740194688@qq.com
    git config --list

## git 原理

    git对象
        git hash-object -w fileUrl : 生成一个key(hash值):val(压缩后的文件内容)键值对存到.git/objects
    tree对象
        git update-index --add --cacheinfo 100644 hash test.txt : 往暂存区添加一条记录(让git对象 对应 上文件名)存到.git/index
        git write-tree : 生成树对象存到.git/objects
    commit对象
        echo 'first commit' | git commit-tree treehash : 生成一个提交对象存到.git/objects

    对以上对象的查询
        git cat-file -p hash       : 拿对应对象的内容
        git cat-file -t hash       : 拿对应对象的类型

    查看暂存区
    git ls-files -s


    .git/objects/06/e21bb0105e2de6c846725a9a7172f57dd1af96 workspae 项目的第一个版本(树对象)
    .git/objects/56/0a3d89bf36ea10794402f6664740c284d4ae3b test.txt 文件的第一个版本(git 对象)

    .git/objects/9d/74ec4055e0f1edc1921d749c250380ca7b5ebd workspae 项目的第二个版本(树对象)
    .git/objects/c3/1fb1e89d8b6b3ef34cdb5a2f999d6e29b822ba test.txt 文件的第二个版本(git 对象)
    .git/objects/ea/e614245cc5faa121ed130b4eba7f9afbcc7cd9 new.txt 文件的第一个版本(git 对象)

## 操作流程

> git 底层操作流程

    创建工作目录 对工作目录进行修改
    git add ./
        git hash-object -w 文件名(修改了多少个工作目录中的文件 此命令就要被执行多少次)
        git update-index ...
    git commit -m "注释内容"
        git write-tree
        git commit-tree

> git 高层命令(CRUD)

    git init              初始化仓库
    git status            查看文件的状态
    git add ./            将修改添加到暂存区 并开始跟踪track
    git add -A 提交所有变化
    git add -u 提交被修改(modified)和被删除(deleted)文件，不包括新文件(new)
    git add . 提交新文件(new)和被修改(modified)文件，不包括被删除(deleted)文件
    git commit            注释多时，开启vim编辑器，# 为注释信息
    git commit -a         所有跟踪过的文件暂存起来一并提交，跳过add步骤
    git commit -a -m 注释 将暂存区提交到版本库
    怎么撤回commit？？？？？

    git diff            可以查看工作区和暂存区的区别
    git diff --staged   可以查看暂存区和分支的区别(1.6.1以上)
    git diff --cached   可以查看暂存区和分支的区别
    git diff HEAD -- <file> 可以查看工作区和版本库里面最新版本的区别

    git log --oneline   查看提交的历史记录
    git log --graph     查看分支合并图
    git log -p filename 查看某个文件的提交日志
    git log --oneline --decorate --graph --all : 查看整个项目的分支图
    git log             查看提交日志
    git reflog          查看命令历史
    配别名 多个单词加双引号
    git config --global alisas.lol "log --oneline --decorate --graph --all"

    git rm 文件名       删除工作目录中对应的文件 再将修改添加到暂存区
    git mv 原文件名 新文件名  将工作目录中的文件进行重命名 再将修改添加到暂存区

## 分支

    分支的本质其实就是一个提交对象!!!
    HEAD:
        是一个指针 它默认指向master分支 切换分支时其实就是让HEAD指向不同的分支
        每次有新的提交时 HEAD都会带着当前指向的分支 一起往前移动
    git branch                    查看分支列表
    git branch -v                 查看当前分支指向的最后一次提交
    git branch name               在当前提交对象上创建新的分支
    git branch name commithash    在指定的提交对象上创建新的分支
    git checkout name             切换分支
    git branch -d name            删除空的分支 删除已经被合并的分支
    git branch -D name            强制删除分支
    git checkout -b name          创建并切换到分支

    合并分支         : git merge branchname
        快进合并 --> 不会产生冲突
        典型合并 --> 有机会产生冲突
        解决冲突 --> 打开冲突的文件 进行修改 add commit

    查看分支列表 : git branch
    查看合并到当前分支的分支列表: git branch --merged
        一旦出现在这个列表中 就应该删除
    查看没有合并到当前分支的分支列表: git branch --no-merged
        一旦出现在这个列表中 就应该观察一下是否需要合并

    在分支上的工作做到一半时 如果有切换分支的需求, 应该将现有的工作存储起来
        git stash : 会将当前分支上的工作推到一个栈中
        分支切换  进行其他工作 完成其他工作后 切回原分支
        git stash apply : 将栈顶的工作内容还原 但不让任何内容出栈
        git stash drop  : 取出栈顶的工作内容后 就应该将其删除(出栈)
        git stash pop   : git stash apply +  git stash drop
        git stash list : 查看存储

## 后悔药

    工作区
        如何撤回自己在工作目录中的修改 : git checkout --filename
    暂存区
        如何何撤回自己的暂存  : git reset HEAD filename
    版本库
        如何撤回自己的提交    : git commit --amend
            1.注释写错了,重新给用户一次机会改注释

## reset 三部曲

    git reset --soft commithash    ---> 用commithash的内容重置HEAD内容
    git reset [--mixed] commithash ---> 用commithash的内容重置HEAD内容 重置暂存区
    git reset --hard commithash    ---> 用commithash的内容重置HEAD内容 重置暂存区 重置工作目录

    git log    :
    git reflog : 主要是HEAD有变化 那么git reflog就会记录下来
    三部曲
        第一部： git rest --soft HEAD~  (--amend的实现)
            只动HEAD (带着分支一起移动)
        第二部: git reset [--mixed]   HEAD~
            动HEAD   (带着分支一起移动)
            动了暂存区
        第三部:  git reset --hard  HEAD~
             动HEAD   (带着分支一起移动)
             动了暂存区
             动了工作目录

### 路径 reset

    所有的路径reset都要省略第一步!!!
        第一步是重置HEAD内容  我们知道HEAD本质指向一个分支 分支的本质是一个提交对象
        提交对象 指向一个树对象 树对象又很有可能指向多个git对象 一个git对象代表一个文件!!!
        HEAD可以代表一系列文件的状态!!!!
    git reset [--mixed] commithash filename
         用commithash中filename的内容重置暂存区

### checkout 深入理解

    git   checkout brancname  跟   git reset --hard commithash特别像
        共同点
            都需要重置 HEAD   暂存区   工作目录
        区别
             checkout对工作目录是安全的    reset --hard是强制覆盖
             checkout动HEAD时不会带着分支走而是切换分支
             reset --hard时是带着分支走

    checkout + 路径
          git checkout commithash  filename
               重置暂存区
               重置工作目录
          git checkout -- filename
              重置工作目录

---

## 其他配置

```bash
配置解决冲突时使用哪种差异分析工具，比如要使用vimdiff：git config --global merge.tool vimdiff
配置git命令输出为彩色的：git config --global color.ui auto
配置git使用的文本编辑器：git config --global core.editor vi
```

### 远程仓库

#### 创建 SSH Key

```bash
$ ssh-keygen -t rsa -C "youremail@example.com"
```

#### 关联远程仓库

```bash
$ git remote add origin https://github.com/username/repositoryname.git
```

#### 推送到远程仓库

```bash
$ git push -u origin master
```

`-u` 表示第一次推送 master 分支的所有内容，此后，每次本地提交后，只要有必要，就可以使用命令`git push origin master`推送最新修改。

#### 普通模式合并分支

```bash
$ git merge --no-ff -m "description" <branchname>
```

因为本次合并要创建一个新的 commit，所以加上`-m`参数，把 commit 描述写进去。合并分支时，加上`--no-ff`参数就可以用普通模式合并，能看出来曾经做过合并，包含作者和时间戳等信息，而`fast forward`合并就看不出来曾经做过合并。

#### 保存工作现场

```bash
$ git stash
```

#### 查看工作现场

```bash
$ git stash list
```

#### 恢复工作现场

```bash
$ git stash pop
```

#### 查看远程库信息

```bash
$ git remote -v
```

#### 在本地创建和远程分支对应的分支

```bash
$ git checkout -b branch-name origin/branch-name，
```

本地和远程分支的名称最好一致；

#### 建立本地分支和远程分支的关联

```bash
$ git branch --set-upstream branch-name origin/branch-name；
```

#### 从本地推送分支

```bash
$ git push origin branch-name
```

如果推送失败，先用 git pull 抓取远程的新提交；

#### 从远程抓取分支

```bash
$ git pull
```

如果有冲突，要先处理冲突。`git pull`如果失败了，原因是没有指定本地 dev 分支与远程 origin/dev 分支的链接，根据提示，设置 dev 和 origin/dev 的链接：

```bash
$ git branch --set-upstream branch-name origin/branch-name；
```

再 pull

### 标签

tag 就是一个让人容易记住的有意义的名字，它跟某个 commit 绑在一起。`<tagname>`是你要打标签的名字，比如：v1.0,默认是最新的`commit_id`,指定一个`commit_id`的话：`$ git tag <tagname> commit_id`

#### 新建一个标签

```bash
$ git tag <tagname>
```

#### 查看标签列表

```bash
$ git tag
```

命令`git tag <tagname>`用于新建一个标签，默认为 HEAD，也可以指定一个 commit id。

#### 指定标签信息

```bash
$ git tag -a <tagname> -m <description> <branchname> or commit_id
```

`git tag -a <tagname> -m "blablabla..."`可以指定标签信息。

#### PGP 签名标签

```bash
$ git tag -s <tagname> -m <description> <branchname> or commit_id
```

`git tag -s <tagname> -m "blablabla..."`可以用 PGP 签名标签。

#### 查看所有标签

```bash
$ git tag
```

#### 推送一个本地标签

```bash
$ git push origin <tagname>
```

#### 推送全部未推送过的本地标签

```bash
$ git push origin --tags
```

#### 删除一个本地标签

```bash
$ git tag -d <tagname>
```

#### 删除一个远程标签

```bash
$ git push origin :refs/tags/<tagname>
```

#### 定义别名

```bash
$ git config --global alias.st status
$ git config --global alias.last 'log -1' 最后一次的提交
$ git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```
