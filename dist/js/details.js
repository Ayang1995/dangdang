$(function(){
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
		
	
/* 产品特色 */
	$(".con-bot-head").find("ul li").hover(function(){
		$(this).addClass("hover").siblings().removeClass("hover");
	})
	
	/* 获取数据 */
	var id =location.search;
	id =id.split("=")[1];
	console.log(id);
	$.getJSON("../json/list.json",function(data){
		//console.log(data);
		$(data).each(function(){
			//console.log($(this));
		var listId =$(this)[0].listId;
			if(id==listId){
				console.log($(this));
				var listName =$(this)[0].listName;
				var listPrice =$(this)[0].listPrice;
				var author =$(this)[0].author;
				var counts =$(this)[0].counts;
				var detailpro =$(this)[0].detailpro;
				var detailmid =$(this)[0].detailmid;
				var detailimg =$(this)[0].detailimg;
				console.log(listName,listPrice,author,counts,listId,detailpro,detailimg);
				$(".pic-mid").find("img").attr('src',detailmid);
				var picsmall="";
				$(detailimg).each(function(){
					//console.log($(this));
					picsmall +=`<li><img src="${$(this)[0].src}"/></li>`;
				})
				console.log(picsmall);
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
		
})