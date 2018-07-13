<?php
	header("Content-type:text/html;charset=utf-8"); 
	include('../conn.php');

	if($select){
		$content = file_get_contents("php://input");
		$obj=json_decode($content);
		$activetime = $obj->{'activetime'};
		$area = $obj->{'area'};
		$address = $obj->{'address'};
		
		$exec="insert into fsalon_act(activetime,area,address) values('$activetime','$area','$address')";

		$result=mysql_query($exec);

		if($result){
			Response::json(1,'添加成功！','');
		}else{
			Response::json(0,'添加失败，重新添加！','');
		}
	}else{
		Response::json(0,'Server Error！');   
	}

	mysql_close($conn);
?>

