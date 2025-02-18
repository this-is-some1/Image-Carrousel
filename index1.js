// let images = ["Alan Turing", "Steve Jobs", "Linus Torvalds", "Stephen Hawking"];

let names = ["Alan Turing", "Steve Jobs", "Linus Torvalds", "Stephen Hawking", "Sam Altman"];//images.map(name => name.split(".")[0]);
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
    index = (index + 1) % names.length;
    updateCarousel();
}

function prevImage() {
    index = (index - 1 + names.length) % names.length;
    updateCarousel();
}

function fetchWikipediaDescription(name, descElement) {
    let url = `https://fr.wikipedia.org/api/rest_v1/page/summary/${name.replace(/ /g, "_")}`;

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.type === "https://mediawiki.org/wiki/HyperSwitch/errors/not_found") {
                throw new Error("Personne non trouvée.");
            }

            if (data.extract) {
                descElement.textContent = data.extract;
            } else {
                alert(`Attention ! Une erreur a été renvoyée. Vérifiez le nom !\nNom donné: ${name}`)
                throw new Error("Description non disponible.");
            }

            if (data.thumbnail && data.thumbnail.source) {
                let imgElement = document.getElementById("carouselImage");
                imgElement.src = data.thumbnail.source;
                console.log("Image fetch:", data.thumbnail.source);
            } else {
                console.log("Le fetch de l'image a échoué.");
            }
        });
}

const ajout_prsn = () => {
    let input = prompt("Indiquer le nom complet (sans fautes!) de la personne a rajouter.");
    input = input.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    names.push(input);
    index = names.length-1;
    updateCarousel();
}

const reset = () => {
    names = ["Alan Turing", "Steve Jobs", "Linus Torvalds", "Stephen Hawking"];
    index=0;
    updateCarousel();
}

updateCarousel();

// const btn = document.getElementById("add");
// btn.addEventListener("click",test)
document.getElementById("add").addEventListener("click",ajout_prsn)
document.getElementById("rst").addEventListener("click",reset)