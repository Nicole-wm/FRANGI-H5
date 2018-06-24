<?php
header("Content-type:text/html;charset=utf-8"); 
include('conn.php');

if($select){
	$array=[];
	if(isset($_GET['personID'])){
		$personID = $_GET['personID'];
	}else{
		$personID = "";
	}

	if(isset($_GET['actNo'])){
		$actNo = $_GET['actNo'];
	}else{
		$actNo = "";
	}

	if($personID){
		$query = "select count(*) as amount from brandsalon where deleted='0' and keyno=".$personID; 
		$sql = "select * from brandsalon where deleted='0' and keyno=".$personID." order by id desc"; 
	}else if($actNo){
		$query = "select count(*) as amount from brandsalon where deleted='0' and actno=".$actNo; 
		$sql = "select * from brandsalon where deleted='0' and actno=".$actNo." order by id desc"; 
	}else{
		$query = "select count(*) as amount from brandsalon where deleted='0'"; 
		$sql = "select * from brandsalon where deleted='0' order by id desc"; 
	}

	$result = mysql_query($query);
	@list($count) = mysql_fetch_row($result);
	
	if($count){
		$result = mysql_query($sql);
		while ($row = mysql_fetch_array($result)){
			$results[] = $row;
		} 
	}else{
		$results = array();
	}

	class personlist {
		var $count;
		var $results;
	}

	$curlist=new personlist();
	$curlist->count = intval($count);
	$curlist->results = $results;

	Response::json(1,'获取人员列表成功！',$curlist);

}else{
	Response::json(0,'Server Error！');   
}

mysql_close($conn);
?>

