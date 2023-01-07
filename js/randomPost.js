var posts = ["post/28534/", "post/50013/", "post/1017/", "post/37723/", "post/2053/", "post/28199/",
    "post/44675/", "post/4876/", "post/26671/", "post/54862/", "post/5808/", "post/54804/", "post/3799/",
    "post/45824/", "post/52505/", "post/949470425/", "post/49545/", "post/53772/", "post/3433766775/",
    "post/2826041948/", "post/1063853434/", "post/4228881379/", "post/3722561613/", "post/2461093548/",
    "post/192042733/", "post/453331741/", "post/1589765459/", "post/1273908976/", "post/3462126909/",
    "post/2450791866/", "post/2655733482/", "post/4002719321/", "post/914190096/", "post/4096320407/"];
function toRandomPost() { pjaxforOthers.loadUrl('/' + posts[Math.floor(Math.random() * posts.length)]); };


function addRandom() {
    $('#banner-hover').on('click',function(){toRandomPost()});
}
addRandom();






