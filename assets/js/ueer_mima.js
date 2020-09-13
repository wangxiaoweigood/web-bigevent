
$(function () {
    //先表单验证
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (val) {
            if (val == $('#ipt-mm').val()) {
                return '新密码和旧密码不可以一样'
            }
        },
        samePmm: function (val) {
            if (val !== $('#ipt-mm').val()) {
                return '俩次密码不一致'
            }
        }
    })

    $('.layui-form').on('submit', function (e) {
        //清除表单默认提交事件
        e.preventDefault()
        var data = {
            //原密码
            oldPwd: $('#layui-input').val(),
            //新密码
            newPwd: $('#layui-xmm').val(),
        }
        console.log(data);
        console.log('旧密码' + $('#layui-input').val(), '新密码' + $('#layui-xmm').val());
        $.ajax({
            url: 'http://ajax.frontend.itheima.net/my/updatepwd',
            method: 'POST',
            data,
            headers: {
                Authorization: localStorage.getItem('token' || '')
            },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message)
                $('.layui-form')[0].reset()
            }

        })

        // } else {
        // layer.confirm('点击确定请重新登录?', { icon: 3, title: '提示' }, function (index) {
        //     layer.close(index);
        //     // localStorage.setItem('token', res.token),
        //     location.href = '../login.html'
        // })
        // }
        // console.log($('#layui-input').val());
    })

})