function ProgressBar(all) {
	if(all.type == 'ring') {
		//画圆方法
		function drawArc(canvas, begin, end, color) {
			canvas.beginPath();
			canvas.lineWidth = 6;
			canvas.fillStyle = "#ffffff";
			canvas.strokeStyle = color;
			canvas.arc(48, 48, 40, begin, end);
			canvas.fill();
			canvas.stroke();
			canvas.closePath();
		}
		
		//添加文字方法  
		function drawWord(canvas, text) {
			canvas.font = 'bold 20px arial';
			canvas.fillStyle = 'black';
			canvas.fillText(text, 30, 53);
		}
		function drawWordAll(canvas, text) {
			canvas.font = 'bold 20px arial';
			canvas.fillStyle = 'white';
			canvas.fillText(text, 30, 53);
		}
		
		//每100毫秒画一次，300毫秒完成  
		function darwPro(id, rate) {
		
			//获取画布对象  
			var progress_bar = document.getElementById("progress_bar");
			progress_bar.style.width = '100px';
			var canv = document.createElement("canvas");
			canv.setAttribute("id", "canv");
			progress_bar.appendChild(canv);
			var canvasID = document.getElementById("canv");
			var canvas = canvasID.getContext("2d");
		
			//先画背景  
			drawArc(canvas, -0.5 * Math.PI, 1.5 * Math.PI, all.background);
		
			//setInterval()函数至少执行一次(当rate为零时直接返回)  
			if (rate == 0) {
				return;
			}
		
			//为了体现动态图使用分段画图的策略  
			var begin = -0.5 * Math.PI; //起始角度  
			var end = 2 * Math.PI * rate - 0.5 * Math.PI; //结束角度  
			var add = 2 * Math.PI * rate / 10; //分段的增量  
			
			//分10次完成每次间隔500毫秒  
			var value = 0;
			var sid = setInterval(function() {
				if (begin >= end) {
					clearInterval(sid);
					all.complete();
					return; //此处必须return；因为即使clearInterval，函数仍然会执行一次导致比例不准确  
				}else {
					drawWordAll(canvas, value + "%");
					value += 10;
					drawWord(canvas, value + "%");
				}
				drawArc(canvas, begin, begin + add, all.foreground);
				//下次起始位置置为上次结束的位置  
				begin = begin + add;
			}, 500);
		
			//显示百分比的文字  
			// drawWord(canvas, rate * 100 + "%");
		}
		
		darwPro("progress_bar", 1);
	}else if(all.type == 'bar') {
		window.onload = function () {
		  var progress_bar = document.getElementById("progress_bar");
		  progress_bar.style.width = '100px';
		  var progress = document.createElement("progress");
		  progress.setAttribute("id", "progressBar");
		  progress.value = '0';
		  progress.max = '100';
		  progress_bar.appendChild(progress);
		  progress.style.backgroundColor = all.background;
		  var mySpan = document.createElement("span");
		  mySpan.setAttribute("id", "mySpan");
		  mySpan.style.height = '20px';
		  progress_bar.after(mySpan);
		  
		  var value = current_progress;
		 
		  mySpan.innerText = value + "%";
		  var ID = setInterval(function () {
			value = progress.value;
			if (value < 100) {
			  value += 10;
			  progress.value = value;
			  mySpan.innerText = value + "%";
			}
			if (value == 100) {
			  all.complete();
			}
		  }, 500);
		}
	}else if(all.type == 'hourglass') {
		window.onload = function () {
			//添加 div
			var progress_bar = document.getElementById("progress_bar");
			progress_bar.style.width = '41px';
			progress_bar.style.backgroundColor = all.background;
			var div1 = document.createElement("div");
			var div2 = document.createElement("div");
			var div3 = document.createElement("div");
		
			//设置 div 属性，如 id
			div1.setAttribute("id", "top");
			progress_bar.appendChild(div1);
			div1.style.borderTopColor = all.foreground;
			div2.setAttribute("id", "bottom");
			progress_bar.appendChild(div2);
			div2.style.borderBottomColor = all.foreground;
			div3.setAttribute("id", "line");
			progress_bar.appendChild(div3);
			div3.style.borderLeftColor = all.foreground;
			
			var mySpan = document.createElement("span");
			mySpan.setAttribute("id", "mySpan");
			mySpan.style.height = '20px';
			progress_bar.after(mySpan);
			
			var ID = setInterval(function () {
			  var value = current_progress;
			  if (value < 100) {
				value += 10;
				mySpan.innerText = value + "%";
			  }
			  if (value == 100) {
				all.complete();
				clearInterval(ID);
			  }
			}, 500);
		}
	}else {
		alert("无此种类型的进度条！")
	}
}