const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 8080
const public = path.resolve('./public')
app.use(express.static('./public'))

//taking user to homepage
app.get("/", (req, res) => res.sendFile(public + "/index.html"))

//taking user to restaurant page
app.get("/restaurant", (req, res) => res.sendFile(public + "/restaurant.html"))

//app is listening:
app.listen(port, () => { console.log(`Example app listening on port: ${port}`) })