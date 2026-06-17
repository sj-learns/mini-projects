let currTurn="X";
document.querySelector(".grid").classList.add("x-turn");
const winCombos = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]            // diagonals
];

let cells=document.getElementsByClassName("cell");
for(let cell of cells){
    cell.addEventListener("click",()=>{
        if(currTurn=="X"){
            currTurn="O";
            document.querySelector(".grid").classList.add("o-turn");
            document.querySelector(".grid").classList.remove("x-turn");
            cell.classList.add("X-done");
        }
        else if(currTurn=="O"){
            currTurn="X";
            document.querySelector(".grid").classList.add("x-turn");
            document.querySelector(".grid").classList.remove("o-turn");
            cell.classList.add("O-done");
        }
        for(let i=0;i<winCombos.length;i++){
            const[a,b,c]=winCombos[i];
            const allX=cells[a].classList.contains("X-done") && cells[b].classList.contains("X-done") && cells[c].classList.contains("X-done");
            const allO=cells[a].classList.contains("O-done") && cells[b].classList.contains("O-done") && cells[c].classList.contains("O-done");
            if(allX || allO){
                document.querySelector(".grid").classList.add("game-over");
                cells[a].classList.add("winner");
                cells[b].classList.add("winner");
                cells[c].classList.add("winner");
                break;
            }
        }
    })
}
document.getElementById("reset").addEventListener("click", () => {
    for (let cell of cells) {
        cell.classList.remove("X-done", "O-done", "winner");
    }
    currTurn = "X";
    const grid = document.querySelector(".grid");
    grid.classList.remove("o-turn", "game-over");
    grid.classList.add("x-turn");
});
const themeBtn = document.getElementById("theme");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");

    // Icon swap
    const icon = themeBtn.querySelector("i");
    if (document.body.classList.contains("dark")) {
        icon.className = "fa-solid fa-sun"; // sun icon
    } else {
        icon.className = "fa-solid fa-moon"; // moon icon
    }
});