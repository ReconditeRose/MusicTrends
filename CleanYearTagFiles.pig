REGISTER 'hdfs:///tmp/ProjectUDFS.jar';
DEFINE FrequencyData edu.rosehulman.olsonmc.FrequencyData();

songs = LOAD '$inputLoc' USING PigStorage('\t') AS (track_id:chararray, analysis_sample_rate:chararray, artist_7digitalid:chararray, artist_familiarity:chararray, artist_hotttnesss:chararray, artist_id:chararray, artist_latitude:chararray, artist_location:chararray, artist_longitude:chararray,artist_mbid:chararray, artist_mbtags:chararray, artist_mbtags_count:chararray, artist_name:chararray, artist_playmeid:chararray, artist_terms:chararray, artist_terms_freq:chararray, artist_terms_weight:chararray, audio_md5:chararray, bars_confidence:chararray, bars_start:chararray, beats_confidence:chararray, beats_start:chararray, danceability:chararray, duration:chararray, end_of_fade_in:chararray, energy:chararray, key:chararray, key_confidence:chararray, loudness:chararray, mode:chararray, mode_confidence:chararray, release:chararray, release_7digitalid:chararray, sections_confidence:chararray, sections_start:chararray, segments_confidence:chararray, segment_loudness_max:chararray, segment_loudness_max_time:chararray, segment_loudness_max_start:chararray, segment_pitches:chararray, segment_start:chararray, segment_timbre:chararray, similar_artists:chararray, song_hotttnesss:chararray, song_id:chararray, start_of_fade_out:chararray, tatums_confidence:chararray, tatums_start:chararray, tempo:chararray, time_signature:chararray, time_signature_confidence:chararray, title:chararray, track_7digitalid:chararray, year:int);

neededFields = foreach songs generate title, year, artist_name, artist_mbtags, tempo, song_hotttnesss, loudness, duration, danceability, energy,FrequencyData(segment_pitches);

filtered = Filter neededFields by artist_mbtags is not NULL and year > 0;

store neededFields into '$outputLoc';
