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
  console.log("Searching...");
  var url = "/getVehicle?pri1=0&pri2=1";

  var resultList = $("#ulResults");
  var resultList2 = document.getElementById("ulResults2");
  i++;
  resultList.append(i);
  resultList2.append(i + 1 + "<br>");
}
