function includeJS(e, t) {
    var n = document.createElement("script");
    return n.type = "text/javascript", n.charset = "utf-8", t && "function" == typeof t && (n.onload = n.onreadystatechange = function() {
        var e = this.readyState;
        e && !/loaded|complete/.test(e) || (n.onload = n.onreadystatechange = null, t());
    }), n.src = e, document.body.appendChild(n), n;
}

function includeCSS(e) {
    if (a.endsWith(".css")) {
        var t = document.createElement("link");
        t.rel = "stylesheet", t.href = e, document.body.appendChild(t);
    } else console.warn("Enable to include requested file");
}

function element(e) {
    var t = document.createElement(e.name);
    if (e.html && (t.innerHTML = e.html), e.style && e.style.forEach(function(e) {
        t.style[e.name] = e.value;
    }), e.click && t.addEventListener(e.click.name, e.click.ev), e.appendTo && e.appendTo.appendChild(t), 
    e.css) for (var n in e.css) t.style[n] = e.css[n];
    if (e.attr) for (var o in e.attr) t[o] = e.attr[o];
    return t;
}

function snippet(t) {
    var n = document.createElement("iframe");
    if (t) {
        var o = `https://Hoodgail.github.io/hood/snippet/?data=${t.js ? btoa(t.js) : null}&by=${t.by ? btoa(t.by) : null}`;
        if (n.src = o, t.appendTo && t.appendTo.appendChild(n), t.css) for (var i in t.css) n.style[i] = t.css[i];
        if (t.attr) for (var r in t.attr) e[r] = t.attr[r];
        return {
            $: t,
            DOMElment: n
        };
    }
}

function animate({from: e = 0, to: t = 1, duration: n = 300, ease: o = easeOut, onUpdate: i, onEnd: r} = {}) {
    const a = t - e, s = performance.now();
    requestAnimationFrame(function f(u) {
        const c = u - s, l = Math.min(c / n, 1), d = e + o(l) * a;
        i && i(d), l < 1 && requestAnimationFrame(f), d == t && r && r();
    });
}

function easeOut(e, t = 2) {
    return 1 - (1 - e) ** t;
}

function second(e) {
    return Math.floor(1e3 * e);
}

function isIE(e) {
    return -1 != navigator.userAgent.indexOf("rv:11") ? (e && e(), !0) : -1 != navigator.userAgent.indexOf("MSIE") && (e && e(), 
    !0);
}

function isSafari(e) {
    var t = navigator.userAgent.toLowerCase();
    return !(t.indexOf("chrome") > -1 || t.indexOf("firefox") > -1 || t.indexOf("epiphany") > -1) && (t.indexOf("safari/") > -1 && (e && e(), 
    !0));
}

function isEdge(e) {
    return navigator.userAgent.toLowerCase().indexOf("edge") > -1 && (e && e(), !0);
}

function uuid() {
    var e = new Date().getTime(), t = performance && performance.now && 1e3 * performance.now() || 0;
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(n) {
        var o = 16 * Math.random();
        return e > 0 ? (o = (e + o) % 16 | 0, e = Math.floor(e / 16)) : (o = (t + o) % 16 | 0, 
        t = Math.floor(t / 16)), ("x" === n ? o : 3 & o | 8).toString(16);
    });
}

function getNamespaceId(e, t) {
    return e = e || 6, Math.round(Math.pow(36, e + 1) - Math.random() * Math.pow(36, e)).toString(36).slice(1) + (t ? "-" + t : "");
}

function dateToEpoch(e, t) {
    return e = e || new Date(), t ? parseInt(Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate(), e.getUTCHours(), e.getUTCMinutes(), e.getUTCSeconds(), e.getUTCMilliseconds()) / 1e3) : (e.getTime() - e.getMilliseconds()) / 1e3;
}

function epochToDate(e) {
    var t = parseInt(e), n = new Date();
    return t < 1e10 && (t *= 1e3), n.setTime(t), n;
}

