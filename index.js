let images = ["Alan_Turing.jpg", "Steve_Jobs.jpg", "Linus_Torvalds.jpg"];

let names = []
images.forEach(name => {names.push(name.split(".")[0].replace("_"," "))});

let descriptions = [
    "Alan Turing, né le 23 juin 1912 à Londres et mort le 7 juin 1954 à Wilmslow, est un mathématicien et cryptologue britannique. Il est l'un des pères de l'informatique et un pionnier de l'Intelligence artificielle.",
    "Steve Jobs, né le 24 février 1955 à San Francisco et mort le 5 octobre 2011 à Palo Alto, est un entrepreneur américain. Il a marqué l'électronique grand public en révolutionnant l'ordinateur personnel et le smartphone.",
    "Linus Torvalds, né le 28 décembre 1969 à Helsinki, est un informaticien américano-finlandais. Il est connu pour avoir créé en 1991 le noyau Linux, utilisé sur de nombreux serveurs et systèmes embarqués."
];
let index = 0;

function nextImage() {
    index = (index + 1) % images.length;
    document.getElementById("carouselImage").src = "./assets/"+images[index];
    document.getElementById("name").textContent = names[index];
    document.getElementById("description").textContent = descriptions[index];
}
function prevImage() {
    index = (index - 1 + images.length) % images.length;
    document.getElementById("carouselImage").src = "./assets/"+images[index];
    document.getElementById("name").textContent = names[index];
    document.getElementById("description").textContent = descriptions[index];
}

function get_url() {
    document.getElementById("link-wp").href = `https://fr.wikipedia.org/wiki/${names[index]}`;
}

nextImage();
prevImage();
// Pour faire afficher la 1è image, à faire: afficher sans cette méthode
