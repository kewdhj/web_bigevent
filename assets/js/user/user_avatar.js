$(function() {
  var layer = layui.layer


  // cropper基本用法的js内容,看笔记
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)









  // 为上传按钮绑定点击事件
  $('#btnChooseImage').on('click', function() {
    // 点击上传按钮时，模拟点击#file，最终是用#file上传文件
    // 因#file不美观，所以隐藏
    $('#file').click()
  })

  // 为文件选择框绑定 change 事件
  $('#file').on('change', function(e) {
    // 获取用户选择的文件
    var filelist = e.target.files
    // 用户没有选择照片
    if (filelist.length === 0) {
      return layer.msg('您未选择照片')
    }

    // 1. 拿到用户选择的文件
    // .[0] 把jQuery元素转换成原声的DOM元素
    var file = e.target.files[0]
    // 2. 将文件，转化为存放路径
    var imgURL = URL.createObjectURL(file)
    // 3. 重新初始化裁剪区域
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', imgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })




  // 为确定按钮，绑定点击事件
  $('#btnUpload').on('click', function() {
    // 1. 要拿到用户裁剪之后的头像
    var dataURL = $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    // 2. 调用接口，把头像上传到服务器
    $.ajax({
      method: 'POST',
      url: '/my/update/avatar',
      data: {
        // 接口包含的参数 avatar：新头像，base64格式的字符串
        avatar: dataURL
      },
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('更换头像失败！')
        }
        layer.msg('更换头像成功！')
        window.parent.getUserInfo()
      }
    })
  })
})
