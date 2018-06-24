var params={
	'personID':''
}

function PerListCheck(params){
	$.ajax({
		type: "GET",
		url: "../api/person_list.php",
		data : params,
		dataType:"json",
		success: function(msg) {
			if(msg.code==1) {
				if(msg.data.count==0){
					$("#check_false").show();
				}else{
					$("#check_true").show();
				}
				console.log(msg);
			}else{
				console.log('Server Error');
			}
		}
	});
}

function CheckVIP(){
	if($("#pg_name").val()!=""){
		var params={
			'personID':$("#pg_name").val()
		}
		PerListCheck(params);
	}else{
		alert("请输入VIP身份ID！");
	}
}

$("#pg_name").focus(function(){
	$("#check_false").hide();
	$("#check_true").hide();
});

$("#pg_name").blur(function(){
	CheckVIP();
});
