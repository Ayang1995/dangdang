$(function(){
	/* 小巨幕 */
		$("#bg-ban").delay(5000).animate({"height":200},1000); 
		/* $("#bg-ban").mouseover(function(){
			$(this).animate({"height":200},800);
		}) */
		
	/* 弹出搜索条 */
		$(window).scroll(function(){
			var scrollTop=$(window).scrollTop();
			//console.log(scrollTop);
			if(scrollTop>800){
				$("#top-seach").css("display","block");
			}else{
				$("#top-seach").css("display","none");
			}
		})
	
	
	/* 登录用户名 */
	var username = location.search;
	username =username.split("=")[1];
	console.log(username);
	if(username){
		$(".top-nav-right").find(".login").html("你好，"+username).css("color","red");
	}
	
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
	
	 $("#seach-txt").bind("input",function(){
		 var oTxt=$("#seach-txt").val();
		$("#seach-list").css("display","block");
		 if(oTxt==""){
		 	$("#seach-list").css("display","none");
		 }
		//console.log(oTxt);
		$.ajax({
			url:"https://suggest.taobao.com/sug?code=utf-8&q="+oTxt+"&_ksTS=1535029416574_345&callback=data&k=1&area=c2c&bucketid=16",
			dataType:"jsonp",
			async:true,
			success:function (data){
				dataresult=data.result;
				//console.log(data);
				var oTxtLi ="";
				/* for(var i=0;i<dataresult.length;i++){
					var a =dataresult[i][0];
					console.log(a);
					
				} */
				
				 $(dataresult).each(function(){
					console.log($(this)[0]);
					oTxtLi +=`<li><a href="javascript:;">${$(this)[0]}</a></li>`;
					
				}) 
				$("#seach-list ul").append(oTxtLi);
				//console.log($("#seach-list ul li"))
				
				/* console.log($(data.magic)); */
				if($(data.magic)){
					$(data.magic).each(function(){
						var index =$(this)[0].index-1;
						var type=$(this)[0].type;
						var datas=$(this)[0].data;
						$("#seach-list ul li").eq(index).append("<span>&gt;</span>");
						var datamagic="";
						$(datas).each(function(){
							var data1 =$(this);
							console.log(data1);
							var datapro="";
							$(data1).each(function(){
								console.log($(this));
								if($(this)[0].type){
									datapro +=`<a href="#" class="typehot">${$(this)[0].title}</a>`;
								}
								datapro +=`<a href="#" >${$(this)[0].title}</a>`;
							})
							datamagic+=`<b data-num="${index}">${datapro}</b>`;
							
						})
						
						//console.log(datamagic);
						
						$("#seach-list ul li").eq(index).mouseover(function(){
							$(this).find("span").addClass("moveleft");
							$("#secondlist").removeClass("secondlist");
							$("#secondlist").empty();
							$("#secondlist").append(datamagic);
						})
						$("#secondlist").mousemove(function(){
							var index =$("#secondlist").find("b").attr("data-num");
							$("#seach-list ul li").eq(index).addClass("hover");
							$("#secondlist").removeClass("secondlist");
							
						})
						
						$("#seach-list ul li").mouseout(function(){
							$(this).find("span").removeClass("moveleft");
							$("#secondlist").addClass("secondlist");
							$("#seach-list ul li").removeClass("hover");
						})
						$("#seach-list").find("ul li").click(function(){
							$("#seach-txt").val($(this).find("a").text());
							$("#seach-list").fadeOut();
						})
						
					})
				}
			} 
		}) 
	}) 
	
	
	 /* 列表菜单 */ 
	$.getJSON("../json/menu.json",function(data){
		var data =data.menuList;
		//console.log(data)
		 $(data).each(function(){
			var str1="";
			var str="";
			$(this).each(function(){
				var menu_list_title =$(this)[0].title;
				var menu_list_link =$(this)[0].link; 
				//console.log(menu_list_title,menu_list_link)
				 str +=`<a href="list.html">${menu_list_title}</a><span>、</span>`;
				 //console.log(str);
			})
			str1=`<li>${str}</li>`;
			$("menu").find("ul.menu-list").append(str1);
			$("menu").find("ul.menu-list li span:last").remove();
		}) 
		//console.log($("menu").find("ul.menu-list li"));
		var oLi =$("menu").find("ul.menu-list li");
		$(oLi).mouseover(function(){
			$(this).addClass("hover").siblings().removeClass("hover");
			var i=$(this).index();
			//console.log(i);
			$("menu").find("ul.menu-list").append($("div.sec-list"));
			$("menu").find("div.sec-list").css("display","block");
			secList(i);
		});
		
		 $("menu").mouseout(function(){
			$("menu").find("ul.menu-list li").removeClass("hover");
			$("div.sec-list").css("display","none");
			
		});
		$("div.sec-list").mousemove(function(){
			$("div.sec-list").css("display","block");
			var dataid =$("div.sec-list").attr("data-id");
			//console.log(dataid);
			$("menu").find("ul.menu-list li").eq(dataid).addClass("hover");
		});
	}) ;
	
	/* 二级菜单 */
	function secList(i){
		$("menu").find("div.sec-list ul").empty();
		$.getJSON("../json/menu-data.json",function(data){
						var data=data[i];
						 //console.log(data);
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
							/* console.log(tjImg); */
							if(tjImg){
								$("menu").find("ul.sec-lists").css("width","760");
							}else{
								$("menu").find("ul.sec-lists").css("width","1001");
							}

							/* 排行榜 */
							if(booksTop){
								var phdiv =`<div>${suba}</div>`;
								var ph = `<li class="sec-list-books">${subNavspan}${phdiv}</li>`;
							}
							/* 标题 */ 
							var recmli =`<li class="sec-list-title">${recma}</li>`;
							
							$("menu").find("div.sec-list ul.sec-lists").append(recmli,ph,subbookli);
							
						}) 
					})
					$("div.sec-list").attr("data-id",i);
	}
	
		/* 图片轮播 */
	 var viewpagerlibig=$("#viewpager-1 .viewpager-1 li");
	 var moverstopele =$("#viewpager-1");
		moveopacity(viewpagerlibig,moverstopele); 
	var viewpagerlismall =$("#viewpager-2 .viewpager-2 ul");
	moveopacityUl(viewpagerlismall,$("#viewpager-2"));
	
	/* 信息公告 */
	var i=0;
	var newstitle =$(".aside-news").find("p.news-title span");
	var news1=$(".aside-news").find("p.news-1");
	var news2=$(".aside-news").find("p.news-2");
		//console.log(news1,news2);
	(function(){
		var timer =setInterval(function(){
			$(newstitle).each(function(){
				if($(this).hasClass("aside-news-hover")){
					$(this).removeClass("aside-news-hover");
					var newstitlenum =$(this).index();
					if(newstitlenum==0){
						$(news1).css("display","block").next().css("display","none");	
						}
					if(newstitlenum==1){
						$(news2).css("display","block").prev().css("display","none");
					}
				}else{
					$(this).addClass("aside-news-hover");	
				}
				//console.log($(this))
				
			})
		},5000);
		
	})();
		
	/* aside-books轮播 */
	/* var asidebooksli = $(".aside-books").find("div.aside-books-main li");
	console.log(asidebooksli);
	$(asidebooksli).animate({"left":-202},2000).siblings().css("left",0); */

	/* 厂商周轮播 */	
	 var seckilllunbo = $("#seckill-lunbo").find(".seckill-lunbo-main div");
	 //console.log(seckilllunbo);
	 moveopacityUl(seckilllunbo);
	 
	 
	 /* 为你推荐*/
	 $.getJSON("../json/data.json",function(data){
		// console.log(data);
		 var recomLi ="";
		 $(data).each(function(){
			//console.log($(this)[0]);
			recomLi +=`<li>
					<a href=""><img src="${$(this)[0].recomUrl}"/></a>
					<p class="name">
						<a href="" title="${$(this)[0].recomName}">${$(this)[0].recomName}</a>
					</p>
					<p class="price">
						<span class="price_r">¥<span>${$(this)[0].recomPrice}</span></span>
						<span class="ebookprice_n">电子书<span class="sign">¥</span>
						<span class="num">${$(this)[0].ebookprice}</span></span>
					</p>
				</li>`;
		 })
		 //console.log(recomLi);
		 $(".recommend-main").find("ul").append(recomLi);
	 })
})



	