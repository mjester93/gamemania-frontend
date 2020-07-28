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
    h1.classList.add('title');
    h1.classList.add('is-1');
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

    const divButtons = document.createElement('div');
    divButtons.classList.add('buttons');
    divButtons.classList.add('has-addons');
    divButtons.classList.add('collection-wishlist-buttons')
    li.appendChild(divButtons);

    const collectionButton = document.createElement('button');
    collectionButton.classList.add('button');
    collectionButton.classList.add('is-small');
    collectionButton.innerText = 'Add to Collection';
    divButtons.append(collectionButton);

    const wishlistButton = document.createElement('button');
    wishlistButton.classList.add('button');
    wishlistButton.classList.add('is-small');
    wishlistButton.innerText = 'Add to Wishlist';
    divButtons.append(wishlistButton);

    ul.append(li);

    addGameEventListener(li, game);
}

const showGameModal = (game) => {
    const modal = document.querySelector('#game-modal');
    modal.classList.add('is-active');

    const modalHead = modal.querySelector('.modal-card-title');
    modalHead.innerText = game.name;

    const modalSection = modal.querySelector('.modal-card-body');
    modalSection.innerHTML = `
    <div><h2 class="title is-2">${game.name}</h2></div>
    <div>
        <h3 class="title is-3">Release Date:</h3>
        <p>${game['first_release_date']}</p>
    </div>
    <div>
        <h3 class="title is-3">Summary</h3>
        <p>${game.summary}</p>
    </div>
    <div>
        <h3 class="title is-3">Storyline</h3>
        <p>${game.storyline}</p>
    </div>
    <div>
        <h3 class="title is-3">Genre</h3>
        <p>${game.genre}</p>
    </div>
    <div class="reviews">
        <h3 class="title is-3">Reviews</h3>
    </div>
    `

    fetchReviews(game.id);
}

const renderReviews = (reviews) => {
    reviewH3 = document.querySelector('.reviews');
    const ul = document.createElement('ul');
    reviewH3.append(ul);

    reviews.forEach(review => renderReview(review, ul));
}

const renderReview = (review, ul) => {
    const li = document.createElement('li')
    li.innerHTML = `Score: ${review.score}<br />Summary: ${review.summary}`
    li.classList.add('review-li');
    ul.appendChild(li);
}

const clearModal = () => {
    const modal = document.querySelector('#game-modal');
    modal.classList.remove('is-active');
}