$(function() {
    // 单击 “去注册账号” 的链接
    $('#link_reg').on('click', function() {
      $('.login-box').hide()
      $('.reg-box').show()
    })
  
    // 单击 “去登录” 的链接
    $('#link_login').on('click', function() {
      $('.login-box').show()
      $('.reg-box').hide()
    })



   


    // 下面两条var顺序不能颠倒，且需放到用form和layer的代码的最前面
    // 从 layui 中获取 form 对象
    var form = layui.form
    // 用来美化提示信息
    var layer = layui.layer



    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        // 登录表单form
        // 自定义 pwd 校验规则 （密码校验）
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        
        
        // 注册表单form
        // 校验两次密码是否一致的规则
        repwd: function(value) {
          // value是用户输入的值，形参
          // 需要拿到上面密码框中的内容
          // 然后进行一次两侧输入密码是否相等的判断
          // 判断为假，return一个错误的提示消息
                // jQuery  获取元素内name指向的input的value值  $('元素.class/#id  [name=xxx]').val()     
          var pwd = $('.reg-box [name=password]').val()
          if (pwd !== value) {
            return '两次密码不一致！'
          }
        }
    })





    // post提交
    //     通过远程 HTTP POST 请求载入信息
    //     请求功能以取代复杂 $.ajax ,请求成功时可调用回调函数

    // ajax提交
    //     可以不带任何参数直接使用。回调函数如果要处理.ajax()得到的数据，则需要使用回调函数。

    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径头部，在baseAPI.js文件中



    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
                // 拿到默认事件e
        // 1. 阻止默认的提交行为（固定）
        e.preventDefault()

        // 2. 发起Ajax的POST请求
                // form_reg 注册表单
                // 代码优化，data内容本可直接写进原本位置，因其太长，所以单独拿出来赋给data，再传回去
        var data = {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val() }
        $.post('/api/reguser',data,function(res){
            // 此处判断的status和注册失败返回的res.message都是端口写好的

            if(res.status !== 0){
                //return console.log('注册失败,'+res.message)
                // 将提示信息格式设置成layUI，使其美观。使用时要先在上面定义var layer = layui.layer
                return layer.msg('注册失败,'+res.message)
            }


            // status === 0，则注册成功
            //console.log('注册成功')
            // 将提示信息格式设置成layUI，使其美观。使用时要先在上面定义var
            layer.msg('注册成功,请登录')
            // 模拟人的单击行为，此处是单击‘去登录’，使其注册成功后自动跳转到登录界面
            $('#link_login').click()

        })

    })
   


    // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        // 阻止默认提交行为（固定写法）
        e.preventDefault()
        // ajax，post
        $.ajax({
        url: '/api/login',
        method: 'POST',
        // 快速获取表单中的数据
        // serialize()  将表单内容序列化成一个字符串。
        // 这样在ajax提交表单数据时，就不用一一列举出每一个参数。只需将data参数设置为 $("form").serialize()即可。
        data: $(this).serialize(),
        success: function(res) {
            // status接口定义的内容
            if (res.status !== 0) {
            return layer.msg('登录失败！')
            }
            layer.msg('登录成功！')
            // 将登录成功得到的 token 字符串，保存到 localStorage 中
            // 今后用到token值时，就去localStorage里取
            // setItem('token', res.token)    存数据（'键的名字'，值）
            localStorage.setItem('token', res.token)
            // 跳转到后台主页
            location.href = '/index.html'
        }
        })
    })


  })



