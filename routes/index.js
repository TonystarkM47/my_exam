var express = require('express');
var router = express.Router();
var product_info = require('../Models/Product');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/product', function(req, res, next){
  res.render('product')
});
router.post('/product', function(req, res, next){
  if(!req.files || !req.files.Upload){
    return res.status(400).send('No File Was Uploaded. ');
  }

  let uploadedFile = req.files.Upload;
  let uploadPath = './public/Upload/' + uploadedFile.name;

  let product = new product_info({
    product_name: req.body.txt1,
    product_price: req.body.txt2,
    product_details: req.body.txt3,
    product_image: uploadedFile.name,
  });
  product.save()
  .then(data => {
    uploadedFile.mv(uploadPath, function(err){
      if(err){
        console.log('Error in Uploading Image:- ' + err);
        return res.status(500).send(err)
      }
      res.redirect('/display')
    })
  })
  .catch(err => console.log('Error in Insering Data:- ' + err))
});
router.get('/display', function(req, res, next){
  product_info.find()
  .then((data) => {
    res.render('display', {mydata : data})
  })
  .catch(err => console.log("Error in display" + err));
});
router.get('/delete/:id', function(req, res, next){
  console.log(req.params.id)
  product_info.findByIdAndDelete(req.params.id)
  .then(() => {
    res.redirect('/display')
  })
  .catch(err => console.log("Error in Deleting" + err))
});
router.post('/add-api', function(req, res, next){
  if(!req.files || !req.files.Upload){
    return res.status(400).send('No File Was Uploaded. ');
  }

  let uploadedFile = req.files.Upload;
  let uploadPath = './public/Upload/' + uploadedFile.name;

  let product = new product_info({
    product_name: req.body.txt1,
    product_price: req.body.txt2,
    product_details: req.body.txt3,
    product_image: uploadedFile.name,
  });
  product.save()
  .then(data => {
    uploadedFile.mv(uploadPath, function(err){
      if(err){
        console.log('Error in Uploading Image:- ' + err);
        return res.status(500).send(err)
      }
      res.send(JSON.stringify({"status": 200, "flag": 1, "message":"Data Inserted"}))
    })
  })
});
router.get('/view-api', function(req, res, next){
  product_info.find()
  .then((data) => {
    res.send(JSON.stringify({"status": 200, "flag": 1, "message": "Data Fetch", "data": data}))
  })
});
module.exports = router;
console.log("http://127.0.0.1:3000")