
			var oTxt =document.getElementById("seach-txt");
			var oList =document.getElementById("seach-list");
			/* var oI =document.createElement("i"); */
			oTxt.oninput =function(){
				oList.style.display="block";
				if(oTxt.value==""){
					console.log(oTxt.value);
					oList.style.display="none";
				}
				var oScript =document.createElement("script");
				oScript.src="https://suggest.taobao.com/sug?code=utf-8&q="+oTxt.value+"&_ksTS=1535029416574_345&callback=data&k=1&area=c2c&bucketid=16";
				document.body.appendChild(oScript);
			}
				
		function callback(data){
			oList.innerHTML ="";
			for(var i=0;i<data1.length;i++){
				oList.innerHTML +=`<li>${data1[i][0]}</li>`;
			}
			var oLi = document.getElementsByTagName("li");
				//console.log(oLi);
				for(let k=0;k<oLi.length;k++){
					if(data.magic){
						data2=data.magic;
						//console.log(data2);
						for(var j=0;j<data2.length;j++){
							var index =data2[j].index;
							if(index==k+1){
								oLi[k].innerHTML+="&gt;";
								var op =document.createElement("p");
								oLi[k].appendChild(op);
								oLi[k].className ="p";
								var pdata=data2[j].data;
								for(let m=0;m<pdata.length;m++){
									//console.log(pdata[m]);
									for(var x=0;x<pdata[m].length;x++){
										op.innerHTML +=`<span>${pdata[m][x].title}</span>`;
										if(pdata[m][x].type){
											var oSpan =document.getElementsByTagName("span");
											//console.log(pdata[m][x])
											for(var n=0;n<oSpan.length;n++){
												if(oSpan[n].innerText ==pdata[m][x].title){
													oSpan[n].className="color";
												}	
											}
										}
									} 
									op.innerHTML+="<i></i>";
								}	
							}
						}
						
					}
				}
		}
		
	
		function data(data){
			data1 =data.result;
			console.log(data);
			callback(data);
		}
	