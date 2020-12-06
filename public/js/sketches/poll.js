/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

async function setup() {
  noCanvas();
  poll = new Poll();
  poll.initPoll();
  //regex for custom views (overlay and nogradient)
  const altViewRegEx = /(\?|\&)view=(overlay|nogradient)($|\&)/;
  //detect if there is a custom view
  const isAltView = altViewRegEx.test(location.href);
  //if there is a custom view
  if (isAltView) {
    //get the custom view name into a variable
    const altView = altViewRegEx.exec(location.href)[2];
    switch (altView) {
      //custom view: no gradient
      case "nogradient": {
        //set the progress bars colors to purple
        document.querySelectorAll("div.progressBar").forEach(p => {
          p.style.background = "purple";
        });
      }
      break;
    case "overlay": {
      //set the background to semi-transperant white
      document.body.style.background = "rgba(255,255,255,50%)"
      //remove view links in overlay view
      document.querySelector("div#views").remove();
    }
    break;
    }
  }


  // from https://github.com/CodingTrain/LateNight/issues/1
  const colorPairs = [
    ['#9253a1', '#70327e'],
    ['#f063a4', '#ec015a'],
    ['#2dc5f4', '#0b6a88'],
    ['#fcee21', '#f89e4f'],
    ['#f16164', '#ec015a'],
    ['#70327e', '#9253a1'],
    ['#a42963', '#ec015a'],
    ['#0b6a88', '#2dc5f4'],
    ['#f89e4f', '#fcee21'],
    ['#ec015a', '#a42963'],
  ];

  const [first, second] = random(colorPairs);
  const degrees = random(35, 75) * (random() < 0.5 ? -1 : 1);

  const gradient = `repeating-linear-gradient(${nf(degrees, 0, 1)}deg, ${first}, ${first} 10px, ${second} 10px, ${second} 20px`;

  const root = document.documentElement;
  root.style.setProperty('--monochrome-gradient', gradient);

  console.log(green(color(first)))
  console.log(green(color(second)))
  if (green(color(first)) > 127 && green(color(second)) > 127) {
    root.style.setProperty('--progressbar-color', 'black');
  }
}
