// Global Variables

const xApiKey = "63544228626b9c747864ae40";
const maxPointsInGame = 10;

// Add Event listeners

function addEventListener() {
    document.querySelector(".spock").addEventListener("click", runMatch);
    document.querySelector(".rock").addEventListener("click", runMatch);
    document.querySelector(".scissors").addEventListener("click", runMatch);
    document.querySelector(".lizard").addEventListener("click", runMatch);
    document.querySelector(".paper").addEventListener("click", runMatch);
    document.querySelector(".form-user-name").addEventListener("submit", userRegister);
    document.querySelector(".btn-leaderboard").addEventListener("click", renderLearderboard);

    window.onload = () => {
        toggleLoad();
        document.querySelector('.username-modal').style.display = "block";
    }
}

function toggleLoad() {
    if (document.querySelector(".preloader").style.display == "none") {
        document.querySelector(".preloader").style.display = "block"
    } else {
        document.querySelector(".preloader").style.display = "none";
    }
}

// Leaderboard modal
const leadModal = document.getElementById("leaderboard-modal");
const leadBtn = document.getElementById("btn-leaderboard");
var span = document.getElementsByClassName("leaderboard-close")[0];

leadBtn.onclick = function () {
    leadModal.style.display = "block";
}

span.onclick = function () {
    leadModal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == leadModal) {
        leadModal.style.display = "none";
    }
}

// Game Rules modal
const rulesModal = document.getElementById("rules-modal");
const rulesBtn = document.getElementById("btn-rules");
var span = document.getElementsByClassName("rules-close")[0];

rulesBtn.onclick = function () {
    rulesModal.style.display = "block";
}

span.onclick = function () {
    rulesModal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == rulesModal) {
        rulesModal.style.display = "none";
    }
}

//Preloader
window.onload = () => document.querySelector(".preloader").style.display = "none";