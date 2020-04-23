console.log(`server is running from a ${["localhost","127.0.0.1"].includes(window.location.hostname)?"localhost":"Webhost"}`);
(function(){
window.OS.System = {
  version: "1",
};
var osDOM = document.getElementById("OS");
var loadingpage = document.getElementById("loadingpage");
var topContex_ = document.getElementById("topContex")
window.alert = function (msg, type) {
  let tId;
  if((tId = ["error","good","warning"].indexOf(type))<0) tId = 3;
  $(".message")
    .html(tId==3?msg:`<img src='./img/${["err","goo","war",""][tId]}check.png'> ${msg}`)
    .css("color", ["red", "green", "yellow", "white"][tId]);
  
  let cAlert = $(".customAlert"); // Each time you search the DOM the browser has to traverse it all, so if you have more things done to the same element, it's better to look for it once, then use the reference.
  cAlert.css("animation", "alert 0.3s linear");
  cAlert.css("display", "inline");
  setTimeout(function () {
    cAlert.css("animation", "none");
  }, 300);
};
$(".confirmButton").click(function () {
  $(".customAlert").css("animation", "alertclose 0.3s linear");
  setTimeout(function () {
    $(".customAlert").css("animation", "none");
    $(".customAlert").css("display", "none");
  }, 300);
});

window.alert2 = function (msg, type) {
  $(".message2")
    .html(msg)
    .css(
      "color",
      "error" == type ? "red" : "warning" == type ? "yellow" : "white"
    );

  $(".customAlert2").css("animation", "alert2 0.3s linear");
  $(".customAlert2").css("display", "inline");
  setTimeout(function () {
    $(".customAlert2").css("animation", "none");
  }, 300);
  osDOM.style.filter = "blur(5px)";
  loadingpage.style.filter = "blur(5px)";
  topContex_.style.filter = "blur(5px)";
};
$(".confirmButton2").click(function () {
  osDOM.style.filter = "";
  loadingpage.style.filter = "";
  topContex_.style.filter = "";
  $(".customAlert2").css("animation", "alertclose2 0.3s linear");
  setTimeout(function () {
    $(".customAlert2").css("animation", "none");
    $(".customAlert2").css("display", "none");
  }, 300);
});
window.onerror = function (msg, url, lineNo, columnNo, exrror) {
  alert("There seem to be an error with the program script", "error");
  alert2(`${msg} \n [${columnNo}:${lineNo}]`, "error");
};
var apps = [
  {
    name: "snippet",
    icon: "./img/snippet.png",
    data: true,
    active: true,
    details: "this application lets you edite or evaluate javascript \n",
    date: "4/8/2020",
  },
  {
    name: "terminal",
    icon: "./img/terminal.png",
    data: true,
    active: true,
    details:
      "this application is a basic terminal for the os with few commands \n",
    date: "4/8/2020",
  },
  {
    name: "rpanswers",
    icon: "./img/rp.png",
    url: "http://hoodgail.epizy.com/os/rp/index.html",
    active: true,
    details: "dont worry about dis",
    date: "4/8/2020",
  },
  {
    name: "messaging",
    icon: "./img/messaging.png",
    data: true,
    active: true,
    date: "4/8/2020",
  },
  {
    name: "discord",
    icon: "./img/discord.png",
    data: true,
    active: false,
    hide: false,
    date: "4/8/2020",
  },
  {
    name: "movieBoxPro",
    icon: "./img/moviebp.png",
    data: true,
    active: true,
    hide: false,
    date: "4/8/2020",
  },
];
var login_data = [
  {
    username: "hoodgail",
    password: "hoodos",
  },
];
var top_btns = [
  {
    name: "SYSTEM",
    event() {
      window.alert2(`
            <ul>
            <li><strong>Platform</strong> : ${window.navigator.platform}</li>
            <li><strong>Connection Type</strong> : ${window.navigator.connection.effectiveType}</li>
            <u>
            `);
    },
  },
];

var bb = document.getElementById("bar");
var desktop = document.getElementById("desktop");
var timeDOM = document.getElementById("time");
var wifiDOM = document.getElementById("wifi");


var loadingpage = document.getElementById("loadingpage");
var topbtns = document.getElementById("tbbottom");

$(loadingpage).fadeIn();
$(document).ready(function () {
  $(loadingpage).fadeOut();
});
top_btns.forEach(function (a) {
  var s = document.createElement("button");
  s.setAttribute("data-event", a.name);
  s.id = "topbtns";
  s.innerHTML = a.name;
  topbtns.appendChild(s);
});
var xxs = document.querySelectorAll("#topbtns");
xxs.forEach(function (xxx) {
  xxx.addEventListener("click", function () {
    var e = this.getAttribute("data-event").toLowerCase();
    var s = getAppByName(e, top_btns);
    s.event();
  });
});
function connection() {
  return window.navigator.onLine;
}
function time() {
  return new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}
function date() {
  var d = new Date();
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;
}
document.getElementById("tpdate").innerHTML = date();
setInterval(function () {
  document.getElementById("tpdate").innerHTML = date();
}, 1400000);
setInterval(function () {
  timeDOM.innerHTML = time();
  document.getElementById("tptime").innerHTML = time();
}, 10);
setInterval(function () {
  if (connection()) {
    wifiDOM.src = "./img/wifi.png";
  } else {
    wifiDOM.src = "./img/nowifi.png";
  }
}, 1000);

function getAppByName(e, n = apps) {
  for (var t = 0; t < n.length; t++)
    if (n[t].name.toLowerCase() === e) return n[t];
}

var taskApps = [getAppByName("terminal")];
for (var x in taskApps) {
  var t = taskApps[x];
  if (t.hide) {
  } else {
    bb.innerHTML += `<div app="${t.name.toLowerCase()}" id="taskApp">
        <img id="appIcon"src="${t.icon}">
        <br>
        <span id="appName">${t.name}</span>
      </div>
      <hr>`;
  }
}
for (var x in apps) {
  var t = apps[x];
  if (t.hide) {
  } else {
    var app = document.createElement("app");
    app.setAttribute("app", t.name);
    app.id = "appHolder";
    app.innerHTML = `<div app="${t.name.toLowerCase()}" id="taskApp">
        <img id="appIcon"src="${t.icon}">
        <br>
        <span class="appName" id="appName">${t.name}</span>
      </div>
     `;
    desktop.appendChild(app);
  }
}
window.isOpen = function () {
  var browser = document.getElementById("__browser");
  if (browser.style.display == "block") {
    return true;
  } else if (browser.style.display == "none") {
    return false;
  } else {
    return true;
  }
};
var xx = document.querySelectorAll("#taskApp");
xx.forEach(function (xxx) {
  xxx.addEventListener("dblclick", function () {
    var e = this.getAttribute("app").toLowerCase();
    var s = getAppByName(e);
    if (window.isOpen) {
      window.close();
      setTimeout(function () {
        window.open(s);
      }, 210);
    } else {
      window.open(s);
    }
  });
});
var browser = document.getElementById("__browser");
var bar = document.getElementById("__browser-bar");
var close = document.getElementById("__close");
var browser_title = document.getElementById("__window_title");
var browser_iframe = document.getElementById("__window_iframe");
var initX, initY, mousePressX, mousePressY;
browser.style.transform =
  "translate(" +
  window.innerWidth +
  "px," +
  window.innerHeight +
  "px) scale(0,0)";

setTimeout(function () {
  browser.classList.add("-show");
  browser.classList.add("-animating");
  var w = window.innerWidth;
  var h = window.innerHeight;
  var x = Math.floor((Math.random() * w) / 2);
  var y = Math.floor((Math.random() * h) / 2);
  browser.dataset.x = x;
  browser.dataset.y = y;
  browser.style.transform = "translate(" + x + "px," + y + "px) scale(1,1)";
  setTimeout(function () {
    browser.classList.remove("-animating");
  }, 200);
}, 500);

bar.addEventListener(
  "mousedown",
  function (e) {
    initX = browser.dataset.x || browser.offsetLeft;
    initY = browser.dataset.y || browser.offsetTop;
    mousePressX = event.clientX;
    mousePressY = event.clientY;
    window.addEventListener("mousemove", repositionElement, false);
    window.addEventListener(
      "mouseup",
      function () {
        window.removeEventListener("mousemove", repositionElement, false);
      },
      false
    );
  },
  false
);

function repositionElement(event) {
  var x = Number(initX) + event.clientX - mousePressX;
  var y = Number(initY) + event.clientY - mousePressY;
  browser.style.transform = "translate(" + x + "px," + y + "px)";
  browser.dataset.x = x;
  browser.dataset.y = y;
}

close.addEventListener("mousedown", function (e) {
  window.close("https://google.com");
});

window.open = function (data) {
  if (data.active) {
    if (data.url) {
      browser_iframe.style.display = "block";
      document.getElementById("window_data").style.display = "none";
      browser_iframe.src = data.url ? data.url : "/";
    } else {
      browser_iframe.style.display = "none";
      document.getElementById("window_data").style.display = "block";
      var s = document.querySelectorAll(".window_app");
      s.forEach(function (a) {
        a.style.display = "none";
      });
      document.getElementById("window_app_" + data.name).style.display =
        "block";
    }

    browser_title.innerHTML = data.name ? data.name : "/";
    var x = browser.dataset.x || browser.offsetLeft;

    var y = browser.dataset.y || browser.offsetTop;
    browser.style.transform = "translate(" + x + "px," + y + "px) scale(1,1)";
    setTimeout(function () {
      browser.classList.remove("-animating");
      browser.style.display = "block";
    }, 200);
  } else {
    alert("app is inactive", "error");
  }
};

window.close = function () {
  browser_iframe.src = "";
  browser.style.display = "none";
};
window.close();
var terminal_input = document.querySelector("#terminal_input");
var terminal_out = document.querySelector("#terminal_out");

var cmd = {
  help: `commands : clear , close , eval => function()
  <hr>
moviebox pro invitation code : send a message to "support@movieboxpro.app" asking 
for an invitation code, to watch free movies.`,
  clear: function () {
    $(terminal_out).html("");
  },
  close: function () {
    window.close();
  },
  version: window.OS.System.version,
};
function ter(a) {
  terminal_input.value = "";
  if (cmd[a]) {
    if ("function" == typeof cmd[a]) {
      cmd[a]();
      //terminal_out.innerHTML += `<div>cmd evaluated</div>`
    } else {
      terminal_out.innerHTML += `<pre>${cmd[a]}</pre>`;
    }
  } else if (a == "versions") {
    fetch("./version.txt")
      .then(function (a) {
        return a.text();
      })
      .then(function (a) {
        terminal_out.innerHTML += "<a style=color:yellow;>Loading...</a>";
        var pre = document.createElement("pre");

        terminal_out.appendChild(pre);
        pre.appendChild(document.createTextNode(a));
      });
  } else if (a.startsWith("eval")) {
    const z = a.substr(a.indexOf(" ") + 1);
    try {
      eval(z);
    } catch (e) {
      terminal_out.innerHTML += `<pre id="code">error : ${e.message}</pre>`;
      alert(" error during evaluation", "error");
    }
  } else {
    terminal_out.innerHTML += `<pre id="code">${a} : command not found!</pre>`;
  }
}
terminal_input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    ter(this.value);
  }
});
var logins = document.getElementById("login");
var login_password = document.getElementById("login_password");
var login_username = document.getElementById("login_username");
var button_login = document.getElementById("button_login");
var login_message = document.getElementById("login_message");

