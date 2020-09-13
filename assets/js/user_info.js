// alert(1)
$(function () {
    //昵称自定义表单验证
    var form = layui.form
    var userId = ''

    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                $('#layui_nc').val('')
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })


    //调用ajax信息
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: 'http://ajax.frontend.itheima.net/my/userinfo',
            headers: {
                Authorization: localStorage.getItem('token' || '')
            },
            success: function (res) {
                console.log(res.data);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                $('#layui_yx').val(res.data.email)
                $('#layui_id').val(res.data.nickname)
                $('#layui_nc').val(res.data.username)
                userId = res.data.id
                // console.log(res.data);

            }
        })
    }
    //重置表单
    $('#layui_cz').on('click', function (e) {
        // 重置表单默认行为
        // console.log('1');
        e.preventDefault()
        initUserInfo()
    })
    //监听表单提交事件
    $('.layui-form').on('submit', function (e) {
        //阻止默认提交行为
        e.preventDefault()
        var data = {
            nickname: $('#layui_nc').val(),
            id: userId,
            email: $('#layui_yx').val()
        }
        console.log($('#layui_nc').val(), $('#layui_id').val(), $('#layui_yx').val());
        // 请求ajax
        $.ajax({
            url: 'http://ajax.frontend.itheima.net/my/userinfo',
            data,
            method: 'POST',
            headers: {
                Authorization: localStorage.getItem('token' || '')
            },
            success: function (res) {
                console.log(res.data);
                if (res.status !== 0) {
                    return layer.msg('更改用户信息失败')
                }
                layer.msg('更改用户信息成功')
                //调用父页面得方法，渲染名字
                window.parent.getUser()
            }
        })
    })
})