const PLAYER_CHOICES = 3;

const CHOICE_MAPPING = {
    0: "paper",
    1: "rock",
    2: "scissor"
}

let humanScore = 0;
let computerScore = 0;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function getComputerChoice() {
    num = getRandomInt(PLAYER_CHOICES);
    return CHOICE_MAPPING[num];
}

function getHumanChoice() {
    return prompt("Make a choice");
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

function humanWon(humanChoice, computerChoice) {
    humanScore++;
    console.log(`You win! ${humanChoice} beats ${computerChoice}.`)
}

function computerWon(humanChoice, computerChoice) {
    computerScore++;
    console.log(`You lose! ${computerChoice} beats ${humanChoice}.`)
}

function tie() {
    console.log("Draw")
}

function playRound(humanChoice, computerChoice) {
    humanChoice = humanChoice.toLowerCase();
    let humanNum = getKeyByValue(CHOICE_MAPPING, humanChoice);
    let computerNum = getKeyByValue(CHOICE_MAPPING, computerChoice);

    if (humanNum == computerNum) {
        tie();
    } else if ((humanNum + 1) % PLAYER_CHOICES == computerNum) {
        humanWon(humanChoice, computerChoice);
    } else {
        computerWon(humanChoice, computerChoice);
    }
}

const humanSelection = getHumanChoice();
const computerSelection = getComputerChoice();

playRound(humanSelection, computerSelection);

// console.log(getComputerChoice())
// console.log(getHumanChoice())