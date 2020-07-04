let myMap = L.map('map-rest').setView([44.48, -73.21], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap)

let restInfo = document.getElementById("restaurant-info")
let restId = document.location.search.slice(1)
//fetching info for restaurant list
//console.log(document.location.search)
console.log(document.location.hash.slice(1))
fetch(`https://json-server.burlingtoncodeacademy.now.sh/restaurants/${restId}`).catch((err) => {
    console.log(err.code, err.message)
})
    .then((res) => {
        return res.json()
    })
    .then((rest) => {

            console.log(rest)
            let name = document.createElement('h1')
            name.innerHTML = `${rest.name}` 
            let address = document.createElement('h4')
            address.innerHTML = `${rest.address}`
            let phone = document.createElement('h4')
            phone.innerHTML = `${rest.phone}`
            let hours = document.createElement('h4')
            hours.innerHTML = `${rest.hours}`
            let website = document.createElement('h4')
            website.innerHTML = `${rest.website}`
            let notes = document.createElement('h4')
            notes.innerHTML = `${rest.notes}`

            restInfo.appendChild(name)
            restInfo.appendChild(address)
            restInfo.appendChild(phone)
            restInfo.appendChild(hours)
            restInfo.appendChild(website)
            restInfo.appendChild(notes)
            //placeMarker(rest.address)
    })

    function placeMarker(address) {
        let urlAddress = encodeURI(address)
        console.log(address)
    
        fetch(`https://nominatim.openstreetmap.org/search?q=${urlAddress}&format=json`)
    
            .then((res) => res.json())
            .then(restCollect => {
                console.log(restCollect)
                let latLngArr = [restCollect[0].lat, restCollect[0].lon]
                L.marker(latLngArr).addTo(myMap).bindPopup(`<h4>${name}</h4>`)
    
                L.marker.addEventListener('mouseover', () => {
                    L.marker.openPopup()
                })
                
            })
    }