$(function(){$("#bg-ban").mouseover(function(){$(this).animate({height:200},800)}),$("#address").find("a").mouseover(function(){$(this).addClass("hover")}),$("#address").find("a").mouseout(function(){$(this).removeClass("hover")}),$("#address").mouseover(function(){$(this).find("ul").css("display","block")}),$("#address").mouseout(function(){$(this).find("ul").css("display","none")}),$("#address").find("ul li").click(function(){$("#address").find("a span").html($(this).html())}),$(".seach-input span").hover(function(){$(".seach-input").find("ul").fadeIn()},function(){$(".seach-input").find("ul").fadeOut()}),$(".seach-input").find("span ul li").click(function(){$(".seach-input").find("span i").html($(this).html()),$(".seach-input").find("ul").fadeOut()})});var otxt=document.getElementById("txt");function FillSuggest(n){console.log(n)}otxt.oninput=function(){otxt.value;ajax("http://schprompt.dangdang.com/suggest_new.php?keyword=nv&pid=20180906194952824343956775373306708",FillSuggest(json_data))};