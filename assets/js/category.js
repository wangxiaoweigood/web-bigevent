// alert('1')
$(function () {
    var indexEdit = null
    var form = layui.form
    var layer = layui.layer
    // 第一个方法，负责获取列表数据
    // 第二个方法，负责根据列表数据渲染视图
    // 第三个方法，负责处理删除事件

    // 负责获取列表数据
    function loadListData() {
        $.ajax({
            url: 'http://ajax.frontend.itheima.net/my/article/cates',
            method: 'GET',
            headers: {
                Authorization: localStorage.getItem('token' || '')
            },
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg(res.message)
                }
                renderList(res.data)
            }
        })
    }

    // 负责根据列表数据渲染视图
    function renderList(listData) {
        $('tbody').empty();
        var template = "";
        $.each(listData, function (i, item) {
            // console.log(item);
            template +=
                `
                 <tr>
                     <td>${item.name}</td>
                     <td>${item.alias}</td>
                     <td>
                     <button  data-bj=${item.Id} type="button" id="but-bj"  class="layui-btn layui-btn-xs">编辑</button>
                     <button type="button" 
                     data-iid="${item.Id}"
                     id="but-sc" class="layui-btn  layui-btn-xs  layui-btn-danger">删除</button>
                     </td>
                 </tr>
      
            `
        })
        $('tbody').append(template)
    }

    // 负责处理删除事件
    function initDelClick() {
        $('.layui-card-body').on('click', '#but-sc', function () {
            var data = $(this).attr('data-iid');
            // console.log(datb);
            $.ajax({
                method: 'GET',
                url: 'http://ajax.frontend.itheima.net/my/article/deletecate/' + data,
                headers: {
                    Authorization: localStorage.getItem('token' || '')
                },

                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    // layer.msg(res.message)
                    layer.msg(res.message)
                    loadListData()
                }

            })

        })
    }


    //封装弹出层
    var indexAdd = null;
    function popUp() {
        //弹出层
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $("#pop-up").html(),
        })
    }

    // 处理编辑渲染Form表单数据同步 
    var indexAdd = null;
    function editor() {
        $('.layui-card-body').on('click', '#but-bj', function () {
            // popUp()
            //弹出层
            indexAdd = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '修改文章分类',
                content: $("#editorAdd").html(),
            })
            var id = $(this).attr('data-bj')
            // console.log(id);
            //渲染弹出层里得内容数据
            $.ajax({
                url: 'http://ajax.frontend.itheima.net/my/article/cates/' + id,
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem('token' || '')
                },
                success: function (res) {
                    // console.log(res.message);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    console.log(res.message);
                    // layer.msg(res.message)
                    // iayui里快速渲染表单方法
                    form.val('form-edit', res.data)
                }
            })

            loadListData()
        })

    }

    //点击编辑修改里得内容
    function modifyThe() {
        $('body').on('submit', '#form-add', function (e) {
            e.preventDefault()
            $.ajax({
                url: 'http://ajax.frontend.itheima.net/my/article/updatecate',
                method: 'POST',
                data: $(this).serialize(),
                headers: {
                    Authorization: localStorage.getItem('token' || '')
                },
                success: function (res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    loadListData();
                    layer.close(indexAdd)

                }

            })

        })

    }
    //添加类别模块
    function addCategory() {
        $('#add').on('click', function () {
            console.log(1);
            popUp();
        })
        $('body').on('submit', '#form-add', function (e) {
            e.preventDefault()
            console.log(1);
            $.ajax({
                url: 'http://ajax.frontend.itheima.net/my/article/addcates',
                method: 'POST',
                data: $(this).serialize(),
                headers: {
                    Authorization: localStorage.getItem('token' || '')
                },
                success: function (res) {
                    console.log(res.message);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    // layer.mag(res.message)
                    layer.msg(res.message)
                    layer.close(indexAdd)
                }
            })
            loadListData()
        })
    }
    editor()
    loadListData();
    initDelClick();
    addCategory();
    modifyThe()
})