<?php
header("Content-type:text/html;charset=utf-8"); 
include('../conn.php');

if($select){
	if(isset($_GET['checkKey'])){
		$checkKey = $_GET['checkKey'];
	}else{
		$checkKey = "";
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
		public $signtime  = "";
	}

	$query = mysql_query("select * from fsalon_inve where id='$checkKey'");
	$row=mysql_fetch_array($query);
	$newItem=new inve();
	$newItem->id=$row['id'];
	$curTime=time();
	$execsign="update fsalon_inve set signtime='$curTime' where id='$id'";
	$resultsign=mysql_query($execsign);

	if($result){
		$newItem->name=$row['name'];
		$newItem->phone=$row['phone'];
		$newItem->act=$row['act'];
		$newItem->keyno=$row['keyno'];
		$newItem->invr=$row['invr'];
		$newItem->signtime=$row['signtime'];
		$invrquery = mysql_query("select * from fsalon_invr where id=".$newItem->invr);
		$invrrows=mysql_fetch_array($invrquery);
		$newItem->invrname=$invrrows['name'];
		$newItem->invrphone=$invrrows['phone'];

		$actquery = mysql_query("select * from fsalon_act where id=".$newItem->act);
		$actrows=mysql_fetch_array($actquery);
		$newItem->activetime=$actrows['activetime'];
		$newItem->area=$actrows['area'];
		$array[] = $newItem;
		Response::json(1,'更新签到时间！','');
	}else{
		Response::json(0,'更新签到时间，重新更新！','');
		
	}

	Response::json(1,'获取信息成功！',$array);
}else{
	Response::json(0,'Server Error！');   
}

mysql_close($conn);
?>

