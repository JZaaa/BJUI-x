


/**
 * 单图片浏览，依赖layui
 * 指定实例化插件对象为非目标元素，可绑定子元素触发
 * data-tag 指定触发标签，默认为img,仅支持tag或class
 * data-src 指定触发图片路径,默认为src
 *
 */
+(function ($) {
    'use strict';
    $.fn.imgView = function() {
        var $el = this,
            $tag = $el.data('tag') || 'img',
            $src;

        $el.each(function () {
            var that = $(this);
            if (that.is($tag) || that.hasClass($tag)) {
                that.on('click', function() {
                    $src = $(this).data('src') || $(this).attr('src');
                    open($src);
                })
            } else {
                that.on('click', $tag, function() {
                    $src = $(this).data('src') || $(this).attr('src');
                    console.log($(this).data('src'))
                    open($src);
                });
            }
        });

        function open($src) {

            layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                skin: 'layui-layer-nobg', //没有背景色
                shadeClose: true,
                content: '<img src="' + $src + '" class="img-response">'
            });

        }

        return $el;

    }
})(jQuery);

/**
* 类首页box插件
* @todo 此插件为暂用版本，只实现了box的基本按钮功能，后期可改为封装类以适用定制功能
*/
+(function($){
    var defaults = {
        boxTool : {
            remove : 'button[data-widget="remove"]',
            collapse : 'button[data-widget="collapse"]',
            open : 'button[data-widget="open"]'
        },
        icon : {
            collapse: 'fa-minus',
            open: 'fa-plus',
            remove: 'fa-times'
        },
        animationSpeed : 500
    }
    $.fn.extend({
        "jzbox" : function (options) {
            var opts = $.extend({},defaults,options)
            var $this = $(this)
            return $this.each(function(){
                var $that = $(this)
                $that.on('click',opts.boxTool.remove,function (e) {
                    e.preventDefault();
                    box = $(this).parents('.box').first()
                    box.slideUp(opts.animationSpeed);
                })
                $that.on('click',opts.boxTool.collapse,function (e) {
                    e.preventDefault();
                    var el = $(this),
                        box = el.parents('.box').first(),
                        box_content = box.find("> .box-body, > .box-footer, > form  >.box-body, > form > .box-footer");
                    if(!box.hasClass('collapsed-box')){
                        el.children(":first").removeClass(opts.icon.collapse).addClass(opts.icon.open)
                        box_content.slideUp(opts.animationSpeed,function () {
                            box.addClass('collapsed-box');
                        });
                    }else{
                        el.children(":first").removeClass(opts.icon.open).addClass(opts.icon.collapse)
                        box_content.slideDown(opts.animationSpeed,function () {
                            box.removeClass('collapsed-box');
                        });
                    }
                })
            })
        }
    })
})(jQuery);




$(function() {

    if (typeof BJUI !== 'undefined') {
        $(document).on(BJUI.eventType.initUI, function (e) {
            var $box = $(e.target)
            //jzbox
            $box.find('.box').jzbox();
        })
    }


    if (typeof layer != "undefined") {
        $(document).find('[data-toggle=imgView]').imgView();
    }

});