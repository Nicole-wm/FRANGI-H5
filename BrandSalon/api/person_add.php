<?php
	header("Content-type:text/html;charset=utf-8"); 
	include('conn.php');

	if($select){
		if(isset($_POST['name'])){
			$name = $_POST['name'];
		}else{
			$name = "frangi";
		}

		if(isset($_POST['actno'])){
			$actno = $_POST['actno'];
		}else{
			$actno = 1;
		}

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

		$exec="insert into brandsalon(name,actno,keyno) values('$name','$actno','$keyno')";
		
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

