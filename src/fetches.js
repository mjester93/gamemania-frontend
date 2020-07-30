BASE_URL = 'http://localhost:3000/api/v1/';
PLATFORMS_URL = BASE_URL + 'platforms/';
GAMES_URL = BASE_URL + 'games/';
USERS_URL = BASE_URL + 'users/';
FIND_USER_URL = BASE_URL + 'users/find_user/';
USER_GAMES_URL = BASE_URL + 'user_games/';
USER_GAMES_DELETE_URL = BASE_URL + 'users/delete_game/';
USER_WISHLISTS_URL = BASE_URL + 'user_wishlists/';
USER_WISHLISTS_DELETE_URL = BASE_URL + 'users/delete_wishlist/';
REVIEW_URL = BASE_URL + 'reviews/'

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
    .then(user => {
        if (user.id > 0) {
            LogUserIn(user);
        } else {
            alert('Username already exists!');
        }
    })
    .catch(error => alert(error))
}

const fetchUser = (name) => {
    fetch(`${FIND_USER_URL}${name}`)
    .then(response => response.json())
    .then(user => {
        if (user === null) {
            alert('Incorrect login information!');
        } else {
            LogUserIn(user);
        }
    })
    .catch(error => alert(error))
}

const fetchPostUserGame = (gameId) => {
    const options = {
        'method': 'POST',
        'headers' : {
            'accept': 'application/json',
            'content-type': 'application/json'
        },
        'body': JSON.stringify({
            'game_id': gameId,
            'user_id': userId
        })
    }

    fetch(USER_GAMES_URL, options)
    .then(response => response.json())
    .then(userGame => pushGameIntoUserArray(userGames, userGame, "collection"))
    .catch(error => alert(error))
}

const fetchPostUserWishlists = (gameId) => {
    const options = {
        'method': 'POST',
        'headers' : {
            'accept': 'application/json',
            'content-type': 'application/json'
        },
        'body': JSON.stringify({
            'game_id': gameId,
            'user_id': userId
        })
    }

    fetch(USER_WISHLISTS_URL, options)
    .then(response => response.json())
    .then(userWishlist => pushGameIntoUserArray(userWishlists, userWishlist, "wishlist"))
    .catch(error => alert(error))
}

const fetchDeleteUserGame = (gameId) => {
    const options = {
        'method': 'DELETE',
        'headers' : {
            'accept': 'application/json',
            'content-type': 'application/json'
        },
        'body': JSON.stringify({
            'game_id': gameId,
            'user_id': userId
        })
    }


    fetch(`${USER_GAMES_DELETE_URL}${userId}`, options)
    .then(response => response.json())
    .then(game => removeGameFromUserGame(game))
    .catch(error => alert(error))
}

const fetchPostUserReview = (score, summary, gameId) => {
    const options = {
        'method': 'POST',
        'headers': {
            'accept': 'application/json',
            'content-type': 'application/json'
        },
        'body': JSON.stringify({
            'game_id': gameId,
            'user_id': userId,
            'score': score,
            'summary': summary
        })
    }
    fetch(REVIEW_URL, options)
    .then(response => response.json())
    .then(review => pushReviewIntoReviewArray(review))
    .catch(error => alert(error))
}

const fetchDeleteReview = (reviewId) => {
    const options = {
        'method': 'DELETE',
        'headers' : {
            'accept': 'application/json',
            'content-type': 'application/json'
        },
        'body': JSON.stringify({
            'review_id': reviewId
        })
    }

    fetch(`${REVIEW_URL}${reviewId}`, options)
    .then(response => response.json())
    .then(review => removeReviewFromUserReviews(review))
}

const fetchDeleteUserWishlist = (gameId) => {
    const options = {
        'method': 'DELETE',
        'headers' : {
            'accept': 'application/json',
            'content-type': 'application/json'
        },
        'body': JSON.stringify({
            'game_id': gameId,
            'user_id': userId
        })
    }


    fetch(`${USER_WISHLISTS_DELETE_URL}${userId}`, options)
    .then(response => response.json())
    .then(game => removeGameFromUserWishlist(game))
    .catch(error => alert(error))
}