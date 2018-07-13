var CurID = '';
if(getQueryStringByKey('ID')){
	CurID = getQueryStringByKey('ID');
}else{
	CurID = '';
}


var params={
	'personID':CurID
}

PerListinit(params);

function PerListinit(params){
	$.ajax({
		type: "GET",
		url: "../../api/person_list.php",
		data : params,
		dataType:"json",
		success: function(msg) {
			if(msg.code==1) {
				if(msg.data.results[0]){
					$("#pername").html(msg.data.results[0].name);
				}
			}else{
				console.log('Server Error');
			}
		}
	});
}

JsBarcode("#barcode", CurID, {
	format: "CODE128",
	lineColor: "#0aa",
	height:60,
	displayValue: true,
	lineColor:"#000000"
});