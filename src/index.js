let container;

document.addEventListener('DOMContentLoaded', () => {
    container = document.querySelector('.container');
    init();
})

function init() {
    addPlatformsToNavbar();
    addEventListener();
}

const clearContainer = () => {
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
    const h1 = document.createElement('h1');
    h1.classList.add('title');
    h1.classList.add('is-1');
    h1.innerText = `${platform.name} games`
    container.appendChild(h1);
}

const createPlatformUl = () => {
    // const ul = document.createElement('ul');
    // ul.id = 'games-list';
    const table = document.createElement('table');
    table.id = 'games-table'

    const thead = document.createElement('thead');
    table.append(thead);

    const tr = document.createElement('tr');
    thead.append(tr);

    const nameTh = document.createElement('th');
    tr.append(nameTh);

    const buttonsTh = document.createElement('th');
    tr.append(buttonsTh);

    const tbody = document.createElement('tbody');
    tbody.id = 'games-table-tbody'
    table.append(tbody);

    container.append(table);
}

const renderGames = (platform) => {
    platform['ordered_games'].forEach(game => renderGame(game));
}

const renderGame = (game) => {
    const tbody = document.querySelector('#games-table-tbody');

    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td data-id=${game.id}>${game.name}</td>
        <td>
            <div class="buttons has-addons collection-wishlist-buttons">
                <button class="button is-small">Add to Collection</button>
                <button class="button is-small">Add to Wishlist</button>
            </div>
        </td>
    `
    tbody.append(tr);

    addGameEventListener(tr, game);
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
    avgReview = getAverageReviewScore(reviews);

    const p = document.createElement('p');
    p.classList.add('review-p')
    p.innerHTML = `Average Score: (${avgReview}/5)`
    reviewH3.appendChild(p);

    const ul = document.createElement('ul');
    reviewH3.append(ul);

    reviews.forEach(review => renderReview(review, ul));
}

const getAverageReviewScore = (reviews) => {
    const reviewScores = reviews.map(review => review.score);
    const averageReview = reviewScores.reduce(function(a, b) {
        return a + b;
    }, 0)
    return averageReview / reviews.length;
}

const renderReview = (review, ul) => {
    const li = document.createElement('li')
    li.innerHTML = `${review.user_name} (${review.score}/5)<br />Summary: ${review.summary}`
    li.classList.add('review-li');
    ul.appendChild(li);
}

const renderSignUp = () => {
    const h1 = document.createElement('h1');
    h1.classList.add('title');
    h1.classList.add('is-1');
    h1.innerText = `Sign Up`
    container.appendChild(h1);

    renderForm();
}

const renderForm = () => {
    const form = document.createElement('form');
    form.innerHTML = `
        <form class="field">
            <label class="label">Name</label>
            <input class="input" type="text" id="sign-up-name" placeholder="Name">
            <input type="submit" id="sign-up-submit" class="button is-primary">
        </form>
    `
    container.append(form);
} 

const clearModal = () => {
    const modal = document.querySelector('#game-modal');
    modal.classList.remove('is-active');
}

const createUser = (name) => {
    fetchCreateUser(name);
}

const LogUserIn = (user) => {
}