let box = document.querySelectorAll(".box");
let player = document.querySelector("#player");
let resetbtn = document.querySelector("#reset");
let newBtn= document.querySelector("#new");
let msg = document.querySelector("#msg");
let msgCon = document.querySelector(".msg-con");
let turnO = false;
let count= 0;

const winpatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

player.innerText = "1";

const resetGame = () =>{
    turnO= false;
    player.innerText = "1";
    enableboxes();
    msgCon.classList.add("hide");
    count =0;

}

box.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if(turnO){
            box.innerText = "O";
            turnO = false;
            player.innerText = "1";
            box.style.color = "black";

        }
        else{
            box.innerText = "X";
            turnO = true;
            player.innerText = "2";
            box.style.color = "#CF1821";


        }
        box.disabled = true;
        let iswiner= checkwinner();
        count++;
        if(count==9 && !iswiner){
            draw();
        }
    })
})

const showWinner = () =>{
    msgCon.classList.remove("hide");
    let winner = (player.innerText==="2")?1:2;
    msg.innerText =`Congratulations! Winner is player ${winner}`;
    disableBoxes();
}

const disableBoxes=()=>{
    for(let boxes of box){
        boxes.disabled = true;
    }
}

const enableboxes=()=>{
    for(let boxes of box){
        boxes.disabled = false;
        boxes.innerText="";
    }
}
const checkwinner = () =>{
    for(let pattern of winpatterns){
        let pos1val = box[pattern[0]].innerText;
        let pos2val = box[pattern[1]].innerText;
        let pos3val = box[pattern[2]].innerText;

        if(pos1val!="" && pos2val!="" && pos3val!=""){
            if(pos1val === pos2val && pos2val === pos3val){
                showWinner();
                return true;
            }
        }
    }
    return false;
}

const draw=()=>{
    msgCon.classList.remove("hide");
    disableBoxes();
    msg.innerText="Game Was A Draw!";
}

newBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);