/*
模板定义
 */
require.config({
    baseUrl : "../../",
    paths:{
        "jquery" : "bower_components/jquery/dist/jquery"
    },
    shim:{
        "jquery":{
            exports : "$"
        }
    }
});
define(['jquery'],function($){
    return {
        feedTemplate : $('#feedTemplate').html(),
        feedCommentMore : $('#eir-feed-comments-more').html(),
        feedComment : $('#eir-feed-comments').html()
    };
});
