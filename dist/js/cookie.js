//增加
function setCookie(name, val, n) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + n);
	document.cookie = name + "=" + val + ";expires=" + oDate;
}
//查询
function getCookie(name){
	var str = document.cookie;
	var arr = str.split("; ");
	for(var i = 0; i < arr.length; i++) {
		var newArr = arr[i].split("=");
		if(newArr[0] == name) {
			return newArr[1];
		}
	}
}
//删除
function removeCookie(name) {
	setCookie(name, 1, -1);
}
document.onselectstart = function(){return false;}; 