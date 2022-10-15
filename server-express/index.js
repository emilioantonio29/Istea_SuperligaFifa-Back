const express = require("express");
const app = express(); 

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// // ROUTES
// app.use('/users', HERE())

app.get('/test', (req,res)=>{
    res.send("lets get to work")
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("server started on port 5000");
});

module.exports = app