$(function(){
	var actlist=[
		{id:1,name:"温州（180630）"},
		{id:2,name:"杭州（180710）"}
	];

	var perlist=[
		{id:1,name:"大橙子",keyno:14532089,actno:1},
		{id:2,name:"大蚊子",keyno:64179465,actno:1},
		{id:3,name:"大茧子",keyno:85476216,actno:1}
	];

	PerListinit();

	function PerListinit(){
		$('#plist_table tr:gt(0)').remove();
		var s = '';
		for (var i = 0; i < perlist.length; i++) {
			var objact = actlist.find(function(x) {
				return x.id == perlist[i].actno;
			});
			perlist[i].link="http://h5.frangi.cn/BrandSalon/"+perlist[i].actno+"/index.html?ID="+perlist[i].keyno;
			s+= '<tr><td>' + perlist[i].id + '</td><td>' + perlist[i].name + '</td><td>' + perlist[i].keyno + '</td>'
			+ '<td>' + objact.name + '</td><td><a href="'+perlist[i].link+'" target="_blank">' + perlist[i].link + '</a></td></tr>';
		}
		$('#plist_table tbody').append(s);
	}


	function PostData() {
		$.ajax({
			type: "POST",
			url: "../../api/person_add.php",
			data : $('#FormApp').serialize(),
			success: function(msg) {
				alert("添加成功！");
			}
		});
	}
});
