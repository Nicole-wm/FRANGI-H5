window.onload=function(){
	var demo=new Vue({
		el:'#fsalon_sign',
		data(){
			return {
				checkKey:"",
				checkUrl: "../api/inve/inve_check.php"
			}; 
		},

		mounted(){
		},

		methods:{
			check:function(){
				this.$http.post(this.checkUrl,{checkKey:this.checkKey}).then(function(response){
					if(response.data.code==1) {
						bootoast({message:"验证成功！",type: 'success',position:'right-top',timeout: true});
					}else{
						bootoast({message:"验证失败！",type: 'danger',position:'right-top',timeout: true});
					}
				},function(response){
					console.log("Error");
				});
			}
		}
	});
}