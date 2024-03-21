document.querySelector('#bodyDiv').innerHTML = `
    <canvas id="info" width="${window.innerWidth/5 - 10}" height="${window.innerHeight - 20}" style="border: 1px solid black;position:absolute;left:10px"></canvas>
    <canvas id="mainScreen" width="${4*window.innerWidth/5 - 10}" height="${2*(window.innerHeight - 20)/3}" style="border: 1px solid black;position:absolute;left:${window.innerWidth/5}px"></canvas>
    <canvas id="dialogue" width="${4*window.innerWidth/5 - 10}" height="${(window.innerHeight - 20)/3}" style="border: 1px solid black;position:absolute;left:${window.innerWidth/5}px;top:${2*(window.innerHeight/3 - 3)}px"></canvas>
`;


function init() {
  draw()
};

function draw() {
  let canvas = document.getElementById("mainScreen")
  let ctx = canvas.getContext("2d")
  requestAnimationFrame(draw);
};

init()

/////--------------------COOKIE DISCOVERIES(found Mar 20, 2024)------------------------------------
//cookies: form "key=value"
//document.cookie = "key=value" to append a cookie or change a cookie with the same key
//document.cookie also returns string of all cookies, separated by semicolons and spaces
  //You can use the following string manipulation
  //var cookieStr = document.cookie
  //var cookies = cookieStr.split('; ')
  //cookies is an array with all of the individual cookies
/* Cookie deleting function I definetly didn't steal
function deleteAllCookies() {
  const cookies = document.cookie.split("; ");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.slice(0, eqPos) : cookie;
    if (eqPos=1) {
      name=""
    }
    document.cookie = name + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
  }
}
 */