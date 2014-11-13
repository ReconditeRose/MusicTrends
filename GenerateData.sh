#!/bin/bash
#python download.py
python download.py All
hadoop fs -rmr /tmp/ProjectUDFS.jar
hadoop fs -put ProjectUDFS.jar /tmp/
hadoop fs -rmr /tmp/project_output/

pig -param inputLoc=/tmp/project_data -param outputLoc=/tmp/project_output/tagdata/ -f CleanYearTagFiles.pig
hive -hiveconf HDatabase=musicdatabase -hiveconf inputLoc=/tmp/project_output/tagdata -hiveconf finalYearTagTable=yearTagData -hiveconf finalArtistTable=artistData -f createTablesYearTag.hql
mysql --user="root"  --database="MusicData" --execute="drop table if exists YearTagData;"
mysql --user="root"  --database="MusicData" --execute="create table YearTagData(year int, tag varchar(25), tempo double, instances int, hottness double,
 loudness double, duration double, danceability double, energy double,pitch double,primary key(year,tag));"
./sqoopExport.sh hadoop36.csse.rose-hulman.edu:3306 MusicData 'musicdatabase' 'yearTagData' YearTagData

mysql --user="root"  --database="MusicData" --execute="drop table if exists artistData;"
mysql --user="root"  --database="MusicData" --execute="create table artistData(artist varchar(50), instances int, tempo double, loudness double, duration double, primary key(artist));"
./sqoopExport.sh hadoop36.csse.rose-hulman.edu:3306 MusicData 'musicdatabase' 'artistData' artistData

pig -f songNameWordCount.pig -param inputLoc=/tmp/project_data -param outputLoc=/tmp/project_output/wordCount/
mysql --user="root"  --database="MusicData" --execute="drop table if exists WordCountData;"
mysql --user="root"  --database="MusicData" --execute="create table WordCountData(word varchar(25), count int);"
sqoop export --connect jdbc:mysql://hadoop36.csse.rose-hulman.edu:3306/MusicData -m 1 --username root --table WordCountData --export-dir /tmp/project_output/wordCount --input-fields-terminated-by '\t'
