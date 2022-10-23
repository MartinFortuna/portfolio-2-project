// Username modal
/*Request username
window.addEventListener("load",function(){
    this.setTimeout(
        function open(event){
            document.querySelector(".username-modal").style.display = "block";
        },1000
    )
});
*/

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
