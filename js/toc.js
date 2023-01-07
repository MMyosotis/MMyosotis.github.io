//拷贝了目录功能，方便pjax调用
Fluid.utils.createScript('https://lib.baomitu.com/tocbot/4.18.2/tocbot.min.js', function() {
    var toc = jQuery('#toc');
    if (toc.length === 0 || !window.tocbot) { return; }
    var boardCtn = jQuery('#board-ctn');
    var boardTop = boardCtn.offset().top;

    window.tocbot.init(Object.assign({
      tocSelector     : '#toc-body',
      contentSelector : '.markdown-body',
      linkClass       : 'tocbot-link',
      activeLinkClass : 'tocbot-active-link',
      listClass       : 'tocbot-list',
      isCollapsedClass: 'tocbot-is-collapsed',
      collapsibleClass: 'tocbot-is-collapsible',
      scrollSmooth    : true,
      includeTitleTags: true,
      headingsOffset  : -boardTop,
    }, CONFIG.toc));
    //添加这一句
    toc.find('.tocbot-link').wrapInner('<div class="text"></div>');
    if (toc.find('.toc-list-item').length > 0) {
      toc.css('visibility', 'visible');
    }

    Fluid.events.registerRefreshCallback(function() {
      if ('tocbot' in window) {
        tocbot.refresh();
        var toc = jQuery('#toc');
        if (toc.length === 0 || !tocbot) {
          return;
        }
        if (toc.find('.toc-list-item').length > 0) {
          toc.css('visibility', 'visible');
        }
      }
    });
});