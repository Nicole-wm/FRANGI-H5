<?php
	header("Content-type:text/html;charset=utf-8"); 
	include('../conn.php');

	if($select){
		$content = file_get_contents("php://input");
		$obj=json_decode($content);
		$key = $obj->{'key'};
		$name = $obj->{'name'};
		$phone = $obj->{'phone'};
		$act = $obj->{'act'};

		$exec="update fsalon_invr set name='$name',phone='$phone',act='$act' where keyno='$key'";

		$result=mysql_query($exec);

		$exec2="update fsalon_inve set name='$name',phone='$phone',act='$act' where keyno='$key'";

		$result2=mysql_query($exec2);

		if($result&&$result2){
			Response::json(1,'更新成功！','');
		}else{
			if(!$result){
				Response::json(0,'更新1失败，重新更新！','');
			}
			if(!$result2){
				Response::json(0,'更新2失败，重新更新！','');
			}
		}
	}else{
		Response::json(0,'Server Error！');   
	}

	mysql_close($conn);
?>

