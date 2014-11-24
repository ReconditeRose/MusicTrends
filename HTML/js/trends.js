google.load('visualization', '1.0', {'packages':['corechart']});
google.setOnLoadCallback(drawChart);

var chart,data;
var options = {
  title: 'Data Trends'
};

var addTrend;
var addValue;

function loadData(data){
  var obj = JSON.parse(data);

  var cat =addTrend+" "+addValue;
  var dTable = [['Year',cat]];
  for( var i=0; i < obj.length;i++){

    if(obj[i]['value']==0 || obj[i]['value']==null)
      continue;

    dTable.push([parseFloat(obj[i]['year']),parseFloat(obj[i]['value'])]);
  }
  if(obj.length =0)
    return;
  data = google.visualization.arrayToDataTable(dTable);

  chart.draw(data,options);
}

function loadTags(data){
  var obj = JSON.parse(data);
  var result = "";
  for( var i=0; i < obj.length;i++){
    var text = "<li><a class=\"musicDropdown\" id=\""+obj[i]['tag']+"\">"+obj[i]['tag']+"</a></li>";
    result += text;
  }
  $("#tagsListing").append(result);

  jQuery(".musicDropdown").click(function(e){
    var text = $(e.target).text();
    addTrend = text;
    $("#tagName").text(text);
    $("#attributeName").text("Select an Attribute");
    $.ajax({type:"get",url: "API.php", data:{'type':'yearTag','tag':text}}).done(generateValid);
  });

}

function generateValid(data){
  var obj = JSON.parse(data);
  console.log(obj);
  var list = ['tempo','hottness','loudness','duration','danceability','energy','pitch'];
  var fList = [];
  for( var i=0; i < list.length;i++){
    for(var j=0; j<obj.length;j++){
      if(obj[j][list[i]] != "0" && obj[j][list[i]] !=null){
        fList.push(list[i]);
        break;
      }
    }
  }
  var result = "";
  for( var i=0; i < fList.length;i++){
    var text = "<li><a class=\"attributeDropdown\" id=\""+fList[i]+"\">"+fList[i]+"</a></li>";
    result += text;
  }
  $("#attributesListing").children().remove();
  $("#attributesListing").append(result);
  $("#attributeHide").show();
  jQuery(".attributeDropdown").click(function(e){
    var text = $(e.target).text();
    addValue = text;
    $("#attributeName").text(text);
    $("#addButton").show();
  });
}

window.onload = function(){

  $.ajax({type:"get",url: "API.php", data:{'type':'validTags'}}).done(loadTags);

  $("#attributeHide").hide();
  $("#addButton").hide();
  $("#addButton").click(function(e){

    $.ajax({type:"get",url: "API.php", data:{'type':'yearTagValue','tag':addTrend,'value':addValue}}).done(loadData);
    $("#tagName").text("Select a Tag");
    $("#attributeHide").hide();
    $("#addButton").hide();
  });

}

function drawChart(){
  chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  data = google.visualization.arrayToDataTable([]);
  chart.draw(data,options);
  addTrend = 'metal';
  addValue= 'tempo';
  $.ajax({type:"get",url: "API.php", data:{'type':'yearTagValue','tag':'metal','value':'tempo'}}).done(loadData);
}
