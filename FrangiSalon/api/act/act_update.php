<?php
	header("Content-type:text/html;charset=utf-8"); 
	include('../conn.php');

	if($select){
		$content = file_get_contents("php://input");
		$obj=json_decode($content);
		$id = $obj->{'id'};
		$activetime = $obj->{'activetime'};
		$area = $obj->{'area'};
		$address = $obj->{'address'};
		
		$exec="update fsalon_act set activetime='$activetime',area='$area',address='$address' where id='$id'";

		$result=mysql_query($exec);

		if($result){
			Response::json(1,'更新成功！','');
		}else{
			Response::json(0,'更新失败，重新更新！','');
		}
	}else{
		Response::json(0,'Server Error！');   
	}

	mysql_close($conn);
?>

