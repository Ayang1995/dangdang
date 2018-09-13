$(function(){
	var uN =getCookie("userName");
	/* 头部 */
	$("#head").load("head.html",function(){
		var uN =getCookie("userName");
		if(uN){
			var tBtn=`<a href="" class="tuichu">[退出]</a>`;
			//console.log(typeof($("#head").find(".login")),$("#head").find(".login")[0]);
			$("#head").find(".login").html("你好，"+uN).css("color","red").append($(tBtn));
			$(".tuichu").click(function(){
				removeCookie("userName");
			})
		}
	//console.log(getCookie("userName"));
	if(getCookie(uN)){
		var arecodes = JSON.parse(getCookie(uN));
	}
	var pronums=0;
	for(var i  in arecodes){
		pronums+=arecodes[i];
	}
	//console.log(pronums);
	$(".top-list li").eq(0).find("span").html(pronums);
	})
	/* footer */
	$("#footer").load("footer.html");
	/* 图书列表 */
	$(function(){
		$.getJSON("../json/list.json",function(data){
			//console.log(data);
			var listli ="";
			$(data).each(function(){
				/* console.log($(this)[0]); */
				listli+=`<li>
							<a href="details.html?id=${$(this)[0].listId}" title="${$(this)[0].listName}" id="bookurl"><img src="${$(this)[0].listUrl}"</a>
							<a href="" id="bookname">${$(this)[0].listName}</a>
							<div class="price">￥<span>${$(this)[0].listPrice}</span></div>
							<div class="links"><a href="details.html?id=${$(this)[0].listId}" >购买</a></div>
						</li>`;
				
			})
			//console.log(listli);
			$(".con-main-products").find("ul").append(listli);
		})
	})
	
})