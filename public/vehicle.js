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
  var url = "/getVehicle?pri1=" + pri1 + "&pri2=" + pri2;
  console.log(url);
  callAjax(url, handleResultList);
  var resultList = $("#ulResults");
  var resultList2 = document.getElementById("ulResults2");
  i++;
  resultList.append(i);
  resultList2.append(i + 1 + "<br>");
}

function handleResultList(result){
  console.log("Back from AJAX with result:");
  console.log(result[0].name);
}
