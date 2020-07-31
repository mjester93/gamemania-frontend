let container;
let userName;
let userId;
let userGames;
let userWishlists;
let userReviews;

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
    const tbody = document.querySelector('#games-table-tbody');
    platform['ordered_games'].forEach(game => renderGame(game, tbody));
}

const renderGame = (game, tbody) => {

    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td data-id=${game.id}>${game.name}</td>
        <td>
            <div class="buttons has-addons collection-wishlist-buttons">
                <button class="button is-warning is-small add-collection-button" data-game-id=${game.id}>Add to Collection</button>
                <button class="button is-warning is-small add-wishlist-button" data-game-id=${game.id}>Add to Wishlist</button>
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
    <div class="add-reviews">
        <h3 class="title is-3">Add Review</h3>
        <label class="label">Score</label>
        <div class="control">
            <input class="input" type="text" id="review-score" placeholder="Score between 1 (low) and 5 (this game is dope AF)">
        </div>
        <label class="label">Summary</label>
        <div class="control">
            <textarea class="textarea" id="review-summary" placeholder="Summary"></textarea>
        </div>
        <div class="control">
            <button class="button is-warning" id="submit-review-button" data-game-id="${game.id}">Submit Review</button>
        </div>
    </div>
    `

    fetchReviews(game.id);
}

const renderReviews = (reviews) => {
    reviewH3 = document.querySelector('.reviews');
    avgReview = getAverageReviewScore(reviews);

    const p = document.createElement('p');
    p.classList.add('review-p')
    p.innerHTML = `Average Score: (${avgReview.toFixed(1)}/5)`
    reviewH3.appendChild(p);

    const ul = document.createElement('ul');
    ul.id = 'review-ul';
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

const renderReview = (review, ul, reviewUserName = review.user_name) => {
    const li = document.createElement('li')
    li.innerHTML = `${reviewUserName} (${review.score}/5)<br />Summary: ${review.summary}`
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
            <input type="submit" id="sign-up-submit" class="button is-warning">
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
    clearContainer();
    userId = user.id;
    userName = user.name;
    userGames = user['owned_games'];
    userWishlists = user['wishlist_games'];
    userReviews = user['reviews'];

    const h1 = document.createElement('h1');
    h1.classList.add('title');
    h1.classList.add('is-1');
    h1.innerText = `Welcome, ${user.name}!`;
    container.append(h1);

    const gamesP = document.createElement('p');
    gamesP.innerText = `You have ${userGames.length} games in your collection.`
    container.append(gamesP);

    const wishlistsP = document.createElement('p');
    wishlistsP.innerText = `You have ${userWishlists.length} games in your wishlist.`
    container.append(wishlistsP);

    const reviewsP = document.createElement('p');
    reviewsP.innerText = `You wrote a total of ${userReviews.length} reviews.`
    container.append(reviewsP);
}

const logUserOut = () => {
    clearContainer();
    userId = null;

}

const renderUserGames = () => {
    const h1 = document.createElement('h1');
    h1.classList.add('title');
    h1.classList.add('is-1');
    h1.innerText = `${userName}'s Games!`;
    container.append(h1);

    const table = document.createElement('table');
    table.id = 'my-games-table'
    container.append(table);

    const tbody = document.createElement('tbody');
    tbody.id = 'my-games-table-tbody'
    table.append(tbody);
    userGames.forEach(game => renderUserGame(game, tbody))
}

const renderUserGame = (game, tbody) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td data-game-id="${game.id}">${game.name}</td>
        <td>
            <div class="buttons has-addons collection-wishlist-buttons">
                <button class="button is-warning is-small delete-from-collection-button" data-game-id="${game.id}">Delete From Collection</button>
            </div>
        </td>
    `   
    tbody.append(tr);
}

const renderUserWishlists = () => {
    const h1 = document.createElement('h1');
    h1.classList.add('title');
    h1.classList.add('is-1');
    h1.innerText = `${userName}'s Wishlist!`;
    container.append(h1);

    const table = document.createElement('table');
    table.id = 'my-wishlist-table'
    container.append(table);

    const tbody = document.createElement('tbody');
    tbody.id = 'my-wishlist-table-tbody'
    table.append(tbody);
    userWishlists.forEach(game => renderWishlistGame(game, tbody))
}

const renderWishlistGame = (game, tbody) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td data-id=${game.id}>${game.name}</td>
        <td>
            <div class="buttons has-addons collection-wishlist-buttons">
                <button class="button is-warning is-small delete-from-wishlist-button" data-game-id="${game.id}">Delete From Wishlist</button>
            </div>
        </td>
    `   
    tbody.append(tr);
}

const pushGameIntoUserArray = (array, game, message) => {
    alert(`${game['game']['name']} added to ${message}!`)
    array.push({id: game['game']['id'], name: game['game']['name']})
}

const removeGameFromUserGame = (game) => {
    userGames = userGames.filter(userGame => userGame.id !== game.id);
}

const removeGameFromUserWishlist = (game) => {
    userWishlists = userWishlists.filter(userWishlist => userWishlist.id !== game.id)
}

const deleteUserGameRow = (button) => {
    button.parentNode.parentNode.parentNode.remove();
}

const deleteUserWishlistRow = (button) => {
    button.parentNode.parentNode.parentNode.remove();
}

const alertUserOfDeletedGame = () => {
    alert('Game is deleted!');
}

const alertUserOfDeletedWishlist = () => {
    alert('Game is deleted from wishlist!')
}

const renderUserReviews = () => {
    const h1 = document.createElement('h1');
    h1.classList.add('title');
    h1.classList.add('is-1');
    h1.innerText = `${userName}'s Reviews!`;
    container.append(h1);

    const table = document.createElement('table');
    table.id = 'my-reviews-table'
    container.append(table);

    const tbody = document.createElement('tbody');
    tbody.id = 'my-reviews-table-tbody'
    table.append(tbody);
    userReviews.forEach(review => renderUserReview(review, tbody))
}

const renderUserReview = (review, tbody) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td data-id=${review.id}>${review.game.name} (${review.score}/5)
            <br />
            <p class="review-p">${review.summary}</p>
        </td>
        <td>
            <div class="buttons has-addons collection-wishlist-buttons">
                <button class="button is-small is-warning delete-review" data-id=${review.id}>Delete Review</button>
            </div>
        </td>
    `   
    tbody.append(tr);
}

const pushReviewIntoReviewArray = (review) => {
    alert(`Review added!`)
    userReviews.push({
        id: review['id'], 
        score: review['score'], 
        summary: review['summary'],
        game: {
            created_at: review['game']['created_at'],
            first_release_date: review['game']['first_release_date'],
            genre: review['game']['genre'],
            id: review['game']['id'],
            name: review['game']['name'],
            platform_id: review['game']['platform_id'],
            storyline: review['game']['storyline'],
            summary: review['game']['summary'],
            updated_at: review['game']['updated_at']
        }
    })

    const ul = document.getElementById('review-ul');
    renderReview(review, ul, userName);
}

const removeReviewFromUserReviews = (review) => {
    userReviews = userReviews.filter(userReview => userReview.id !== review.id);
}

const deleteUserReviewRow = (button) => {
    button.parentNode.parentNode.parentNode.remove();
}

const alertUserOfDeletedReview = () => {
    alert('Review is deleted!');
}

