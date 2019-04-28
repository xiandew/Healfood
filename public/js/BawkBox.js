let loadWidget = function() {
    var d = document,
        w = window,
        l = window.location,
        p = l.protocol == "file:" ? "http://" : "//";
    if (!w.WS)
        w.WS = {};
    c = w.WS;
    var m=function(t, o){
        var e = d.getElementsByTagName("script");
        e=e[e.length-1]; var n = d.createElement(t);
        if (t=="script") {
            n.async=true;
        }
        for (k in o)
            n[k] = o[k];
        e.parentNode.insertBefore(n, e)};
    m(
        "script",
        { src: p + "bawkbox.com/widget/star-rating/5cc10ea7becce4001be1e5cd?page=" +encodeURIComponent(l+''), type: 'text/javascript' }
    );
    c.load_net = m;
};
if(window.Squarespace){
    document.addEventListener('DOMContentLoaded', loadWidget);
} else {
    loadWidget();
}