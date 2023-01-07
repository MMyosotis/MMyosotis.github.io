/* global Fluid */

Fluid.boot = {};

Fluid.boot.registerEvents = function() {
  Fluid.events.billboard();
  Fluid.events.registerNavbarEvent();
  Fluid.events.registerParallaxEvent();
  Fluid.events.registerScrollDownArrowEvent();
  Fluid.events.registerScrollTopArrowEvent();
  Fluid.events.registerImageLoadedEvent();
};

Fluid.boot.refresh = function() {
  Fluid.plugins.fancyBox();
  Fluid.plugins.codeWidget();
  Fluid.events.refresh();
};

document.addEventListener('DOMContentLoaded', function() {
  Fluid.boot.registerEvents();
});





function pjax_init(){
  document.addEventListener('pjax:send', function () {
    // NProgress.start();
    
  });
  document.addEventListener('pjax:complete', function () {
    // NProgress.done();
    switchbar();
    helloTime();
    homeFaceCard();
    categoriesBarActive();
    CommonTags.registerTabsTag();
    $.getScript("/js/img-lazyload.js");
    $.getScript("/js/typed.js");
    $.getScript("/js/toc.js");
  });
  document.addEventListener('pjax:error', function () {
  });
  document.addEventListener('pjax:success', function () {
    //需要重建的js 从next主题复制来的 
    document.querySelectorAll('script[pjax-data]').forEach(element => {
	    var code = element.text || element.textContent || element.innerHTML || '';
	    var parent = element.parentNode;
	    parent.removeChild(element);
	    var script = document.createElement('script');
	    if (element.id) {
	      script.id = element.id;
	    }
	    if (element.className) {
	      script.className = element.className;
	    }
	    if (element.type) {
	      script.type = element.type;
	    }
	    if (element.src) {
	      script.src = element.src;
	      // Force synchronous loading of peripheral JS.
	      script.async = false;
	    }
	    if (element.getAttribute('pjax') !== null) {
	      script.setAttribute('pjax', '');
	    }
	    if (code !== '') {
	      script.appendChild(document.createTextNode(code));
	    }
	    parent.appendChild(script);
	  });
  });
	document.addEventListener('DOMContentLoaded', function() {
    var pjax = new Pjax({
    elements: 'a[href]:not([href^="#"]):not([href="javascript:void(0)"])',
    selectors: [".pjax-container",'.banner'],
    //三个分别是容器 标题 头图
		debug: true
	});
});
}
pjax_init();
