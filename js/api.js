var api = {
	// 时间格式化
	timeFormat: function(time, fmt) {
		if(!time) {
			return "";
		}
		var d = new Date(time);
		var o = {
			"M+": d.getMonth() + 1, //月份   
			"d+": d.getDate(), //日   
			"h+": d.getHours(), //小时   
			"m+": d.getMinutes(), //分   
			"s+": d.getSeconds(), //秒   
			"q+": Math.floor((d.getMonth() + 3) / 3), //季度   
			"S": d.getMilliseconds() //毫秒   
		};
		if(/(y+)/.test(fmt))
			fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
		for(var k in o)
			if(new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	},
	// ajax 请求
	ajax: function(type, url, opts, callback) {
		// 配置默认地址 - 协议 + IP + 端口
		var base_URL = this.ajax.base_URL || "http://localhost:3600";

		if(window.XDomainRequest) { // IE
			var xhr = new XDomainRequest();
		} else { // webkit
			var xhr = new XMLHttpRequest();
		}
		// 转换大写 避免出错
		type.toLocaleUpperCase();

		if(type == "POST") { // post
			xhr.open(type, base_URL + url);
//			 xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			var form = new FormData();
			for(var key in opts) {
				form.append(key, opts[key]);
			}
			xhr.send(form);
		} else { // get
			var str = "?";
			for(var key in opts) {
				str += key + "=" + opts[key] + "&";
			}
			xhr.open(type, base_URL + url + str);
			xhr.send();
		}

		xhr.onload = function() {
			//			callback(JSON.parse(xhr.responseText));
			callback(xhr.responseText);
		}
		xhr.onerror = function() {
			// console.log("错误了");
		}
		xhr.timeout = function() {
			// console.log("请求超时");
		}
		xhr.onprogress = function() {
			// console.log("请求进行中");/
		}
	},
	// hasClass
	hasClass: function(obj, cls) {
		return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)')) ? true : false;
	},
	// addClass
	addClass: function(obj, cls) {
		if(!api.hasClass(obj, cls)) {
			obj.className += " " + cls;
		}
	},
	// removeClass
	removeClass: function(obj, cls) {
		if(api.hasClass(obj, cls)) {
			var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
			obj.className = obj.className.replace(reg, ' ');
		}
	},
	// toggleClass
	toggleClass: function(obj, cls) {
		if(api.hasClass(obj, cls)) {
			api.removeClass(obj, cls);
		} else {
			api.addClass(obj, cls);
		}
	},
	// 设置cookie
	setCookie: function(name, cookie, day) {
		var d = new Date();
		d.setTime(d.getTime() + (day * 24 * 60 * 60 * 1000));
		var expires = "expires=" + d.toGMTString();
		document.cookie = name + '=' + cookie + ';expires=' + expires;
	},
	// 获取cookie
	getCookie: function(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if(arr = document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
	},
	// 删除cookie
	delCookie: function(name) {
		api.setCookie(name, "", -1);
	},
	// 返回顶部 -- 公共
	scrollTop: function() {
		// 创建图片默认路径
		var img_URL = this.scrollTop.baseURL || "http://omsci5abv.bkt.clouddn.com/backTop.png";
		// 创建HTML代码
		var backTop = document.createElement('a');
		backTop.id = "backTop";
		backTop.href = "javascript:;";
		var html_code = '<img src="' + img_URL + '" />';
		backTop.innerHTML = html_code;
		document.body.appendChild(backTop);
		// 创建CSS代码
		var backTop_style = document.createElement('style');
		var css_code = '#backTop{position:fixed;bottom:30px;right:30px;display:none;transition: display 400ms ease-in-out;}';
		backTop_style.innerHTML = css_code;
		document.getElementsByTagName('head')[0].appendChild(backTop_style);
		// 创建backTop的监听事件
		backTop.onclick = function() {
			timer = setInterval(function() {      
				var osTop = document.documentElement.scrollTop || document.body.scrollTop;      
				var ispeed = Math.floor(-osTop / 7);         
				document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;      
				osTop == 0 ? clearInterval(timer) : "";
			}, 30);
		}
		// 控制显示&&隐藏
		window.onscroll = function() {  //设置定时器
			var top = document.documentElement.scrollTop || document.body.scrollTop;
			backTop.style.display = top > 50 ? "block" : "none";
		}
	},
	init: function() {
		this.scrollTop();
	}
}

// 执行初始化定义
api.init();

var LoadingBar = {
	/*初始化*/
	init: function() {
		this.creatStyle();
		this.creatLoadDiv();
	},
	/*记录当前宽度*/
	width: 0,
	/*页面里LoadingBar div*/
	oLoadDiv: false,
	/*开始*/
	setWidth: function(w) {
		if(!this.oLoadDiv) { this.init(); }
		var oLoadDiv = this.oLoadDiv,
			width = Number(w) || 100;
		/*防止后面写入的width小于前面写入的width*/
		(width < this.width) ? width = this.width: this.width = width;
		oLoadDiv.className = 'animation_paused';
		oLoadDiv.style.width = width + '%';
		oLoadDiv.className = '';
		if(width === 100) { this.over(oLoadDiv); }
	},
	/*页面加载完毕*/
	over: function(obj) {
		setTimeout(function() {
			obj.style.display = 'none';
		}, 1000);
	},
	/*创建load条*/
	creatLoadDiv: function() {
		var div = document.createElement('div');
		div.id = 'LoadingBar';
		document.body.appendChild(div);
		this.oLoadDiv = document.getElementById('LoadingBar');
	},
	/*创建style*/
	creatStyle: function() {
		var nod = document.createElement('style'),
			str = '#LoadingBar{transition:all 1s;-moz-transition:all 1s;-webkit-transition:all 1s;-o-transition:all 1s;background-color:#0cc;height: 3px;width:0; position: fixed;top: 0;z-index: 99999;left: 0;font-size: 0;z-index:9999999;_position:absolute;_top:expression(eval(document.documentElement.scrollTop));}.animation_paused{-webkit-animation-play-state:paused;-moz-animation-play-state:paused;-ms-animation-play-state:paused;animation-play-state:paused;};'
		nod.type = 'text/css';
		//ie下
		nod.styleSheet ? nod.styleSheet.cssText = str : nod.innerHTML = str;
		document.getElementsByTagName('head')[0].appendChild(nod);
	}
}