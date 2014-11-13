Create DATABASE IF NOT EXISTS ${hiveconf:HDatabase};

Use ${hiveconf:HDatabase};

drop table if exists initSongInfo;
drop table if exists tagParsedSongInfo;
drop table if exists ${hiveconf:finalYearTagTable};
drop table if exists ${hiveconf:finalArtistTable};

Create table if not exists initSongInfo(title String, year Int, artist_name String, tags String, tempo Double, song_hottness Double, loudness Double, duration Double, danceability Double, energy Double,pitch Double)
ROW FORMAT DELIMITED FIELDS TERMINATED BY '\t' STORED AS TEXTFILE;
LOAD DATA INPATH '${hiveconf:inputLoc}' OVERWRITE INTO TABLE initSongInfo;

Create table if not exists tagParsedSongInfo(title String, year Int, artist_name String, tags String, tempo Double, song_hottness Double, loudness Double, duration Double, danceability Double, energy Double,pitch Double)
ROW FORMAT DELIMITED FIELDS TERMINATED BY '\t' STORED AS TEXTFILE;
insert into table tagParsedSongInfo select title, year, artist_name, tagsl, tempo, song_hottness, loudness, duration, danceability, energy,pitch from initSongInfo LATERAL VIEW explode(split(tags,",")) adTable as tagsl where tagsl <> "" and year > 0;

Create table if not exists ${hiveconf:finalYearTagTable}(year Int, tag String,instances int, tempo Double, hottness Double, loudness Double, duration Double, danceability Double, energy Double,pitch Double)
ROW FORMAT DELIMITED FIELDS TERMINATED BY '\t' STORED AS TEXTFILE;
insert into table ${hiveconf:finalYearTagTable} select year, tags,COUNT(tempo), AVG(tempo), AVG(song_hottness), AVG(loudness), AVG(duration), AVG(danceability), AVG(energy), AVG(pitch) from tagParsedSongInfo Group by Year, tags;

Create table if not exists ${hiveconf:finalArtistTable}(artist String,instances int,tempo double,loudness double, duration double)
ROW FORMAT DELIMITED FIELDS TERMINATED BY '\t' STORED AS TEXTFILE;
insert into table ${hiveconf:finalArtistTable} select artist_name,COUNT(tempo),AVG(tempo), AVG(loudness), AVG(duration) from initSongInfo Group by artist_name;
