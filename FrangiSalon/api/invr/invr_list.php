<?php
header("Content-type:text/html;charset=utf-8"); 
include('../conn.php');

if($select){
	class invr{
		public $id = "";
		public $name  = "";
		public $phone  = "";
		public $act  = "";
		public $keyno  = "";
		public $joincount  = "";
		public $activetime  = "";
		public $area  = "";
	}

	$array=[];
	$query = mysql_query("select * from fsalon_invr where deleted='0' order by updatetime desc");

	while($rows = mysql_fetch_array($query)){
		$newItem=new invr();
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
		
		$joinquery = "select count(*) as amount from fsalon_inve where deleted='0' and invr=".$newItem->id; 
		$result = mysql_query($joinquery);
		list($count) = mysql_fetch_row($result);
		$newItem->joincount=intval($count);
		$array[] = $newItem;
	}
	Response::json(1,'获取受邀人列表成功！',$array);
}else{
	Response::json(0,'Server Error！');   
}

mysql_close($conn);
?>

