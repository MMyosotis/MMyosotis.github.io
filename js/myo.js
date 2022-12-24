


function card_info() {
    fetch("https://api.vvhan.com/api/visitor.info").then((n => n.json())).then((n => {
        let t = n.time.substring(11, 13);
        document.getElementById("author-info__hello").innerHTML = `${t < 5 ? "夜晚好" : t < 11 ? "早上好" : t < 14 ? "中午好" : t < 19 ? "下午好" : "晚上好"} , 我是`
    })).catch((function (n) { console.log(n) }))
} 
card_info();








