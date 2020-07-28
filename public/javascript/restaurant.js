//getting location to fetch data 
let restId = document.location.hash.slice(1)

//variable for html elements
let restInfo = document.getElementById("restaurant-info")
let restName = document.getElementById("rest-name")
let restAddress = document.getElementById("rest-address")
let restPhone = document.getElementById("rest-phone")
let restHours = document.getElementById("rest-hours")
let restWebsite = document.getElementById("rest-website")
let restNotes = document.getElementById("rest-notes")
let commentsForm = document.getElementById("comments-form")
let commentsContainer = document.getElementById("comments-container")
let allComments = document.getElementById("all-comments")

//variables
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

        //creates HTML elements
        console.log(rest)
        let name = document.createElement('h2')
        name.innerHTML = `${rest.name}`
        let address = document.createElement('h5')
        address.innerHTML = `${rest.address}`
        let phone = document.createElement('h5')
        phone.innerHTML = `${rest.phone}`
        let hours = document.createElement('ul')
        hours.innerHTML = `${rest.hours}`
        let website = document.createElement('h5')
        website.innerHTML = `${rest.website}`
        //creates list element
        let notes = document.createElement('ul')
        notes.innerHTML = `${rest.notes}`
        //assigns html elements to restaurant page
        restInfo.appendChild(name)
        restInfo.appendChild(address)
        restInfo.appendChild(phone)
        restInfo.appendChild(website)
        restInfo.appendChild(hours)
        restInfo.appendChild(notes)

        //centers map and adds marker
        let myMap = L.map('map-rest').setView([rest.coords[0], rest.coords[1]], 18);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(myMap)
        let marker = L.marker([lat, lon])
        let latLngArr = [rest.coords[0], rest.coords[1]]
        marker = L.marker(latLngArr).addTo(myMap).bindPopup(`<a href="/restaurant#${rest.id}">${rest.name}</a>`)

        //adds popup to markers
        marker.addEventListener('mouseover', () => {
            marker.openPopup()
        })
    })

//function to submit form    
function submitComment(event) {
    event.preventDefault();
    allComments.textContent = "Your Comment"
}

//adds event listener to form
commentsForm.addEventListener('submit', submitComment);




