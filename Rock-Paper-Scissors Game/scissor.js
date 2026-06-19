let uScore = 0;
let cScore = 0;

let userScore = document.getElementById("user-score");
let compScore = document.getElementById("comp-score");
let choices = document.querySelectorAll(".choice");
let gameMessage = document.getElementById("msg");

let select = document.querySelector("#mode-select");
let btn = document.querySelector(".reset");

/* ── Dark mode ── */
const darkToggle = document.querySelector(".dark-toggle");
const toggleIcon = document.getElementById("toggle-icon");
const toggleLabel = document.getElementById("toggle-label");

darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    toggleIcon.className = isDark ? "ti ti-sun" : "ti ti-moon";
    toggleLabel.textContent = isDark ? "Light mode" : "Dark mode";
    localStorage.setItem("rps-dark", isDark ? "1" : "0");
});

// Persist preference across page loads
if (localStorage.getItem("rps-dark") === "1") {
    document.body.classList.add("dark");
    toggleIcon.className = "ti ti-sun";
    toggleLabel.textContent = "Light mode";
}

let getCompchoice = () => {
    const options = ["Rock", "Paper", "Scissor"];
    return options[Math.floor(Math.random() * 3)];
};

let playGame = (userChoice) => {
    let maxRounds = Number(select.value); // fix: read fresh each round
    let compChoice = getCompchoice();

    if (userChoice === compChoice) {
        gameMessage.innerText = "Draw";
    } else if (userChoice === "Rock") {
        if (compChoice === "Paper") {
            gameMessage.innerText = "AI wins! Paper covers Rock.";
            cScore++; compScore.innerText = cScore;
        } else {
            gameMessage.innerText = "You win! Rock smashes Scissor.";
            uScore++; userScore.innerText = uScore;
        }
    } else if (userChoice === "Scissor") {
        if (compChoice === "Rock") {
            gameMessage.innerText = "AI wins! Rock smashes Scissor.";
            cScore++; compScore.innerText = cScore;
        } else {
            gameMessage.innerText = "You win! Scissors cut Paper.";
            uScore++; userScore.innerText = uScore;
        }
    } else if (userChoice === "Paper") {
        if (compChoice === "Scissor") {
            gameMessage.innerText = "AI wins! Scissors cut Paper.";
            cScore++; compScore.innerText = cScore;
        } else {
            gameMessage.innerText = "You win! Paper covers Rock.";
            uScore++; userScore.innerText = uScore;
        }
    }

    if (uScore + cScore === maxRounds) {
        gameMessage.innerText = uScore > cScore ? "You WIN!" : "You LOSE!";
        document.querySelector(".container").classList.add("game_over"); // fix: no dot
        btn.innerHTML = "<i class='fa-solid fa-play' style='color: rgb(39, 39, 39);'></i>";
    }
};

for (let choice of choices) {
    choice.addEventListener("click", () => {
        playGame(choice.getAttribute("id"));
    });
}

btn.onclick = () => {
    uScore = 0; cScore = 0;
    userScore.innerText = 0;
    compScore.innerText = 0;
    gameMessage.innerText = "Play your move";
    document.querySelector(".container").classList.remove("game_over");
    btn.innerHTML="<i class='fa-solid fa-arrow-rotate-right fa-xl'></i>";
};