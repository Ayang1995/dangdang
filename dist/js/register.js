 $(function(){
	 /* footer */
	 $("#footer").load("footer.html");
	 /* 内容区*/
	 $(".userpwd").find("#regis-pwd").bind("change",function(){
		 var regpwd =$(this).val();
		 if(regpwd.length<6){
			 $(".userpwd").find("span").html("密码不小于6位");
		 }else{
			 $(".userpwd").find("span").html("");
		 }
	 })
	$(".userpwda").find("#regis-pwd-a").bind("change",function(){
		var regpwd =$("#regis-pwd").val();
		var regpwdre =$(this).val();
		//console.log(regpwd,regpwdre);
		if(regpwd!==regpwdre){
			$(".userpwda").find("span").html("密码不正确");
		}else{
			$(".userpwda").find("span").html("");
		}
	});
			$("#btn").click(function(){
					var user =$("#regis-txt").val();
					var pwd =$("#regis-pwd").val();
					//console.log(user,pwd)
					$.post("http://h6.duchengjiu.top/shop/api_user.php",{
						status:"register",
						username:user,
						password:pwd
						},
						function(data){
						//console.log(data);
						var num =data.code;
						if(num==0){
							$(".tanchuang-s").css("display","block");
						}
						if(num==2001){
							$(".tanchuang-f").css("display","block");
							$(".tanchuang-f").find("a").click(function(){
								location.reload();
							})
						}
					})
				})
				
	/* 验证码 */
	function yzm(){
		var ranNum="";		
		while(ranNum.length<4){
			var ranCode =Math.floor(Math.random()*43+48);
			if(ranCode>=48 &&ranCode<=57 || ranCode>=65 &&ranCode<=90){
			var a = String.fromCharCode(ranCode);
			ranNum+=a;
			}
		}	
		return ranNum;
	}
	yzm();
		//console.log(yzm());
			$("#yanzhengma").find("span").html(yzm());
		$(".yzBtn").click(function(){
			$("#yanzhengma").find("span").html(yzm());
		})
		$("#yanzhengma").find("input").blur(function(){
			//console.log($(this).val());
			if($(this).val()!=$("#yanzhengma").find("span").html()){
				$("#yanzhengma").append("<p>验证码错误</p>");
			}else{
				$("#yanzhengma").find("p").remove();
			}
		})
				
}) 