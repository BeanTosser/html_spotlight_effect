let canvas, context;
let firstRender = true;

const draw = (e) => {
  let width = window.innerWidth;
  let height = window.innerHeight;
  let posx, posy;
  if (firstRender) {
    // First render; position spotlight off screen
    posx = 9999;
    posy = 9999;
    firstRender = false;
  } else if (e === null || e === undefined) {
    // The window was resized. adjust canvas size accordingly.
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
  } else {
    // Position spotlight at mouse position
    posx = e.clientX;
    posy = e.clientY;
  }
  context.clearRect(0, 0, width, height);
  context.beginPath();
  context.arc(posx, posy, 100, 0, 2 * Math.PI);
  context.rect(width, 0, -width, height);
  context.closePath();
  context.fillStyle = "black";
  context.fill();
};

function onWindowResize() {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  // Redraw the canvas
  draw(null);
}

// firstElement is an optional argument; it specifies the first
function createSpotlightEffect(firstElement) {
  canvas = document.createElement("CANVAS");
  canvas.addEventListener("mousemove", (e) => {
    draw(e);
  });
  /*
   * If the mouse leaves the window, the spotlight will remain in the last position
   * at which the mous was still in the window - unless we remove it!
   */
  canvas.addEventListener("mouseleave", (e) => {
    draw(null);
  });
  window.addEventListener("resize", onWindowResize);
  canvas.style.position = "absolute";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  context = canvas.getContext("2d");
  console.log(
    "dflkjdf: " +
      document.getElementById("app").isSameNode(document.body.firstChild)
  );
  console.log("firstchild: " + JSON.stringify(document.body.firstChild));
  document.body.insertBefore(canvas, document.body.childNodes[0] || null);
  draw(null);
}
