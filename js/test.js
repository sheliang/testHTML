function() {
	//当使用了 layui.all.js，无需再执行layui.use()方法
	var from = layui.form(),
		layer = layui.layer,
		laytpl = layui.laytpl;

	//	layer.msg("test demo");
	//	layer.open({
	//		title: '在线调试',
	//		content: '可以填写任意的layer代码'
	//	});
	/*分页*/
	layui.laypage({
		cont: "pages",
		pages: 1024 / 10,
		curr: 1,
		groups: 10,
		skin: "#313131",
		prev: false,
		next: false,
		skip: false,
		jump: function(data) {
			console.log(data.curr);
		}
	})
	/*模板引擎*/
	var data = {
		"title": "Layui常用模块",
//		"list": [{ "modname": "弹层", "alias": "layer", "site": "layer.layui.com" }, { "modname": "表单", "alias": "form" }]
		"list": []
	}
	var getTpl = demo.innerHTML;
	laytpl(getTpl).render(data, function(html) {
		view.innerHTML = html;
	});

}();