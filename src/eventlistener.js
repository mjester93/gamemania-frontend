const addEventListener = () => {
    document.addEventListener('click', (event) => {

        // LOGIN, SIGNUP, LOGOUT 
        if (event.target.id === 'sign-up') {
            clearContainer();
            renderSignUp();
        } else if (event.target.id === 'log-out') {
            logUserOut();
        } else if (event.target.id === 'sign-in') {
            const name = document.getElementById('fname').value;
            fetchUser(name);
        } else if (event.target.id === 'sign-up-submit') {
            event.preventDefault();
            name = document.getElementById('sign-up-name').value;

            createUser(name);
        } 



        // GAME MODALS
        else if (event.target.classList.contains('game-modal-close')) {
            clearModal(); 
        } 



        // PLATFORM HEADERS
        else if (event.target.classList.contains('console-header')) {
            platformId = event.target.dataset.platformId;
            clearContainer();
            renderGamesForPlatform(platformId);
        }
    })
}

const addGameEventListener = (tr, game) => {
    tr.addEventListener('click', (event) => {
        if (event.target.nodeName !== 'BUTTON') {
            showGameModal(game);
        } else if (event.target.innerText === 'Add to Collection') {
            console.log('Add to collection');
        } else if (event.target.innerText === 'Add to Wishlist') {
            console.log('Add to Wishlist');
        }
    })
}