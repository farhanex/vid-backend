const express = require('express')
const multer = require('multer')
const {saveVideo , getAllVideos , getVideo , deleteVideo}= require('../controllers/videoController')
const router = express.Router()

const storage = multer.diskStorage({
    destination:(req ,file , cb)=> cb (null , 'uploads/'),
    filename : (req,file , cb)=> cb (null , Date.now() + '-' + file.originalname)
})

const fileFilter = (req,file,cb)=>{
    const allowedMimeTypes = ['video/mp4','video/x-matroska', 'video/webm' , 'video/avi']
    if(allowedMimeTypes.includes(file.mimetype)){
        cb(null , true)

    } else{
        cb(null,false)
    }
}

const upload = multer ({storage , fileFilter})
router.post('/record', upload.single('video'), saveVideo)
router.get('/',getAllVideos)
router.get('/:id', getVideo)
router.delete('/:id',deleteVideo)

module.exports = router;
