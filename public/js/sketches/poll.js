/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

async function setup() {
  noCanvas();
  poll = new Poll();
  poll.startPollingForVotes();
  //regex for custom views (overlay and nogradient)
  const altViewRegEx = /(\?|\&)view=(overlay|nogradient)($|\&)/;
  //detect if there is a custom view
  const isAltView = altViewRegEx.test(location.href);
  //if there is a custom view
  if (isAltView) {
    //get the custom view name into a variable
    const altView = altViewRegEx.exec(location.href)[2];
    switch (altView) {
      case "overlay": {
        //set the background to semi-transperant white
        document.body.style.background = "rgba(255,255,255,50%)"
        //remove view links in overlay view
        document.querySelector("div#views").remove();
      } break;
    }
  }
}
