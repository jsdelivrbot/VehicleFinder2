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
var high1 = false;
var high2 = false;
if (sort1[0].checked)
  high1 = true;
if (sort2[0].checked)
  high2 = true;
console.log(high1);
console.log(high2);

  var url = "/getVehicle?pri1=" + pri1 + "&pri2=" + pri2;
  callAjax(url, handleResultList);
}

function handleResultList(result){
  console.log("Back from AJAX with result:");
  var obj = JSON.parse(result);
  console.log(obj);
  var resultList = $("#ulResults");
  var resultList2 = $("#ulResults2");
  var i = 0;
  resultList.empty();
  while (i < 8)
  {
      resultList.append(obj[i].name + "<img src='./" + obj[i].pic + "'></img>");
      i++;
  }
}
