/**
 * Created by float.lu on 6/20/15.
 */

$('.eir-nav-collapsed').click(function(){
        $('.eir-tags-pop').slideToggle();
});

var options = {
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
$(function () {
    $('[data-toggle="popover"]').popover(options)
})