function getElementPosition(e) {
    var t = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    };
    if (e.offsetParent) {
        t.x = e.offsetLeft, t.y = e.offsetTop;
        for (var n = e.offsetParent; n; ) {
            t.x += n.offsetLeft, t.y += n.offsetTop;
            var o = n.tagName.toLowerCase();
            "table" != o && "body" != o && "html" != o && "div" != o && n.clientTop && n.clientLeft && (t.x += n.clientLeft, 
            t.y += n.clientTop), n = n.offsetParent;
        }
    } else e.left && e.top ? (t.x = e.left, t.y = e.top) : (e.x && (t.x = e.x), e.y && (t.y = e.y));
    return e.offsetWidth && e.offsetHeight ? (t.width = e.offsetWidth, t.height = e.offsetHeight) : e.style && e.style.pixelWidth && e.style.pixelHeight && (t.width = e.style.pixelWidth, 
    t.height = e.style.pixelHeight), t;
}

function isEmail(e) {
    return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(e);
}

function formatMoney(e) {
    for (var t = e - ~~e, n = "" + ~~e, o = n.length, i = 0; --o; ) (i += 1) % 3 == 0 && (n = n.substr(0, o) + "," + n.substr(o));
    return "$" + n + t.toFixed(2).slice(1);
}

function isNumber(e) {
    return !isNaN(parseFloat(e)) && isFinite(e);
}

var randomString = function() {
    for (var e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz$", t = "", n = 0; n < 16; n++) {
        var o = Math.floor(Math.random() * e.length);
        t += e.substring(o, o + 1);
    }
    return t;
};

const getRandomColor = () => {
    return "#" + Math.floor(16777215 * Math.random()).toString(16);
};

function getCookie(e) {
    var t = document.cookie, n = e + "=", o = t.indexOf("; " + n);
    if (-1 == o) {
        if (0 != (o = t.indexOf(n))) return null;
    } else o += 2;
    var i = document.cookie.indexOf(";", o);
    return -1 == i && (i = t.length), unescape(t.substring(o + n.length, i));
}

function deleteCookie(e, t, n) {
    getCookie(e) && (document.cookie = e + "=" + (t ? "; path=" + t : "") + (n ? "; domain=" + n : "") + "; expires=Thu, 01-Jan-70 00:00:01 GMT");
}

function preloadImages() {
    var e = {};
    for (i = 0; i < preloadImages.arguments.length; i++) e[i] = new Image(), e[i].src = preloadImages.arguments[i];
}

function showDate() {
    var e = new Date();
    return e.getDate() + "-" + (e.getMonth() + 1) + "-" + e.getFullYear();
}

function isValidDate(e, t) {
    var n = /[^mdy]/.exec(t = t || "mm/dd/yyyy")[0], o = t.split(n);
    return function(e, t) {
        for (var n, o, i, r, a = 0, s = t.length; a < s; a++) r = t[a], /m/.test(r) && (n = e[a]), 
        /d/.test(r) && (o = e[a]), /y/.test(r) && (i = e[a]);
        return n > 0 && n < 13 && i && 4 === i.length && o > 0 && o <= new Date(i, n, 0).getDate();
    }(e.split(n), o);
}

function isBreakPoint(e) {
    for (var t, n, o = [ 320, 480, 768, 1024 ], i = $(window).width(), r = 0, a = o.length; r < a; r++) if (o[r] === e) {
        t = o[r - 1] || 0, n = o[r];
        break;
    }
    return i > t && i <= n;
}

