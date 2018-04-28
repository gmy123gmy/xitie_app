


//������ظ���
$(function () {
    $("#more").click(function () {
        var page = parseInt($("#page").val());
        $(this).html("加载中...");
        status=$(this).attr("data-status");
        if(status==1) {
            status = $(this).attr("data-status", "0");
            $.ajax({
                type: "post",
                url: "",
                data: "page=" + page,
                dataType: "json",
                success: function (data) {
                    data = data.data;
                    /*数据不够10条隐藏按钮*/
                    if (data.length < 10) {
                        $(this).hide()
                    } else {
                        $("#page").val(page + 1);//记录页码  
                    }
                    insertDiv(data);
                }
            });
        }

    });
});
function insertDiv(data){
    var information = $(".information");
    var html = '';
    for (var i = 0; i < data.length; i++) {
        html +="<div>"+data[i].title+"</div>"+"<div>"+data[i].date+"</div>"
    }
    information.append(html);
    $("#more").html("加载更多");
    $("#more").attr("data-status","1");
}



$(document).ready(function(){
    var ul=$("#footer .foot");
    ul.on("click","li:not(.active)",function(){
        var $active=$("#footer .foot li.active");
        console.log($active);
        $active.removeClass("active");
        $(this).addClass("active");
    })
})

function addReadCount(ADDID){
    var id = "news_" + ADDID;
    $("#" + id).html(Number($("#" + id).html()) + 1)
}


