$(function () {
    // 点击去注册 添加bnt框
    //点击注册
    $('#btn-font').on('click', function () {
        // console.log(this);
        // show 显示
        // hide 隐藏
        console.log(1);
        $('#zc-box').show()
        $('#btn-zc').hide()
        // $('#btn-dl').show()

    })
    //点击登录
    $('#dl-box').on('click', function () {
        console.log('a');
        // $('#btn-mm').hide()
        $('#zc-box').hide()
        $('#btn-zc').show()

    })

    //自定义表单 验证
    //获取layui里的form属性去操作表单
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
                return '俩次密码不一样'
            }
        }
    })
})
