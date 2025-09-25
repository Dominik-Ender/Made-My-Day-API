getContent();

function getContent() {
    fetch('https://api.mademyday.ai/Mock/getimages.php')
        .then(response => response.json())
        .then(posts => {
        
        getPosts(posts);
    });   
};

const cardContainer = document.querySelector('#card-container');

function getPosts(posts) {
    posts.forEach(post => {
        const div = document.createElement('div');
        const image = document.createElement('img');
        const name = document.createElement('h3');
        const like = document.createElement('button');

        div.classList = 'card'
        image.classList = 'card-img'
        like.classList = 'empty'

        image.src = post.url
        name.innerText = post.description
        like.textContent = 'LIKE'

        like.addEventListener('click', async() => {
            ratePosts(post, like);    
        });

        div.appendChild(image)
        div.appendChild(name)
        div.appendChild(like)
        cardContainer.appendChild(div)
    });
};

function ratePosts(post, like) {
    const isLiked = like.classList.toggle('LIKE');

    try {
        fetch('https://api.mademyday.ai/Mock/rateimages.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: post.id,
                                    rate: isLiked ? 'LIKE' : 'DISLIKE'
                                })
        })
        .then(response => {
            if(response.ok) {
                like.textContent = isLiked ? 'DISLIKE' : 'LIKE';
            }
        });

    } catch (err) {
        console.error('API Error');
    }
};
