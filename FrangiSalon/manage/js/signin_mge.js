window.onload=function(){
	var demo=new Vue({
		el:'#fsalon_sign',
		data(){
			return {
				CurInve:[],
				checkKey:"",
				checkUrl: "../api/inve/inve_check.php",
				showCheckT:false,
				showCheckF:false
			}; 
		},

		mounted(){
		},

		methods:{
			check:function(){
				this.$http.post(this.checkUrl,{checkKey:this.checkKey}).then(function(response){
					if(response.data.code==1) {
						if(response.data.data.length==0){
							bootoast({message:"签到失败！",type: 'danger',position:'right-top',timeout: true});
							this.showCheckF=true;
							this.showCheckT=false;
						}else{
							bootoast({message:"签到成功！",type: 'success',position:'right-top',timeout: true});
							this.CurInve=response.data.data;
							this.showCheckT=true;
							this.showCheckF=false;
						}
					}else{
						bootoast({message:"签到失败！",type: 'danger',position:'right-top',timeout: true});
						this.showCheckF=true;
						this.showCheckT=false;
					}
				},function(response){
					console.log("Error");
				});
			}
		}
	});
}