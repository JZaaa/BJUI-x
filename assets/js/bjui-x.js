


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



//查看详情
function showInfo(obj) {
    var code = $(obj).data('code')
    $.ajax({
        type: 'GET',
        url: 'info.php',
        dataType: 'html',
        data: {
            code: code
        },
        success: function (res) {
            $('#showInfo').html(res).fadeIn();
        }
    })
}

//查看数据
function showData(obj) {
    // var code = $(obj).data('code')
    var data = $(obj).data(),
        code = data.code,
        url = data.url,
        title = data.title,
        height = (data.height || '420') + 'px',
        width = (data.width || '240') + 'px',
        type = data.type || 'GET';
    $.ajax({
        type: type,
        url: url,
        dataType: 'html',
        data: {
            code: code
        },
        success: function (res) {
            layer.open({
                type: 1,
                title: title,
                skin: 'layui-layer-lan', //样式类名
                scrollbar: false,
                area: [width, height], //宽高
                content: res
            });
        }
    })
}

function logout() {
    sessionStorage.clear();
    window.location.href = './login.php';
}


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


    $(document).on('click', '.bg-box .gb-block-round', function () {
        var code = $('#infoCode').text() || '未知',
            mCode = 'TE09' + $(this).data("id"),
            title = '钢包' + code + '历史数据',
            url = 'data.php';
        var content = '<div class="tip">' +
            '<p>钢包号：' + code +'</p>' +
            '<p>热电偶编号：' + mCode +'</p>' +
            '<p>实时温度：1350℃</p>' +
            '<p>安装位置：渣线永久层部位</p>' +
            '<div class="text-center space-sm"><button class="btn btn-default" data-url="' + url +  '?type=table" data-title="' + title + '" data-code="' + mCode + '" data-width="900" data-height="600" onclick="showData(this)">查看数据</button></div>' +
            '<div class="text-center"><button class="btn btn-danger" data-url="' + url +  '?type=chart" data-title="' + title + '" data-code="' + mCode + '" data-width="900" data-height="600" onclick="showData(this)">查看折线图</button></div>' +
            '</div>';
        layer.tips(content, $(this), {
            tips: [1, '#3595CC'],
            time: 4000,
            area: '150px'
        });

    });

    $(document).on('click', '.bg-box .bg-img', function () {
        var opt = $(this).find('span').data(),
            code = opt.id || "未知",
            status = opt.status || '1',
            url = 'info.php',
            color = '#3595CC';

        if (status != '1') {
            status = '温度超高';
            color = '#fc5c1e';
        } else {
            status = '正常';
        }


        var content = '<div class="tip">' +
            '<p>钢包号：' + code +'</p>' +
            '<p>钢包状态：' + status + '</p>' +
            '<p>熔炼号：' + code + '</p>' +
            '<p>钢种：08F钢</p>' +
            '<p>前钢种：08钢</p>' +
            '<div class="text-center"><button class="btn btn-default" data-width="950" data-height="600" data-url="' + url + '" data-code="' + code + '" onclick="showData(this)" data-title="钢包永久层及包底热电偶分布图及其状态显示界面">查看详情</button></div>' +
            '</div>';
        layer.tips(content, $(this), {
            tips: [1, color],
            time: 4000
        });
    });

    $(document).on('click', '.bg-box1 .bg-img', function () {
        var opt = $(this).find('span').data(),
            code = opt.id || "未知",
            status = opt.status || '1',
            color = '#3595CC';

        if (status != '1') {
            status = '温度超高';
            color = '#fc5c1e';
        } else {
            status = '正常';
        }


        var content = '<div class="tip">' +
            '<p>钢包号：' + code +'</p>' +
            '<p>钢包状态：' + status + '</p>' +
            '<p>熔炼号：' + code + '</p>' +
            '<p>钢种：08F钢</p>' +
            '<p>前钢种：08钢</p>' +
            '</div>';
        layer.tips(content, $(this), {
            tips: [1, color],
            time: 4000
        });
    });






});