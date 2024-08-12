const Dog = require('../models/dog');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Upload Dog Picture
exports.uploadDogPic = async (req, res, next) => {
  const processedFiles = [];
  const files = req.files;
  try {

    if (!files || files.length === 0) {
      return res.status(400).send('No files uploaded.');
    }
    for (const file of files) {
      if (!file) {
        return res.status(400).send('No file uploaded.');
      }
  
      const outputPath = path.join("uploads/",file.filename);
      
      // Use sharp to process the image
      await sharp(file.path)
      .resize(400,400)
      .toFile(outputPath);
      
      // fs.unlinkSync(path.join("rawImage/", file.filename));
        
        const outputFileUrl = `/public/${file.filename}`;
        const dog = await Dog.create({ filename: file.filename, url:outputFileUrl });
        processedFiles.push(dog);
      }
      res.status(201).json({
        message: 'Files uploaded and processed successfully.',
        data: processedFiles
      });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete Dog Picture
exports.deleteDogPic = async (req, res, next) => {
  try {
    const dog = await Dog.findByIdAndDelete(req.params.id);
    if (!dog) {
      return res.status(404).json({ message: 'Dog pic not found' });
    }

    const filePath = path.join('uploads', dog.filename);
    // if (fs.existsSync(filePath)) {
      // fs.unlinkSync(filePath);
      res.status(204).json({ message: "Image removed successfully" });
    // } else {
    //   console.warn(`File not found: ${filePath}`);
    //   res.status(404).json({ message: "File not found, but the database entry was removed" });
    // }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update Dog Picture
exports.updateDogPic = async (req, res, next) => {
  let filePath = null;
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }
    filePath = file.path;
    const dog = await Dog.findById(req.params.id);
    if (!dog) {
      return res.status(404).json({ message: 'Dog pic not found' });
    }

    const outputPath = path.join("uploads/", file.filename);

    await sharp(file.path)
    .resize(800, 800)
    .toFile(outputPath);

    dog.filename = file.filename;
    dog.url = `/public/${file.filename}`;
    const updatedDog = await dog.save();
       
    // fs.unlinkSync(path.join("rawImage/", file.filename));
    res.status(200).json({
      message: 'File updated successfully!',
      data: updatedDog
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }

};

// Get Dog Picture
exports.getDogPic = async (req, res, next) => {
  try {
    const dog = await Dog.findById(req.params.id);
    if (!dog) {
      return res.status(404).json({ message: 'Dog pic not found' });
    }
    res.sendFile(path.join(__dirname, '../uploads', dog.filename));
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get All Dog Pictures
exports.getAllDogPics = async (req, res, next) => {
  try {
    const dogs = await Dog.find({});
    res.status(200).json({
      message:"success",
      list:dogs
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};