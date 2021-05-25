const express = require('express');
const app = express();
const port = 3348;
const cors = require('cors');
const route = require('./route');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(route);

app.listen(port,()=>{
    console.log(`Server is running on the port ${port}`);
});