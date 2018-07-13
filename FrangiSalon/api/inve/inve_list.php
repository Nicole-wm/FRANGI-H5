<?php
header("Content-type:text/html;charset=utf-8"); 
include('../conn.php');

if($select){
	if(isset($_GET['actID'])){
		$actID = $_GET['actID'];
	}else{
		$actID = "";
	}

	if(isset($_GET['invrID'])){
		$invrID = $_GET['invrID'];
	}else{
		$invrID = "";
	}

	class inve{
		public $id = "";
		public $name  = "";
		public $phone  = "";
		public $act  = "";
		public $keyno  = "";
		public $invr  = "";
		public $invrname  = "";
		public $invrphone  = "";
		public $activetime  = "";
		public $area  = "";
	}

	$array=[];
	if($actID!=""){
		if($invrID!=""){
			$query = mysql_query("select * from fsalon_inve where deleted='0' and act=".$actID." and invr=".$invrID." order by updatetime desc");
		}else{
			$query = mysql_query("select * from fsalon_inve where deleted='0' and act=".$actID." order by updatetime desc");
		}
	}else{
		if($invrID!=""){
			$query = mysql_query("select * from fsalon_inve where deleted='0' and invr=".$invrID." order by updatetime desc");
		}else{
			$query = mysql_query("select * from fsalon_inve where deleted='0' order by updatetime desc");
		}
	}

	while($rows = mysql_fetch_array($query)){
		$newItem=new inve();
		$newItem->id=$rows['id'];
		$newItem->name=$rows['name'];
		$newItem->phone=$rows['phone'];
		$newItem->act=$rows['act'];
		$newItem->keyno=$rows['keyno'];
		$newItem->invr=$rows['invr'];
		$invrquery = mysql_query("select * from fsalon_invr where id=".$newItem->invr);
		while($invrrows = mysql_fetch_array($invrquery)){
			$newItem->invrname=$invrrows['name'];
			$newItem->invrphone=$invrrows['phone'];
		}
		$actquery = mysql_query("select * from fsalon_act where id=".$newItem->act);
		while($actrows = mysql_fetch_array($actquery)){
			$newItem->activetime=$actrows['activetime'];
			$newItem->area=$actrows['area'];
		}
		$array[] = $newItem;
	}

	Response::json(1,'获取邀请人列表成功！',$array);
}else{
	Response::json(0,'Server Error！');   
}

mysql_close($conn);
?>

