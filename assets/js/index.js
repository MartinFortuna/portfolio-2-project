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

// Core game

function rules() {
    return [
        "Scissors cuts Paper",
        "Paper covers Rock",
        "Rock crushes Lizard",
        "Lizard poisons Spock",
        "Spock smashes Scissors",
        "Scissors decapitates Lizard",
        "Lizard eats Paper",
        "Paper disproves Spock",
        "Spock vaporizes Rock",
        "Rock crushes Scissors"
    ];
}

function choices() {
    //.map runs each line of the array
    //x.split(" ") breaks on " ", giving an array of 3 itens, e.g. ["Scissors", "cuts", "Paper"]
    //x.split(" ")[0] gets the 1st possition, "Scissors"
    //new Set(...), creates an object that remove duplicated values
    return [...new Set(rules().map(x => x.split(" ")[0]))];
}

function runMatch(e) {
    //spock, paper ...
    const userInputChoice = e.currentTarget.className;
    const userInputChoiceIndex = choices().findIndex(s => s.toLocaleLowerCase() === userInputChoice);
    const userChoiceValue = choices()[userInputChoiceIndex];
    const cpuChoiceValue = choices()[cpuChoiceIndex()];
    const matchEvolIndex = findRuleIndex(userChoiceValue, cpuChoiceValue);
    const matchPoint = points(matchEvolIndex, userChoiceValue, cpuChoiceValue);
    const matchScoreCount = {
        player: matchPoint[userChoiceValue],
        cpu: matchPoint[cpuChoiceValue]
    };

    console.info(`${userChoiceValue} vs ${cpuChoiceValue}`);
    console.info(matchPoint);
    renderMatchResult(matchScoreCount);

    checkWinner();
}

function points(index, i1, i2) {
    let point = {};
    //get the indexOf one of the values input.
    //if the index is on the beginning, it means that the v1 wins
    //if it's on the end it's a lose.
    //tie
    if (index < 0) {
        point[i1] = 0;
        point[i2] = 0;
    } //wins
    else if (rules()[index].indexOf(i1) == 0) {
        point[i1] = 1;
        point[i2] = 0;
    } //loses
    else {
        point[i1] = 0;
        point[i2] = 1
    }
    return point;

}

function innerHTMLRender(element, value) {
    element.innerHTML = `${value}`;
}

function scoreCompute(parse, value) {
    return parse + value;
}

function parseToIntValue(selector) {
    const element = document.querySelector(selector);
    const value = element ? parseInt(element.textContent) : 0;
    return [value, element];
}

function getValue(selector) {
    const element = document.querySelector(selector);
    return [element.textContent, element];
}

function renderMatchResult(matchResult) {
    //e.g. = matchResult = { player: 0, cpu:1};    
    const [userValue, userElemt] = parseToIntValue(".user-score");
    innerHTMLRender(userElemt, scoreCompute(userValue, matchResult.player));

    const [cpuValue, cpuElemt] = parseToIntValue(".cpu-score");
    innerHTMLRender(cpuElemt, scoreCompute(cpuValue, matchResult.cpu));

    const [roundValue, roundElemt] = parseToIntValue(".round-count");
    innerHTMLRender(roundElemt, scoreCompute(roundValue, 1));


}

function cpuChoiceIndex() {
    const max = choices().length;
    return Math.floor(Math.random() * max);
}

function matchTest() {
    for (const i of choices()) {
        for (const j of choices()) {
            const ix = findRuleIndex(i, j);
            if (ix < 0) {
                console.info(`${i} and ${j} it"s a tie (0).`);
                continue;
            }
            console.info(rules()[ix]);

            //get the index of one of the input values.
            //if the index is on the beginning, it  means that the v1 wins
            //if its on the end it's a lose.
            if (rules()[ix].indexOf(i) == 0) {
                console.info(`${i} wins +1.`);
                console.info(`${j} lose (0).`);
            } else {
                console.info(`${j} wins +1.`);
                console.info(`${i} lose (0).`);
            }
        }
    }
}

function findRuleIndex(player1, player2) {
    //when the v1 and v2 are the same the findIndex will return -1 whitch represent a "tie".
    //comparing "v1 !== v2" inside of the findIndex to avoid an "if"

    return rules().findIndex(s => player1 !== player2 && s.includes(player1) && s.includes(player2));
}

// Check Winner 

function checkWinner() {
    const [userValue, userElemt] = parseToIntValue(".user-score");
    const [cpuValue, cpuElemt] = parseToIntValue(".cpu-score");

    const userObj = JSON.parse(localStorage.getItem("username"));

    let dataObj = {
        player1: userObj.name,
        points1: userValue === maxPointsInGame ? 1 : 0,
        player2: "CPU",
        points2: cpuValue === maxPointsInGame ? 1 : 0
    }

    if (userValue === maxPointsInGame || cpuValue === maxPointsInGame) {
        //show the winner popup
        //computeLeaderboard
        rankLeaderboard(dataObj)
        gameReset();
    }
}

// Game reset 

function gameReset() {
    //e.g. = matchResult = { player: 0, cpu:1};    
    const [userValue, userElemt] = parseToIntValue(".user-score");
    innerHTMLRender(userElemt, 0);

    const [cpuValue, cpuElemt] = parseToIntValue(".cpu-score");
    innerHTMLRender(cpuElemt, 0);

    const [roundValue, roundElemt] = parseToIntValue(".round-count");
    innerHTMLRender(roundElemt, 0);
}

// Async functions to post and get data from restdb.io database

// Check user if username already exists

async function checkUserNameExists(data) {
    const resp = await fetch(`https://sheldonsgame-5552.restdb.io/rest/nicknames?q=${JSON.stringify(data)}`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "x-apikey": xApiKey,
            "Content-Type": "application/json"
        }
    });
    const parseData = await resp.json();
    return (parseData && parseData.length > 0) ? parseData[0] : null;
}

// If username does not exist, add username to database

async function addUserName(data) {
    const resp = await fetch("https://sheldonsgame-5552.restdb.io/rest/nicknames", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "x-apikey": xApiKey,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const parseData = await resp.json();
    return (parseData) ? parseData : null;
}

// Does not push to database if no username is input or returns alert if no connection to database

async function userRegister(e) {
    const [userText, userElemtText] = getValue(`.user-name-text`);
    e.preventDefault();
    try {
        toggleLoad();
        if (userElemtText.value.trim() == "") {
            return false;
        }
        
        const data = {
            name: userElemtText.value
        };
        const exists = (await checkUserNameExists(data)) != null;
        if (!exists) {
            await addUserName(data);
        }        
        localStorage.setItem("username", JSON.stringify(data));
        document.querySelector('.username-modal').style.display = "none";
    } catch (error) {
        console.info(error);
        alert(`failed to register [${userElemtText.value.trim()}]`)
    } finally {
        toggleLoad();
        return false;
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

