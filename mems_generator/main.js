

// first method


// const generateMemeBtn = document.querySelector(".meme-generator .generate-meme-btn");
// const memeImage = document.querySelector(".meme-generator img");
// const memeTitle = document.querySelector(".meme-generator .meme-title");
// const memeAuthor = document.querySelector(".meme-generator .meme-author");

// const updateDetails = (url, title, author) => {
//     memeImage.setAttribute("src", url);
//     memeTitle.innerHTML = title;
//     memeAuthor.innerHTML = author;
// }

// const generateMeme = () => {
//     fetch("https://meme-api.com/gimme/wholesomememes")
//     .then((response) => response.json())
//     .then(data => {
//         updateDetails(data.url, data.title, data.author);
//     });
// };

// generateMemeBtn.addEventListener("click", generateMeme);





// second method 


// const generateMemeBtn = document.querySelector(".meme-generator .generate-meme-btn");
// const memeContainer = document.querySelector(".meme-generator .meme-container");

// const updateDetails = (memes) => {
//     memeContainer.innerHTML = ""; // Clear existing memes
//     memes.forEach(meme => {
//         const memeDiv = document.createElement("div");
//         memeDiv.classList.add("meme");

//         const memeImg = document.createElement("img");
//         memeImg.setAttribute("src", meme.url);
//         memeImg.setAttribute("alt", meme.title);

//         const memeTitle = document.createElement("h2");
//         memeTitle.classList.add("meme-title");
//         memeTitle.innerHTML = meme.title;

//         const memeAuthor = document.createElement("div");
//         memeAuthor.classList.add("meme-author");
//         memeAuthor.innerHTML = `Author: ${meme.author}`;

//         memeDiv.appendChild(memeImg);
//         memeDiv.appendChild(memeTitle);
//         memeDiv.appendChild(memeAuthor);

//         memeContainer.appendChild(memeDiv);
//     });
// }

// const generateMeme = () => {
//     const memePromises = [];
//     for (let i = 0; i < 10; i++) {
//         memePromises.push(fetch("https://meme-api.com/gimme/wholesomememes").then(response => response.json()));
//     }

//     Promise.all(memePromises).then(memes => {
//         updateDetails(memes);
//     });
// };

// generateMemeBtn.addEventListener("click", generateMeme);




// third method 




const generateMemeBtn = document.querySelector(".generate-meme-btn");
const loadMoreBtn = document.querySelector(".load-more-btn");
const memeContainer = document.querySelector(".meme-container");

const updateDetails = (memes) => {
    memes.forEach(meme => {
        const memeDiv = document.createElement("div");
        memeDiv.classList.add("meme");

        const memeImg = document.createElement("img");
        memeImg.setAttribute("src", meme.url);
        memeImg.setAttribute("alt", meme.title);

        const memeTitle = document.createElement("h2");
        memeTitle.classList.add("meme-title");
        memeTitle.innerHTML = meme.title;

        const memeAuthor = document.createElement("div");
        memeAuthor.classList.add("meme-author");
        memeAuthor.innerHTML = `Author: ${meme.author}`;

        memeDiv.appendChild(memeImg);
        memeDiv.appendChild(memeTitle);
        memeDiv.appendChild(memeAuthor);

        memeContainer.appendChild(memeDiv);
    });
}

const fetchMemes = (count = 6) => {
    const memePromises = [];
    for (let i = 0; i < count; i++) {
        memePromises.push(fetch("https://meme-api.com/gimme/wholesomememes").then(response => response.json()));
    }

    return Promise.all(memePromises);
}

const setLoadingState = (button, isLoading) => {
    if (isLoading) {
        button.classList.add("loading");
        button.disabled = true;
        const spinner = document.createElement("div");
        spinner.classList.add("loading-spinner");
        button.appendChild(spinner);
    } else {
        button.classList.remove("loading");
        button.disabled = false;
        const spinner = button.querySelector(".loading-spinner");
        if (spinner) {
            button.removeChild(spinner);
        }
    }
}

const generateMeme = () => {
    memeContainer.innerHTML = ""; // Clear existing memes when generating new memes
    setLoadingState(generateMemeBtn, true);
    fetchMemes().then(memes => {
        updateDetails(memes);
        setLoadingState(generateMemeBtn, false);
    });
};

const loadMoreMemes = () => {
    setLoadingState(loadMoreBtn, true);
    fetchMemes(6).then(memes => {
        updateDetails(memes);
        setLoadingState(loadMoreBtn, false);
    });
}

generateMemeBtn.addEventListener("click", generateMeme);
loadMoreBtn.addEventListener("click", loadMoreMemes);





//  fourth method 

// const generateMemeBtn = document.querySelector(".generate-meme-btn");
// const loadMoreBtn = document.querySelector(".load-more-btn");
// const memeContainer = document.querySelector(".meme-container");

// const createMemeElement = ({ url, title, author }) => {
//     const memeDiv = document.createElement("div");
//     memeDiv.classList.add("meme");

//     const memeImg = document.createElement("img");
//     memeImg.src = url;
//     memeImg.alt = title;

//     const memeTitle = document.createElement("h2");
//     memeTitle.classList.add("meme-title");
//     memeTitle.textContent = title;

//     const memeAuthor = document.createElement("div");
//     memeAuthor.classList.add("meme-author");
//     memeAuthor.textContent = `Author: ${author}`;

//     memeDiv.append(memeImg, memeTitle, memeAuthor);

//     return memeDiv;
// };

// const updateDetails = memes => {
//     memes.forEach(meme => memeContainer.appendChild(createMemeElement(meme)));
// };

// const fetchMemes = async (count = 6) => {
//     const memePromises = Array.from({ length: count }, () =>
//         fetch("https://meme-api.com/gimme/wholesomememes").then(response => response.json())
//     );
//     return Promise.all(memePromises);
// };

// const setLoadingState = (button, isLoading) => {
//     button.disabled = isLoading;
//     button.classList.toggle("loading", isLoading);
//     if (isLoading) {
//         const spinner = document.createElement("div");
//         spinner.classList.add("loading-spinner");
//         button.appendChild(spinner);
//     } else {
//         const spinner = button.querySelector(".loading-spinner");
//         if (spinner) spinner.remove();
//     }
// };

// const generateMeme = async () => {
//     memeContainer.innerHTML = ""; // Clear existing memes when generating new memes
//     setLoadingState(generateMemeBtn, true);
//     try {
//         const memes = await fetchMemes(6);
//         updateDetails(memes);
//     } catch (error) {
//         console.error('Error fetching meme:', error);
//     } finally {
//         setLoadingState(generateMemeBtn, false);
//     }
// };

// const loadMoreMemes = async () => {
//     setLoadingState(loadMoreBtn, true);
//     try {
//         const memes = await fetchMemes(6);
//         updateDetails(memes);
//     } catch (error) {
//         console.error('Error fetching memes:', error);
//     } finally {
//         setLoadingState(loadMoreBtn, false);
//     }
// };

// generateMemeBtn.addEventListener("click", generateMeme);
// loadMoreBtn.addEventListener("click", loadMoreMemes);

// // Load the first meme when the page loads
// window.addEventListener('load', async () => {
//     try {
//         const memes = await fetchMemes(1);
//         updateDetails(memes);
//     } catch (error) {
//         console.error('Error fetching initial meme:', error);
//     }
// });
