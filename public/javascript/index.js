//leaftlet initialization
let myMap = L.map('map').setView([44.48, -73.21], 14.5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap)

//declares variable for DOM restaurant element
let restList = document.getElementById("restaurant-list")
//declares lat/long variables
let lat = 0
let lon = 0

//fetching data for restaurant list
fetch('https://yelpingtonapi.herokuapp.com/api/restaurants').catch((err) => {
    console.log(err.code, err.message)
})
    .then((res) => {
        return res.json()
    })
    .then((restCollect) => {
        //creates restaurant list
        restCollect.forEach(rest => {
            //creates list element
            let item = document.createElement('li')
            //creates html text for restaurant list
            item.innerHTML = `<a href="/restaurant#${rest.id}">${rest.name}</a>`
            //appends html element to restaurant list
            restList.appendChild(item)
            //adds markers
            let latLngArr = [rest.coords[0], rest.coords[1]]
            //adds popup feature
            marker = L.marker(latLngArr).addTo(myMap).bindPopup(`<a href="/restaurant#${rest.id}">${rest.name}</a>`).on('click', function () {
                event.preventDefault();
                window.location = `/restaurant#${rest.id}`
                console.log(`/restaurant#${rest.id}`)
            })
            //adds scroll over feature
            marker.on('mouseover', function () {
                this.openPopup()
            })
        });
    })

//declares marker variable
let marker = L.marker([lat, lon])
















