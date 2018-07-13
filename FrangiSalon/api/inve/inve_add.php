<?php
	header("Content-type:text/html;charset=utf-8"); 
	include('../conn.php');

	if($select){
		$content = file_get_contents("php://input");
		$obj=json_decode($content);
		$name = $obj->{'name'};
		$phone = $obj->{'phone'};
		$act = $obj->{'act'};
		$invr = $obj->{'invr'};

		function getRandomString($len, $chars=null)  
		{  
			if (is_null($chars)) {  
				$chars = "0123456789";  
			}  
			mt_srand(10000000*(double)microtime());  
			for ($i = 0, $str = '', $lc = strlen($chars)-1; $i < $len; $i++) {  
				$str .= $chars[mt_rand(0, $lc)];  
			}  
			return $str;  
		}
		$keyno=getRandomString(8);

		$exec="insert into fsalon_inve(name,phone,act,keyno,invr) values('$name','$phone','$act','$keyno','$invr')";

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

