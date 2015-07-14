//require.js配置
require.config({
    baseUrl : "../../",
    paths:{
        "jquery" : "bower_components/jquery/dist/jquery",
        "tooltip" : "bower_components/bootstrap/js/tooltip",
        "popover" : "bower_components/bootstrap/js/popover",
        "underscore" : "bower_components/underscore/underscore-min",
        "API" : "scripts/API",
        "templates" : "scripts/templates"
    },
    shim:{
        "jquery":{
            exports : "$"
        },
        "tooltip" : ["jquery"],
        "popover" : ["tooltip"]
    }
});
var data = undefined;
//模块入口
require(["API","jquery","underscore","templates","tooltip","popover"], function(API, $, _, templates){
    var _startOff = 1;
    $(window).scroll(function(){
        if (($(document).height() - $(this).scrollTop() - $(this).height()) < 50){
            $.post(API.moreFeed,{
                startOff:_startOff
            },function(data){

            });
        }
    });

    _.each(data.msg.feeds, function(data){
       var compiled =  _.template(templates.feedTemplate);
        $('.feed-container').append(compiled(data));
    });

    //删除Feed
    window.currentDeleteFeedId = undefined;
    window.currentPopover = undefined;
    window.removeFeed = function(){
        $.ajax({
            type : "POST",
            url : API.deleteFeed,
            data:{feedId:window.currentDeleteFeedId},
            success:function(data){
                window.currentPopover.popover('hide');
            },
            error:function(){
                window.currentPopover.popover('hide');
            }
        });
    }
    window.cancelPopover = function(){
        if(window.currentPopover != undefined){
            window.currentPopover.popover('hide');
        }
    }

    //popover组件
    var popoverOps = {
        title:'是否确认删除？',
        content:"<a class='btn btn-danger eir-pop-btn' onclick=\"removeFeed();\">确定</a><a class='btn btn-default eir-pop-btn' onclick=\"cancelPopover();\" >取消</a>",
        html:true,
        template:'<div class="popover" role="tooltip">' +
        '<div class="arrow">' +
        '</div>' +
        '<h3 class="popover-title"></h3>' +
        '<div class="popover-content">' +
        '</div>' +
        '</div>'
    };
    $('[data-toggle="popover"]').popover(popoverOps)


    //################################事件处理器配置BEGIN#######################################
    var HANDLERS = {
        popoverInitHandler     :   function popoverInit(){
            $('.eir-tags-pop').slideToggle();
        },
        writeFeedOnClickHandler  :   function writeFeedClick(){
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            $('.for-recommend-link').hide();
        },
        recommendLinkOnClickHandler   :   function recommendLink(){
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            $('.for-recommend-link').show();
        },
        clickTagHandler    :   function clickTag(){//单选tag
            $(this).siblings().find('li').removeClass('icon-tag');
            $(this).siblings().find('label').removeClass('icon-tag');
            $(this).find('li').addClass('icon-tag');
            $(this).find('label').addClass('active');
            $('.tags').find('a[data-index]').remove();
            var html = '<a class="btn btn-default eir-tag" data-index='+ $(this).data('index') + '>' + $(this).find('label').text() + '</a>';
            $(html).appendTo('.tags');

        },
        commentsOnClickHandler  :   function commentsOnClickHandler(){
            var _content = $('.form-group .main-textarea').val();
            var _tag = $('.form-group a[data-index]').data('index');
            var _link = $('.form-group .eir-recommend-link').val();
            var feedTypeId = $('.eir-options i.active').attr('id');
            switch(feedTypeId){
                case "write-feed":
                    $.post(API.shuoFeed,{
                        content:_content,
                        tag:_tag
                    },shuoFeedCallback);
                    break;
                case "recommend-link":
                    $.post(API.linkFeed,{
                        content:_content,
                        tag:_tag,
                        link:_link
                    },linkFeedCallback);
                    break;
            }
            function shuoFeedCallback(data){

            }
            function linkFeedCallback(data){

            }
        },
        deleteFeedHandler : function deleteFeedHandler(){
                window.currentDeleteFeedId = $(this).closest('.eir-feed').data('feedid');
                window.currentPopover = $(this);
        },
        likeFeedHandler : function likeFeedHandler(){
            var _feedId = $(this).closest('.eir-feed').data('feedid');
            $.ajax({
                type:'POST',
                url:API.addLike,
                data:{feedId:_feedId},
                success:function(data){

                },
                error:function(){

                }
            });
        },
        dellikeFeedHandler : function likeFeedHandler(){
            var _feedId = $(this).closest('.eir-feed').data('feedid');
            $.ajax({
                type:'POST',
                url:API.delLike,
                data:{feedId:_feedId},
                success:function(data){

                },
                error:function(){

                }
            });
        },
        feedCommentFocusInHandler : function(){
            var compiled =  _.template(templates.feedCommentMore);
            $(this).closest('.eir-feed-comments').replaceWith(compiled({})).fadeIn(1000);
        },
        getMoreFeedCommentsHandler  : function(){
            var _lastIndex = 1;
            var _feedId=1;

        }
    };
    //################################事件处理器配置END#######################################


    //################################事件配置BEGIN#######################################
    $('.eir-nav-collapsed').click(HANDLERS.popoverInitHandler);
    $('#write-feed').click(HANDLERS.writeFeedOnClickHandler);
    $('#recommend-link').click(HANDLERS.recommendLinkOnClickHandler);
    $('.eir-mytags .eir-li').click(HANDLERS.clickTagHandler);
    $('.eir-comments-btn').click(HANDLERS.commentsOnClickHandler);//发表说说
    $('.eir-feed a[deleteFeed]').click(HANDLERS.deleteFeedHandler);//删除Feed
    $('.eir-feed .eir-feed-options .icon-thumbs-up.unliked a').click(HANDLERS.likeFeedHandler);//Feed点赞
    $('.eir-feed .eir-feed-options .icon-thumbs-up.liked a').click(HANDLERS.dellikeFeedHandler);//取消Feed点赞
    $('.eir-feed-comments').focusin(HANDLERS.feedCommentFocusInHandler);//评论数据框聚焦
    $('.eir-get-more-comments .a-more-comments').click(HANDLERS.getMoreFeedCommentsHandler);//获取更多评论
    //################################事件配置END#######################################

});

