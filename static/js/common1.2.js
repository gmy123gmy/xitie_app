/*** 通用JS  ***/
var Public = Public || {};
/**
 * AJAX数据提交
 */
Public.ajaxPost = function(url, params, callback){    
	$.ajax({  
	   type: "POST",
	   url: url,
	   data: params, 
	   dataType: "json",  
	   success: function(data, status) {  
		   callback(data);  
	   },  
	   error: function(xhr, error) {
		   layer.closeAll();
		   Public.notice('操作失败，请稍候再试');
	   }  
	});  
}; 

/**
 * page AJAX数据提交
 */
Public.ajaxPagePost = function(url,data,params,callback){
	if(params == null || params == undefined || params == ""){		
		params = {};
	}
	params.pageSize = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
	params.start = data.start;//开始的记录序号
	params.pageNumber = (data.start / data.length)+1;//当前页码
	$.ajax({  
		type: "POST",
		url: url,
		data: params, 
		dataType: "json",  
		success: function(result, status) {  
		  var returnData = {};
		  returnData.draw = result.draw;//这里直接自行返回了draw计数器,应该由后台返回
		  returnData.recordsTotal = result.totalRow;//返回数据全部记录
		  returnData.recordsFiltered = result.totalRow;//后台不实现过滤功能，每次查询均视作全部结果
		  returnData.data = result.list;//返回的数据列表
		  //console.log(returnData);
		  //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
		  //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
		  callback(returnData);
		},  
		error: function(xhr, error) {
			layer.closeAll();
			Public.notice('操作失败，请稍候再试');
		}  
	});  
}; 

Public.notEmptyVal = function (checkVal){
    if(checkVal!=null&&checkVal!=""&&checkVal!="undefined" && checkVal !=NaN){
        return true;
    }else{
        return false;
    }
}

Public.isEmptyVal = function (checkVal){
    return !Public.notEmptyVal(checkVal);
}

Public.notice = function(msg,callback) {
    layer.closeAll();
    layer.msg(msg,{
        time: 2000, //2秒关闭（如果不配置，默认是3秒）
        shift:-1
    },callback);
};


/**
 * 个人风采追加视频
 * @param style
 * @param isPraise
 * @param tokenCode
 * @returns {string}
 */
Public.createStyleVidoHTML = function (style,tokenCode,isPraise) {
	var html = '<div class="article">'
        +'<a href="'+ctx+'/app/member/myShow?userId='+style.memberId+'&tokenCode='+tokenCode+'" class="face">'
        +'<img src="'+fs+style.memberlogo+'" class="logo"></a>'
        +'<p class="name">'+style.memberName+'<span class="report"></span>'+'<span style="font-size:12px;color:#666">  '+style.orgName+'<span></p>'
        +'<p class="tit">发表作品《'+style.styleTitle+'》</p>';
	
	html += '<div class="con">'+style.styleContent+'</div>';
		if(style.styleContent.length >= 40){
			html += '<p class="all" style="color: #2363BE">全文</p>';
		}
        html +='<div class="row" onclick="showvideo(\''+fs+style.videourl+'\',\''+style.memberName+'发表作品《'+style.styleTitle+'》\')">'
    	+'<img src="'+ctx+'/static/img/play.jpg" alt="" class="video"></div>'
    	+'<div class="show_time">'
    	+'<span class="time">'+style.showTime+'</span>'+'<span class="fa fa-thumbs-up parise" style="color:#E20500">'+style.praiseCount+'</span>';
		// if(isPraise){
		//     if(style.isPraise == 'true'){
        //         html+='<span class="fa fa-thumbs-up parise" style="color:#E20500">'+style.praiseCount+'</span>';
        //     }else{
        //         html+='<span class="fa fa-thumbs-o-up parise" onClick="clickPraise(\''+style.styleId+'\', this)">'+style.praiseCount+'</span>';
        //     }
		// }

    html=html+'</div>'
		+'<div class="tag">'
		// +'<span>视频</span>'
		// +'<span style="color:#259B24;border:1px solid #259B24">运动</span>'
		+'</div>'
		+'</div>';
	return html;
}

/**
 * 个人风采拼装多图
 * @param style
 * @param isPraise
 * @param tokenCode
 * @returns {string}
 */
