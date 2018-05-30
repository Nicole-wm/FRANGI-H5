 window.alert = function(name){   
 	var iframe = document.createElement("IFRAME");   
 	iframe.style.display="none";   
 	iframe.setAttribute("src",'');   
 	document.documentElement.appendChild(iframe);   
 	window.frames[0].window.alert(name);   
 	iframe.parentNode.removeChild(iframe);  
 }; 

 function PostData() {
 	$(".mask").show();
 	function isPhoneNo(phone) {   
 		var pattern = /^1[34578]\d{9}$/;   
 		return pattern.test(phone);  
 	} 

 	var phone=/^1[34578]\d{9}$/;  
 	if($.trim($('#phone').val()).match(phone)==null){  
 		alert("您的手机格式不正确,重新输入！");  
 		$('#phone').focus(); 
 		$(".mask").hide();
 		return false; 
 	}else{
 		$.ajax({
 			type: "POST",
 			url: "wxapply.php",
 			data : $('#FormApp').serialize(),
 			success: function(msg) {
 				$(".mask").hide();
 				$('#FormApp')[0].reset(); 
 				alert("申请成功！");
 				return true; 
 			}
 		});
 	}
 	return false; 
 }
