function callAjax(url, callback){
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

var i = 0;
function search(){
  var pri = document.getElementById("priority1");
  var pri1 = pri.options[pri.selectedIndex].value;
      pri = document.getElementById("priority2");
  var pri2 = pri.options[pri.selectedIndex].value;
var sort1 = document.getElementsByName('sort1');
var sort2 = document.getElementsByName('sort2');
var high1 = 0;
var high2 = 0;
if (sort1[0].checked)
  high1 = 1;
if (sort2[0].checked)
  high2 = 1;

  var url = "/getVehicle?pri1=" + pri1 + "&pri2=" + pri2 + "&high1=" + high1 + "&high2=" + high2;
  callAjax(url, handleResultList);
}

function handleResultList(result){
  console.log("Back from AJAX with result:");
  var obj = JSON.parse(result);
  //console.log(obj);
  var resultList = $("#ulResults");
  var resultList2 = $("#ulResults2");
  var i = 0;
  resultList.empty();
  while (i < 8)
  {
      resultList.append("<img src='./" + obj[i].pic + "'></img><table><tr><th>Name</th><th>Weight (LBS)</th><th>Power (HP)</th><th>Size (FT CUBED)</th><th>Speed (MPH)</th><th>Price ($)</th><th>Fuel Economy (MPG)</th></tr><tr><td>" + obj[i].name + "</td></tr></table><br>");
      i++;
  }
}
