//require.js配置
require.config({
    baseUrl : "../../",
    paths:{
        "jquery" : "bower_components/jquery/dist/jquery",
        "tooltip" : "bower_components/bootstrap/js/tooltip",
        "popover" : "bower_components/bootstrap/js/popover",
        "API" : "scripts/API"
    },
    shim:{
        "jquery":{
            exports : "$"
        },
        "tooltip" : ["jquery"],
        "popover" : ["tooltip"]
    }
});

//模块入口
require(["API","jquery","tooltip","popover"], function(API, $){

    $(window).scroll(function(){
        //如果要以顶部50像素，可将if()里面的条件改为: $(document).scrollTop() > 50
        // 当滚动到最底部以上50像素时， 加载新内容
        if (($(document).height() - $(this).scrollTop() - $(this).height()) < 50){
            console.log('the end');
        }
    });

    //popover组件
    var popoverOps = {
        title:'是否确认删除？',
        content:"<a class='btn btn-danger eir-pop-btn'>确定</a><a class='btn btn-default eir-pop-btn'>取消</a>",
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
        }
    };
    //################################事件处理器配置END#######################################


    //################################事件配置BEGIN#######################################
    $('.eir-nav-collapsed').click(HANDLERS.popoverInitHandler);
    $('#write-feed').click(HANDLERS.writeFeedOnClickHandler);
    $('#recommend-link').click(HANDLERS.recommendLinkOnClickHandler);
    $('.eir-mytags .eir-li').click(HANDLERS.clickTagHandler);
    $('.eir-comments-btn').click(HANDLERS.commentsOnClickHandler);//发表说说
    //################################事件配置END#######################################

});
