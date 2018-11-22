# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.provider "virtualbox" do |v|
  config.ssh.insert_key = false
  config.vm.synced_folder "./public_html", "/var/www/html"
    v.name="Appviajes"
  end
  config.vm.box="ubuntu/xenial64"
	config.vm.provision "shell" , path:"script.sh"
	config.vm.network :forwarded_port, guest: 3306, host: 3306
	config.vm.network :forwarded_port, guest: 80, host: 8080
end