function makeMenu(e, t) {
    for (var n, o = (t = t || [ "ul", "li" ])[0], i = t[1], r = "", a = 0, s = e.length; a < s; a++) n = e[a], 
    /:/.test(n) && (n = e[a].split(":")[0], r = e[a].split(":")[1]), e[a] = "<" + i + " " + (r && 'value="' + r + '"') + ">" + n + "</" + i + ">";
    return "<" + o + ">" + e.join("") + "</" + o + ">";
}
function mbplToJson(a){
    var s = `<a href="/index/index/detail?id=14916">
                 <div class="movies">
                     <img src="https://mbpimages.chuaxin.com/uploadimg/movie/2019/07/28/2019072821460331560.jpg" width="84" style="float: left;">
                     <div style="/*display: inline-block;*/margin-left:105px">
                         <span class="name">Zombieland: Double Tap</span><span class="year">（2019）</span><br>
                         <div class="time">
                                             <span>0 min</span>&nbsp;&nbsp;&nbsp;
                                             <span>action, comedy, horror</span>
                         </div>
                         <div class="score"><img src="/static/img/score.png?23" width="11">&nbsp;&nbsp;<span>6.8</span></div>
                         <div style="font-size: 11px;color: rgba(255,255,255,.70);">Columbus, Tallahasse, Wichita, and Little Rock move to the American heartland as they face off against evolved zombies, fellow survivors, and the growing pains of the snarky makeshift family.</div>
                     </div>
                 </div>
             </a><a href="/index/index/detail?id=14916">
                     <div class="movies">
                         <img src="https://mbpimages.chuaxin.com/uploadimg/movie/2019/07/28/2019072821460331560.jpg" width="84" style="float: left;">
                         <div style="/*display: inline-block;*/margin-left:105px">
                             <span class="name">Zombieland: Double Tap</span><span class="year">（2019）</span><br>
                             <div class="time">
                                                 <span>0 min</span>&nbsp;&nbsp;&nbsp;
                                                 <span>action, comedy, horror</span>
                             </div>
                             <div class="score"><img src="/static/img/score.png?23" width="11">&nbsp;&nbsp;<span>6.8</span></div>
                             <div style="font-size: 11px;color: rgba(255,255,255,.70);">Columbus, Tallahasse, Wichita, and Little Rock move to the American heartland as they face off against evolved zombies, fellow survivors, and the growing pains of the snarky makeshift family.</div>
                         </div>
                     </div>
                 </a>
             `
             var e = document.createElement("div")
             e.innerHTML = s
             var a = e.querySelectorAll("a")
             var movies = []
             for (var z in a){
                 var t = a[z];
                 console.log(t)
                 var href = t.href
                 var image = t.querySelector("img").src
                 var name = t.querySelector(".name").innerHTML
                 var year = t.querySelector(".year").innerHTML
                 var time = t.querySelector(".time").inneText
                 var desc = t.querySelector(".movies").lastChild.lastChild
                 movies.push({
                     details:href,
                     image:image,
                     name:name,
                     year:year,
                     time:time,
                     desc:desc
                 })
             }
             return movies
}
console.log(mbplToJson())
function mbpPlaylist(q){
    $.ajax({
        type : 'POST',
        url : "https://www.movieboxpro.app/index/playlist/detail?id="+q.id+"&auth="+q.auth,
        dataType : 'json',
        data : {page:q.page,ajax:1},
        success: function(data){
          q.success(data['data'])
        },
        error: function(){
            q.error("unable to retrive data")
        }
    });
}

var ____setting_functions = {};

____setting_functions = {};

for (var i in window) "function" == (typeof window[i]).toString() && -1 == window[i].toString().indexOf("native") && (____setting_functions[window[i].name] = "function");

function setting(e) {
    return ____setting_functions;
}
// google token //ya29.a0Ae4lvC18__Q90VdCKw_pFfARm3pA8X7A86O2gH51Pl_zT8Idbd1qOW7y-rfb5hTZdl346uPUgOCsUuueZePdwuOHQ2B-e6w7vIlbp9ZLqOYn57rjrZb28X6DwXcEpA60-Odcti6cMfw-Q2NWXm9028JSChlaWcCTMxc
// auth bae64 // eyJhcHBfa2V5IjoiNjQwNWMyZTYwNDVmNjU5YjdmZGNkOTU3ZmU1MmZlOWEiLCJ2ZXJpZnkiOiIzMDNjODUzNGJjMDA3Njc3Y2U0YWZlNGNkM2U4ZWYwZSIsImVuY3J5cHRfZGF0YSI6IkdjeVcwZ0VjSDZKdHk2Z2lRc3JvT0ZsenV0dXVsZ2VZc24yTUlEZ0p5Ly8zcVo4TUN0aE9NVHcvN1puY1h3TjhIWGhyYXdEME4xd2prb3RJWUM1cGdSL1o4ZlV5WnoxaHdhT3ZESlRmUThJN0dNakxPWWcvUmNqTksrVkFOMkt3d281dUZKRmdpVjFOK1BLWlFES2poSUc2ckhNZ25LZXgifQ==
console.log(____setting_functions);