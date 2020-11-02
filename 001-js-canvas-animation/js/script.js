const maxframe = 106;
const framesize = 200;

var imageset = null;
var frame = 0;
var framedirection = 0;

const fps = 30;
var prevframems = 0;

window.addEventListener('load', () => {

    imageset = new Image();
    imageset.addEventListener('load', () => {
        document.getElementById('my-anim').addEventListener('mouseenter', () => {
            console.log("mouse enter");
            if(framedirection == 0) prevframems = new Date().getTime();
            framedirection = 1;
            frameLoop();
        });
        document.getElementById('my-anim').addEventListener('mouseout', () => {
            console.log('mouse out');
            if(framedirection == 0) prevframems = new Date().getTime();
            framedirection = -1;
            frameLoop();
        });

        frameLoop();
    });
    imageset.src = "./output.png";
});

var frameLoop = () => {

    var now = new Date().getTime();
    var deltaframe = Math.floor((now - prevframems) / (1000 / fps));

    //frame += framedirection;
    if(deltaframe > 1) {
        frame += framedirection * deltaframe;
        if(framedirection == 1 && frame >= maxframe) {
            frame = maxframe - 1;
            framedirection = 0;
        }
        if(framedirection == -1 && frame < 0) {
            frame = 0;
            framedirection = 0;
        }

        var ctx = document.getElementById('my-anim').getContext('2d');
        ctx.clearRect(0, 0, framesize, framesize);
        ctx.drawImage(imageset, frame * (framesize + 1), 0, framesize, framesize, 0, 0, framesize, framesize);

        prevframems = now;
    }

    if(framedirection != 0) window.requestAnimationFrame(frameLoop);

};
