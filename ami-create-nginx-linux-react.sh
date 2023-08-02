#!/bin/bash

########################################################
##### USE THIS FILE IS YOU LAUNCHED AMAZON LINUX 2 #####
########################################################

# upgrade machine
sudo yum update -y

# install java 8 jdk
#no longer works 
#his attempt
#sudo yum install -y java-1.8.0-openjdk-devel

#attempts 1 and 2
# wget https://download.java.net/java/GA/jdk20.0.2/6e380f22cbe7469fa75fb448bd903d8e/9/GPL/openjdk-20.0.2_linux-x64_bin.tar.gz
# tar xvzf openjdk-20.0.2_linux-x64_bin.tar.gz 
# wget https://download.oracle.com/java/20/latest/jdk-20_macos-x64_bin.tar.gz

#solution for java jdk installation
sudo yum install java-17-amazon-corretto-headless.x86_64

# set java jdk 8 as default
sudo /usr/sbin/alternatives --config java
sudo /usr/sbin/alternatives --config javac

# verify java 8 is the default
java -version

# Download app
cd /home/ec2-user
wget https://github.com/pdichone/ec2-masterclass-javaapp/releases/download/v1.0.0/ec2-masterclass-sample-app.jar


# Test the app
java -Xmx700m -jar ec2-masterclass-sample-app.jar

# System D type of Configuration for Linux 2
sudo bash -c 'cat << \EOF > /etc/systemd/system/ec2sampleapp.service
[Unit]
Description=EC2 Sample App
After=network.target

[Service]
ExecStart=/usr/bin/java -Xmx700m -jar /home/ec2-user/ec2-masterclass-sample-app.jar
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF'

# apply across reboots
sudo systemctl enable ec2sampleapp.service # enable on boot
sudo systemctl start ec2sampleapp.service  # start now



######### STARTING NODE AND REACT PROJECT UP ##############
sudo yum install nodejs

sudo yum install git

cd /home/ec2-user
git clone https://github.com/mario-oliver/mario-portfolio.git
cd mario-portfolio/src/
npm install
npm run build

sudo yum install nginx

#for configuring nginx server I used 
sudo nano /etc/nginx/nginx.conf
#to check the syntax is properly working
 sudo nginx -t
#check to see if nginx is running
sudo systemctl status nginx
#if it's not running do the following
sudo systemctl start nginx

#Create /etc/nginx/sites-available and /etc/nginx/sites-enabled and then edit the http block inside /etc/nginx/nginx.conf and add this line include /etc/nginx/sites-enabled/*;
#visit for more details
sudo mkdir /etc/nginx/sites-available
sudo mkdir /etc/nginx/sites-enabled

######REMOVED THESE THREE STEPS AND REPLACED WITH BELOW
sudo nano /etc/nginx/nginx.conf
#enter -> include /etc/nginx/sites-enabled/*; -> into http block
sudo ln -s /etc/nginx/sites-available/test.conf /etc/nginx/sites-enabled/test.conf
#######

sudo nano sites-available/MyApp.conf
server {
        listen 80;
        listen [::]:80;
        server_name 52.87.246.23;

        location / {
                include proxy_params;
                proxy_pass http://localhost:5173;
        }
}
sudo ln /etc/nginx/sites-available/MyApp.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx.service 

#other attempt with a different structure in linux (rather than bandaid fix to make our linux work like ubuntu with syslink of folders)
sudo mkdir /var/www
sudo mkdir /var/www/52.87.246.23
#makes the contents of the directory available to everyone
sudo chmod 755 -R /var/www/52.87.246.2

cd /etc/nginx/sites-available/
sudo touch 52.87.246.23
sudo nano 52.87.246.23
server {
        listen 80;
        listen [::]:80;

        root /var/www/52.87.246.23;
        index index.html;
}
#unlink whatever was here so we can do new link
sudo unlink /etc/nginx/sites-enabled/<default>
sudo ln /etc/nginx/sites-available/52.87.246.23 /etc/nginx/sites-enabled/
sudo systemctl restart nginx

cd 
cd mario-porfolio
npm run dev
sudo mv dist/ /var/www/52.87.246.23
sudo mv dist/logo.svg .
sudo mv dist/vite.svg .
sudo mv dist/index.html .
sudo mv dist/assets/ .
sudo rm -rf dist/

#also did not work
# the current /etc/nginx/ directory has two folders:
# 1) nginx.conf.default and 2)  nginx.conf
# in nginx.conf the server code looks as follows
    server {
        listen       80;
        listen       [::]:80;
        server_name  _;
        root         /usr/share/nginx/html;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;
        error_page 404 /404.html;
        location = /404.html {}

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {}
    }
    #let's use this structure to move all build files into /usr/share/nginx/html
    #this did finally work!!!!
    #will need to use the /usr/share/nginx/html folder for my built files
