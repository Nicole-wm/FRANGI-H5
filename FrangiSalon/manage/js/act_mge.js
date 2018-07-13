window.onload=function(){
	var demo=new Vue({
		el:'#fsalon_act',
		data(){
			return {
				showListFlag:true,
				actlist: [],
				isCurObj:"",
				FormActtime:"",
				FormActarea:"",
				FormActaddr:"",
				isCreate:true,
				ListActUrl: "../api/act/act_list.php",
				AddActUrl: "../api/act/act_add.php",
				UpdateActUrl: "../api/act/act_update.php",
				DeleteActUrl: "../api/act/act_delete.php"
			}; 
		},

		mounted(){
			this.InitActList();
			this.dateDefind();
		},

		methods:{
			InitActList: function() {
				this.$http.get(this.ListActUrl).then(function(response){
					if (response.data.code == 1) {
						if(response.data.data.length){
							this.showListFlag = false;
							this.actlist = response.data.data;
						}else{
							this.showListFlag = true;
						}
					}else {
						console.log("Server Error");
					}
				},function(response){
					console.log("Error");
				});
			},

			Clearform:function(){
				this.FormActtime="";
				this.FormActarea="";
				this.FormActaddr="";
			},

			OpenForm: function(CurObj){
				if(CurObj){
					this.isCreate=false;
					this.isCurObj=CurObj.id;
					this.FormActtime=CurObj.activetime;
					this.FormActarea=CurObj.area;
					this.FormActaddr=CurObj.address;
				}else{
					this.isCreate=true;
					this.Clearform();
				}
			},

			isCheckForm: function(){
				var mess="";
				if(this.FormActtime){
					if(this.FormActarea){
						if(this.FormActaddr){
							return true;
						}else{
							mess="地点";
						}
					}else{
						mess="区域";
					}
				}else{
					mess="时间";
				}
				bootoast({message:"请输入完整活动"+ mess,type: 'warning',position:'right-top',timeout: true});
				return false;
			},

			SubmitForm:function(){
				if(this.isCheckForm()){
					var SubmitUrl = '';
					var Param = {
						activetime:this.FormActtime,
						area:this.FormActarea,
						address:this.FormActaddr
					};

					var mess="";

					if(this.isCreate){
						mess="添加";
						SubmitUrl=this.AddActUrl;
					}else{
						mess="更新";
						SubmitUrl=this.UpdateActUrl;
						Param.id=this.isCurObj;
					}

					this.$http.post(SubmitUrl,Param).then(function(response){
						if(response.data.code==1) {
							bootoast({message:mess+"成功！",type: 'success',position:'right-top',timeout: true});
							this.InitActList();
							this.$refs.FormCloseBtn.click();
						}else{
							bootoast({message:mess+"失败！",type: 'danger',position:'right-top',timeout: true});
							console.log('Server Error');
						}
					},function(response){
						console.log("Error");
					});
				}
			},

			DeleteAct:function(){
				this.$http.post(this.DeleteActUrl,{id:this.isCurObj}).then(function(response){
					if(response.data.code==1) {
						bootoast({message:"删除成功！",type: 'success',position:'right-top',timeout: true});
						this.InitActList();
						this.$refs.ModalCloseBtn.click();
					}else{
						bootoast({message:"删除失败！",type: 'danger',position:'right-top',timeout: true});
						console.log('Server Error');
					}
				},function(response){
					console.log("Error");
				});
			},

			dateDefind:function(){
				var d, s;
				var self = this;
				d = new Date();
				s = d.getFullYear() + "-";             
				s = s + (d.getMonth() + 1) + "-";
				s += d.getDate() + " ";       
				s += d.getHours() + ":";     
				s += d.getMinutes() + ":";   
				s += d.getSeconds();        
				self.FormActtime = s;

				$('#act_time').datetimepicker({
					language: 'zh-CN',
					autoclose: 1
				});

				$('#act_time').datetimepicker().on('hide', function (ev) {
					var value = $("#act_time").val();
					self.FormActtime = value;
				});
			}
		}
	});
}