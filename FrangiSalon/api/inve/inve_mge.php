<?php
header("Content-type:text/html;charset=utf-8"); 
include('../conn.php');

if($select){
	if(isset($_GET['invrkey'])){
		$invrkey = $_GET['invrkey'];
	}else{
		$invrkey = "";
	}

	class curinvr{
		public $id = "";
		public $name  = "";
		public $phone  = "";
		public $act  = "";
		public $keyno  = "";
		public $activetime  = "";
		public $area  = "";
	}

	$query = mysql_query("select * from fsalon_invr where keyno=".$invrkey);
	$newItem=new curinvr();

	while($rows = mysql_fetch_array($query)){	
		$newItem->id=$rows['id'];
		$newItem->name=$rows['name'];
		$newItem->phone=$rows['phone'];
		$newItem->act=$rows['act'];
		$newItem->keyno=$rows['keyno'];
		$actquery = mysql_query("select * from fsalon_act where id=".$newItem->act);
		while($actrows = mysql_fetch_array($actquery)){
			$newItem->activetime=$actrows['activetime'];
			$newItem->area=$actrows['area'];
		}
	}

	Response::json(1,'获取当前受邀人成功！',$newItem);
}else{
	Response::json(0,'Server Error！');   
}

mysql_close($conn);
?>

