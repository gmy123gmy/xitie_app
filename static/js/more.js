
var     myScroll,
pullDownEl, pullDownOffset,
pullUpEl, pullUpOffset,
generatedCount = 0;

/**
* 下拉刷新 （自定义实现此方法）
* myScroll.refresh(); 数据加载完成后，调用界面更新方法
*/
function pullDownAction () {
setTimeout( function getDataList(type) {
    
    $.post("#(ctx)/app/basic/getPersonStyleList/?tokenCode=#(tokenCode)",{
        "tokenCode": '#(tokenCode)',
        "pageNumber": $("#page").val(),
        "pageSize": $("#size").val(),
        "type": type,
    },function (jsonList) {
        var html = "";
        $.each(jsonList,function (index,data) {
            if(data.showType == 0){
                html += Public.createStyleOutVidoHTML(data,'#(tokenCode)',false);
            }
            if(data.showType == 1){
                html += Public.createStyleVidoHTML(data,'#(tokenCode)',false);
            }
            if(data.showType == 2){
                html += Public.createStyleMoreImageHTML(data,'#(tokenCode)',false);
            }
            if(data.showType == 3){
                html += Public.createStyleArticHTML(data,'#(tokenCode)',false);
            }
        });
//            console.log(html);
        $("#view").append(html);
        myScroll = new IScroll('#wrapper', { scrollbars: false,
        mouseWheel: true,
        probeType: 2,
        click:true});
        $('.showimageclass a').touchTouch();
        $("#page").val($("#page").val()+1);
    });
}, 1000);  
    alert("more.js")
}

/**
* 滚动翻页 （自定义实现此方法）
* myScroll.refresh();      // 数据加载完成后，调用界面更新方法
*/
function pullUpAction () {
setTimeout(function getDataList(type) {
    
    $.post("#(ctx)/app/basic/getPersonStyleList/?tokenCode=#(tokenCode)",{
        "tokenCode": '#(tokenCode)',
        "pageNumber": $("#page").val(),
        "pageSize": $("#size").val(),
        "type": type,
    },function (jsonList) {
        var html = "";
        $.each(jsonList,function (index,data) {
            if(data.showType == 0){
                html += Public.createStyleOutVidoHTML(data,'#(tokenCode)',false);
            }
            if(data.showType == 1){
                html += Public.createStyleVidoHTML(data,'#(tokenCode)',false);
            }
            if(data.showType == 2){
                html += Public.createStyleMoreImageHTML(data,'#(tokenCode)',false);
            }
            if(data.showType == 3){
                html += Public.createStyleArticHTML(data,'#(tokenCode)',false);
            }
        });
//            console.log(html);
        $("#view").append(html);
        myScroll = new IScroll('#wrapper', { scrollbars: false,
        mouseWheel: true,
        probeType: 2,
        click:true});
        $('.showimageclass a').touchTouch();
        $("#page").val($("#page").val()+1);
    });
}, 1000);  
    alert("more.js")

}

/**
* 初始化iScroll控件
*/
function loaded() {
    pullDownEl = document.getElementById('pullDown');
    pullDownOffset = pullDownEl.offsetHeight;
    pullUpEl = document.getElementById('pullUp');  
    pullUpOffset = pullUpEl.offsetHeight;
    
    myScroll = new iScroll('wrapper', {
        scrollbarClass: 'myScrollbar',
        useTransition: false,
        topOffset: pullDownOffset,
        onRefresh: function () {
            if (pullDownEl.className.match('loading')) {
                pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
            } else if (pullUpEl.className.match('loading')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
            }
        },
        onScrollMove: function () {
            if (this.y > 5 && !pullDownEl.className.match('flip')) {
                pullDownEl.className = 'flip';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
                this.minScrollY = 0;
            } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                this.minScrollY = -pullDownOffset;
            } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                pullUpEl.className = 'flip';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
                this.maxScrollY = this.maxScrollY;
            } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                this.maxScrollY = pullUpOffset;
            }
        },
        onScrollEnd: function () {
            if (pullDownEl.className.match('flip')) {
                pullDownEl.className = 'loading';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';               
                pullDownAction();   // ajax call
            } else if (pullUpEl.className.match('flip')) {
                pullUpEl.className = 'loading';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';               
                pullUpAction(); // ajax call
            }
        }
    });
 
setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

//初始化绑定iScroll控件
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', loaded, false);