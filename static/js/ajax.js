$(function () {  
    $("#more").click(function () {  
        var page = parseInt($("#page").val());  
        $(this).html("加载中...");  
        status=$(this).attr("data-status");  
        if(status==1) {  
            status = $(this).attr("data-status", "0");  
            $.ajax({  
                type: "post",  
                url: "XXX",  
                data: "page=" + page,  
                dataType: "json",  
                success: function (data) {  
                    data = data.data;  
                    /*数据不够10条隐藏按钮*/  
                    if (data.length < 10) {  
                        $(this).hide()  
                    } else {  
                        $("#page").val(page + 1);//记录页码  
                    }  
                    insertDiv(data);  
                }  
            });  
        }  

    });  
});  
    function insertDiv(data){  
        var list = $(".list");  
        var html = '';  
        for (var i = 0; i < data.length; i++) {  
            // data[i].url 图片路径  data[i].title  文章标题   data[i].time 活动时间  data[i].count  参与人数  data[i].addr 活动地址
            html += '<li class="content"><img class="img_view" src="' + data[i].url + '" /><div class="infor"><ul><li class="title">' + data[i].title + '</li><div class="small"><li class="lis"><span class="glyphicon glyphicon-calendar time"></span><span class="info ">' + data[i].time + '</span></li><li  class="lis"><span class="glyphicon glyphicon-user user"></span><span class="info">' + data[i].count + '人参与活动</span></li><li  class="lis"><span class="glyphicon glyphicon-map-marker gelo"></span><span class="info">' + data[i].addr + '</span></li></div></ul></div><div class="clear"></div></li><div class="border"></div>'
        }  
        list.append(html);  
        $("#more").html("加载更多");  
        $("#more").attr("data-status","1");  
    }  