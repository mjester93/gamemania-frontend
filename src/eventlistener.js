const addEventListener = () => {
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('console-header')) {
            platformId = event.target.dataset.platformId;
            clearContainer();
            renderGamesForPlatform(platformId);
        } else if (event.target.classList.contains('game-modal-close')) {
            clearModal();
        }
    })
}

const addGameEventListener = (li, game) => {
    li.addEventListener('click', (event) => {
        if (event.target.nodeName !== 'BUTTON') {
            showGameModal(game);
        } else if (event.target.innerText === 'Add to Collection') {
            console.log('Add to collection');
        } else if (event.target.innerText === 'Add to Wishlist') {
            console.log('Add to Wishlist');
        }
    })
}