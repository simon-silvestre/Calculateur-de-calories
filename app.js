const questionContainer = document.querySelector(".question-container");
const questionEl        = document.querySelector(".question");
const nbQuestionEl      = document.querySelector(".nombre-de-questions");
const form              = document.querySelector(".reponse-container");
const reponse           = document.getElementById("reponse");
let genre;
let taille;
let poids;
let age;

const questions = [
    {
        question: "Quel est votre genre (homme ou femme ?)"
    }, {
        question: "Quel taille faites vous ? (ex: 175cm)"
    }, {
        question: "Quel poids faites vous ? (ex: 70.5kg) "
    }, {
        question: "Quel âge avez-vous ? (ex: 20 ans)"
    }
];

let currentQuestion = 0;

loadQuestionnaire();

function loadQuestionnaire() {

    if (currentQuestion <= questions.length - 1) {
    const currentQuestionData = questions[currentQuestion];
    questionEl.textContent    = currentQuestionData.question;
    nbQuestionEl.textContent  = currentQuestion + 1 + " / " + questions.length;
    }
}

function effacerReponse() {
    reponse.value = "";
}

function fini() {
    if (genre === "homme") {
        let calories = Math.round((13.707 * poids) + (492.3 * taille ) - (6.673 * age ) + 77.607);
        questionContainer.innerHTML ="<span class='question'>Votre total calorique est de :</span><br><h2>" + calories + " Calories</h2>";
    }
    else if (genre === "femme") {
        let calories = Math.round(667.051 + (9.74 * poids) + (172.9 * taille) - (4.737 * age));
        questionContainer.innerHTML ="<span class='question affichaeFini'>Votre total calorique est de :</span><br><h2>" + calories + " Calories</h2>";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (currentQuestion <= questions.length - 1) {
        if(currentQuestion === 0) {
            if (reponse.value == "homme") {
                currentQuestion++;
                genre = reponse.value;
            }
            else if (reponse.value == "femme") {
                currentQuestion++;
                genre = reponse.value;
            }
        }
        else if (currentQuestion === 1) {
            if (reponse.value !== false && !isNaN(reponse.value) && reponse.value.length < 4 && reponse.value.length > 1) {
                currentQuestion++;
                taille = reponse.value / 100;
            }
        }
        else if (currentQuestion === 2) {
            if (reponse.value !== false && !isNaN(parseFloat(reponse.value)) && reponse.value.length <= 4 && reponse.value.length > 1) {
                currentQuestion++;
                poids = parseInt(reponse.value);
            }
        }
        else if (currentQuestion === 3) {
            if (reponse.value !== false && !isNaN(reponse.value) && reponse.value.length < 4) {
                currentQuestion++;
                age = parseInt(reponse.value);
                fini();
            }
        }
        effacerReponse();
        loadQuestionnaire();
    }
});
