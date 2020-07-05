
let restInfo = document.getElementById("restaurant-info")
let restId = document.location.hash.slice(1)
//console.log(document.location.hash.slice(1))
//let restId = document.location.search.slice(1) - if I wanted to use search query instead of a hash.
//console.log(document.location.search)

let lat = 0
let lon = 0


//fetching info for restaurant list
fetch(`https://yelpingtonapi.herokuapp.com/api/restaurants/${restId}`).catch((err) => {
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
        let notes = document.createElement('h4') // can create list ul
        notes.innerHTML = `${rest.notes}`

        restInfo.appendChild(name)
        restInfo.appendChild(address)
        restInfo.appendChild(phone)
        restInfo.appendChild(hours)
        restInfo.appendChild(website)
        restInfo.appendChild(notes)

        let coords = JSON.parse(rest.coords)

        let myMap = L.map('map-rest').setView([coords[0], coords[1]], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(myMap)

        let marker = L.marker([lat, lon])

        let latLngArr = [coords[0], coords[1]]
        marker = L.marker(latLngArr).addTo(myMap).bindPopup(`<a href="/restaurant#${rest.id}">${rest.name}</a>`)


        marker.addEventListener('mouseover', () => {
            marker.openPopup()

        })
    })

