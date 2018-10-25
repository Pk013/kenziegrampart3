function display(imgNames) {
    let outputString = "";
    for (let i = 0; i < imgNames.length; i++) {
      const name = imgNames[i];
      console.log(name);
      outputString += `<img src="uploads/${name}"/>`
    }
    return outputString;
  }
  const express = require("express");
const multer = require("multer");
const fs = require("fs")

const publicPath = "public/";
const uploadPath = "public/uploads/"
const port = 3000;
const app = express();
const upload = multer({ dest: uploadPath })

app.use(express.static(publicPath));
app.set("view engine", "pug")

const uploadedFiles = [];

app.get('/', function (req, res) {
  const path = './public/uploads';
  fs.readdir(path, function (err, items) {
    res.render('index', { title: 'Kenziegram got pugged', message: 'kenziegram is getting pugged', array: items })
  })
})

app.post('/uploads', upload.single('myFile'), function (request, response, next) {
  uploadedFiles.push(request.file.filename);
  response.render('uploads', { title: 'Uploaded Picture With Pug', message: 'Congratulations you have clicked a button to upload a picture!!!', image: request.file.filename });
})

app.post('/latest', function (request, response, next) {
  fs.readdir(uploadPath, function (err, items) {
    let imagesArray = [];
    let highestTimeStamp = 0;
    let clientTimeStamp = request.body.after;
    for (let i = 0; i < items.length; i++) {
      let modified = fs.statSync(items[i]).mtimeMs;
      if (modified > clientTimeStamp) {
        imagesArray.push(items[i])
      }
      if (modified > highestTimeStamp) {
        highestTimeStamp = modified
      }
    }
    response.send({
      images: imagesArray,
      timestamp: highestTimeStamp
    })
  })
})

app.listen(port, () => console.log("Server running on " + port))

let mostRecentTimestamp = Date.now();
let imageInfo = {
  clientTimestamp: Date.now(),
  image: uploadedFiles
};

let imagesArray = [];


function updateClient() {
    fetch(photoPath, {
      method: POST,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'after': 'timestamp'})
    })
    .then(response => response.json())
    .then(serverResponse => {
      imageData
    })
  }
  setTimeout(clientPost, 3000)
