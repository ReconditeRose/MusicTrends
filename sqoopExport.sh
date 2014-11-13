sqoop export --connect jdbc:mysql://$1/$2 -m 1 --username root --table $5 --hcatalog-database $3  --hcatalog-table $4
