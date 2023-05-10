$(function() {
  var form = layui.form

  // 自定义layUI判定方法
  form.verify({
    // 自定义格式pwd：密码基本格式
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    
    // 自定义格式samePwd
    samePwd: function(value) {
      if (value === $('[name=oldPwd]').val()) {
        return '新旧密码不能相同！'
      }
    },

    // 自定义格式rePwd
    rePwd: function(value) {
      if (value !== $('[name=newPwd]').val()) {
        return '两次密码不一致！'
      }
    }
  })


  // 提交新密码
  $('.layui-form').on('submit', function(e) {
    // 阻止表单的默认重置行为
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      // 用户输入的数据
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layui.layer.msg('更新密码失败！')
        }
        layui.layer.msg('更新密码成功！')
        // 重置表单（即刷新一下页面，新页面使用用户最新更改的信息界面）
        // .[0] 把jQuery元素转换成原声的DOM元素
        // 拿到DOM元素后调用form表单的reset()方法，重置表单
        $('.layui-form')[0].reset()
      }
    })
  })
})
