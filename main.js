song = "" ;
rightWristX = 0;
rightWristY = 0 ;
leftWristY = 0 ;
leftWristX = 0 ;
scoreleftWrist = 0 ; 


function preload() {
    song = loadSound("music.mp3") ;
}

function setup() {
    canvas = createCanvas(500, 600) ;
    canvas.center() ;

    video = createCapture(VIDEO) ;
    video.hide() ;

    poseNet = ml5.poseNet(video, modelLoaded) ;
    poseNet.on("pose", gotPoses) ;
}

function modelLoaded() {
    console.log("poseNet is initialised") ;
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results) ;
    }

    scoreleftWrist = results[0].pose.keypoints[9].score ;
    console.log(scoreleftWrist) ;

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = "+leftWristX+" and leftWristY = "+leftWristY) ;

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = "+rightWristX+" and rightWristY = "+rightWristY) ;
}

function draw() {
    image(video, 0, 0, 500, 600) ;

    fill("#FF0000");
    stroke("#FF0000");

    if (scoreleftWrist>0.2)
    {
    circle(leftWristX, leftWristY, 20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500 ;
    document.getElementById("volume").innerHTML = "VOLUME = " + volume ;
    song.setVolume(volume);
    }

}

function play() {
    song.play() ;
    song.rate(1) ;
}