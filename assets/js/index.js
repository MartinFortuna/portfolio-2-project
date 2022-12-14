// Global Variables
const xApiKey = "63544228626b9c747864ae40";
const maxPointsInGame = 10;

// Add Event listeners

function addEventListener() {

    const onClickWrap = (e) => {

        switch (e.currentTarget.className) {
            case "next-round":
                toggleRoundModal(false);
                break;
            case "spock":
            case "rock":
            case "scissors":
            case "lizard":
            case "paper":
                runMatch(e);
                toggleRoundModal(true);
                break;
        }
    };

    document.querySelector(".spock").addEventListener("click", onClickWrap);
    document.querySelector(".rock").addEventListener("click", onClickWrap);
    document.querySelector(".scissors").addEventListener("click", onClickWrap);
    document.querySelector(".lizard").addEventListener("click", onClickWrap);
    document.querySelector(".paper").addEventListener("click", onClickWrap);
    document.getElementById("next-round").addEventListener("click", onClickWrap);
    document.querySelector(".form-user-name").addEventListener("submit", userRegister);
    document.querySelector(".btn-leaderboard").addEventListener("click", renderLearderboard);

    window.onload = () => {
        toggleLoad();
        document.querySelector('.username-modal').style.display = "block";
    };
}

function toggleLoad() {
    if (document.querySelector(".preloader").style.display == "none") {
        document.querySelector(".preloader").style.display = "block";
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
        cpu: matchPoint[cpuChoiceValue],
        roundRule: matchEvolIndex > 0 ? rules()[matchEvolIndex] : ``,
        roundVersus: `${userChoiceValue} vs ${cpuChoiceValue}`
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
        point[i2] = 1;
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

// Round result modal  

function toggleRoundModal(open) {
    const resultModal = document.getElementById("round-result-modal");
    if (open)
        resultModal.style.display = "block";
    else
        resultModal.style.display = "none";
}

function renderMatchResult(matchResult) {
    //e.g. = matchResult = { player: 0, cpu:1};    
    const [userValue, userElemt] = parseToIntValue(".user-score");
    innerHTMLRender(userElemt, scoreCompute(userValue, matchResult.player));

    const [cpuValue, cpuElemt] = parseToIntValue(".cpu-score");
    innerHTMLRender(cpuElemt, scoreCompute(cpuValue, matchResult.cpu));

    const [roundValue, roundElemt] = parseToIntValue(".round-count");
    innerHTMLRender(roundElemt, scoreCompute(roundValue, 1));

    //Round winner modal
    const roundWinner = document.getElementById("winner");
    const roundInputs = document.getElementById("round-inputs");

    const roundRuleMessage = `<h2>${matchResult.roundVersus}</h2></br><h2>${matchResult.roundRule}</h2><br>`;
    if (matchResult.player === 1) {
        roundWinner.innerText = `You!`;
        roundInputs.innerHTML = roundRuleMessage;
    } else if (matchResult.cpu === 1) {
        roundWinner.innerText = `Sheldon!`;
        roundInputs.innerHTML = roundRuleMessage;
    } else {
        roundWinner.innerText = `Draw!`;
        roundInputs.innerHTML = roundRuleMessage;
    }

}

function cpuChoiceIndex() {
    const max = choices().length;
    return Math.floor(Math.random() * max);
}

function findRuleIndex(player1, player2) {
    //when the v1 and v2 are the same the findIndex will return -1 whitch represent a "tie".
    //comparing "v1 !== v2" inside of the findIndex to avoid an "if"

    return rules().findIndex(s => player1 !== player2 && s.includes(player1) && s.includes(player2));
}

// Check Winner 

function checkWinner(event) {
    const [userValue, userElemt] = parseToIntValue(".user-score");
    const [cpuValue, cpuElemt] = parseToIntValue(".cpu-score");

    const userObj = JSON.parse(localStorage.getItem("username"));

    let dataObj = {
        player1: userObj.name,
        points1: userValue === maxPointsInGame ? 1 : 0,
        player2: "CPU",
        points2: cpuValue === maxPointsInGame ? 1 : 0
    };

    //show the winner popup

    if (userValue === maxPointsInGame) {
        document.getElementById("player-winner-modal").style.display = "block";
        const playAgain = document.getElementById("play-again-btn");
        playAgain.onclick = function() {
            document.getElementById("player-winner-modal").style.display = "none";
            document.getElementById("round-result-modal").style.display = "none";
        };

        //computeLeaderboard
        rankLeaderboard(dataObj);
        gameReset();
    } else if (cpuValue === maxPointsInGame) {
        document.getElementById("sheldon-winner-modal").style.display = "block";
        const playAgain = document.getElementById("play-again-btn-btn");
        playAgain.onclick = function() {
            document.getElementById("sheldon-winner-modal").style.display = "none";
            document.getElementById("round-result-modal").style.display = "none";
        };
        rankLeaderboard(dataObj);
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

// Gets leaderboard data

async function checkLeaderboard(data) {
    const resp = await fetch(`https://sheldonsgame-5552.restdb.io/rest/leaderboard?q=${JSON.stringify(data)}`, {
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

// Lists leaderboard data

async function listLearderboard(data) {

    const resp = await fetch(`https://sheldonsgame-5552.restdb.io/rest/leaderboard?max=10&q={}&h={"$orderby":{"points1":-1,"points2":1}}`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "x-apikey": xApiKey,
            "Content-Type": "application/json"
        }
    });
    const parseData = await resp.json();
    return (parseData && parseData.length > 0) ? parseData : null;
}

// Renders leaderboard data

async function renderLearderboard(data) {
    const [table, tableElemt] = getValue(`.lead-table`);
    try {
        toggleLoad();
        const leadboardData = await listLearderboard(data);
        if (leadboardData == null) {
            innerHTMLRender(tableElemt, "");
            return false;
        }

        const tableTRowTHeader = `
        <tr>
            <th>Placement</th>
            <th>Nickname</th>
            <th>Games Won</th>
            <th>VS</th>
            <th>Sheldon</th>
            <th>Games Won</th>
        </tr>`;

        const tableTRowData = `
        <tr>
            <td>rank</td>
            <td>player1</td>
            <td>points1</td>
            <td>VS</td>
            <td>Sheldon</td>
            <td>points2</td>
        </tr>`;

        let rank = 1;
        let tableRows = "";
        for (const row of leadboardData) {
            const render = tableTRowData
                .replace("rank", `${rank}`)
                .replace("player1", `${row.player1}`)
                .replace("points1", `${row.points1}`)
                .replace("points2", `${row.points2}`);
            tableRows = `${tableRows}${render}`;
            rank = rank + 1;
        }
        innerHTMLRender(tableElemt, `${tableTRowTHeader}${tableRows}`);

    } catch (error) {
        innerHTMLRender(tableElemt, "<tr><td>nothing to show :(</td></tr>");
        console.info(error);
    } finally {
        toggleLoad();
    }
}

// Pushes to leaderboard

async function addLeaderboard(data) {
    const resp = await fetch("https://sheldonsgame-5552.restdb.io/rest/leaderboard", {
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

// Updates leaderboard

async function updateLeaderboard(id, data) {
    const resp = await fetch(`https://sheldonsgame-5552.restdb.io/rest/leaderboard/${id}`, {
        method: "PATCH",
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

// Ranks leaderboard

async function rankLeaderboard(data) {
    const queryParam = {
        player1: data.player1
    };
    const queryData = await checkLeaderboard(queryParam);
    if (queryData != null) {
        data.points1 = data.points1 + queryData.points1;
        data.points2 = data.points2 + queryData.points2;
        await updateLeaderboard(queryData._id, data);
    } else {
        await addLeaderboard(data);
    }
}

addEventListener();

// Leaderboard modal
const leadModal = document.getElementById("leaderboard-modal");
const leadBtn = document.getElementById("btn-leaderboard");
var span = document.getElementsByClassName("leaderboard-close")[0];


leadBtn.onclick = function() {
    leadModal.style.display = "block";
};

span.onclick = function() {
    leadModal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == leadModal) {
        leadModal.style.display = "none";
    }
};

// Game Rules modal
const rulesModal = document.getElementById("rules-modal");
const rulesBtn = document.getElementById("btn-rules");
var span = document.getElementsByClassName("rules-close")[0];

rulesBtn.onclick = function() {
    rulesModal.style.display = "block";
};

span.onclick = function() {
    rulesModal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == rulesModal) {
        rulesModal.style.display = "none";
    }
};

// Change player modal
const changePlayerModal = document.querySelector('.username-modal');
const changePlayerBtn = document.getElementById("btn-change-player");

changePlayerBtn.onclick = function() {
    changePlayerModal.style.display = "block";
    gameReset();
};