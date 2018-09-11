/* 图书列表 */
$(function(){
	$.getJSON("../json/list.json",function(data){
		console.log(data);
		var listli ="";
		$(data).each(function(){
			/* console.log($(this)[0]); */
			listli+=`<li>
						<a href="" title="${$(this)[0].listName}" id="bookurl"><img src="${$(this)[0].listUrl}"</a>
						<a href="" id="bookname">${$(this)[0].listName}</a>
						<div class="price">￥<span>${$(this)[0].listPrice}</span></div>
						<div class="links"><a href="details.html?id=${$(this)[0].listId}" >购买</a></div>
					</li>`;
			
		})
		console.log(listli);
		$(".con-main-products").find("ul").append(listli);
	})
})
