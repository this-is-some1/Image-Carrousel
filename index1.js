let names = ["Alan Turing", "Steve Jobs", "Linus Torvalds", "Stephen Hawking", "Bill Gates", "Sam Altman"];
let index = 0;

const darkModeToggle = document.querySelectorAll("button")[2];
const darkModeIcon = darkModeToggle.querySelector('i');

const isDarkMode = localStorage.getItem('darkMode') === 'true';
if (isDarkMode) {
    document.body.classList.add('dark-mode');
    darkModeIcon.classList.remove('fa-moon');
    darkModeIcon.classList.add('fa-sun');
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);

    if (isDark) {
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
    } else {
        darkModeIcon.classList.remove('fa-sun');
        darkModeIcon.classList.add('fa-moon');
    }
}

function updateCarousel() {
    let nameElement = document.querySelector("h2");
    let descElement = document.querySelector("p");
    let linkElement = document.querySelector("a");

    let currentName = names[index];

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

            let imgElement = document.querySelector("img");
            if (data.thumbnail && data.thumbnail.source) {
                imgElement.src = data.thumbnail.source;
            } else {
                imgElement.src = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAmwMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQMEBQIH/8QANBAAAgEDAgIIBQIHAQAAAAAAAAECAwQREiExUQUTMkFhcYGRFCJSobFiciMzQkNTweEV/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APuIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIbS4tIqnc0IdutBecgLgV0q1Oss0pxkuaeSwAAAAAAAAAAAAAAGe5vKdtpU1KUpcIwWWaDBP5el6be+qi0vRgT8bWk/4dlVf7sIjrOkJdmhRh+6WfwbsEgYeqv59u4pw/ZDI+BqS/m3lZ89LwbZNRWW8I8wqQm8RkmwMi6Lt+M3Um/1TZbCwtYdmjD1WTSAOe6caHSlPq4qKqwaeNllHQMF/8lxZ1OVTS/U3ICQAAAAAAAAAAAIbSWW8ICTDe/LeWc/1OPui2pdwj2VqMF/XlKNObwlCopbAddEgAZ73V1axnGdzJQy6sVHOcr2Ok1lYZCjGO6SXkBJJnuK/V/LHDl+DM7ir9b9gPfSyxaxn9E4yNsXlZMFebuLC4jJbqJrtJa7alLnBfgC0AAAAAAAAAACm6WaMseZcQ1lbgckrulqoTXgX1Y6Jyjyf2K6i1U5LmmB1LeWuhTlzimK1WNOOZeiKOj6q/wDPpTk9lHHsZ6tR1J6n6AWO7qN7YXoWxuJKhrnjU+yuZjW7w+Heeqk9Tz3JYQFdaqoZlJttvZLi2SrWrKOu6rdRD6Yvf3ItdEY1L6qsxp7U0X29o7jFxefNKW8Yd0UBVRtbGvJwo3FWUsb4l/wu6m6s1ihPrqS/ty4peDN0YRh2YpeSPQFFrcU7iGuDfJp8Uy859yvhbqFzFYjOShV/0zegJAAAAAAAAAAGO+hhqou/ZmU6VeGunKPsc3zAmyy+j5w+ioyDxb13aVKqlSnOFR6lpLPjH/RZYf6mB54kzhPq5NRlsn3B3d2+xCjBe54nUvJpqVxFJ8VGKAupOgujLeNwm4zaW3PJ0lwOXYKFahO0rbunLK7tu5nUXACQABk6US+Bqvyf3NFJ5px8kY+kW60qdrDeU5Jy8Io3JYQEgAAAAAAAAAAc24hoqyS4cTpGW9hmKny2YGMAACD1GMpPEYt+RfTtJy7bUfuBjnGWqNWlLTUjwfPwZro9JQwo3KdKfivlfkzTC3pww8ZfNlkoRnHTJJrk0BU7u3xnr6fnqRRPpBTei0i60+aWIr1L/g7f/DT9i2MIxWIpJeCA41GvOzvJfFrefGpj8eB2YSUoqUWmmspopu7aFzS0z2a3Ul3MydG0rm3qyo1It0ksqXdnwA6YAAAAAAAAAAHmpFTg4vgz0AMKtKmcNrHMup2tOO8sy8zQAIUYpYSSXgSAAAAAAACMEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/Z";
            }
    	});
}

const add = () => {
    let input = prompt("Indiquer le nom complet (sans fautes!) de la personne a rajouter.");
    input = input.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    names.push(input);
    index = names.length - 1;
    updateCarousel();
};

const rst = () => {
    names = ["Alan Turing", "Steve Jobs", "Linus Torvalds", "Stephen Hawking"];
    index = 0;
    updateCarousel();
};

updateCarousel();

document.querySelector("h1").addEventListener("click", () => {document.querySelector("h1").style.color = prompt("Indiquer la nouvelle couleur");});
let buttons = document.querySelectorAll("button");
let actions_boutons = [add, rst, toggleDarkMode, prevImage, nextImage];
let i = 0;

buttons.forEach((bouton) => {
    bouton.addEventListener("click", actions_boutons[i]);
    i++;
});

document.addEventListener("keydown", function(event) {
    if (event.key == "ArrowLeft") {document.querySelectorAll("button")[3].click();
    } else if (event.key == "ArrowRight") {document.querySelectorAll("button")[4].click();
    }
});