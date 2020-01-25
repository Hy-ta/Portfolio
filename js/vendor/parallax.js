/* ----------------------------------------------- *
 * Created by:
 *   Erik Uunila
 *   https://twitter.com/euunila
 *   http://erikuunila.com
 *
 * You're free to use this on whatever you want.
 *
 * I just ask that if you feel up to it, that you
 * give me a bit of a shoutout.
 *
 * ----------------------------------------------- */

(function ($) {

  var prefix = (function () {
    var styles = window.getComputedStyle(document.documentElement, ''),
      pre = (Array.prototype.slice
        .call(styles)
        .join('')
        .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
      )[1],
      dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
    return {
      dom: dom,
      lowercase: pre,
      css: '-' + pre + '-',
      js: pre[0].toUpperCase() + pre.substr(1)
    };
  })();

  function hardCenter(obj) {
    obj.each(function(){
      obj.css({
        'position': 'absolute',
        'top': (($(window).height() - $(obj).outerHeight()) / 2)+'px',
        'left': (($(window).width() - $(obj).outerWidth()) / 2)+'px'
      });
    });
  }

  function fullSizeElement(object) {
    object.each(function(){
      var t = $(this),
          p = t.closest($('*[data-prlx-parent=true]')),
          th = t.height(),
          tw = t.width(),
          tr = tw / th,
          w = $(window),
          wh = w.height(),
          ww = w.width(),
          wr = ww / wh;
      p.height(wh).width(ww);
      if ( wr < tr ) {
        t.height('100%').width('auto');
      } else {
        t.height('auto').width('100%');
      }
      hardCenter(t);
    });
  }

  function initParallax() {
    var w = $(window),
        wh = w.height(),
        ww = w.width(),
        wr = ww / wh,
        o = $('*[data-prlx-type=sprite]'),
        f = $('*[data-size=fullsize]');

    f.each(function(){
      fullSizeElement($(this));
    });

    $('*[data-type=parallax').each(function(){

      var p = $(this);

      hardCenter($('.center-content'));

      if (!Modernizr.touch) {
        w.scroll(function() {
          var o = p.find('*[data-prlx-type=sprite]');
          o.each(function(){
            var t = $(this),
                sp = t.data('prlx-speed'),
                speed = 1 - sp,
                s = w.scrollTop(),
                ob = p.position().top,
                wb = s + wh,
                diff = s - ob;
            t.css(prefix.css + 'transform','translateY(' + (diff * speed) + 'px)');
          });
        });
      }

    });
  }

  $(document).ready(function(){
    initParallax();
  });

}(jQuery));