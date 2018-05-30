<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>FRANGI微商申请资料</title>
    <meta name="keywords" content="FRANGI微商申请资料"/>
    <meta name="description" content="FRANGI微商申请资料" />
    <link rel="icon" href="../../IMG/frangi.ico" type="image/x-icon">
    <!-- h5.frangi.cn Baidu tongji analytics -->
    <script src="../../JS/baiduhm.js"></script>
    <style type="text/css">
        html,body{
            margin: 0;
            padding: 0;
        }
        #data_tb
        {
            width:100%;
            border-collapse:collapse;
        }
        #data_tb td, #data_tb th 
        {
            font-size:1em;
            border:1px solid #f3edda;
            padding:3px 7px 2px 7px;
        }
        #data_tb th 
        {
            font-size:1.1em;
            text-align:left;
            padding-top:5px;
            padding-bottom:4px;
            background-color:#ab9165;
            color:#ffffff;
        }
    </style>  
</head> 

<body>
    <table id="data_tb">
       <thead>
           <th>编号</th>
           <th>联系人</th>
           <th>性别</th>
           <th>手机</th>
           <th>微信</th>
           <th>申请时间</th>
       </thead>
       <?php
            $con = mysqli_connect("localhost:3306","h5","a73fb578d8","h5");
            if (!$con) 
            { 
                die("连接错误: " . mysqli_connect_error()); 
            } 
            $sql = "select * from wxapply order by signtime desc;";
            $result = mysqli_query($con,$sql);
            if($result){
                $rowcount=mysqli_num_rows($result);
                printf("共计 %d 条有效数据。",$rowcount);
                for($i=0;$i<$rowcount;$i++){
                    $sql_arr = mysqli_fetch_assoc($result);
                    $id = $sql_arr['id'];
                    $name = $sql_arr['name'];
                    $sex = $sql_arr['sex'];
                    $phone = $sql_arr['phone'];
                    $wx = $sql_arr['wx'];
                    $signtime = $sql_arr['signtime'];
                    echo "<tr><td>$id</td><td>$name</td><td>$sex</td><td>$phone</td><td>$wx</td><td>$signtime</td></tr>";
                }
                mysqli_free_result($result);
            }
            mysqli_close($con);
        ?>
</table>
</body>
</html>
