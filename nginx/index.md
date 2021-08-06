# nginx

## 简介

可以作为静态页面的 web 服务器，同时还支持 CGI 协议的动态语言，比如 perl、php
等。但是不支持 java。Java 程序只能通过与 tomcat 配合完成。Nginx 专为性能优化而开发，
性能是其最重要的考量,实现上非常注重效率 ，能经受高负载的考验,有报告表明能支持高
达 50,000 个并发连接数。

- 正向代理
- 反向代理
- 负责均衡
- 动静分离

## 安装 nginx

```bash
# 安装编译工具及库文件
yum -y install make zlib zlib-devel gcc-c++ libtool  openssl openssl-devel

# 安装 PCRE
# PCRE 作用是让 Nginx 支持 Rewrite 功能。
cd /usr/local/src/
wget http://downloads.sourceforge.net/project/pcre/pcre/8.37/pcre-8.37.tar.gz

# 解压安装包:
tar zxvf pcre-8.35.tar.gz

# 进入目录
cd pcre-8.37

# 编译安装
./configure
make && make install

# 查看pcre版本
pcre-config --version

# 安装 Nginx
cd /usr/local/src/
wget http://nginx.org/download/nginx-1.6.2.tar.gz

# 解压
tar zxvf nginx-1.6.2.tar.gz

# 进入目录
cd nginx-1.6.2

# 编译安装
./configure
make && make install

# 查看开放的端口号
firewall-cmd --list-all

# 设置开放的端口号
firewall-cmd --add-service=http –permanent
sudo firewall-cmd --add-port=80/tcp --permanent

# 重启防火墙
firewall-cmd –reload
```

## nginx 常用的命令和配置文件

```bash
# 版本号
/usr/local/nginx/sbin 目录下执行 ./nginx -v

# 启动
/usr/local/nginx/sbin 目录下执行 ./nginx

# 关闭命令
/usr/local/nginx/sbin 目录下执行 ./nginx -s stop

# 重新加载命令
/usr/local/nginx/sbin 目录下执行 ./nginx -s reload

#重启
/usr/local/nginx/sbin 目录下执行 ./nginx -s reopen

# 查看配置文件
cat /usr/local/webserver/nginx/conf/nginx.conf
```

## 配置文件

```bash
# 全局块：从配置文件开始到 events 块之间的内容，
# 主要会设置一些影响 nginx 服务器整体运行的配置指令，主要包括配置运行 Nginx 服务器的用户（组）、
# 允许生成的 worker process 数，进程 PID 存放路径、日志存放路径和类型以及配置文件的引入等。

worker_processes 1;  # worker_processes 值越大，可以支持的并发处理量也越多
error_log /usr/local/webserver/nginx/logs/nginx_error.log crit; #日志位置和日志级别
pid /usr/local/webserver/nginx/nginx.pid;
#Specifies the value for maximum file descriptors that can be opened by this process.
worker_rlimit_nofile 65535;

# events 块涉及的指令主要影响 Nginx 服务器与用户的网络连接
events {
  use epoll;
  worker_connections 1024;  # 表示每个 work process 支持的最大连接数为 1024
}

# http 块
http {
  # hppt 全局块
  include mime.types;
  default_type application/octet-stream;
  log_format main  '$remote_addr - $remote_user [$time_local] "$request" '
               '$status $body_bytes_sent "$http_referer" '
               '"$http_user_agent" $http_x_forwarded_for';

  server_names_hash_bucket_size 128;
  client_header_buffer_size 32k;
  large_client_header_buffers 4 32k;
  client_max_body_size 8m;

  sendfile on;
  tcp_nopush on;
  keepalive_timeout 60;
  tcp_nodelay on;
  fastcgi_connect_timeout 300;
  fastcgi_send_timeout 300;
  fastcgi_read_timeout 300;
  fastcgi_buffer_size 64k;
  fastcgi_buffers 4 64k;
  fastcgi_busy_buffers_size 128k;
  fastcgi_temp_file_write_size 128k;
  gzip on;
  gzip_min_length 1k;
  gzip_buffers 4 16k;
  gzip_http_version 1.0;
  gzip_comp_level 2;
  gzip_types text/plain application/x-javascript text/css application/xml;
  gzip_vary on;

 #下面是server虚拟主机的配置
 server {
    listen 80; # 监听端口
    server_name localhost; # 域名
    index index.html index.htm index.php;
    root /usr/local/webserver/nginx/html; # 站点目录
      location ~ .*\.(php|php5)?$
    {
      fastcgi_pass 127.0.0.1:9000;
      fastcgi_index index.php;
      include fastcgi.conf;
    }
    location ~ .*\.(gif|jpg|jpeg|png|bmp|swf|ico)$
    {
      expires 30d;
  # access_log off;
    }
    location ~ .*\.(js|css)?$
    {
      expires 15d;
   # access_log off;
    }
    access_log off;
  }

}
```
