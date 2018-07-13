var actlist=[
{id:0,name:"全部"},
{id:1,name:"温州（180630）"},
{id:2,name:"杭州（180710）"}
];

var perlist=[];
var totalItems=0;

var params={
	'personID':'',
	'actNo':''
}

PerListinit(params);

function PerListinit(params){
	$.ajax({
		type: "GET",
		url: "../api/person_list.php",
		data : params,
		dataType:"json",
		success: function(msg) {
			if(msg.code==1) {
				totalItems=msg.data.count;
				perlist=msg.data.results;
				PushData(perlist);
			}else{
				console.log('Server Error');
			}
		}
	});
}

function PushData(perlist){
	$('#plist_table tr:gt(0)').remove();
	var s = '';
	var cid=1;
	for (var i = 0; i < perlist.length; i++) {
		var objact = actlist.find(function(x) {
			return x.id == perlist[i].actno*1;
		});

		perlist[i].link="http://h5.frangi.cn/BrandSalon/invitation/"+perlist[i].actno+"/index.html?ID="+perlist[i].keyno;
		s+= '<tr><td>' + cid + '</td><td>' + perlist[i].name + '</td><td>' + perlist[i].keyno + '</td>'
		+ '<td>' + objact.name + '</td><td><a href="'+perlist[i].link+'" target="_blank">' + perlist[i].link + '</a></td></tr>';
		cid++;
	}
	$('#plist_table tbody').append(s);
}

function PostData() {
	$.ajax({
		type: "POST",
		url: "../api/person_add.php",
		data : $('#FormApp').serialize(),
		success: function(msg) {
			alert("添加成功！");
			var params={
				'actNo':$("#pf_select option:selected").val()
			}
			PerListinit(params);
		}
	});
	return false; 
}

function CheckAct(){
	var params={
		'actNo':$("#pf_select option:selected").val()
	}
	PerListinit(params);
}


$("#DownXls").click(function(){
	$("#plist_table").table2excel({
		exclude: ".noExl",
		name: "FRANGI芙蓉肌品牌沙龙_人员名单",
		filename : "FRANGI芙蓉肌品牌沙龙_人员名单",    
		exclude_img: true,
		exclude_links: true,
		exclude_inputs: true,
		fileext: ".xls"
	});
});
