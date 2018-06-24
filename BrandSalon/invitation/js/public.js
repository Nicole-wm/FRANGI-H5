/*滑屏-主*/
var swiper1 = new Swiper('.swiper-container', {
	paginationClickable: true,
	direction: 'vertical',
	lazyLoading : true,
	mousewheelControl : true,
	onInit: function(swiper){
		swiperAnimateCache(swiper);  
		swiperAnimate(swiper);
	}, 
	onSlideChangeEnd: function(swiper){ 
		swiperAnimate(swiper);
	}
});
/*微信内-自动播放*/
function autoPlayAudio(id) {
	var audio=document.getElementById(id);
	wx.config({
		debug: false,
		appId: '',
		timestamp: 1,
		nonceStr: '',
		signature: '',
		jsApiList: []
	});
	wx.ready(function() {
		audio.play();
	});
}
/*背景音乐-自动播放*/
autoPlayAudio("music-bg");
/*背景音乐-播放暂停*/
function MusicBgClick(){
	if($(".icon-music").attr("play") == "1"){
		$(".icon-music").removeClass("open");
		$(".icon-music").attr("play","0")
		document.getElementById("music-bg").pause();
	}else{
		$(".icon-music").attr("play","1");
		$(".icon-music").addClass("open");
		document.getElementById("music-bg").play();
	}
};