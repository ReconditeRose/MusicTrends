function loadData(data){
  var obj = JSON.parse(data);

  var result = "";

  for( var i=0; i < obj.length;i++){


    result += "<tr><td>" +(i+1)+ "</td><td>"+ obj[i]['word'] + "</td><td>"+ obj[i]['count']+"</td></tr>\n";
  }

$("#wordTable").append(result);
}

window.onload = function(){

  $.ajax({type:"get",url: "API.php", data:{'type':'topWords'}}).done(loadData);


}
