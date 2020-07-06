//leaftlet initialization
let myMap = L.map('map').setView([44.48, -73.21], 14.5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap)

//variables
let restList = document.getElementById("restaurant-list")
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
            console.log(rest)
            let item = document.createElement('li')
            item.innerHTML = `<a href="/restaurant#${rest.id}">${rest.name}</a>`
            restList.appendChild(item)
            console.log(restCollect)
            //adds markers
            marker.url = `/restaurant#${rest.id}`
            let latLngArr = [rest.coords[0], rest.coords[1]]
            marker = L.marker(latLngArr).addTo(myMap).bindPopup(`<a href="/restaurant#${rest.id}">${rest.name}</a>`).on('click', function () {
                window.location = (this.url)
            })
            //adds popup to markers
            marker.addEventListener('mouseover', () => {
                marker.openPopup()
            })
        });
    })

//marker variable
let marker = L.marker([lat, lon])
















