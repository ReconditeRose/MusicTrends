google.load('visualization', '1.0', {'packages':['corechart']});
google.setOnLoadCallback(drawChart);

var chart,data;
var options;

var currentTag1;
var currentValue1;
var currentTag2;
var currentValue2;

var pTag1;
var pValue1;
var pTag2;
var pValue2;

function loadData(data){

  var dTable = [['Data','Data']];

  if(data=="NULL"){

  }else{
    var obj = JSON.parse(data);

    for( var i=0; i < obj.length;i++){
      dTable.push([parseFloat(obj[i]['value1']),parseFloat(obj[i]['value2'])]);
    }
  }
  data = google.visualization.arrayToDataTable(dTable);

  options = {
    title: 'Data Trends',
    hAxis: {title: currentTag1 + " "+currentValue1},
    vAxis: {title: currentTag2 + " "+currentValue2},
    trendlines: { 0: {showR2: true,visibleInLegend: true} }
  };
  if(obj.length =0){
    return;
  }

  chart.draw(data,options);
}


function loadTags(data){

  var obj = JSON.parse(data);
  var list = ['tempo','hottness','loudness','duration','pitch'];

  var result = "";
  for( var i=0; i < obj.length;i++){
    var text = "<li><a class=\"musicDropdown\" id=\""+obj[i]['tag']+"\">"+obj[i]['tag']+"</a></li>";
    result += text;
  }
  $("#tagsListing1").append(result);
  $("#tagsListing2").append(result);

  var result = "";
  for( var i=0; i < list.length;i++){
    var text = "<li><a class=\"attributeDropdown\" id=\""+list[i]+"\">"+list[i]+"</a></li>";
    result += text;
  }

  $("#attributesListing1").append(result);
  $("#attributesListing2").append(result);

  jQuery(".musicDropdown").click(function(e){
    var text = $(e.target).text();
    var parent = $(e.target).parent().parent().attr('id');

    console.log(parent);
    if(parent=="tagsListing1"){
      pTag1 = text;
      $("#tagName1").text(text);
    }else{
      pTag2 = text;
      $("#tagName2").text(text);
    }


  });

  jQuery(".attributeDropdown").click(function(e){
    var text = $(e.target).text();
    var parent = $(e.target).parent().parent().attr('id');

    if(parent=="attributesListing1"){
      pValue1 = text;
      $("#attributeName1").text(text);
    }else{
      pValue2 = text;
      $("#attributeName2").text(text);
    }

  });

}

function updateCharts(){
  console.log("API.php")
  $.ajax({type:"get",url: "API.php", data:{'type':'yearDoubleTagValue','tag1':currentTag1,'tag2':currentTag2,'value1':currentValue1,'value2':currentValue2}}).done(loadData);
}

function drawChart(){
  chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
  data = google.visualization.arrayToDataTable([]);

  currentTag1 = 'metal';
  currentValue1 = 'tempo';
  currentTag2 = 'metal';
  currentValue2 = 'duration';

  pTag1 = currentTag1;
  pTag2 = currentTag2;
  pValue1 = currentValue1;
  pValue2 = currentValue2;

  $("#tagName1").text(pTag1);
  $("#tagName2").text(pTag2);

  $("#attributeName1").text(pValue1);
  $("#attributeName2").text(pValue2);


  $("#addButton1").click(function(){
    currentTag1 = pTag1;
    currentValue1 = pValue1;
    updateCharts();
  });
  $("#addButton2").click(function(){
    currentTag2 = pTag2;
    currentValue2 = pValue2;
    updateCharts();
  });

  $.ajax({type:"get",url: "API.php", data:{'type':'validTags'}}).done(loadTags);
  updateCharts();
}
