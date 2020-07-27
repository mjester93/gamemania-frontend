document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    init();
})

function init() {
    addPlatformsToNavbar();
    addEventListener();
}

const clearContainer = () => {
    const container = document.querySelector('.container');
    container.innerHTML = '';
}

const addPlatformsToNavbar = () => {
    // fetch all platforms
    fetchAllPlatforms();
}

const renderPlatforms = (platforms) => {
    platforms.forEach(platform => renderPlatform(platform));
}

const renderPlatform = (platform) => {
    navbarStart = document.querySelector('.navbar-start');
    const a = document.createElement('div');
    a.classList.add('navbar-item');
    a.classList.add('console-header');
    a.dataset.platformId = platform.id;
    a.innerText = platform.name
    navbarStart.append(a)
}

const getPlatform = (platform) => {
    createPlatformH1(platform);
    createPlatformUl();
    renderGames(platform);
}

const renderGamesForPlatform = (platformId) => {
    // Fetch platform and games
    fetchPlatform(platformId);
}

const createPlatformH1 = (platform) => {
    const container = document.querySelector('.container');
    const h1 = document.createElement('h1');
    h1.innerText = `${platform.name} games`
    container.appendChild(h1);
}

const createPlatformUl = () => {
    const container = document.querySelector('.container');
    const ul = document.createElement('ul');
    ul.id = 'games-list';
    container.append(ul);
}

const renderGames = (platform) => {
    platform['ordered_games'].forEach(game => renderGame(game));
}

const renderGame = (game) => {
    // Get the ul
    ul = document.querySelector('#games-list');

    // print a list of all the games
    li = document.createElement('li');
    li.dataset.gameId = game.id;
    li.innerText = game.name;
    ul.append(li);

    addGameEventListener(li, game);
}

const showGameModal = (game) => {
    
}