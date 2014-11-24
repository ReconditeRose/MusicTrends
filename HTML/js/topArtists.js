var resultsArray = [];

function loadData(data,e){
  var obj = JSON.parse(data);


  for( var i=0; i < obj.length;i++){
    if(e==1){
      resultsArray[i] = "<tr><td>" + (i+1) + "</td>";
    }
    resultsArray[i] += "<td>"+ obj[i]['artist'] + "</td><td>"+ obj[i]['value']+"</td>";
    if(e==3){
      resultsArray[i] += "</tr>";
    }
  }
}

function display(){
  var results = "";
  for( var i=0; i < resultsArray.length;i++){
    results += resultsArray[i];
  }
  $("#artistTable").append(results);
}

window.onload = function(){

  $.ajax({type:"get",url: "API.php", data:{'type':'topArtists','count':'1','value':'loudness'}}).done(function(data){
    loadData(data,1);
    $.ajax({type:"get",url: "API.php", data:{'type':'topArtists','count':'1','value':'tempo'}}).done(function(data){
      loadData(data,2);
      $.ajax({type:"get",url: "API.php", data:{'type':'topArtists','count':'1','value':'duration'}}).done(function(data){
        loadData(data,3);
        display();
      });
    });
  });

}
