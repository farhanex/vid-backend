const express = require('express')
const cors = require('cors')
const videoRoutes = require('./routes/videoRoutes')
const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use('/api/videos',videoRoutes)

const PORT=5000
app.listen(PORT ,()=>{
    console.log(`server running on port ${PORT}`);
    
})