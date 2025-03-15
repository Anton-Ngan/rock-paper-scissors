const PLAYER_CHOICES = 3;
const START_CAPTURED_NODES = 4;
const CAPTURED_NODES_TO_WIN = 8;

// Ordering matters in this array
const CHOICES = ["defense", "vanguard", "ranged"]

let humanScore = 0;
let computerScore = 0;
let drawScore = 0;
let round = 1;
let nodesCaptured = START_CAPTURED_NODES;

const buttons = document.querySelectorAll(".vanguard, .defense, .ranged");
const roundDisplay = document.querySelector("span.round");
const playerScoreDisplay = document.querySelector(".player-score");
const computerScoreDisplay = document.querySelector(".computer-score");
const drawScoreDisplay = document.querySelector(".draw-score");
const playerChoiceDisplay = document.querySelector(".player-choice");
const computerChoiceDisplay = document.querySelector(".computer-choice");
const resultDisplay = document.querySelector(".round-result");

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
        resultDisplay.textContent = "Draw!";                                                   // Draw
        drawScore++;
        drawScoreDisplay.textContent = drawScore;
    } else if ((humanNum + 1) % PLAYER_CHOICES == computerNum) {                               // Player Wins
        humanScore++;
        nodesCaptured++;
        const nodeElem = document.querySelector(`#n${nodesCaptured}`)
        nodeElem.setAttribute("style", "background-color: green")
        resultDisplay.textContent = `You win! ${humanChoice} beats ${computerChoice}.`;
    } else {                                                                                   // Computer Wins
        computerScore++;
        const nodeElem = document.querySelector(`#n${nodesCaptured--}`)
        nodeElem.setAttribute("style", "background-color: red")
        resultDisplay.textContent = `You lose! ${computerChoice} beats ${humanChoice}.`;
    }

    if (nodesCaptured == CAPTURED_NODES_TO_WIN || nodesCaptured == 0) {
        buttons.forEach( button => {button.disabled = true;})

        if (nodesCaptured == CAPTURED_NODES_TO_WIN) {
            resultDisplay.textContent = "You have captured the enemy's castle!";
        } else {
            resultDisplay.textContent = "The enemy has captured your castle!";
        }

    }
}

function playGame(humanSelection) {

    roundDisplay.textContent = round;
    round++;

    const computerSelection = getComputerChoice();
    playerChoiceDisplay.textContent = humanSelection;
    computerChoiceDisplay.textContent = computerSelection;

    playRound(humanSelection, computerSelection);
    playerScoreDisplay.textContent = humanScore;
    computerScoreDisplay.textContent = computerScore;
}

function main() {

    buttons.forEach( 
        (button) => button.addEventListener("click",
            () => {
                const humanSelection = button.className;
                playGame(humanSelection);
            }
        )
    );

    const resetButton = document.querySelector(".reset");
    resetButton.addEventListener("click", () => 
        {
            buttons.forEach( button => {button.disabled = false;})
            nodesCaptured = START_CAPTURED_NODES;

            const playerDefaultNodes = document.querySelectorAll(".player-node")
            playerDefaultNodes.forEach( (node) => {node.setAttribute("style", "background-color: green");} )

            const computerDefaultNodes = document.querySelectorAll(".computer-node")
            computerDefaultNodes.forEach( (node) => {node.setAttribute("style", "background-color: red");} )

            humanScore = 0;
            computerScore = 0;
            drawScore = 0;
            round = 1;

            resultDisplay.textContent = "";
            roundDisplay.textContent = 1;
            playerChoiceDisplay.textContent = "";
            computerChoiceDisplay.textContent = "";
            playerScoreDisplay.textContent = 0;
            computerScoreDisplay.textContent = 0;
            drawScoreDisplay.textContent = 0;
        }
    );
}

main()