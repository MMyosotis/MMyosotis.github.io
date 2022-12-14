/* global Fluid */

HTMLElement.prototype.wrap = function(wrapper) {
  this.parentNode.insertBefore(wrapper, this);
  this.parentNode.removeChild(this);
  wrapper.appendChild(this);
};

Fluid.events = {
// ————————————————————关于mysidebar的部分都是自己加的——————————————————
  registerNavbarEvent: function() {
    var navbar = jQuery('#navbar');
    if (navbar.length === 0) {
      return;
    }
    var submenu = jQuery('#navbar .dropdown-menu');
    var mysidebar = jQuery('#mysidebar .content-header');        //自加代码
    if (navbar.offset().top > 0) {
      navbar.removeClass('navbar-dark');
      submenu.removeClass('navbar-dark');
    }
    Fluid.utils.listenScroll(function() {
      navbar[navbar.offset().top > 50 ? 'addClass' : 'removeClass']('top-nav-collapse');
      submenu[navbar.offset().top > 50 ? 'addClass' : 'removeClass']('dropdown-collapse');
      mysidebar[navbar.offset().top > 50 ? 'addClass' : 'removeClass']('mysidebar-collapse');    //自加代码
      if (navbar.offset().top > 0) {
        navbar.removeClass('navbar-dark');
        submenu.removeClass('navbar-dark');
        mysidebar.removeClass('navbar-dark');       //自加代码
      } else {
        navbar.addClass('navbar-dark');
        mysidebar.addClass('navbar-dark');
        submenu.removeClass('navbar-dark');         //自加代码
      }
    });
    jQuery('#navbar-toggler-btn').on('click', function() {
      jQuery('.animated-icon').toggleClass('open');
      jQuery('#navbar').toggleClass('navbar-col-show');
    });
  },
//————————————————————————————————————————————————————————————————————
  registerParallaxEvent: function() {
    var ph = jQuery('#banner[parallax="true"]');
    if (ph.length === 0) {
      return;
    }
    var board = jQuery('#board');
    if (board.length === 0) {
      return;
    }
    var parallax = function() {
      var pxv = jQuery(window).scrollTop() / 5;
      var offset = parseInt(board.css('margin-top'), 10);
      var max = 96 + offset;
      if (pxv > max) {
        pxv = max;
      }
      ph.css({
        transform: 'translate3d(0,' + pxv + 'px,0)'
      });
      var sideCol = jQuery('.side-col');
      if (sideCol) {
        sideCol.css({
          'padding-top': pxv + 'px'
        });
      }
    };
    Fluid.utils.listenScroll(parallax);
  },

  registerScrollDownArrowEvent: function() {
    var scrollbar = jQuery('.scroll-down-bar');
    if (scrollbar.length === 0) {
      return;
    }
    scrollbar.on('click', function() {
      Fluid.utils.scrollToElement('#board', -jQuery('#navbar').height());
    });
  },

  // ————————————————————此处重写了topArrow.css并添加了topArrowBG.css————————————————————
  registerScrollTopArrowEvent: function() {
    var topArrow = jQuery('.nav-item#toTop a');
    var topArrowBG = jQuery('.nav-item#toTop');
    if (topArrow.length === 0) {
      return;
    }
    var board = jQuery('#board');
    if (board.length === 0) {
      return;
    }
    var posDisplay = false;
    var scrollDisplay = false;
    // Position
    var setTopArrowPos = function() {
      var boardRight = board[0].getClientRects()[0].right;
      var bodyWidth = document.body.offsetWidth;
      var right = bodyWidth - boardRight;
      posDisplay = right >= 50;
      topArrow.css({
        // 'bottom': posDisplay && scrollDisplay ? '20px' : '-60px',
  
      });
    };
    setTopArrowPos();
    jQuery(window).resize(setTopArrowPos);
    // Display
    var headerHeight = board.offset().top;
    Fluid.utils.listenScroll(function() {
      var scrollHeight = document.body.scrollTop + document.documentElement.scrollTop;
      scrollDisplay = scrollHeight >= headerHeight;
      topArrow.css({
        // 'bottom': posDisplay && scrollDisplay ? '20px' : '-60px'
        'width':posDisplay && scrollDisplay ? '22px' : '0',
        'transition-delay':posDisplay && scrollDisplay ? '0s' : '0.7s',
        'opacity':posDisplay && scrollDisplay ? '1' : '0',
        'transform':posDisplay && scrollDisplay ? 'scale(1)' : 'scale(0)',
      });
      topArrowBG.css({
        'opacity':posDisplay && scrollDisplay ? '1' : '0',
        'transition-delay':posDisplay && scrollDisplay ? '0.1s' : '0.7s',
        'width':posDisplay && scrollDisplay ? '36px' : '0',
        'transform':posDisplay && scrollDisplay ? 'scale(1)' : 'scale(0)',
      });
    });
    // Click
    topArrow.on('click', function() {
      jQuery('body,html').animate({
        scrollTop: 0,
        easing   : 'swing'
      });
    });
  },
// ————————————————————————————————————————————————————————————————————————————————————————————
  registerImageLoadedEvent: function() {
    if (!('NProgress' in window)) { return; }

    var bg = document.getElementById('banner');
    if (bg) {
      var src = bg.style.backgroundImage;
      var url = src.match(/\((.*?)\)/)[1].replace(/(['"])/g, '');
      var img = new Image();
      img.onload = function() {
        window.NProgress && window.NProgress.inc(0.2);
      };
      img.src = url;
      if (img.complete) { img.onload(); }
    }

    var notLazyImages = jQuery('main img:not([lazyload])');
    var total = notLazyImages.length;
    for (const img of notLazyImages) {
      const old = img.onload;
      img.onload = function() {
        old && old();
        window.NProgress && window.NProgress.inc(0.5 / total);
      };
      if (img.complete) { img.onload(); }
    }
  },

  registerRefreshCallback: function(callback) {
    if (!Array.isArray(Fluid.events._refreshCallbacks)) {
      Fluid.events._refreshCallbacks = [];
    }
    Fluid.events._refreshCallbacks.push(callback);
  },

  refresh: function() {
    if (Array.isArray(Fluid.events._refreshCallbacks)) {
      for (var callback of Fluid.events._refreshCallbacks) {
        if (callback instanceof Function) {
          callback();
        }
      }
    }
  },

  billboard: function() {
    if (!('console' in window)) {
      return;
    }
    // eslint-disable-next-line no-console
    console.log(`
------------------------------------------------
|                                              |
|     ________  __            _        __      |
|    |_   __  |[  |          (_)      |  ]     |
|      | |_ \\_| | | __   _   __   .--.| |      |
|      |  _|    | |[  | | | [  |/ /'\`\\' |      |
|     _| |_     | | | \\_/ |, | || \\__/  |      |
|    |_____|   [___]'.__.'_/[___]'.__.;__]     |
|                                              |
|           Powered by Hexo x Fluid            |
|         GitHub: https://git.io/JqpVD         |
|                                              |
------------------------------------------------
    `);
  },


// ——————————————————————————————————添加事件——————————————————————————————————————
  // Sroll Auto Hide
  registerScrollFnEvent: function () {
    var sidetools = document.querySelector('.mysidebar-bar');
    const innerHeight = window.innerHeight + 270;

    // scroll < 270 scrollHeight
    if (document.body.scrollHeight <= innerHeight) {
      sidetools.classList.remove('show');
    }

    Fluid.utils.listenScroll(function() {
      const currentTop = window.scrollY || document.documentElement.scrollTop;
      if (currentTop > 270) {
        sidetools.classList.add('show');
      } 
      else {
        sidetools.classList.remove('show');
      }
      if (document.body.scrollHeight <= innerHeight) {
        sidetools.classList.remove('show');
      }
    });
  },

  registerToggleShowToolsListEvent: function() {
    document.querySelector('.tool-toggle-show').addEventListener('click', () => {
      document.querySelector('.mytoolbox').classList.toggle('show');
    });
  },
};



