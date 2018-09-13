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

	
	
	/* cookie */
	if(getCookie(uN)){
		var arecodes = JSON.parse(getCookie(uN));
	}
	//console.log(arecodes);
	  $(arecodes).each(function(i){
		//console.log($(this)[0]);
		var productId =$(this)[0];
	}) 
	var procount=0;
	for(var i in arecodes){
		//console.log(i,arecodes[i]);
		getjson(i,arecodes[i]);
		procount+=arecodes[i];
		
	}
	//console.log($("#content"));
	$(".select-pro").find("span").html(procount);
/*加 减 删除 */	
	var num=0;
	var cartobj = JSON.parse(getCookie(uN));
	$(".shopping-list").delegate("ul li .reduce","click",function(){
		var oneprice =Number($(this).parent().parent().parent().children().eq(3).find("span").html());
		//console.log(oneprice);
		num =$(this).siblings("span").html();
		num--;
		if(num<=0){
			num=0;
		}
		$(this).siblings("span").html(num);
		// console.log(num*oneprice,$(this).parent().parent().parent().find(".proPrice span"))
		var tp =(Math.round(num*oneprice*10000000))/10000000;
		$(this).parent().parent().parent().find(".proPrice span").html(tp);
		var index =$(this).parent().attr("data-id");
			if(num<=0){
			cartobj[index]=0;
			}else{
				cartobj[index]=num;	
			}		
		var strToObj = JSON.stringify(cartobj);
		setCookie(uN,strToObj,7);
		var tp1 =$(".shopping-list").find("ul li.proPrice span");
		var tp2=0;
		$(tp1).each(function(){
			console.log($(this).text());
			tp2+=Number($(this).text());
		})
		//console.log(tp2);
		$(".buy").find("p span").html(tp2);
		
	})
	$(".shopping-list").delegate("ul li .add","click",function(){
		var oneprice =Number($(this).parent().parent().parent().children().eq(3).find("span").html());
		num =$(this).siblings("span").html();
		num++;
		$(this).siblings("span").html(num);
		var tp =(Math.round(num*oneprice*10000000))/10000000;
		$(this).parent().parent().parent().find(".proPrice span").html(tp);
		var index =$(this).parent().attr("data-id");
		cartobj[index]=num;			
		var strToObj = JSON.stringify(cartobj);
		setCookie(uN,strToObj,7);
		//console.log(num);
		var tp1 =$(".shopping-list").find("ul li.proPrice span");
		var tp2=0;
		$(tp1).each(function(){
			console.log($(this).text());
			tp2+=Number($(this).text());
		})
		console.log(tp2);
		$(".buy").find("p span").html(tp2);
		
	})
/* 删除 */	
	$(".shopping-list").delegate("ul li .del-pro","click",function(){
		console.log(index,cartobj);
		$(this).parent().parent().remove();
			var index=$(this).attr("data-id");
			for(var a in cartobj){
				if(a==index){
					delete cartobj[a];
				}
			}
			var strToObj = JSON.stringify(cartobj);
			setCookie(uN,strToObj,7);
	})
	
	$(".del").click(function(){
		var proList =$(".prolist").find(".check:checked");
		$(proList).each(function(){
			console.log($(this).attr("data-id"));
			$(this).parent().parent().remove();
			var index=$(this).attr("data-id");
			for(var a in cartobj){
				if(a==index){
					delete cartobj[a];
				}
			}
			var strToObj = JSON.stringify(cartobj);
			setCookie(uN,strToObj,7);
		})
		var tp1 =$(".shopping-list").find("ul li.proPrice span");
		var tp2=0;
		$(tp1).each(function(){
			console.log($(this).text());
			tp2+=Number($(this).text());
		})
		console.log(tp2);
		$(".buy").find("p span").html(tp2);
		
	}) 
	
/* 结算条 */	

var totalTop =$(".total").offset().top;
$(window).scroll(function(){
	var scrollTop = $(window).scrollTop();
	//console.log(scrollTop,totalTop);
	if((scrollTop-totalTop)<0){
		$(".total").css({"position":"fixed","bottom":0});
	}else{
		$(".total").css("position","static");
	} 
})
	
	/* 全选 */	
	function selectbtn(){
		$(".all").click(function(){
			if($(this).is(":checked")){
				$(".check").prop("checked","checked");
				$(".delall").prop("checked","checked")
			}else{
				$(".check").removeProp("checked");
				$(".delall").removeProp("checked");
			}
		})
		$(".delall").click(function(){
			if($(this).is(":checked")){
				$(".check").prop("checked","checked");
				$(".all").prop("checked","checked")
			}else{
				$(".check").removeProp("checked");
				$(".all").removeProp("checked");
			}
		})
		$(".check").each(function(){
			$(this).click(function(){
			if($(".check:checked").length == $(".check").length){
				$(".all").prop("checked",true);
				$(".delall").prop("checked",true)
			}else{
				$(".all").prop("checked",false);
				$(".delall").prop("checked",false)
			}
			})
		})
	}
	var totalp =0;
	function getjson(i,attr){
		var prolist ="";
		$.getJSON("../json/list.json",function(data){
			$(data).each(function(){
				if(i==$(this)[0].listId){
					//console.log($(this));
				creat(i,attr,$(this)[0].listUrl,$(this)[0].listName,$(this)[0].listPrice);
					function creat(i,attr,listUrl,listName,listPrice){
						prolist+=`<ul class="prolist" >
								<li><input type="checkbox" checked="checked" class="check" data-id="${i}" /></li>
								<li><img src="${listUrl}" /></li>
								<li><a href="">${listName}</a></li>
								<li><em>￥<span>${listPrice}</span></em></li>
								<li><div data-id="${i}"><strong class="reduce" attr="${attr}">-</strong><span>${attr}</span><strong class="add"attr="${attr}">+</strong></div></li>
								<li class="proPrice"><em>￥</em><span>${(Math.round((listPrice)*(attr)*10000000))/10000000}</span></li>
								<li><a href="">移入收藏</a><a href="javascript:;" class="del-pro" data-id="${i}">删除</a></li>
							</ul>`;
					}
					var lp=$(this)[0].listPrice;
					totalp+=(Math.round(lp*attr*10000000))/10000000 ;
				}
			})
			$(".shopping-list").append(prolist);
			$(".buy").find("p span").html(totalp);
			selectbtn();
		})
	
	
		
	}
	
	
	
	/* 为你推荐 */
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
		$(".sec-con").find("ul").append(recomLi);
	})
})