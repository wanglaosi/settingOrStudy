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
function submit() {
	var name = document.getElementsByClassName('name')[0].value;
	var phone = document.getElementsByClassName('phone')[0].value;
	var client_name = document.getElementsByClassName('client_name')[0].value;
	var client_phone = document.getElementsByClassName('client_phone')[0].value;
	
	var reg = /(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^((\(\d{3}\))|(\d{3}\-))?(1[3578]\d{9})$)|(^(400)-(\d{3})-(\d{4})(.)(\d{1,4})$)|(^(400)-(\d{3})-(\d{4}$))/
	// var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
	// var isMob=/^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
	
	if(name!=''&&phone!=''&&client_name!=''&&client_phone!='') {
		//if(!isPhone.test(phone)&&!isMob.test(phone)) {
		if(!reg.test(phone)){
			showAlert("提交失败", "您的电话填写错误"); 
		//}else if(!isPhone.test(client_phone)&&!isMob.test(client_phone)) {
		}else if(!reg.test(client_phone)){
			showAlert("提交失败", "客户电话填写错误"); 
		}else{
			$.ajax({
				type: "POST",
				dataType:"json",
				url: "http://api.hubushilang.com/v1/sl_help/AddIntermediaryClient",
				data: {
					name:name, 
					phone:phone,
					client_name:client_name,
					client_phone:client_phone
				},
				success: function(data){
					//console.log(data);
					if(data.code == 200) {
						showAlert("提交成功", name + "已成功推荐了客户。"); 
						$(".wow").val('');
					}else{
					alert(data.message);
					}
				},
				error:function (err) {
					//console.log(err); 
					showAlert("提交失败","请重试或联系管理员..."); 
				}
			})
		}
	}else {
		showAlert("友情提醒","请填写完毕后，再点击提交"); 
	}
}