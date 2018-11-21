# -*- mode: ruby -*-
# vi: set ft=ruby :


Vagrant.configure("2") do |config|

    config.vm.box = "ubuntu/trusty64"
    config.vm.synced_folder "./public_html", "/var/www/html/index.html"
    config.vm.synced_folder "." , "/vagrant", disabled: true
    config.vm.network :forwarded_port, guest: 80, host: 8000
    config.vm.box = "ncaro/php7-debian8-apache-nginx-mysql"

  end
