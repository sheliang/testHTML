/* 返回数组中指定元素下标 */
Array.prototype.indexOf = function(val) {
	for(var i = 0, len = this.length; i < len; i++) {
		if(this[i] == val) return i;
	}
	return -1;
};
/* 删除数组中指定元素 */
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if(index > -1) {
		this.splice(index, 1);
	}
};