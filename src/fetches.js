BASE_URL = 'http://localhost:3000/api/v1/'
PLATFORMS_URL = BASE_URL + 'platforms/'

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