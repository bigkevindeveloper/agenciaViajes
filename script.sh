###Archivo de scripts
#Variables
DBHOST=localhost
DBNAME=prueba
DBUSER=root
DBPASSWD=root

echo -e "\n--- Iniciando el proceso de instalación ---\n"
echo -e "\n--- Actualizando la máquina virtual ---\n"
apt-get update && apt-get upgrade -y
echo -e "\n--- Instalando paquetes base --- \n"
apt-get -y install curl build-essential python-software-properties git >> /vagrant/vm_build.log
echo -e "\n--- Instalando Mysql ---\n"
debconf-set-selections <<< "mysql-server mysql-server/root_password password $DBPASSWD"
debconf-set-selections <<< "mysql-server mysql-server/root_password_again password $DBPASSWD"
apt-get -y install mysql-server >> /vagrant/vm_mysql_build.log
echo -e "\n--- Dando permisos para conexion a Mysql ---\n"
mysql -uroot -p$DBPASSWD -e"CREATE DATABASE $DBNAME" >> /vagrant/vm_mysql_build.log
mysql -uroot -p$DBPASSWD -e"grant all privileges on $DBNAME.* to '$DBUSER'@'%' identified by'$DBPASSWD' " >> /vagrant/vm_mysql_build.log
echo -e "\n-- Instalando Node, NPM ---\n"
apt-get -y install nodejs  && apt-get -y install nodejs-legacy  && apt-get -y install npm && apt-get -y install apache2
git clone https://github.com/kevinriveradev/agenciaViajes.git
##npm install
##bower install
##npm start
