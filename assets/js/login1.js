$(function () {
    // 点击去注册 添加bnt框
    //点击注册
    // var layui = layui.layui
    $('#btn-font').on('click', function () {
        // console.log(this);
        // show 显示
        // hide 隐藏
        console.log(1);
        $('#zc-box').show()
        $('#btn-zc').hide()
    })
    //点击登录
    $('#dl-box').on('click', function () {
        $('#zc-box').hide()
        $('#btn-zc').show()

    })

    //自定义表单 验证
    //获取layui里的form属性去操作表单
    // var httm = 'http://ajax.frontend.itheima.net'
    //提示框
    var form = layui.form
    //给密码框编写自定义正则
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //校验俩次密码是否一样
        rewper: function (value) {
            // console.log(value);
            var pwd = $('#zc-box [name=password]').val()
            console.log(pwd);
            if (pwd !== value) {
                $('#zc-box [name=password]').val('');
                return '俩次密码不一样'

            }
        }
    })

    //注册模块监听登录表单的提交事件
    // $('#form_bd').submit(function (e) {
    $('#form_bd').on('submit', function (e) {
        // e.preventDefault();
        e.preventDefault()
        var data = {
            username: $('#zc-box [name=identity]').val(),
            password: $('#zc-box [name=password]').val()
        }
        $.post('http://ajax.frontend.itheima.net/api/reguser', data,

            function (res) {
                console.log(res);
                if (res.status !== 0) return console.log(res.message);
            }

        )
        layer.msg('注册成功，请登录！')
        $('#dl-box').click()
    })
    //监听登录页面提交信息
    $('#btn-zc').on('submit', function (e) {
        e.preventDefault()
        var data = {
            username: $('#form_login [name=identity]').val(),
            password: $('#form_login [name=password]').val()
        }
        $.ajax({

            url: 'http://ajax.frontend.itheima.net/api/login', data,
            method: 'POST',
            success: function (res) {
                if (res.status !== 0) return layer.msg('登录失败!');
                layer.msg('登录成功!')
                console.log(res.token);
                //将获取到得token值保存到localStorage里.token相当于一个钥匙
                localStorage.setItem('token', res.token)
                location.href = './index.html'
            }
        })
    })
})
