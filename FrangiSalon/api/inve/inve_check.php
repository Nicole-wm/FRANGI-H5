<?php
header("Content-type:text/html;charset=utf-8"); 
include('../conn.php');

if($select){
	$content = file_get_contents("php://input");
	$obj=json_decode($content);
	$checkKey = $obj->{'checkKey'};

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

	$array=[];

	$query = mysql_query("select * from fsalon_inve where keyno='$checkKey' or phone='$checkKey' or name='$checkKey'");
	while($row = mysql_fetch_array($query)){
		$newItem=new inve();
		$newItem->id=$row['id'];
		$newItem->name=$row['name'];
		$newItem->phone=$row['phone'];
		$newItem->act=$row['act'];
		$newItem->keyno=$row['keyno'];
		$newItem->invr=$row['invr'];
		$CurTime=date('Y-m-d H:i:s',time());
		if(isset($row['signtime'])){
			$newItem->signtime=$row['signtime'];
		}else{
			$resultsign=mysql_query("update fsalon_inve set signtime=now() where id=".$newItem->id);
			if($resultsign){
				$newItem->signtime=$CurTime;
			}else{
				Response::json(0,'更新签到时间失败，重新更新！','');
			}
		}
		$invrquery = mysql_query("select * from fsalon_invr where id=".$newItem->invr);
		$invrrows=mysql_fetch_array($invrquery);
		$newItem->invrname=$invrrows['name'];
		$newItem->invrphone=$invrrows['phone'];
		$actquery = mysql_query("select * from fsalon_act where id=".$newItem->act);
		$actrows=mysql_fetch_array($actquery);
		$newItem->activetime=$actrows['activetime'];
		$newItem->area=$actrows['area'];
		$array[] = $newItem;
	}
	Response::json(1,'获取信息成功！',$array);
	//$newItem=new inve();
	//$query = mysql_query("select * from fsalon_inve where keyno='$checkKey' or phone='$checkKey' or name='$checkKey'");
	// while($row = mysql_fetch_array($query)){
	// 	$newItem->id=$row['id'];
	// 	$newItem->name=$row['name'];
	// 	$newItem->phone=$row['phone'];
	// 	$newItem->act=$row['act'];
	// 	$newItem->keyno=$row['keyno'];
	// 	$newItem->invr=$row['invr'];
	// 	$newItem->signtime=$row['signtime'];
	// }
	// $curTime=time();
	// $resultsign=mysql_query("update fsalon_inve set signtime=now() where id=".$newItem->id);

	// if($resultsign){
	// 	$invrquery = mysql_query("select * from fsalon_invr where id=".$newItem->invr);
	// 	$invrrows=mysql_fetch_array($invrquery);
	// 	$newItem->invrname=$invrrows['name'];
	// 	$newItem->invrphone=$invrrows['phone'];
	// 	$actquery = mysql_query("select * from fsalon_act where id=".$newItem->act);
	// 	$actrows=mysql_fetch_array($actquery);
	// 	$newItem->activetime=$actrows['activetime'];
	// 	$newItem->area=$actrows['area'];
	// 	$array[] = $newItem;
	// 	Response::json(1,'更新签到时间成功！',$array);
	// }else{
	// 	Response::json(0,'更新签到时间失败，重新更新！','');

	// }
}else{
	Response::json(0,'Server Error！');   
}

mysql_close($conn);
?>

