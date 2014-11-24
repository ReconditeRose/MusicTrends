#!/bin/bash
#Eg. ./install_Site.sh pswd /var/www/MusicTrends
mysql -h localhost -u root --password=$1 MusicData < MusicData10.db

echo <?php >> /HTML/API.php
echo \$password = \"$1\"; >> /HTML/API.php
cat API_EDIT.php >> /HTML/API.php

cp /HTML/* $2
