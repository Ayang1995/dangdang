function ajax(e,t,n){if(window.XMLHttpRequest)var s=new XMLHttpRequest;else s=new ActiveXObject("Microsoft.XMLHTTP");s.open("get",e,!0),s.send(),s.onreadystatechange=function(){if(4==s.readyState)if(200==s.status){var e=s.responseText;t(e)}else n&&n()}}