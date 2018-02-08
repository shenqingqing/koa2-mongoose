var router = require('koa-router')();
var request = require("co-request");
// generator 的定义和函数类似，只是在 function 后面多了一个*
// 调用generator 和调用函数一样，只是不像函数立即执行，而是会生成一个对象
// generator 生成的对象存在一个 next 函数，调用 next 会返回 yield运算的结果对象，并停止。
// 再次调用会在下一个 yield 处停止。
// 当所有的 yield 被执行完，调用 next 函数会返回{ value: undefined, done: true }。再次调用会报错
// var qs = require('querystring');
const URI='https://api.douban.com/v2/movie';
// 路由前缀
router.prefix('/douban');

router.get('/:type', function *(next) {
  // $1是第一个小括号里的 ,$2是第2个小括号里的 
  var url=this.url.replace(/\/douban(\w*)/,URI+'$1');

  // var str="花花飞飞".replace(/([\u4e00-\u9fa5])([\u4e00-\u9fa5])([\u4e00-\u9fa5])([\u4e00-\u9fa5])/,"$4 $3 $2 $1")
  // "飞 飞 花 花"
  // https://segmentfault.com/q/1010000005727586  正则网址
  console.log(':::',url,':::');
  // 通过co-request向微信服务器发出请求 get/post
  // request是非常非常强大的模拟浏览器发送HTTP请求的模块，非常非常强大！！
  // 而co-request，是通过TJ大神写的co模块简单对request包装了下，
  // 实现 yield + promise 优雅实现异步控制流！
  let result = yield request({uri: url, method: this.method});
  this.body = result.body;
});
router.get('/:type/:id', function *(next) {
  var url=this.url.replace(/\/douban(\w*)/,URI+'$1');
  console.log(':::',url,':::');
  let result = yield request({uri: url, method: this.method});
  this.body = result.body;
});
module.exports = router;
// module.exports 初始值为一个空对象 {}
// exports 是指向的 module.exports 的引用
// require() 返回的是 module.exports 而不是 exports