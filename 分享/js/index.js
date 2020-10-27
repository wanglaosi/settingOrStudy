//$('.page').height($(window).height());
document.querySelector('body').addEventListener('touchstart',function (ev) {
		event.preventDefault();
	})

document.addEventListener("touchmove", function(e){
	e.preventDefault();
} , false);
 
var curPage = 1;
var PageL = $('.page_box .page').length;
var canTouch = false;
canTouch = true;
 
var startY , endY , diff;
document.body.addEventListener("touchstart", touchStart, false);
document.body.addEventListener("touchmove", touchMove, false);
document.body.addEventListener("touchend", touchEnd, false);
function touchStart(e){
	var touch = e.touches[0];
	startY = touch.pageY;
}  
function touchMove(e){
	//e.preventDefault();
	var touch = e.touches[0];
	endY = touch.pageY;
	diff = endY - startY;
}
// 判断内容显示隐藏
function touchEnd(e){
	if(Math.abs(diff) > 150 && canTouch){
		if(diff > 0){
			if(curPage <= 1){
				return;
			}
			
			$('.page' + curPage).removeClass('inTop outTop inDown outDown hide').addClass('outDown');
			curPage--;
			$('.page' + curPage).removeClass('inTop outTop inDown outDown hide').addClass('inDown');
			
		}else{
			if(curPage >= PageL){
				return;
			}
			
			$('.page' + curPage).removeClass('inTop outTop inDown outDown hide').addClass('outTop');
			curPage++;
			$('.page' + curPage).removeClass('inTop outTop inDown outDown hide').addClass('inTop');
			
			if(curPage >= PageL){
				$('.arrow').hide();
			}else{
				$('.arrow').show();
			}
		}
		canTouch = false;
		setTimeout(function(){
			canTouch = true;
			diff = 0;
			$('.page' + (curPage - 1) + ', .page' + (curPage + 1)).addClass('hide');
		},1000);
	}
}


//传数据
const app = new Vue({
	el:'#app',
	data:{
		name:'',
		userName:'',
		userPhone:'',
		userId:'',
	},
	mounted:function() {
		this.name = this.getFDate("name");
		this.userId = this.getFDate("userid");
		if(this.name==''||this.name == null) {
			this.name = '暂无信息'
		}
	},
	methods:{
		// 提交信息
		isOk: function(){
			if(this.userName!=''&&this.userPhone!="") {
				var isPhone = /^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/;
				var value = $("#change").find("option:selected").val();
				if(!isPhone.test(this.userPhone)){
					showAlert("提交失败", "您的电话填写错误"); 
				}else {
					$.ajax({
						type: "POST",   //post请求
						dataType:"json",
						url: "xxxxx接口地址",
						data: {
							name:this.userName,    //字段1
							phone:this.userPhone,   //字段2
							value:value,
							userid:this.userId
						},
						success: function(data){
							//console.log(data);
							if(data.code == 200) {
								$("input").val('');
								showAlert("提交成功", "请保持电话畅通,稍后尚书客服会与你电话联系"); 
							}else{
								alert(data.message);
							}
						},
						error:function (err) {
							//console.log(err); 
								showAlert("提交成功", "稍后尚书客服会与你电话联系"); 
							//showAlert("提交失败", "请重试或联系管理员..."); 
						}
					})
				}
			}else {
				showAlert("提交失败", "请填写完毕后再点击确定"); 
			}
		},
		//获取URL
		getFDate: function(value) {
			var reg = new RegExp("(^|&)" + value + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) {
				return unescape(decodeURI(r[2]));
			} else {
				return null;
			}
		},
		
	}
})

function showAlert(title,content){
	popTipShow.alert(title,content, ['知道了'],
		function(e){
		  //callback 处理按钮事件		  
		  var button = $(e.target).attr('class');
		  if(button == 'ok'){
			//按下确定按钮执行的操作
			//todo ....
			this.hide();
		  }	
		}
	);
}