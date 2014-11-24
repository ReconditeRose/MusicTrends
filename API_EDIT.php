
$servername = "localhost";
$username = "root";
$dbname = "MusicData";

$link = mysqli_connect($servername, $username,$password, $dbname);

ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);

$type = mysqli_real_escape_string($link ,$_GET['type']);

if($type == 'yearTag'){
	$tag = mysqli_real_escape_string($link ,$_GET['tag']);
	$query = "Select * from YearTagData where tag ='$tag';";

}else if($type == 'yearTagValue'){
	$value = mysqli_real_escape_string($link ,$_GET['value']);
	$tag = mysqli_real_escape_string($link ,$_GET['tag']);
	$query = "Select tag,year,$value as value from YearTagData where tag ='$tag';";
}else if($type == 'yearDoubleTagValue'){

	$tag1 = $_GET['tag1'];
	$tag2 = $_GET['tag2'];

	$value1 = $_GET['value1'];
	$value2 = $_GET['value2'];

	$query = "Select A.year, A.$value1 as value1,B.$value2 as value2 from (YearTagData as A join YearTagData as B on (A.year = B.year and A.tag = '$tag1' and B.tag= '$tag2' and A.year != 0));";
}else if($type == 'validTags'){
	$query = "Select tag,count(*) as c from YearTagData group by tag having count(*)>5;";
}else if($type == 'topWords'){
	$query = "Select * from WordCountData;";
}else if($type == 'topArtists'){

$count = $_GET['count'];
$value = $_GET['value'];
	$query = "Select artist,$value as value from artistData where instances > $count order by value DESC limit 100;";

}else{
	exit(1);

}

$result = mysqli_query($link,$query);

if($r = mysqli_fetch_assoc($result)) {
	$rows[] = $r;
}else{
		print "NULL";
		exit(1);
}

while($r = mysqli_fetch_assoc($result)) {
	$rows[] = $r;
}

print json_encode($rows);



mysqli_close($link);
?>