data = {
    code: 200,
    msg:{
        lastFeedIndex:1,//当前页最后一个Feed索引
        totalFeedCount:111,//总Feed数
        feeds: [
            {
                feedId: 123,
                feedType: 0,
                msgBody: {
                    msgId: 666,
                    title:"猫眼格瓦拉百度淘宝们怎么打?",
                    content: "在已经大幕拉开的暑期档，价格补贴的恶战会再次重燃，到 年底究竟还能留下谁呢?",
                    "link": "http: //***"
                },
                "author": {
                    "userId": 123456,
                    "realName": "Cheng",
                    "jobTiltle": "CEO",
                    "company": "huhaha",
                    "avatarUrl": "/images/pic1.jpeg"
                },
                comments:{
                    feedId:123,
                    lastIndex:2,
                    totalCount:111,
                    data:[
                        {
                            commentId:1,
                            userPic:"/images/pic1.jpeg",//作者头像图片
                            userId:1,//作者ID
                            userName:"float.lu",//作者名字
                            toUserPic:"/images/pic1.jpeg",//被@的作者图片
                            toUserId:123,//被@的作者
                            toUserName:"cheng",//被@的作者名字
                            content:"不错哟",//评论内容
                            commentTime:"2015-6-15"
                        },
                        {
                            commentId:1,
                            userPic:"/images/pic1.jpeg",//作者头像图片
                            userId:123,//作者ID
                            userName:"cheng",//作者名字
                            toUserPic:"/images/pic1.jpeg",//被@的作者图片
                            toUserId:1,//被@的作者
                            toUserName:"cheng",//被@的作者名字
                            content:"不错哟",//评论内容
                            commentTime:"2015-6-16"
                        }
                    ]
                },
                "addTime": "2015-6-15",
                "commentCount": 0,
                "likeCount": 0,
                "tag": "O2O",
                tagId:1,//标签ID
                isLiked:"true"//是否已赞
            }
        ]
    }

};
