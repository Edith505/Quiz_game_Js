const questions = [
    {
        question: "Quelle est la bonne façon de déclarer une variable constante en JavaScript ?",
        answers: [
            { text: "const maVar = 10;", correct: true },
            { text: "var maVar = 10;", correct: false },
            { text: "let maVar = 10;", correct: false },
            { text: "constant maVar = 10;", correct: false }
        ]
    },
    {
        question: "Que retournera l'expression '2' + 2 en JavaScript ?",
        answers: [
            { text: "'4'", correct: false },
            { text: "'22'", correct: true },
            { text: "4", correct: false },
            { text: "NaN", correct: false }
        ]
    },
    {
        question: "Comment peut-on écrire un commentaire sur une seule ligne en JavaScript ?",
        answers: [
            { text: "// Ceci est un commentaire", correct: true },
            { text: "/* Ceci est un commentaire */", correct: false },
            { text: "<!-- Ceci est un commentaire -->", correct: false },
            { text: "# Ceci est un commentaire", correct: false }
        ]
    },
    {
        question: "Laquelle de ces méthodes permet de transformer une chaîne de caractères en majuscules ?",
        answers: [
            { text: "toUpperCase()", correct: true },
            { text: "upperCase()", correct: false },
            { text: "makeUpperCase()", correct: false },
            { text: "toCaps()", correct: false }
        ]
    },
    {
        question: "Quel est le résultat de typeof null en JavaScript ?",
        answers: [
            { text: "'object'", correct: true },
            { text: "'null'", correct: false },
            { text: "'undefined'", correct: false },
            { text: "'number'", correct: false }
        ]
    },
    {
        question: "Comment peut-on créer une fonction fléchée qui retourne la somme de deux nombres a et b ?",
        answers: [
            { text: "(a, b) => a + b", correct: true },
            { text: "(a, b) => { return a + b; }", correct: true },
            { text: "function(a, b) => a + b", correct: false },
            { text: "a, b => { a + b }", correct: false }
        ]
    },
    {
        question: "Lequel de ces mots-clés N’EST PAS une façon de déclarer une variable en JavaScript ?",
        answers: [
            { text: "let", correct: false },
            { text: "var", correct: false },
            { text: "const", correct: false },
            { text: "int", correct: true }
        ]
    },
    {
        question: "Quelle est la valeur de 'false == 0' en JavaScript ?",
        answers: [
            { text: "true", correct: true },
            { text: "false", correct: false }
        ]
    },
    {
        question: "Comment peut-on convertir la chaîne \"123\" en nombre entier ?",
        answers: [
            { text: "parseInt(\"123\")", correct: true },
            { text: "Number(\"123\")", correct: true },
            { text: "\"123\".toInteger()", correct: false },
            { text: "int(\"123\")", correct: false }
        ]
    },
    {
        question: "Que fait la méthode Array.prototype.push() ?",
        answers: [
            { text: "Elle ajoute un ou plusieurs éléments à la fin d'un tableau.", correct: true },
            { text: "Elle supprime le dernier élément du tableau.", correct: false },
            { text: "Elle ajoute un élément au début du tableau.", correct: false },
            { text: "Elle trie le tableau.", correct: false }
        ]
    }
];

// Sélection des éléments du DOM en français
const ecranDemarrage = document.getElementById('ecran-demarrage');
const ecranQuiz = document.getElementById('ecran-quiz');
const ecranResultat = document.getElementById('ecran-resultat');
const boutonDemarrer = document.getElementById('bouton-demarrer');
const boutonRecommencer = document.getElementById('bouton-recommencer');
const conteneurReponses = document.getElementById('conteneur-reponses');
const questionActuelleSpan = document.getElementById('question-actuelle');
const totalQuestionsSpan = document.getElementById('total-questions');
const scoreAffichage = document.getElementById('score');
const scoreFinal = document.getElementById('score-final');
const maxScore = document.getElementById('max-score');
const messageResultat = document.getElementById('message-resultat');
const barreProgression = document.getElementById('progression');
const questionTitre = document.getElementById('question');

let indiceQuestion = 0;
let score = 0;
let peutRepondre = false;

// Initialisation
totalQuestionsSpan.textContent = questions.length;
maxScore.textContent = questions.length;

boutonDemarrer.addEventListener('click', demarrerQuiz);
boutonRecommencer.addEventListener('click', recommencerQuiz);

function demarrerQuiz() {
    score = 0;
    indiceQuestion = 0;
    scoreAffichage.textContent = score;
    afficherEcran(ecranQuiz);
    afficherQuestion();
}

function afficherEcran(ecranAAfficher) {
    [ecranDemarrage, ecranQuiz, ecranResultat].forEach(ecran => ecran.classList.remove('actif'));
    ecranAAfficher.classList.add('actif');
}

function afficherQuestion() {
    peutRepondre = true;
    const questionData = questions[indiceQuestion];

    questionTitre.textContent = questionData.question;
    questionActuelleSpan.textContent = indiceQuestion + 1;
    scoreAffichage.textContent = score;

    barreProgression.style.width = `${((indiceQuestion) / questions.length) * 100}%`;

    conteneurReponses.innerHTML = '';
    questionData.answers.forEach(reponse => {
        const btn = document.createElement('button');
        btn.textContent = reponse.text;
        btn.classList.add('bouton-reponse');
        btn.dataset.correct = reponse.correct;
        btn.addEventListener('click', selectionnerReponse);
        conteneurReponses.appendChild(btn);
    });
}

function selectionnerReponse(e) {
    if (!peutRepondre) return;
    peutRepondre = false;
    const boutonSelectionne = e.target;
    const correct = boutonSelectionne.dataset.correct === 'true';

    Array.from(conteneurReponses.children).forEach(btn => {
        if (btn.dataset.correct === 'true') {
            btn.classList.add('correct');
        } else {
            btn.classList.add('incorrect');
        }
        btn.disabled = true;
    });

    if (correct) {
        score++;
        scoreAffichage.textContent = score;
    }

    setTimeout(() => {
        indiceQuestion++;
        if (indiceQuestion < questions.length) {
            afficherQuestion();
        } else {
            afficherResultat();
        }
    }, 900);
}

function afficherResultat() {
    afficherEcran(ecranResultat);
    scoreFinal.textContent = score;
    maxScore.textContent = questions.length;
    barreProgression.style.width = "100%";
    const pourcentage = (score / questions.length) * 100;
    if (pourcentage === 100) {
        messageResultat.textContent = "🌟 Excellent travail ! Vous avez obtenu un score parfait ! 🎯";
    } else if (pourcentage >= 80) {
        messageResultat.textContent = "👏 Très bon travail ! Vous avez bien réussi le quiz. 🧠";
    } else if (pourcentage >= 50) {
        messageResultat.textContent = "👍 Bon effort ! Vous avez réussi, mais il y a de la place pour l'amélioration. 📘";
    } else {
        messageResultat.textContent = "🔁 Vous pouvez faire mieux. N'hésitez pas à revoir les concepts. 💡";
    }
}

function recommencerQuiz() {
    score = 0;
    indiceQuestion = 0;
    afficherEcran(ecranDemarrage);
    barreProgression.style.width = "0%";
}