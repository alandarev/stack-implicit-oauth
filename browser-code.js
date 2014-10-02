var bla = 1;
var params = window.location.hash.substring(1);
if (params && params.length > 0)  {
  var xmlhttp=new XMLHttpRequest();
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      window.close();
    }
  }
  xmlhttp.open("POST","keys",true);
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xmlhttp.send(params);
}
