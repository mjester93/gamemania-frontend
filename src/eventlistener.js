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
        } else if (event.target.id === 'submit-review-button') {
            const score = parseFloat(document.getElementById('review-score').value, 10);
            const summary = document.getElementById('review-summary').value;

            console.log(score, summary);
        }



        // PLATFORM HEADERS
        else if (event.target.classList.contains('console-header')) {
            platformId = event.target.dataset.platformId;
            clearContainer();
            renderGamesForPlatform(platformId);
        } 
        

        
        /// MY PROFILE LINKS
        else if (event.target.id === 'my-games') {
            clearContainer();
            renderUserGames();
        } else if (event.target.id === 'my-wishlist') {
            clearContainer();
            renderUserWishlists();
        } else if (event.target.id === 'my-reviews') {
            clearContainer();
            renderUserReviews();
        }




        // DELETE BUTTONS
        else if (event.target.classList.contains('delete-from-collection-button')) {
            gameId = event.target.dataset.gameId;
            fetchDeleteUserGame(gameId);
            deleteUserGameRow(event.target);
            alertUserOfDeletedGame();
        }
    })
}

const addGameEventListener = (tr, game) => {
    tr.addEventListener('click', (event) => {
        if (event.target.nodeName !== 'BUTTON') {
            showGameModal(game);
        } else if (event.target.innerText === 'Add to Collection') {
            const gameId = event.target.dataset.gameId;
            fetchPostUserGame(gameId);
        } else if (event.target.innerText === 'Add to Wishlist') {
            const gameId = event.target.dataset.gameId;
            fetchPostUserWishlists(gameId);
        }
    })
}