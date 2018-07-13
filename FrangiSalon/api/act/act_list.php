<?php
header("Content-type:text/html;charset=utf-8"); 
include('../conn.php');

if($select){
	class act{
		public $id = "";
		public $activetime  = "";
		public $area  = "";
		public $address  = "";
		public $joincount  = "";
	}

	$array=[];
	$query = mysql_query("select * from fsalon_act where deleted='0' order by activetime desc");

	while($rows = mysql_fetch_array($query)){
		$newItem=new act();
		$newItem->id=$rows['id'];
		$newItem->activetime=$rows['activetime'];
		$newItem->area=$rows['area'];
		$newItem->address=$rows['address'];

		if($newItem->id){
			$joinquery = "select count(*) as amount from fsalon_inve where deleted='0' and act=".$newItem->id; 
		}else{
			$joinquery = "select count(*) as amount from fsalon_inve where deleted='0'"; 
		}

		$result = mysql_query($joinquery);
		list($count) = mysql_fetch_row($result);

		$newItem->joincount=intval($count);
		$array[] = $newItem;
	}
	Response::json(1,'获取活动列表成功！',$array);
}else{
	Response::json(0,'Server Error！');   
}

mysql_close($conn);
?>

