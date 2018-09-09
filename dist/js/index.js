$(function(){
	/* 小巨幕 */
		/* $("#bg-ban").delay(5000).animate({"height":200},1000); */
		$("#bg-ban").mouseover(function(){
			$(this).animate({"height":200},800);
		})
	/* 地址 */
	$("#address").find("a").mouseover(function(){
		$(this).addClass("hover");
		// $(this).siblings().css("display","block");
	})
	$("#address").find("a").mouseout(function(){
		$(this).removeClass("hover");
	})
	$("#address").mouseover(function(){
		$(this).find("ul").css("display","block");
	})
	$("#address").mouseout(function(){
		$(this).find("ul").css("display","none");
	})
	$("#address").find("ul li").click(function(){
		$("#address").find("a span").html($(this).html());
	})
	/* 搜索框、全部分类 */
	 $(".seach-input span").hover(function(){
		$(".seach-input").find("ul").fadeIn();
	},function(){
		$(".seach-input").find("ul").fadeOut();
	}) 
	$(".seach-input").find("span ul li").click(function(){
		$(".seach-input").find("span i").html($(this).html());
		$(".seach-input").find("ul").fadeOut();
	})
	/* 搜索框 */
	
	/* $.getJSON("http://schprompt.dangdang.com/suggest_new.php?keyword=nv&pid=20180906194952824343956775373306708&hw=1&hwps=12&catalog=&guanid=&0.8854756727172093",function(data){
		console.log(data);
	}) */
	
	/* $.ajax({
		url:"http://schprompt.dangdang.com/suggest_new.php?keyword=nv&pid=20180906194952824343956775373306708&hw=1&hwps=12&catalog=&guanid=&0.8854756727172093",
		dataType:"jsonp",
		async:true,
		success:function (data){
			console.log(data)
		}
	}) */
	/* ajax("http://schprompt.dangdang.com/suggest_new.php?keyword=nv&pid=20180906194952824343956775373306708&hw=1&hwps=12&catalog=&guanid=&0.8854756727172093",FillSuggest);
	function FillSuggest(json_data){
		console.log(json_data)
	} */ 
	
	 /* 列表菜单 */ 
var a=$.getJSON("../json/menu.json",function(data){
		var data =data.menuList;
		//console.log(data)
		 $(data).each(function(){
			var str1="";
			var str="";
			$(this).each(function(){
				var menu_list_title =$(this)[0].title;
				var menu_list_link =$(this)[0].link; 
				//console.log(menu_list_title,menu_list_link)
				 str +=`<a href="">${menu_list_title}</a><span>、</span>`;
				 //console.log(str);
			})
			str1=`<li>${str}</li>`;
			$("menu").find("ul.menu-list").append(str1);
			$("menu").find("ul.menu-list li span:last").remove();
		}) 
		console.log($("menu").find("ul.menu-list li"));
		var oLi =$("menu").find("ul.menu-list li");
		$(oLi).mouseover(function(){
			$(this).addClass("hover");
			var i=$(this).index();
			console.log(i);
			$("menu").find("div.sec-list").css("display","block");
			secList(i);
		})
		$(oLi).mouseout(function(){
			$(this).removeClass("hover");
		})
		
	}) 
	
	

	/* 二级菜单 */
	function secList(i){
		$("menu").find("div.sec-list ul").empty();
		$.getJSON("../json/menu-data.json",function(data){
						var data=data[i];
						/* console.log(data); */
						$(data).each(function(){
							var recmlist=$(this)[0].recm;
							var booksTop=$(this)[0].booksTop;
							var subNavLists=$(this)[0].subNavLists;
							var tjImg =$(this)[0].tjImg;
							//console.log(recmlist,booksTop,subNavLists);
							var recma="";
							$(recmlist).each(function(){
								var sec_list_recm_title =$(this)[0].title;
								var sec_list_recm_link =$(this)[0].link;
								recma+=`<a href="${sec_list_recm_link}"><em>${sec_list_recm_title}</em><span>&gt;</span></a>`;
							}) 
								var subNavspan="";
								var suba="";
								$(booksTop).each(function(){
								var subNavtop =$(this)[0].subNavtop;
								var sub =$(this)[0].sub;
								//console.log(subNavtop,sub);
								subNavspan=`<span>${subNavtop}</span>`;
								$(sub).each(function(){
									//console.log($(this)[0].title,$(this)[0].flag)
									var subtitle=$(this)[0].title;
									if($(this)[0].flag){
										suba+=`<a href="" class="flag">${subtitle}&nbsp;&gt;&gt;</a>`
									}
									suba+=`<a href="">${subtitle}&nbsp;&gt;&gt;</a>`;
								})
							}) 
							var subbookli="";
							$(subNavLists).each(function(){
								var subbookspan="";
								var subNavLists =$(this)[0].subNavLit;
								var sub =$(this)[0].sub;
								//console.log(sub);
								var subbooka="";
								subbookspan=`<span>${subNavLists}</span>`;
								$(sub).each(function(){
									var subtitle=$(this)[0].title;
									//console.log($(this));
									if($(this)[0].flag){
									subbooka+=`<a href="" class="flag">${subtitle}</a>`;
									}
									subbooka+=`<a href="">${subtitle}</a>`;
								}) 
							subbookdiv=`<div>${subbooka}</div>`;
							subbookli+=`<li class="sec-list-books sec-list-ranking">${subbookspan}${subbookdiv}</li>`;	
							});
							//console.log(subbookli);
							/* 图片 */
							var tjImgli="";
							$(tjImg).each(function(){
							var tjImgsrc=$(this)[0].src;
							tjImgli+=`<li><a href=""><img src="${tjImgsrc}"/></a></li>`;
							})
		
							$("menu").find("div.sec-list-img ul").append(tjImgli);
							/* 排行榜 */
							if(booksTop){
								var phdiv =`<div>${suba}</div>`;
								var ph = `<li class="sec-list-books">${subNavspan}${phdiv}</li>`;
							}
							/* 标题 */ 
							var recmli =`<li class="sec-list-title">${recma}</li>`;
							//console.log(ph,recmli);
							$("menu").find("div.sec-list ul.sec-lists").append(recmli,ph,subbookli);
						}) 
						
					})
			
	}
	
		
		
	
})


	