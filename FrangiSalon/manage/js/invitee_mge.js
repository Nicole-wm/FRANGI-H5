window.onload=function(){
	var demo=new Vue({
		el:'#fsalon_inve',
		data(){
			return {
				CurInvrID:"",
				CurInvrKey:"",
				CurInvrName:"",
				CurInvrAct:"",
				CurInvrActText:"",
				CurInvrInvemgeurl:"",
				ShowInvrMge:false,
				SelectAct:"",
				SelectInvr:"",
				SelectText:"",
				showListFlag:true,
				invelist: [],
				invrlist:[],
				actlist:[],
				isCurObj:"",
				FormInveName:"",
				FormInvePhone:"",
				FormInveAct:"",
				FormInveInvr:"",
				isCreate:true,
				ListActUrl: "../api/act/act_list.php",
				ListInvrUrl: "../api/invr/invr_list.php",
				ListInveUrl: "../api/inve/inve_list.php",
				AddInveUrl: "../api/inve/inve_add.php",
				UpdateInveUrl: "../api/inve/inve_update.php",
				DeleteInveUrl: "../api/inve/inve_delete.php",
				CurInvrUrl:"../api/inve/inve_mge.php",
				MgeInvrUrl:"inviter_mge.html",
				pageNo: 1,
				pages:1,
				pageSize:15
			} 
		},
		
		mounted(){
			this.InitActList();
			this.InitInvrList();
			if(this.getQueryString('ID')){
				this.isInvrMge();
			}else{
				this.InitInveList();
			}
		},

		methods:{
			msgListView(curPage){
				this.pageNo = curPage;
				this.InitInveList();
			},

			loadData() {
				console.log("1");
				const options = {
					params: {
						paginate: this.pagination.per_page,
						page: this.pagination.current_page
					}
				}
			},

			getQueryString:function(name){
				let reg = `(^|&)${name}=([^&]*)(&|$)`
				let r = window.location.search.substr(1).match(reg); 
				if (r != null) return unescape(r[2]); return null; 
			},

			isInvrMge:function(){
				if(this.getQueryString('ID')){
					this.CurInvrKey=this.getQueryString('ID');
					this.ShowInvrMge=true;
					this.InitCurInvrList(this.CurInvrKey);
				}
			},

			InitCurInvrList: function(CurKey) {
				GetCurInvrUrl = this.CurInvrUrl+'?invrkey='+CurKey;
				this.$http.get(GetCurInvrUrl).then(function(response){
					if (response.data.code == 1) {
						if(response.data.data){
							var CurObj=response.data.data;
							this.CurInvrID=CurObj.id;
							this.CurInvrName=CurObj.name;
							this.CurInvrAct=CurObj.act;
							this.CurInvrActText=CurObj.activetime+" "+CurObj.area;
							this.CurInvrInvemgeurl="http://h5.frangi.cn/FrangiSalon/invitation/"+CurObj.act+"/index.html?ID="+CurObj.keyno;
							this.InitInveList({invrID:CurObj.id});
						}else{
						}
					}else {
						console.log("Server Error");
					}
				},function(response){
					console.log("Error");
				});
			},

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
							this.invrlist = response.data.data;
						}else{
						}
					}else {
						console.log("Server Error");
					}
				},function(response){
					console.log("Error");
				});
			},

			InitInveList: function(param) {
				var GetInveUrl = this.ListInveUrl;
				var CurParam={
					actID:'',
					invrID:'',
					keyText:'',
					page:1,
					limit:this.pageSize
				}

				if(param){
					if(param.actID){
						CurParam.actID=param.actID;
					}
					if(param.invrID){
						CurParam.invrID=param.invrID;
					}
					if(param.keyText){
						CurParam.keyText=param.keyText;
					}
					if(param.page){
						CurParam.page=param.page;
					}
					if(param.limit){
						CurParam.limit=param.limit;
					}
				}else{
					CurParam={
						actID:this.SelectAct,
						invrID:this.SelectInvr,
						keyText:this.SelectText,
						page:this.pageNo,
						limit:this.pageSize
					}
				}

				if(this.CurInvrKey){
					CurParam.actID=this.CurInvrAct;
					CurParam.invrID=this.CurInvrID;
				}

				GetInveUrl = this.ListInveUrl+'?actID='+CurParam.actID+'&invrID='+CurParam.invrID+'&keyText='+CurParam.keyText+'&page='+CurParam.page+'&limit='+CurParam.limit;
				this.$http.get(GetInveUrl).then(function(response){
					if (response.data.code == 1) {
						if(response.data.data.count){
							var totalItems=response.data.data.count;
							this.pages=Math.ceil(totalItems/this.pageSize);
							this.showListFlag = false;
							this.invelist = response.data.data.results;
							for(var i=0;i<this.invelist.length;i++){
								this.invelist[i].invemgeurl="http://h5.frangi.cn/FrangiSalon/invitation/"+this.invelist[i].act+"/index.html?ID="+this.invelist[i].keyno;
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
				this.FormInveName="";
				this.FormInvePhone="";
				this.FormInveAct="";
				this.FormInveInvr=""
			},

			OpenForm: function(CurObj){
				if(CurObj){
					this.isCreate=false;
					this.isCurObj=CurObj.id;
					this.FormInveName=CurObj.name;
					this.FormInvePhone=CurObj.phone;
					this.FormInveAct=CurObj.act;
					this.FormInveInvr=CurObj.invr;
				}else{
					this.isCreate=true;
					this.Clearform();
				}
			},

			isCheckForm: function(){
				var mess="";
				if(this.FormInveName){
					if(this.FormInvePhone){
						if(this.FormInveAct){
							if(this.FormInveInvr){
								return true;
							}else{
								mess="受邀人";
							}
						}else{
							mess="活动信息";
						}
					}else{
						mess="联系方式";
					}
				}else{
					mess="姓名";
				}
				bootoast({message:"请输入完整邀请人"+ mess,type: 'warning',position:'right-top',timeout: true});
				return false;
			},

			SubmitForm:function(){
				if(this.CurInvrKey){
					this.FormInveAct=this.CurInvrAct;
					this.FormInveInvr=this.CurInvrID;
				}
				if(this.isCheckForm()){
					var SubmitUrl = '';
					var Param = {
						name:this.FormInveName,
						phone:this.FormInvePhone,
						act:this.FormInveAct,
						invr:this.FormInveInvr
					};

					var mess="";

					if(this.isCreate){
						mess="添加";
						SubmitUrl=this.AddInveUrl;
					}else{
						mess="更新";
						SubmitUrl=this.UpdateInveUrl;
						Param.id=this.isCurObj;
					}

					this.$http.post(SubmitUrl,Param).then(function(response){
						if(response.data.code==1) {
							bootoast({message:mess+"成功！",type: 'success',position:'right-top',timeout: true});
							this.InitInveList();
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

			DeleteInve:function(){
				this.$http.post(this.DeleteInveUrl,{id:this.isCurObj}).then(function(response){
					if(response.data.code==1) {
						bootoast({message:"删除成功！",type: 'success',position:'right-top',timeout: true});
						this.InitInveList();
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
					name: "FRANGI芙蓉肌品牌沙龙_邀请人名单",
					filename : "FRANGI芙蓉肌品牌沙龙_邀请人名单",    
					exclude_img: true,
					exclude_links: true,
					exclude_inputs: true,
					fileext: ".xls"
				});
			},

			SelectInve:function(){
				this.pageNo = 1;
				if(this.$refs.mypagenav){
					this.$refs.mypagenav.goPage(1);
				}
				this.InitInveList();
			},

			ToInvr:function(){
				window.open(this.MgeInvrUrl);
			}
		}
	});
}