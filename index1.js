let images = ["Alan Turing", "Steve Jobs", "Linus Torvalds", "Stephen Hawking"];

let names = images.map(name => name.split(".")[0]);
let index = 0;

function updateCarousel() {
    let imgElement = document.getElementById("carouselImage");
    let nameElement = document.getElementById("name");
    let descElement = document.getElementById("description");
    let linkElement = document.getElementById("link-wp");

    let currentName = names[index];

    //imgElement.src = `./assets/${images[index]}`;
    nameElement.textContent = currentName;
    linkElement.href = `https://fr.wikipedia.org/wiki/${currentName.replace(" ", "_")}`;

    fetchWikipediaDescription(currentName, descElement);
}

function nextImage() {
    index = (index + 1) % images.length;
    updateCarousel();
}

function prevImage() {
    index = (index - 1 + images.length) % images.length;
    updateCarousel();
}

function fetchWikipediaDescription(name, descElement) {
    let url = `https://fr.wikipedia.org/api/rest_v1/page/summary/${name.replace(" ", "_")}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.extract) {
                //console.log(data.extract)
                descElement.textContent = data.extract//.split(".")[0]+"."
            } else {
                descElement.textContent = "Description non disponible.";
            }

            if (data.thumbnail && data.thumbnail.source) {
                imgElement = document.getElementById("carouselImage")
                imgElement.src = data.thumbnail.source;
                console.log("image fetch:", data.thumbnail.source)
            } else {
                console.log("Le fetch de l'image a échoué.")
            }
        })
        .catch(() => {
            descElement.textContent = "Impossible de récupérer la description.";
        });
}

updateCarousel();
