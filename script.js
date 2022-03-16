const baseArea = document.querySelector(".base-canvas-area");
const canvasArea = document.querySelector(".canvas-area");
const saveButton = document.querySelector(".save-button");
const originalCanvas = document.querySelector(".base-canvas")
const canvas = document.querySelector(".converted-canvas");
const invertButton = document.querySelector(".invert-mode");
const greyScaleButton = document.querySelector(".greyscale-mode");
const originalButton = document.querySelector(".original-mode");

const ctx = canvas.getContext("2d");
const ctx2 = originalCanvas.getContext("2d");

var imageMode = "original";
var existingUpload = false;

document.querySelector("input").onchange = async (evt) => {
    try {
        const file = evt.target.files[0];
        const bitmap = await createImageBitmap(file);
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        ctx.drawImage(bitmap, 0, 0);
        var imgData = ctx.getImageData(0,0,bitmap.width, bitmap.height)
        var dataArr = imgData.data;
        console.log(dataArr.length);

        if(imageMode == "invert"){
            for(var i = 0; i < dataArr.length; i += 4){
                var r = dataArr[i];
                var g = dataArr[i + 1];
                var b = dataArr[i + 2]; 
                var a = dataArr[i + 3]; 
    
                var invertedRed = 255 - r;
                var invertedGreen = 255 - g;
                var invertedBlue = 255 - b;
    
                dataArr[i] = invertedRed;
                dataArr[i + 1] = invertedGreen;
                dataArr[i + 2] = invertedBlue;
                
            }
        }
        else if(imageMode == "greyScale"){
            for(var i = 0; i < dataArr.length; i += 4){
                var r = dataArr[i];
                var g = dataArr[i + 1];
                var b = dataArr[i + 2]; 
                var a = dataArr[i + 3]; 
    
                var avg = (r + g + b) / 3;
    
                dataArr[i] = avg;
                dataArr[i + 1] = avg;
                dataArr[i + 2] = avg;
            }
        }
        else if(imageMode == "original") {

        }
        ctx.putImageData(imgData, 0, 0);

        canvasArea.style.display = "block";

        console.log(imageMode);
        existingUpload = true;
    }
    catch(err) {
        console.error(err);
    }
  };

saveButton.addEventListener("click", () => {
    const link = document.createElement('a');
    link.download = 'download.png';
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
});

invertButton.addEventListener("click", () => {
    imageMode = "invert";
    console.log(imageMode);
    invertButton.classList.add("current-mode");
    greyScaleButton.classList.remove("current-mode");
    originalButton.classList.remove("current-mode");
    if(existingUpload == true) {
        var event = new Event('change');
        document.querySelector("input").dispatchEvent(event);
    }
});

greyScaleButton.addEventListener("click", () => {
    imageMode = "greyScale";
    console.log(imageMode);
    greyScaleButton.classList.add("current-mode");
    invertButton.classList.remove("current-mode");
    originalButton.classList.remove("current-mode");
    if(existingUpload == true) {
        var event = new Event('change');
        document.querySelector("input").dispatchEvent(event);
    }
});

originalButton.addEventListener("click", () => {
    imageMode = "original";
    console.log(imageMode);
    originalButton.classList.add("current-mode");
    greyScaleButton.classList.remove("current-mode");
    invertButton.classList.remove("current-mode");
    if(existingUpload == true) {
        var event = new Event('change');
        document.querySelector("input").dispatchEvent(event);
    }
});