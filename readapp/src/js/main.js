 function(){
 'use strict';
 //存储事件和数据解密
 var Util = (function(){
       var prefix = 'fiction_reader_';
       //localStorage.setItem
       var StorageGetter = function (key) {
             return localStorage.getItem(prefix+key); 
       }
       //localStorage.getItem
       var StorageSetter = function (key,value) {
              return localStorage.setItem(prefix+key,value); 
       }
       //数据解密
       var getJSONP = function (url,callback) {
              return $.jsonp({
                   url : url,
                   cache : true,
                   callback : "duokan_fiction_chapter",
                   success : function(result) {
                         var data = $.base64.decode(result);//数据解码
                         var json = decodeURIComponent(escape(data));
                         callback(json);}
              }) 
       }
       return {
             StorageGetter : StorageGetter,
             StorageSetter : StorageSetter,
             getJSONP :getJSONP
       }                 
 })();

 // 实现和阅读器相关的数据交互的方法
 function ReaderModel () {
       var Chapter_id;
       var ChapterTotal;
       var init = function (UIcallback) {
             getFitionInfoPromise().then(function (d) {
                   return getCurChapterContentPromise();
             }).then(function (data) {
                     UIcallback && UIcallback(data); 
             });

             /* getFitionInfo(function () {
                   getCurChapterContent(Chapter_id,function (data) {
                         UIcallback && UIcallback(data);              
                   });  
             }) */
       }


       var getFitionInfoPromise =function () {
             return new Promise(function (resolve,reject) {
                     $.get('../data/chapter.json', function(data) {
                          //拿到章节ID
                          if (data.result == 0) {
                                ChapterTotal = data.chapters.length;//章节总数
                                Chapter_id = Util.StorageGetter('chapter_id');
                                if (!Chapter_id) {
                                      Chapter_id = data.chapters[1].chapter_id;
                                } 
                                resolve();
                          }else {
                                reject();
                          }
                      },'json'); 
              })
       } 

       var getCurChapterContentPromise = function () {
             return  new Promise(function (resolve,reject) {
                    $.get('../data/data'+Chapter_id+'.json', function(data) {
                          if (data.result == 0) {
                                var url = data.jsonp;
                                Util.getJSONP(url, function(data) {
                                resolve(data);
                                });
                          } else {
                               reject({msg:'fail'});
                         }
                    },'json');
              }) 
       }


       /* var getFitionInfo = function (callback) {
              $.get('/data/chapter.json', function(data) {
                   //拿到章节ID
                   ChapterTotal = data.chapters.length;//章节总数
                   Chapter_id = Util.StorageGetter('chapter_id');
                   if (!Chapter_id) {
                         Chapter_id = data.chapters[1].chapter_id;
                   } 
                   callback && callback();
               },'json'); 
       }*/


       /*var getCurChapterContent = function (chapter_id,callback) {
             $.get('/data/data'+chapter_id+'.json', function(data) {
                   if (data.result == 0) {
                         var url = data.jsonp;
                         Util.getJSONP(url, function(data) {
                         // $('#init_loading').hide();
                         callback && callback(data);//拿到最终的数据之后执行回调函数UIcallback
                         });
                   } else {
                         return ;
                   }
             },'json');
       }*/
       
       //上一章
       var prevChapter = function (UIcallback) {
             Chapter_id = parseInt(Chapter_id, 10);
             Chapter_id -=1;
             if(Chapter_id == 0){
                   Chapter_id = 1 ;
                   alert('已经是第一章');
             }
             Util.StorageSetter('chapter_id',Chapter_id);
             getCurChapterContentPromise().then(function (data) {
                     UIcallback && UIcallback(data); 
             });
           
            
       }
       //下一章
       var nextChapter = function (UIcallback) {
              Chapter_id = parseInt(Chapter_id, 10);
              Chapter_id +=1;
              if(Chapter_id == 5){
                    Chapter_id = 4 ;
                    alert('已经是最后一章');
              }
              Util.StorageSetter('chapter_id',Chapter_id);
              getCurChapterContentPromise().then(function (data) {
                      UIcallback && UIcallback(data); 
              }); 
    
              
       }

       return {
             init : init ,
             prevChapter : prevChapter,
             nextChapter : nextChapter,
       }
 }
 
 // 渲染基本的UI结构
 function ReaderBaseFrame (container) {       
       function parseChapterData (jsonData) {
              var jsonObj = JSON.parse(jsonData);
              var html = '<h4>' + jsonObj.t + '</h4>';
              for (var i = 0; i < jsonObj.p.length; i++) {
                   html += "<p>" +jsonObj.p[i] + "</p>";
              }
              return html;
       }

       return function  (data) {
              $('#fition_container').html(parseChapterData(data));
       }
 }

 var FitionContainer = $('#fition_container');

 function main () {     
       //整个项目的入口函数    
       var readerModel =ReaderModel();
       var readerUI = ReaderBaseFrame(FitionContainer);
       readerModel.init(function (data) {
               readerUI(data) ; 
                 
       });
       //初始数据
       var Win = $(window);
       var Doc = $(document);
       var Screen = Doc.body;
       var NightMode = false;//是否是夜间模式
       var InitFontSize,bk_color;//初始化的字体大小
       var FitionContainer = $('#fition_container');
       // dom节点的缓存
       var Dom = {
             top_nav : $('#top_nav'),
             bottom_nav : $('.js-bottom-nav'),
             nav_title : $('.nav-title'),
             bk_container : $('#bk_container'),
             bk_button : $('.bk-button'),
             font_button : $('#font_button'),
             night_button : $('#night_button'),
             next_button : $('#next_button'),
             prev_button : $('#prev_button'),
             back_button : $('#back_button'),
             FitionContainer : $('#fition_container'),
             font_container : $('.font-container'),
             menu_container : $('#menu_container'),
       }
       //从缓存中读取的信息进行展示
       var ModuleFontSwitch = (function() {
             //1. 背景设置
             bk_color = Util.StorageGetter('bk_color');
             if(!bk_color){
                   bk_color = '#e9dfc7';
             }
             $('#root').css('background-color', bk_color);
             Dom.bk_button.children('.bk-container-current').css('display','none');
             Dom.bk_button.each(function () {
                   if ($(this).attr('data-color') == bk_color){
                         $(this).find('.bk-container-current').css('display', '');
                   }
             })
             //2.字体设置信息
             InitFontSize = Util.StorageGetter('font_size');
             InitFontSize = parseInt(InitFontSize);
             if (!InitFontSize) {
                   InitFontSize = 14;
             }
             Dom.FitionContainer.css('font-size', InitFontSize);
       })();

       // 交互事件()
       var EventHandler =(function () {
             //上下章翻页
             $('#prev_button').click(function(data) {    
                   readerModel.prevChapter(function (data) {
                           readerUI(data) ;
                   });   
             $('html,body').scrollTop(0);  
                  
                   
             });
             $('#next_button').click(function(data) {
                   readerModel.nextChapter(function (data) {
                          readerUI(data) ; 
                   });
                   $('html,body').scrollTop(0);  

             });
                
             //点击屏幕中央时事件
             $('#action_mid').click(function(event) {
                    if (Dom.top_nav.css('display') == 'none') {
                         Dom.top_nav.show();
                         Dom.bottom_nav.show();
                    } else {
                         Dom.top_nav.hide();
                         Dom.bottom_nav.hide();
                         Dom.font_container.hide();
                         Dom.font_button.removeClass('current');
                    }
              });

             //夜间白天模式的转换
             Dom.night_button.click(function(event) {
                   if (NightMode) {
                         $('#day_icon').hide();
                         $('#night_icon').show();
                         $('#font_normal').trigger('click');
                         NightMode = false;
                   } else {
                         $('#day_icon').show();
                         $('#night_icon').hide();
                         $('#font_night').trigger('click');
                         NightMode = true;
                   }
             });

             //点击底部边栏字体按钮时事件
             Dom.font_button.click(function() {
                   if (Dom.font_container.css('display') == 'none') {
                         Dom.font_container.show();
                         Dom.font_button.addClass('current');
                   } else {
                         Dom.font_container.hide();
                         Dom.font_button.removeClass('current');

                   }
              });

             //字体放大
             $('#large_font').click(function() {
                   InitFontSize += 1;
                   if (InitFontSize > 20) {
                         InitFontSize = 20;
                   }
                   Dom.FitionContainer.css('font-size', InitFontSize);
                   Util.StorageSetter('font_size', InitFontSize);
             });

             //字体缩小
             $('#small_font').click(function() {
                   InitFontSize -= 1;
                   if (InitFontSize < 12) {
                         InitFontSize = 12;
                   } 
                   Util.StorageSetter('font_size', InitFontSize);
                   $('#fition_container').css('font-size', InitFontSize);
             });


             //背景设置
             Dom.bk_button.each(function () { 
                   var bk_color = $(this).attr('data-color');
                    $(this).click(function() {
                          $('#root').css('background-color', bk_color);
                          Dom.bk_button.find('.bk-container-current').css('display','none')
                          $(this).find('.bk-container-current').css('display', '');
                          Util.StorageSetter('bk_color', bk_color);
                    }); 
             })




              // 监听屏幕滚动时事件
              Win.scroll(function (event) {
                   Dom.top_nav.hide();
                   Dom.bottom_nav.hide(); 
                   Dom.font_container.hide();
              });
       })();
 }
 
 main();

}