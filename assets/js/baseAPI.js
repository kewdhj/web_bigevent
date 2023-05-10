// 每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，会先调用 ajaxPrefilter 这个函数，拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options){

    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    //console.log(options.url)


    // 统一为有权限的接口，设置 headers 请求头
    // 包含 /my 路径才可加上headers

if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
}


// 全局统一挂载 complete 回调函数
  options.complete = function(res) {
    // console.log('执行了 complete 回调：')
    // console.log(res)
    // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      // 1. 强制清空 token
      localStorage.removeItem('token')
      // 2. 强制跳转到登录页面
      location.href = '/login.html'
    }
  }

})


// 以   /api   开头的路径，不需要访问权限
// 以   /my    开头的路径，需在请求头中带/Authorizaiton身份认证字段，才能正常访问成功



