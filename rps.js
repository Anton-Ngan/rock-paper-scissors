const PLAYER_CHOICES = 3;
const MAX_ROUNDS = 5;

// Ordering matters here
const CHOICES = ["paper", "rock", "scissor"]

let humanScore = 0;
let computerScore = 0;
let drawScore = 0;
let round = 1;

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

function getHumanChoice() {
    return prompt("Make a choice");
}

function playRound(humanChoice, computerChoice) {

    humanChoice = humanChoice.toLowerCase();
    let humanNum = getIdxByValue(CHOICES, humanChoice);
    let computerNum = getIdxByValue(CHOICES, computerChoice);

    if (humanNum == computerNum) {
        resultDisplay.textContent = "Draw!";
        drawScore++;
        drawScoreDisplay.textContent = drawScore;
    } else if ((humanNum + 1) % PLAYER_CHOICES == computerNum) {
        humanScore++;
        resultDisplay.textContent = `You win! ${humanChoice} beats ${computerChoice}.`;
    } else {
        computerScore++;
        resultDisplay.textContent = `You lose! ${computerChoice} beats ${humanChoice}.`;
    }
}

function playGame(humanSelection) {

    roundDisplay.textContent = round;
    round++;

    // for (let round = 0; round < MAX_ROUNDS; round++) {
    // console.log(`Round ${round+1}`)
    const computerSelection = getComputerChoice();
    playerChoiceDisplay.textContent = humanSelection;
    computerChoiceDisplay.textContent = computerSelection;

    // console.log(`You chose ${humanSelection}. Computer chose ${computerSelection}.`)

    playRound(humanSelection, computerSelection);
    playerScoreDisplay.textContent = humanScore;
    computerScoreDisplay.textContent = computerScore;
    // console.log(`Your Score: ${humanScore} | Computer Score: ${computerScore}`)
    // }
}

function main() {

    const buttons = document.querySelectorAll(".rock, .paper, .scissor");
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
// playGame()
// console.log(getComputerChoice())
// console.log(getHumanChoice())