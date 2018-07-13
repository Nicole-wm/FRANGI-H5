<?php
	$db_host = "localhost"; //数据库主机名
	$db_user = "root";//数据库用户名
	$db_pwd = "123456";//数据库密码
	$db_name = "h5";//数据库名称
	// $db_user = "h5";//数据库用户名
	// $db_pwd = "a73fb578d8";//数据库密码
	// $db_name = "h5";//数据库名称
	$db_port = "3306";//数据库端口
	$conn = @mysql_connect($db_host, $db_user,$db_pwd);
	mysql_query ( 'SET NAMES utf8',$conn);
	mysql_query ( "SET CHARACTER_SET_CLIENT='utf8'" ,$conn);
	mysql_query ( "SET CHARACTER_SET_RESULTS='utf8'" ,$conn);
	if(!$conn)
	{
		die("数据库读取失败，请打开data/conn.php修改数据库连接。");
	}
	
	$select=mysql_select_db($db_name,$conn);
	
	class Response{  
		public static function json($code,$message="",$data=array()){  
			$result=array(  
				'code'=>$code,  
				'message'=>$message,  
				'data'=>$data   
				);  
			echo json_encode($result);  
			exit;  
		}  
	} 
?>