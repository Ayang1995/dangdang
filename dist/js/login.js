
/* $.post("http://h6.duchengjiu.top/shop/api_user.php",{status:"login",username:"yangxiaolong",password:"111111"},function(data){
				console.log(data);
			}) */
$(function(){
	$("#login-btn").click(function(){
		var username =$("#login-txt").val();
		var userpwd =$("#login-pwd").val();
		console.log(username,userpwd);
		$.post("http://h6.duchengjiu.top/shop/api_user.php",{
			status:"login",
			username:username,
			password:userpwd,
			},function(data){
				console.log(data);
				var num =data.code;
				if(num==0){
					location.href="index.html?username="+username;
				}
				if(num==1001||num==2002){
					/* 密码错误或用户名错误 */
					$("#hint").fadeIn().delay(1000).fadeOut();
				}
				
		})
	})
	
})