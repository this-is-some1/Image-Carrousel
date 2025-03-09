let names = ["Alan Turing", "Steve Jobs", "Linus Torvalds", "Stephen Hawking", "Bill Gates", "Sam Altman"];
let index = 0;

const darkModeToggle = document.querySelectorAll("button")[2];

// if (localStorage.getItem('darkMode') === null) {
//     localStorage.setItem('darkMode', "false");
// }
// localStorage.setItem('darkMode', "false");

const isDarkMode = localStorage.getItem('darkMode') === 'true';

if (isDarkMode) {
    darkModeToggle.textContent = "🌞 Mode clair";
    document.body.classList.add('dark-mode');
} else {
    darkModeToggle.textContent = "🌙 Mode sombre";
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);

    if (isDark) {
        darkModeToggle.textContent = "🌞 Mode clair";
    } else {
        darkModeToggle.textContent = "🌙 Mode sombre";
    }
}

function updateCarousel() {
    let nameElement = document.querySelector("h2");
    let descElement = document.querySelector("p");
    let linkElement = document.querySelector("a");
    let imgElement = document.querySelector("img");

    let currentName = names[index];

    nameElement.textContent = currentName;
    linkElement.href = `https://fr.wikipedia.org/wiki/${currentName.replace(/ /g, "_")}`;

    fetchWikipediaDescription(currentName, descElement, imgElement);
}

function nextImage() {
    index = (index + 1) % names.length;
    updateCarousel();
}

function prevImage() {
    index = (index - 1 + names.length) % names.length;
    updateCarousel();
}

function fetchWikipediaDescription(name, descElement, imgElement) {
    let url = `https://fr.wikipedia.org/api/rest_v1/page/summary/${name.replace(/ /g, "_")}`;

    return fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.type === "https://mediawiki.org/wiki/HyperSwitch/errors/not_found") {
                alert(`Attention ! Une erreur a été renvoyée. Vérifiez le nom !\nNom donné: ${name}`);
                throw new Error("Personne non trouvée.");
            }

            if (data.extract) {
                let result;
                if (data.extract.includes("[")) {
                    let re = /\ +\[(.*)\]/;
                    result = data.extract.replace(re, "");
                } else {
                    result = data.extract;
                }
                descElement.textContent = result;
            } else {
                alert(`Attention ! Une erreur a été renvoyée. Vérifiez le nom !\nNom donné: ${name}`);
                throw new Error("Description non disponible.");
            }

            if (data.thumbnail && data.thumbnail.source) {
                imgElement.src = data.thumbnail.source;
            } else {
                imgElement.src = "./imagenotfound.png";
            }
        });
}

const add = () => {
    let input = prompt("Indiquer le nom complet (sans fautes!) de la personne a rajouter.");
    if (input) {
        input = input.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        names.push(input);
        index = names.length - 1;
        updateCarousel();
    }
};

const rst = () => {
    names = ["Alan Turing", "Steve Jobs", "Linus Torvalds", "Stephen Hawking", "Bill Gates", "Sam Altman"];
    index = 0;
    updateCarousel();
};

document.addEventListener("DOMContentLoaded", function() {
    updateCarousel();

    document.querySelector("h1").addEventListener("click", () => {
        const newColor = prompt("Indiquer la nouvelle couleur (en anglais)");
        if (newColor) document.querySelector("h1").style.color = newColor;
    });
    
    let buttons = document.querySelectorAll("button");
    let actions_boutons = [add, rst, toggleDarkMode, prevImage, nextImage];
    
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", actions_boutons[i]);
    }

    document.addEventListener("keydown", function(event) {
        if (event.key === "ArrowLeft") {
            document.querySelectorAll("button")[3].click();
        } else if (event.key === "ArrowRight") {
            document.querySelectorAll("button")[4].click();
        }
    });
});