let myMap = L.map('map').setView([44.48, -73.21], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap)


let restList = document.getElementById("restaurant-list")
let lat = 0
let lon = 0

//fetching data for restaurant list
fetch('https://json-server.burlingtoncodeacademy.now.sh/restaurants').catch((err) => {
    console.log(err.code, err.message)
})
    .then((res) => {
        return res.json()
    })
    .then((restCollect) => {

        restCollect.forEach(rest => {
            console.log(rest)
            let item = document.createElement('li')
            item.innerHTML = `<a href="/restaurant?${rest.id}">${rest.name}</a>`
            restList.appendChild(item)
            console.log(restCollect)
            //placeMarker(rest.address)
        });
    })

//creating markers
let marker = L.marker([lat, lon])
marker.bindPopup('<h4>name</h4>')
marker.addTo(myMap);


//adding click to markers
// function onMapClick(e) {
//     fetch('https://json-server.burlingtoncodeacademy.now.sh/restaurants').catch((err) => {
//     console.log(err.code, err.message)
// })
//     .then((res) => {
//         return res.json()
//     })
//     .then((restCollect) => {

//         restCollect.forEach(rest => {
//             console.log(rest)
//             let item = document.createElement('h4')
//             item.innerHTML = `<a href="/restaurant?${rest.id}">${rest.name}</a>`
//             restList.appendChild(item)
//             console.log(restCollect)
//             //placeMarker(rest.address)
//         });
//     })
// 

//}

// myMap.on('click', onMapClick);

//function to place markers
function placeMarker(address) {
    let urlAddress = encodeURI(address)
    console.log(address)

    fetch(`https://nominatim.openstreetmap.org/search?q=${urlAddress}&format=json`)

        .then((res) => res.json())
        .then(restCollect => {
            console.log(restCollect)
            let latLngArr = [restCollect[0].lat, restCollect[0].lon]
            marker = L.marker(latLngArr).addTo(myMap).bindPopup(`<h4>${restCollect[1]}</h4>`)

            marker.addEventListener('mouseover', () => {
                marker.openPopup()
            })
        })
}















