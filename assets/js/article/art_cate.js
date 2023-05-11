$(function() {
  var layer = layui.layer
  var form = layui.form

  initArtCateList()


  // 获取文章分类的列表
  function initArtCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function(res) {
        // template.js 一款 JavaScript 模板引擎,简单,好用.提供一套模板语法,用户可以写一个模板区块,每次根据传入的数据,生成对应数据产生的HTML片段,渲染不同的效果
        var htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
      }
    })
  }



  // 为添加类别按钮绑定点击事件
  var indexAdd = null
  $('#btnAddCate').on('click', function() {
    // layUI自带的弹出页面格式  layer.open({})
    indexAdd = layer.open({
      // type: 1  页面层，
      type: 1,
      // 指定宽高
      area: ['500px', '250px'],
      title: '添加文章分类',
      // 单击#btnAddCate按钮时，向页面追加form表单
      content: $('#dialog-add').html()
    })
  })

  // 通过代理的形式，为 form-add 表单绑定 submit 事件
  $('body').on('submit', '#form-add', function(e) {
    // 阻止表单默认提交
    e.preventDefault()

    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('新增分类失败！')
        }

        // 重新获取列表数据
        initArtCateList()
        layer.msg('新增分类成功！')
        // 根据索引，layUI的close()关闭对应的弹出层
        layer.close(indexAdd)
      }
    })
  })


  
  // 通过代理的形式，为 btn-edit 按钮绑定点击事件
  var indexEdit = null
  $('tbody').on('click', '.btn-edit', function() {
    // 弹出一个修改文章分类信息的层
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#dialog-edit').html()
    })
    // 拿到用户选择数据的id
    var id = $(this).attr('data-id')
    // 发起请求获取对应分类的数据
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + id,
      success: function(res) {
        form.val('form-edit', res.data)
      }
    })
  })

  // 通过代理的形式，为修改分类的表单绑定 submit 事件
  $('body').on('submit', '#form-edit', function(e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      // 快速拿到表单当前数据
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('更新分类数据失败！')
        }
        layer.msg('更新分类数据成功！')
        // layUI 关闭弹出层
        layer.close(indexEdit)
        // 刷新表格数据，更改为新修改的表格内容
        initArtCateList()
      }
    })
  })

  // 通过代理的形式，为删除按钮绑定点击事件
  $('tbody').on('click', '.btn-delete', function() {
    // 获取当前按钮的data-id，以便定位表格的哪一行
    var id = $(this).attr('data-id')
    // layUI 弹出框 提示用户是否要删除
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + id,
        success: function(res) {
          if (res.status !== 0) {
            return layer.msg('删除分类失败！')
          }
          layer.msg('删除分类成功！')
          // layUI 关闭弹出层
          layer.close(index)
          // 刷新表格数据，更改为新修改的表格内容
          initArtCateList()
        }
      })
    })
  })
})


  
