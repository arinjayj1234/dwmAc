song = ""
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload(){
	song = loadSound("music.mp3");
}

function setup(){
	canvas = createCanvas(600, 500);
	canvas.center();

	video =  createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function play(){
	song.play();
}

function gotPoses(results){
	if(results.length > 0){
		scoreLeftWrist = results[0].pose.keypoints[9].score;
		scoreRightWrist = results[0].pose.keypoints[9].score;
		console.log("Score: "+scoreLeftWrist +", " + scoreRightWrist)
		rightWristX = results[0].pose.rightWrist.x;
		rightWristY = results[0].pose.rightWrist.y;
		console.log("Right Wrist: "+rightWristX+", "+ rightWristY);
		leftWristX = results[0].pose.leftWrist.x;
		leftWristY = results[0].pose.leftWrist.y;
		console.log("Left Wrist: "+leftWristX+", "+leftWristY);
	}
}

function modelLoaded(){
	console.log("model loaded");
}

function draw(){
	image(video, 0, 0, 600, 500);

	fill("#ff0000");
	stroke("#ff0000");

	

	if(scoreLeftWrist > 0.2){
		circle(leftWristX, leftWristY, 20);
		InNumberleftWristY = number(leftWristY);
		remove_decimals = floor(InNumberleftWristY);
		volume = remove_decimals/500;
		document.getElementById("volume").innerHTML = "Volume: "+volume;
		song.setValue(volume);
	}
}