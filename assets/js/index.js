// var ae = "http://ajax.frontend.itheima.net";
// console.log(ae + '/my/userinfo');
var layer = layui.layer
$(function () {
    // alert(1)
    // 接口函数
    getUser()
    //退出事件
    $('#tuichu').on('click', function () {
        // console.log(1);
        layer.confirm('确定退出嘛？', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token');
            location.href = '/login.html'
            layer.close(index);
        });
    })
})
function getUser() {
    $.ajax({
        url: 'http://ajax.frontend.itheima.net/my/userinfo',
        method: 'GET',
        headers: {
            Authorization: localStorage.getItem('token' || '')
        },
        success: function (res) {

            if (res.status == 0) {
                layer.msg(res.message)
            } else {
                return layer.msg(res.message)
            }
            console.log(res.data);
            renderAvatar(res.data)
        },
        //不论成功还是失败都会 调用complete回调函数
        complete: function (res) {
            // console.log(res, '执行了回调函数');
            console.log(res.responseJSON);
            //防止用户直接不登录，在网页上输入路径，只要后台访问不到数据库里得账号，直接清空tokrn值并且强制推到登录页面
            if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                localStorage.removeItem('token');
                location.href = '/login.html'
            }
        }

    })

}
//渲染头像函数
function renderAvatar(user) {
    //获取用户得名称
    // console.log(('#userinfo-img').src());
    var name = user.username || user.nickname;
    // console.log(name);
    var add = $('#userinfo-name').html('欢迎' + `&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #000;">${name}</span>`);
    if (user.user_pic !== null) {
        $('#userinfo-img').attr('src', user.user_pic)
        $('#userinfo-img-gr').attr('src', user.user_pic)
    } else {

    }
}
