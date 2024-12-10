const fs = require('fs')
const path = require('path')

const saveVideo = (req,res)=>{
    
    if(!req.file){
         return res.status(400).json({msg:'no video uploaded or file type not supported'})
    }
    
        res.status(201).json({msg:'video saved successfully ', filePath:req.file.path})
}

const getAllVideos = (req,res)=>{
    const directoryPath = path.join(__dirname,'../uploads')
    const files = fs.readdirSync(directoryPath).map(file=>({
        id:file,
        name:file
    }))
    res.status(200).json(files)
}

const deleteVideo = (req,res)=>{
    const videoId = req.params.id;
    const videoPath = path.join(__dirname , '../uploads' , videoId)
    if(!fs.existsSync(videoPath)){
        return res.status(404).json({msg : "video not found"})
    }

    fs.unlink(videoPath , (err)=>{
        if(err){
            console.error('Error deleting video file:', err);
            return res.status(500).json({ msg: 'Failed to delete video' });
        }
        res.status(200).json({ msg: 'Video deleted successfully' });
    })
}

const getVideo = (req,res)=>{
    const videoPath = path.join(__dirname , '../uploads', req.params.id)
    if(!fs.existsSync(videoPath)) return res.status(404).json({msg : 'video not found'})
        res.sendFile(videoPath)
}

module.exports = {saveVideo , getAllVideos , getVideo , deleteVideo}