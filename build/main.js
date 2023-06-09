var W = 1280;
var H = 720;
// Initialize rendering.
var canvas = document.getElementById("canvas");
canvas.width = W;
canvas.height = H;
var ctx = canvas.getContext("2d");
// Load assets.
var video = document.createElement("video");
video.src = "assets/bunny.mp4";
video.muted = true;
video.addEventListener("canplaythrough", function () {
    console.log("Loaded all assets.");
});
// Auto-playing media is allowed after user interaction with the site.
// https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide
canvas.addEventListener("click", function () {
    start();
}, { once: true });
// Start the game.
function start() {
    video.play();
    draw();
}
// Draw the game.
function draw() {
    ctx.drawImage(video, 0, 0, W, H);
    var t = video.currentTime / video.duration;
    console.log(t);
    if (t < 1) {
        requestAnimationFrame(draw);
    }
}
