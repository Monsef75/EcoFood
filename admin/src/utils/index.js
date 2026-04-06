// import { getLocation, formatDate} from '@/utils/index.js'

// setLocation() {
//     getLocation().then( async coords => {
//         this.info.coords = coords
//         const res = await fetch(
//             `https://nominatim.openstreetmap.org/reverse?lat=${coords[0]}&lon=${coords[1]}&format=json`
//         );
//         const data = await res.json();
//         this.location = data.address.state + ', ' + data.address.city + ', ' + data.address.road
//     })
// },

function getLocation() {
	return new Promise((resolve, reject) => {
        
		if (!navigator.geolocation) {
			alert("Geolocation is not supported by your browser.")
			return reject("No geolocation")
		}

		navigator.geolocation.getCurrentPosition(
			async position => {
				const location = {
                    coords: [position.coords.latitude,position.coords.longitude],
					place: null,
				}

				try {
					const res = await fetch(
						`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
					)
					const data = await res.json()
					const addr = data.address || {}

					const city = addr.city || addr.town || addr.village || ''
					const state = addr.state || ''
					location.place = [city, state].filter(Boolean).join(', ')

					resolve(location)
				} catch (e) {
					alert("Unable to retrieve place name")
					resolve(location) // still resolve with coords even if place fails
				}
			},
			err => {
				switch (err.code) {
					case err.PERMISSION_DENIED:
						alert("Permission denied. Please allow location access.")
						break
					case err.POSITION_UNAVAILABLE:
						alert("Location information unavailable.")
						break
					case err.TIMEOUT:
						alert("Request timed out.")
						break
					default:
						alert("An unknown error occurred.")
				}
				reject(err)
			}
		)
	})
}

function formatDate( date ) {  // formatDate(new Date())
    const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })
    return `${formattedDate} : ${formattedTime}`
}

export { getLocation, formatDate } 
