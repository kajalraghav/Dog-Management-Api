const express = require('express');
const {uploadDogPic, deleteDogPic, updateDogPic, getDogPic, getAllDogPics} = require('../controllers/dogController');
const upload = require('../controllers/multerConfig');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/new', auth, upload.array('dogPic'), uploadDogPic);
router.delete('/remove/:id', auth, deleteDogPic);
router.put('/update/:id', auth, upload.single('dogPic'), updateDogPic);
router.get('/info/:id', auth, getDogPic);
router.get('/list', auth, getAllDogPics);

module.exports = router;
