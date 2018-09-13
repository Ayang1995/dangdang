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
	
	var id =location.search;
	id =id.split("=")[1];
	//console.log(id);
/* 弹窗 */
	$(".addguwuche").click(function(){
		$(".pop-up-box").fadeIn();
		cookie(id);
	})
	var count =cookie(id);
	//console.log(count);
	$(".pop-up-btn").find("a").click(function(){
		location.href="shoppingcart.html";
	})
	$(".pop-up-btn").find("span").click(function(){
		$(".pop-up-box").fadeOut();
	})
		
	
/* 产品特色 */
	$(".con-bot-head").find("ul li").hover(function(){
		$(this).addClass("hover").siblings().removeClass("hover");
	})
	
	/* 获取数据 */
	
	$.getJSON("../json/list.json",function(data){
		//console.log(data);
		$(data).each(function(){
			//console.log($(this));
		var listId =$(this)[0].listId;
			if(id==listId){
				//console.log($(this));
				var listName =$(this)[0].listName;
				var listPrice =$(this)[0].listPrice;
				var author =$(this)[0].author;
				var counts =$(this)[0].counts;
				var detailpro =$(this)[0].detailpro;
				var detailmid =$(this)[0].detailmid;
				var detailimg =$(this)[0].detailimg;
				//console.log(listName,listPrice,author,counts,listId,detailpro,detailimg);
				$(".pic-mid").find("img").attr('src',detailmid);
				var picsmall="";
				$(detailimg).each(function(){
					//console.log($(this));
					picsmall +=`<li><img src="${$(this)[0].src}"/></li>`;
				})
				//console.log(picsmall);
				$(".pic-small").find("ul").append(picsmall);
				fdj();
				$(".productmes-head").find("h2").html(listName);
				$(".productmes>span").html(listName);
				$(".productmes").find("em a").html(author);
				$(".productmes .price").find("p span").html(listPrice);
				$(".productmes .kucun").find("span").html(counts);
				$(".pro-details").find("img").attr("src",detailpro);
				}
		})
	})
	
	/* 放大镜 */
	function fdj(){
		var  oBox = $(".fdj")[0];
		var oCon =$(".pic-mid")[0];
		var oMinimg =$(oCon).find("img")[0];
		var fdj =$(".lens")[0];
		var oBigimg =$(".pic-big")[0];
		var aBigimg =$(oBigimg).find("img")[0];
		var oLi =$(".pic-small").find("li");
		//console.log(oLi);
		//console.log(oBox,oCon,oMinimg,fdj,oBigimg,aBigimg,oLi);
		//鼠标放上去放大镜和放大图片出现
		oCon.onmouseover =function(e){
			fdj.style.display ="block";
			oBigimg.style.display ="block";
		}
		//鼠标移走放大镜和放大图片消失
		oCon.onmouseout =function(){
			fdj.style.display ="none";
			oBigimg.style.display ="none";
		}
			oCon.onmousemove =function(e){
				var evt =e||event;
				var x=evt.pageX-oBox.offsetLeft;
				var y=evt.pageY-oBox.offsetTop;
				/* console.log(x,y); */
				x=x-fdj.offsetWidth/2;
				y=y-fdj.offsetHeight/2;
				
				if(x<0){
					x=0;
				}
				if(x>=oCon.offsetWidth-fdj.offsetWidth){
					x=oCon.offsetWidth-fdj.offsetWidth+"px";
				}
				if(y<0){
					y=0;
				}
				if(y>=oCon.offsetWidth-fdj.offsetWidth){
					y=oCon.offsetHeight-fdj.offsetHeight+"px";
				}
				fdj.style.left =x+"px";
				fdj.style.top =y+"px";
				/* console.log(fdj.style.left,fdj.style.top); */
				//放大镜在中图上移动的距离和放中图div（oCon）的比=于大图移动的距离和放大图div(oBigimg)的比
				aBigimg.style.left =-fdj.offsetLeft/oBigimg.offsetWidth*aBigimg.offsetWidth+"px";
				aBigimg.style.top =-fdj.offsetTop/oBigimg.offsetHeight*aBigimg.offsetHeight+"px";
			}
			for(let i=0;i<oLi.length;i++){
				//console.log(oLi[i]);
				oLi[i].onmouseover =function(){
					for(var j=0;j<oLi.length;j++){
						oLi[j].className="";
					} 
					this.className="hover";
					oMinimg.src=this.children[0].src;
					aBigimg.src=this.children[0].src;
				}
			}
	}
	
	var uN =getCookie("userName");
	/* setCookie(uN,112,7);
	console.log(getCookie(uN)); */
	/* cookie */
	function cookie(id){
		if(getCookie(uN) !=undefined){
			var cartobj = JSON.parse(getCookie(uN));
		}else{
			var cartobj ={};
		};
		var count =0;
		for(var i in cartobj){
			count +=cartobj[i];
		}
			$(".addguwuche").click(function(){
				
					if(cartobj[id]==undefined){
						cartobj[id]=1;	
					}else{
						cartobj[id]++;
					}
					
					//每点击一下,购物车图标上的数字也增加;
					count++;
				var strToObj = JSON.stringify(cartobj);
				
				setCookie(uN,strToObj,7);
			})
		return count;
	}
		
})