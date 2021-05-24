const express = require('express');
const app = express();
const port = 3306;

app.get('/',(req,res)=>{
    res.status(200).json({
        message:'Hi Devs'
    })
})

app.listen(port,()=>{
    console.log(`Server is running on the port ${port}`);
});