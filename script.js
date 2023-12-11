// Classifier Variable
let classifier;
// Model URL
let imageModelURL = "https://teachablemachine.withgoogle.com/models/fIGfebiwV/" ;

// Video
let video;
let flippedVideo;
// To store the classification
let canvasLabel = "";

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(250, 500);

  //assign the default emoji and default text
  myEmoji = "⌚️"
  predictedClass = "Please Wait"
  // Create the video
  video = createCapture(VIDEO);
  video.size(250, 250);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
}

function draw() {

  background(255);

  // Draw the video
  image(flippedVideo, 0, 250);
  fill("black");
  textSize(100);
  text(myEmoji, 125, 150);


  // Put the Predicted Class at the bottom of the canvas
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(predictedClass, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  //runs gotResult() once the model is loaded
  classifier.classify(flippedVideo, gotResult);
  flippedVideo.remove();

}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by the model's confidence in it's prediction.
  // The first result in the array (results[0]) is the model's best guess at the class.
  // Store the model's prediction in a variable called predictedClass
  predictedClass = results[0].label;

  //this code updates the emoji based on the predicted class
  if (predictedClass === 'Thumbs Up') {
    myEmoji = "👍​"
  }
  //TODO: add an else if statement on line 77 that uses the 'Thumbs Down' condition
  else if (predictedClass === 'Thumbs Down') {
      myEmoji = "👎"
    }
    
  else {
    myEmoji = "🤦‍♂️"
  }
  // Classifiy again! This is an example of recursion, which means a function calls itself
  classifyVideo();
}