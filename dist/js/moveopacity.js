function moveopacityUl(ele,elestop){
			moves(0);
			var i=0;
			var elelen=$(ele).length;
			//console.log(elelen);
			var timer =setInterval(move,3500);
			function move(ele){	
				i++;
				$(ele).each(function(){
					$(this).css("display","none")
				})
				if(i==elelen){
					i=0;
				}
				if(i==-1){
					i=elelen-1;
				}
				moves(i);
			}		
				function moves(i){
					$(ele).eq(i).css("opacity",1).siblings().css("opacity",0);	
				}
				
				$(elestop).mouseover(function(){
					clearInterval(timer);
				}) 
				$(elestop).mouseout(function(){
					timer =setInterval(move,3500);
				}) 
				
				$(ele).parent().siblings(".btn-left").click(function(){
					i--;
					//console.log(i);
					if(i==-1){
						i=elelen-1;
					}
					moves(i);
					
				})
				$(ele).parent().siblings(".btn-right").click(function(){
					i++;
					//console.log(i);
					if(i==elelen){
						i=0;
					}
					moves(i);
				})
		}; 
		function moveopacity(ele,movestopele){
					moves(0);
					var i=0;
					// var ele =$(ele).find("li");
					//console.log(ele);
					var elelen=$(ele).length;
					//console.log(elelen);
					var timer =setInterval(move,3500);
					function move(ele){	
						i++;
						$(ele).each(function(){
							$(this).css("display","none")
						})
						
						if(i==elelen){
							i=0;
						}
						if(i==-1){
							i=elelen-1;
						}
						$(".nav li").each(function(){
							$(this).removeProp("class")
						})
						$(".nav li").eq(i).prop("class","select");
						moves(i);
					}		
						function moves(i){
							$(ele).eq(i).css("opacity",1).siblings().css("opacity",0);	
						}
						
						$(movestopele).mouseover(function(){
							clearInterval(timer);
						}) 
						$(movestopele).mouseout(function(){
							timer =setInterval(move,3500)
						}) 
						
						$(".nav li").each(function(m){
							$(this).hover(function(){
								//console.log(m)
								i=m-1;
								move();
							})
						})
						$(ele).parent().siblings(".btn-left").click(function(){
							i--;
							//console.log(i);
							if(i==-1){
								i=elelen-1;
							}
							moves(i);
							$(".nav li").each(function(){
								$(this).removeClass("select");
							})
							$(".nav li").eq(i).addClass("select");
						})
						$(ele).parent().siblings(".btn-right").click(function(){
							i++;
							console.log(i);
							if(i==elelen){
								i=0;
							}
							moves(i);
						$(".nav li").each(function(){
							$(this).removeClass("select");
						})
						$(".nav li").eq(i).addClass("select");
						})
						
				};