function getLogin(e, n = login_data) {
  for (var t = 0; t < n.length; t++)
    if (
      n[t].username.toLowerCase() === e.username &&
      n[t].password.toLowerCase() === e.password
    )
      return n[t];
}

function login(a) {
  if (getLogin(a)) {
    return true;
  } else {
    return false;
  }
}

button_login.addEventListener("click", function () {
  var t = login({
    username: login_username.value.trim(),
    password: login_password.value.trim(),
  });

  if (t) {
    alert("logged in succesfuly");
    logins.style.display = "none";
    login_username.value = "";
    login_password.value = "";
    console.clear()
  } else {
    alert("invalid username or password", "error");
    login_message.innerHTML = "invalid username or password";
  }
});
var rclickedID = "";

// Trigger action when the contexmenu is about to be shown
$(document).on("contextmenu", "app", this.id, function (event) {
  // Avoid the real one
  event.preventDefault();

  rclickedID = $(this);

  // Show contextmenu
  $(".custom-menu")
    .finish()
    .toggle(100)
    // In the right position (the mouse)
    .css({
      top: event.pageY + "px",
      left: event.pageX + "px",
    });
});

// If the document is clicked somewhere
$(document).bind("mousedown", function (e) {
  // If the clicked element is not the menu
  if (!$(e.target).parents(".custom-menu").length > 0) {
    // Hide it
    $(".custom-menu").hide(100);
  }
});

