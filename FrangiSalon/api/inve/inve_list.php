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

	if(isset($_GET['keyText'])){
		$keyText = $_GET['keyText'];
	}else{
		$keyText = "";
	}

	if(isset($_GET['page'])){
		$page = $_GET['page'];
	}else{
		$page = 1;
	}

	if(isset($_GET['limit'])){
		$limit = $_GET['limit'];
	}else{
		$limit = 10;
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

	class invelist {
		var $count;
		var $results;
	}

	$array=[];

	$condition=" from fsalon_inve where deleted='0'";

	if($actID!=""){
		$condition.=" and act='$actID'";
	}

	if($invrID!=""){
		$condition.=" and invr='$invrID'"; 
	}

	if($keyText!=""){
		$condition.=" and (phone='$keyText' or name='$keyText')"; 
	}

	$query="select * ".$condition;
	$query.=" order by updatetime desc limit ". ($page-1)*$limit .", $limit";

	$sql = "select count(*) as amount ".$condition; 
	$sql.= " order by updatetime desc"; 

	$countresult = mysql_query($sql);
	list($count) = mysql_fetch_row($countresult);

	$result = mysql_query($query);
	$results=[];
	while($rows = mysql_fetch_array($result)){
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
		$results[] = $newItem;
	}

	$curlist=new invelist();
	$curlist->count = intval($count);
	$curlist->results = $results;

	Response::json(1,'获取邀请人列表成功！',$curlist);
}else{
	Response::json(0,'Server Error！');   
}

mysql_close($conn);
?>

