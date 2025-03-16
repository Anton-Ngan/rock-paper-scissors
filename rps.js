const PLAYER_CHOICES = 3;
const START_CAPTURED_NODES = 5;
const CAPTURED_NODES_TO_WIN = 10;

// Ordering matters in this array
const CHOICES = ["defense", "vanguard", "ranged"]

let humanScore = 0;
let computerScore = 0;
let drawScore = 0;
let round = 1;
let nodesCaptured = START_CAPTURED_NODES;

const buttons = document.querySelectorAll(".vanguard, .defense, .ranged");
const roundDisplay = document.querySelector("span.round");
const playerImageDisplay = document.querySelector(".human-choice img");
const computerImageDisplay = document.querySelector(".computer-choice img");
const playerPaddingDisplay = document.querySelector(".human-choice");
const computerPaddingDisplay = document.querySelector(".computer-choice");
const battleMsg = document.querySelector(".battleMsg");

// Modal Elements
const closeModalButton = document.querySelector(".play-again-button");
const overlay = document.querySelector("#overlay");
const modal = document.querySelector("#modal");
const modalHeader = document.querySelector(".modal-header");
const modalMsg = document.querySelector(".message");
const drawMsg = document.querySelector(".draws");
const winMsg = document.querySelector(".wins");
const lossMsg = document.querySelector(".losses");

const resetGame = () => 
    {
        playerPaddingDisplay.setAttribute("style", "background-color: #bbb;");
        computerPaddingDisplay.setAttribute("style", "background-color: #bbb;");

        playerImageDisplay.setAttribute("src", "");    
        computerImageDisplay.setAttribute("src", "");
        nodesCaptured = START_CAPTURED_NODES;

        const playerDefaultNodes = document.querySelectorAll(".player-node")
        playerDefaultNodes.forEach( (node) => {node.setAttribute("style", "background-color: lightblue");} )

        const computerDefaultNodes = document.querySelectorAll(".computer-node")
        computerDefaultNodes.forEach( (node) => {node.setAttribute("style", "background-color: gray");} )

        round = 1;
        roundDisplay.textContent = 1;

        humanScore = 0;
        computerScore = 0;
        drawScore = 0;
    }

function openModal(modal) {
    modal.classList.add("active");
    overlay.classList.add("active");
}

function closeModal(modal) {
    modal.classList.remove("active");
    overlay.classList.remove("active");
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function getIdxByValue(arr, value) {
    return arr.findIndex( (elem) => elem == value );
}

function getComputerChoice() {
    num = getRandomInt(PLAYER_CHOICES);
    return CHOICES[num];
}

function playRound(humanChoice, computerChoice) {

    humanChoice = humanChoice.toLowerCase();
    let humanNum = getIdxByValue(CHOICES, humanChoice);
    let computerNum = getIdxByValue(CHOICES, computerChoice);

    if (humanNum == computerNum) {
        drawScore++;
        playerPaddingDisplay.setAttribute("style", "background-color: yellow");
        computerPaddingDisplay.setAttribute("style", "background-color: yellow");
        battleMsg.textContent = "Battle results in a draw!";
    } else if ((humanNum + 1) % PLAYER_CHOICES == computerNum) {                             
        humanScore++;
        nodesCaptured++;
        const nodeElem = document.querySelector(`#n${nodesCaptured}`)
        playerPaddingDisplay.setAttribute("style", "background-color: green");
        computerPaddingDisplay.setAttribute("style", "background-color: red");
        nodeElem.setAttribute("style", "background-color: lightblue")
        battleMsg.textContent = `You won this battle! The ${humanChoice} class beats the ${computerChoice} class.`;
    } else {                                                                               
        computerScore++;
        const nodeElem = document.querySelector(`#n${nodesCaptured--}`)
        nodeElem.setAttribute("style", "background-color: gray")
        playerPaddingDisplay.setAttribute("style", "background-color: red");
        computerPaddingDisplay.setAttribute("style", "background-color: green");
        battleMsg.textContent = `You lost this battle! The ${humanChoice} class is no match for the ${computerChoice} class.`;
    }

    if (nodesCaptured == CAPTURED_NODES_TO_WIN || nodesCaptured == 0) {
        if (nodesCaptured == CAPTURED_NODES_TO_WIN) {
            modalHeader.textContent = "You Win!"
            modalMsg.textContent = "You have captured the enemy's castle";
        } else {
            modalHeader.textContent = "You Lose!";
            modalMsg.textContent ="The enemy has captured your castle";
        }
        drawMsg.textContent = drawScore;
        winMsg.textContent = humanScore;
        lossMsg.textContent = computerScore;
        openModal(modal);
    }
}

function playGame(humanSelection) {

    round++;
    roundDisplay.textContent = round;

    const computerSelection = getComputerChoice();
    
    playerImageDisplay.setAttribute("src", `./img/${humanSelection}.png`);    
    computerImageDisplay.setAttribute("src", `./img/${computerSelection}.png`);

    playRound(humanSelection, computerSelection);
}

function main() {

    buttons.forEach((button) => button.addEventListener("click", (e) => {
        const humanSelection = e.target.className.split(" ")[0];
        playGame(humanSelection);
    }));

    const resetButton = document.querySelector(".reset");
    resetButton.addEventListener("click", resetGame);

    closeModalButton.addEventListener("click",
        () => {
            closeModal(modal);
            resetGame();
        }
    )
}

main()