// If the menu element is clicked
$(".custom-menu li").click(function () {
  if (rclickedID.attr("app")) {
    var d = rclickedID.attr("app");
    switch ($(this).attr("data-action")) {
      case "open":
        window.open(getAppByName(d));
        break;
      case "hide":
        rclickedID.css("display", "none");
        break;
      case "showall":
        var r = document.querySelectorAll("app");
        r.forEach(function (b) {
          b.style.display = "blobk";
        });
        break;
    }
  }

  // Hide it AFTER the action was triggered
  $(".custom-menu").hide(100);
});
document.querySelector("#topBar").addEventListener("click", function () {
  var topContex = document.getElementById("topContex");
  animate({
    from: 0,
    to: 60,
    duration: 900,
    onUpdate(a) {
      topContex.style.height = a + "%";
    },
  });
  animate({
    from: 0,
    to: 9,
    duration: 900,
    onUpdate(a) {
      document.getElementById("OS").style.filter = "blur(" + a + "px)";
    },
  });
});
document.querySelector("#tpclose").addEventListener("click", function () {
  var topContex = document.getElementById("topContex");
  animate({
    from: 60,
    to: 0,
    duration: 900,
    onUpdate(a) {
      topContex.style.height = a + "%";
    },
  });
  animate({
    from: 9,
    to: 0,
    duration: 900,
    onUpdate(a) {
      document.getElementById("OS").style.filter = "blur(" + a + "px)";
    },
  });
});
var vers = {
  toJson: function (t) {
    let a = "",
      s = {},
      r = s;
    return (
      data
        .split("\n")
        .map((t) => t.trim())
        .filter((t) => "" != t)
        .forEach((t) => {
          let i;
          (i = t.match(/^<([\w]*)>\s*\{$/))
            ? (r = s[(a = i[1])] = {})
            : (i = t.match(/^>\s*\|([\w]*)\|\s*\(([\w\W]*)\)\s*=$/))
            ? (r = s[a][i[1]] = {
                date: i[2],
                data: [],
              })
            : "-" == t[0] && r.data.push(t.substr(1).trim());
        }),
      s
    );
  },
};
console.clear()
})();
