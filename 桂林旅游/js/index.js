$(function(){	
	$('.all>li').hover(function(e) {
			$(this).children().stop().slideToggle()
	});
	
	$('.div_show').hide();
	$('.div_show0').show();
	$('nav').on('mousedown', '.nav1', function() {
		$('.div_show').hide();
		$('.div_show'+$(this).index()).fadeIn();
	});
	
	$('.reg').click(function() {
		var name = $('#name').val();
		var phone = $('#phone').val();
		var email = $('#email').val();
		
		if(name=='' || phone =='' || email =='') {
			alert("请填写完整后再点击注册");
			return;
		}
		if(!(/^1[3-9]\d{9}$/.test(phone))){ 
				alert("手机号码有误，请重填");  
				return; 
		} 
		if(!(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(email))){
				alert("邮箱有误，请重填");  
				return; 
		} 
		alert("注册成功！");
		$('#name').val('');
		$('#phone').val('');
		$('#email').val('');
	})
	
	 $(".adds").each(function () { //点击增加的按钮
	 $(this).click(function () {
	 //1.改变数量 
	 var count = parseFloat($(this).parents("tr").find(".span").html());
	 count++;
	 $(this).parent("span").find(".span").html(count);
	 //2.改小计(先找到单价与数量，再相乘，最后放在小计(“.prices”)里)
	 var price = parseFloat($(this).parents("tr").find(".price").html());
	 var money = (price * count);
	 $(this).parents("tr").find(".prices").html(money);
	 });
	 });
	 $(".reduces").each(function () {//点击减少的按钮
	 $(this).click(function () {
	 //1.改变数量 
	 var count = parseFloat($(this).parents("tr").find(".span").html());
	 count--;
	 if (count < 1) { //当数量减到1时不能再减
	 return;
	 }
	 $(this).parent("span").find(".span").html(count);
	 //2.改小计
	 var price = parseFloat($(this).parents("tr").find(".price").html());
	 var money = (price * count);
	 $(this).parents("tr").find(".prices").html(money);
	 total();
	 });
	 });
	 //删除
	 $(".del").each(function () {
	 	$(this).click(function () {
	 		let re = $(this).parents("tr"); //找到要删除的行
	 		if (confirm("你确定删除吗？")) {
	 		re.remove();
	 		}
		});
	});
})
