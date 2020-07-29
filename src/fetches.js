BASE_URL = 'http://localhost:3000/api/v1/'
PLATFORMS_URL = BASE_URL + 'platforms/'
GAMES_URL = BASE_URL + 'games/'
USERS_URL = BASE_URL + 'users/'

const fetchAllPlatforms = () => {
    fetch(PLATFORMS_URL)
    .then(response => response.json())
    .then(platforms => renderPlatforms(platforms))
}

const fetchPlatform = (platformId) => {
    fetch(`${PLATFORMS_URL}${platformId}`)
    .then(response => response.json())
    .then(platform => getPlatform(platform))
}

const fetchReviews = (gameId) => {
    fetch(`${GAMES_URL}${gameId}`)
    .then(response => response.json())
    .then(game => renderReviews(game['ordered_reviews']))
}

const fetchCreateUser = (name) => {
    const options = {
        'method': 'POST',
        'headers' : {
            'accept': 'application/json',
            'content-type': 'application/json'
        },
        'body': JSON.stringify({
            name: name
        })
    }

    fetch(USERS_URL, options)
    .then(response => response.json())
    .then(console.log)
    .catch(error => alert(error))
}