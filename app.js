const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 8080
const public = path.resolve('./public')
app.use(express.static('./public'))

//taking user to homepage
//ask Josh about path.resolve - is this body parser?
app.get("/index", (req, res) => res.sendFile(public + "/index.html"))


//taking user to restaurant page
app.get("/restaurant", (req, res) => res.sendFile(public + "/restaurant.html"))

//taking user to restaurant page - id
let restaurantId = document.location.hash.slice(1)

app.get("/restaurant" + restaurantId, (req, res) => res.sendFile(public + "/restaurant.html"))
fetch(`https://json-server.burlingtoncodeacademy.now.sh/restaurants/` + restaurantId).catch((err) => {
    console.log(err.code, err.message)
})
    .then((res) => {
        return res.json()
    })
    .then((rest) => {



    })





app.listen(port, () => { console.log(`Example app listening on port: ${port}`) })