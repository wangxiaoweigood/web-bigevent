$(function () {
    // 点击去注册 添加bnt框
    $('#btn-zc').on('click', function () {
        // console.log(this);
        console.log(1);
        $('#btn-mm').show()
        $('#btn-zc').hide()
        $('#btn-dl').show()
    })
    $('#btn-dl').on('click', function () {
        $('#btn-mm').hide()
        $('#btn-zc').show()
        $('#btn-dl').hide()

    })

})
