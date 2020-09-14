// alert('1')
$(function () {
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
                if (res.status != 0) {
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
                     <button type="button" id="but-bj" class="layui-btn  layui-btn-xs">编辑</button>
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
                    layer.msg(res.message)
                    loadListData()
                }

            })

        })
    }

    loadListData();
    initDelClick();

    // $.ajax({
    //     url: 'http://ajax.frontend.itheima.net/my/article/cates',
    //     method: 'GET',
    //     headers: {
    //         Authorization: localStorage.getItem('token' || '')
    //     },
    //     success: function (res) {
    //         // console.log(res);
    //         if (res.status != 0) {
    //             layer.msg(res.message)
    //         }

    //         function rener() {
    //             $.each(res.data, function (i, item) {
    //                 // console.log(item);
    //                 data +=
    //                     `
    //                      <tr>
    //                          <td>${item.name}</td>
    //                          <td>${item.alias}</td>
    //                          <td>
    //                          <button type="button" id="but-bj" class="layui-btn  layui-btn-xs">编辑</button>
    //                          <button type="button" 
    //                          data-iid="${item.Id}"
    //                          id="but-sc" class="layui-btn  layui-btn-xs  layui-btn-danger">删除</button>
    //                          </td>
    //                      </tr>

    //                 `

    //                 // console.log(item.Id);
    //                 //  console.log(res);

    //             })
    //             $('tbody').empty().append(data)
    //         }

    //         rener()
    //         $('.layui-card-body').on('click', '#but-sc', function () {
    //             var data = $(this).attr('data-iid');
    //             // console.log(datb);
    //             $.ajax({
    //                 method: 'GET',
    //                 url: 'http://ajax.frontend.itheima.net/my/article/deletecate/' + data,
    //                 headers: {
    //                     Authorization: localStorage.getItem('token' || '')
    //                 },

    //                 success: function (res) {
    //                     rener()
    //                     if (res.status !== 0) {
    //                         return layer.msg(res.message)
    //                     }
    //                     return layer.msg(res.message)

    //                 }

    //             })

    //         })
    //     }

    // })

})