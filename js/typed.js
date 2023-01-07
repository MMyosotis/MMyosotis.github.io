//拷贝了打字功能，方便pjax调用
Fluid.utils.createScript('https://lib.baomitu.com/typed.js/2.0.12/typed.min.js', 
(function (window, document) {

  var urlinfo = window.location.pathname;
  urlinfo = decodeURIComponent(urlinfo);
  var pattern = /\/post\/.*?\//;
  if(pattern.test(urlinfo)){
    return
  }
  // console.log(patbool);
  // 获取当前的分类
    var typing = Fluid.plugins.typing;
    var subtitle = document.getElementById('subtitle');
    if (!subtitle || !typing) {
      return;
    }
    var text = subtitle.getAttribute('data-typed-text');
      typing(text);
    
})(window, document));
