window.onload=function(){
	var demo=new Vue({
		el:'#fsalon_invr',
		data(){
			return {
				showListFlag:true,
				invrlist: [],
				actlist:[],
				isCurObj:"",
				isCurObjKey:"",
				FormInvrName:"",
				FormInvrPhone:"",
				FormInvrAct:"",
				isCreate:true,
				ListActUrl: "../api/act/act_list.php",
				ListInvrUrl: "../api/invr/invr_list.php",
				AddInvrUrl: "../api/invr/invr_add.php",
				UpdateInvrUrl: "../api/invr/invr_update.php",
				DeleteInvrUrl: "../api/invr/invr_delete.php"
			} 
		},

		mounted(){
			this.InitActList();
			this.InitInvrList();
		},

		methods:{
			InitActList: function() {
				this.$http.get(this.ListActUrl).then(function(response){
					if (response.data.code == 1) {
						if(response.data.data.length){
							this.actlist = response.data.data;
						}else{
						}
					}else {
						console.log("Server Error");
					}
				},function(response){
					console.log("Error");
				});
			},

			InitInvrList: function() {
				this.$http.get(this.ListInvrUrl).then(function(response){
					if (response.data.code == 1) {
						if(response.data.data.length){
							this.showListFlag = false;
							this.invrlist = response.data.data;
							for(var i=0;i<this.invrlist.length;i++){
								this.invrlist[i].invrmgeurl="http://h5.frangi.cn/FrangiSalon/manage/invitee_mge.html?ID="+this.invrlist[i].keyno;
							}
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
				this.FormInvrName="";
				this.FormInvrPhone="";
				this.FormInvrAct="";
			},

			OpenForm: function(CurObj){
				if(CurObj){
					this.isCreate=false;
					this.isCurObj=CurObj.id;
					this.isCurObjKey=CurObj.keyno;
					this.FormInvrName=CurObj.name;
					this.FormInvrPhone=CurObj.phone;
					this.FormInvrAct=CurObj.act;
				}else{
					this.isCreate=true;
					this.Clearform();
				}
			},

			isCheckForm: function(){
				var mess="";
				if(this.FormInvrName){
					if(this.FormInvrPhone){
						if(this.FormInvrAct){
							return true;
						}else{
							mess="活动信息";
						}
					}else{
						mess="联系方式";
					}
				}else{
					mess="姓名";
				}
				bootoast({message:"请输入完整受邀人"+ mess,type: 'warning',position:'right-top',timeout: true});
				return false;
			},

			SubmitForm:function(){
				if(this.isCheckForm()){
					var SubmitUrl = '';
					var Param = {
						name:this.FormInvrName,
						phone:this.FormInvrPhone,
						act:this.FormInvrAct
					};

					var mess="";

					if(this.isCreate){
						mess="添加";
						SubmitUrl=this.AddInvrUrl;
					}else{
						mess="更新";
						SubmitUrl=this.UpdateInvrUrl;
						Param.key=this.isCurObjKey;
					}

					this.$http.post(SubmitUrl,Param).then(function(response){
						if(response.data.code==1) {
							bootoast({message:mess+"成功！",type: 'success',position:'right-top',timeout: true});
							this.InitInvrList();
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

			DeleteInvr:function(){
				this.$http.post(this.DeleteInvrUrl,{key:this.isCurObjKey}).then(function(response){
					if(response.data.code==1) {
						bootoast({message:"删除成功！",type: 'success',position:'right-top',timeout: true});
						this.InitInvrList();
						this.$refs.ModalCloseBtn.click();
					}else{
						bootoast({message:"删除失败！",type: 'danger',position:'right-top',timeout: true});
						console.log('Server Error');
					}
				},function(response){
					console.log("Error");
				});
			},

			DownTable:function(){
				$("#irlist_table").table2excel({
					exclude: ".noExl",
					name: "FRANGI芙蓉肌品牌沙龙_受邀人名单",
					filename : "FRANGI芙蓉肌品牌沙龙_受邀人名单",    
					exclude_img: true,
					exclude_links: true,
					exclude_inputs: true,
					fileext: ".xls"
				});
			}
		}
	});
}