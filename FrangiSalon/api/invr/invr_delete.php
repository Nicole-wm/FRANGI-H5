<?php
	header("Content-type:text/html;charset=utf-8"); 
	include('../conn.php');

	if($select){
		$content = file_get_contents("php://input");
		$obj=json_decode($content);
		$key = $obj->{'key'};
		
		$exec="update fsalon_invr set deleted='1' where keyno='$key'";

		$result=mysql_query($exec);

		$exec2="update fsalon_inve set deleted='1' where keyno='$key'";

		$result2=mysql_query($exec2);

		if($result){
			Response::json(1,'删除成功！','');
		}else{
			Response::json(0,'删除失败，重新删除！','');
		}
	}else{
		Response::json(0,'Server Error！');   
	}

	mysql_close($conn);
?>

