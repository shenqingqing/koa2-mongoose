const router = require('koa-router')()
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})
const mongoose = require("mongoose");
const TestSchema = new mongoose.Schema({
  name : { type:String },//属性name,类型为String
  age  : { type:Number, default:0 },//属性age,类型为Number,默认为0
  // time : { type:Date, default:Date.now },
  email: { type:String,default:''}
});
const db = mongoose.connect("mongodb://localhost:27017/test");
// 创建Model
const TestModel = mongoose.model("test1", TestSchema);
router.post('/goods', async (ctx) => {
    // app.use(bodyparser())
    const {name, age, email} = ctx.request.body
    ctx.body = await TestModel.create({name, age, email})
    console.log("-----------body-----",ctx.request.body);
})
router.get('/users', async (ctx, next) => {
  let id = ctx.query;
  ctx.body = {
    id,
    data:[{
      id:1,goods:"书包1"
    },
    {
      id:2,goods:"课本"
    },
    {
      id:3,goods:"文具盒"
    }]
  }
})
router.get('/json', async (ctx, next) => {
  ctx.body = {
    // title: 'koa2 json',
    data:[{
      id:1,desc:"我多喜欢你，你会知道 - 阿泱"
    },
    {
      id:2,desc:"说散就散 - 阿泱"
    },
    {
      id:3,desc:"告白气球 - 周杰伦"
    },
    {
      id:4,desc:"刚好遇见你 - 李玉刚"
    },
    {
      id:5,desc:"演员 - 薛之谦"
    }]
  }
})

router.get('/users/:id', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json',
  }
  // User.findOne(ctx.params.id).then(function(user) {
  //   ctx.user = user;
  // });
})
// router.url('user', 3);
module.exports = router