Public.createStyleMoreImageHTML = function (style,tokenCode,isPraise) {
    var html = '<div class="article">'
        +'<a href="'+ctx+'/app/member/myShow?userId='+style.memberId+'&tokenCode='+tokenCode+'" class="face">'
        +'<img src="'+fs+style.memberlogo+'" class="logo"></a>'
        +'<p class="name">'+style.memberName+'<span class="report"></span>'+'<span style="font-size:12px;color:#666">  '+style.orgName+'<span></p>'
        +'<p class="tit">发表作品《'+style.styleTitle+'》</p>';
        html += '<div class="con">'+style.styleContent+'</div>';
        if(style.styleContent.length >= 40){
			html += '<p class="all" style="color: #2363BE">全文</p>';
		}
        html +='<div class="pics">';
    $.each(style.imagePaths,function (index,impath) {
        html = html+'<div class="col-xs-4 showimageclass" >'
        // +'<a href="'+fs+impath+'" group="'+style.styleId+'" style="background-image:url('+fs+impath+')"></a>'
        +'<a href="'+fs+impath+'" group="'+style.styleId+'" data-lightbox="'+style.styleId+'" style="background-image:url('+fs+impath+'/200/200)"></a>'
        +'</div>';
    });
    html = html	+'</div>'
    	+'<div class="show_time">'
    	+'<span class="time">'+style.showTime+'</span>'+'<span class="fa fa-thumbs-up parise" style="color:#E20500">'+style.praiseCount+'</span>';
    // if(isPraise){
    //     if(style.isPraise == 'true'){
    //         html = html +'<span class="fa fa-thumbs-up parise" style="color:#E20500">'+style.praiseCount+'</span>';
    //     }else {
    //         html = html +'<span class="fa fa-thumbs-o-up parise" onClick="clickPraise(\''+style.styleId+'\', this)">'+style.praiseCount+'</span>';
    //     }
    // }
    html = html	+'</div>'
    	+'<div class="tag">'
    	// +'<span>多图</span>'
    	// +'<span style="color:#259B24;border:1px solid #259B24">书画</span>'
    	+'</div>'
    	+'</div>';
    return html;
}

/**
 * 个人风采追加文章
 * @param style
 * @param isPraise
 * @param tokenCode
 * @returns {string}
 */
Public.createStyleArticHTML = function (style,tokenCode,isPraise) {
    var html = '<div class="article">'
        +'<a href="'+ctx+'/app/member/myShow?userId='+style.memberId+'&tokenCode='+tokenCode+'" class="face">'
        +'<img src="'+fs+style.memberlogo+'" class="logo">'
        +'</a>'
        +'<p class="name">'+style.memberName+'<span class="report"></span>'+'<span style="font-size:12px;color:#666">  '+style.orgName+'<span></p>'
        +'<p class="tit">发表作品《'+style.styleTitle+'》</p>'
        +'<div class="con">'+style.styleContent+'</div>'
        +'<p class="all" style="color: #2363BE">全文</p>'
        +'<div class="show_time">'
        +'<span class="time">'+style.showTime+'</span>'+'<span class="fa fa-thumbs-up parise" style="color:#E20500">'+style.praiseCount+'</span>';
    // if(isPraise){
    //     if(style.isPraise == 'true'){
    //         html = html +'<span class="fa fa-thumbs-up parise" style="color:#E20500">'+style.praiseCount+'</span>';
    //     }else{
    //         html = html +'<span class="fa fa-thumbs-o-up parise" onClick="clickPraise(\''+style.styleId+'\', this)">'+style.praiseCount+'</span>';
    //     }
    // }

    html = html +'</div>'
        +'<div class="tag">'
        // +'<span>文章</span>'
        // +'<span style="color:#259B24;border:1px solid #259B24">运动</span>'
        +'</div>'
        +'</div>';
    return html;
}

/**
 * 个人风采追加外部视频
 * @param style
 * @param tokenCode
 * @param isPraise
 */
Public.createStyleOutVidoHTML = function (style,tokenCode,isPraise) {
    var html = '<div class="article">'
        +'<a href="'+ctx+'/app/member/myShow?userId='+style.memberId+'&tokenCode='+tokenCode+'" class="face">'
        +'<img src="'+fs+style.memberlogo+'" class="logo"></a>'
        +'<p class="name">'+style.memberName+'<span class="report"></span>'+'<span style="font-size:12px;color:#666">  '+style.orgName+'<span></p>'
        +'<p class="tit">发表作品《'+style.styleTitle+'》</p>'
        +'<img src="'+ctx+'/static/img/play.jpg" width="33%" height="28%" style="border: 1px solid #F8F8F8;" class="video" onclick="showvideo(\''+style.fileUrl+'\',\''+style.memberName+'发表作品《'+style.styleTitle+'》\')">'
        +'<div class="show_time">'
        +'<span class="time">'+style.showTime+'</span>'+'<span class="fa fa-thumbs-up parise" style="color:#E20500">'+style.praiseCount+'</span>';
    // if(isPraise){
    //     if(style.isPraise == 'true'){
    //         html = html +'<span class="fa fa-thumbs-up parise" style="color:#E20500">'+style.praiseCount+'</span>';
    //     }else{
    //         html = html +'<span class="fa fa-thumbs-o-up parise" onClick="clickPraise(\''+style.styleId+'\', this)">'+style.praiseCount+'</span>';
    //     }
    // }
    html = html +'</div>'
        +'<div class="tag">'
        // +'<span>外部</span>'
        // +'<span style="color:#259B24;border:1px solid #259B24">运动</span>'
        +'</div>'
        +'</div>';
    return html;
}

Public.createBBSReply = function (data) {
    var html = '<img src="'+fs+data.logo+'" alt="">'
        +'<span> '+data.replyUserName+'</span>'
        +'<span class="glyphicon glyphicon-option-horizontal more"></span>'
        +'<div style="font-size:14px;margin-left:36px">'+data.content+'</div>'
        +'<span style="font-size:12px;color:#bbb;margin-left:36px">'+data.replyDateTime+'</span>';
    return html;
}