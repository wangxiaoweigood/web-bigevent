
$(function () {
    var layer = layui.layer;
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

    //给button注册点击事件 去选择文件
    $('#but').on('click', function () {
        $('#file').click()
    })
    $('#file').on('change', function (e) {
        console.log(e);
        var fliclist = e.target.files;
        console.log(fliclist);
        if (fliclist.length === 0) {
            return layer.msg('请选择图片')
        }
        var file = e.target.files[0]
        var newImgURL = URL.createObjectURL(file)
        console.log(newImgURL);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

    })

    // $('#btn_qd').on('click', function () {
    //     console.log('1');
    // })
    // $('#btn-qd').on('click', function () {
    //     console.log('1');
    // })
    $('#btn-qd').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        var data = {
            avatar: dataURL
        }
        //    console.log(1);
        $.ajax({
            url: 'http://ajax.frontend.itheima.net/my/update/avatar',
            method: 'POST',
            data,
            headers: {
                Authorization: localStorage.getItem('token' || '')
            },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('上传失败')
                }
                window.parent.getUser()
                return layer.msg(res.message)
            }
        })
    })
})