const player1 = prompt("Enter name", "Player1")
const player2 = prompt("Enter name", "Player2")
const max_score = prompt("Enter Winning score", "4");

var interval;

var ele = document.querySelector(".ball");
var p1 = document.querySelector(".p1");
var p2 = document.querySelector(".p2");
var paddle1 = document.querySelector(".paddle1");
var paddle2 = document.querySelector(".paddle2");
const paddle_height = 100;
paddle1.style.top = "180px";
paddle2.style.top = "180px";

paddle1.innerHTML = player2;
paddle2.innerHTML = player1;

const rightWall = 940;
const bottomWall = 540;

const paddleTopLim = -60;
const paddleBottomLim = 440;

const speed = 1;

var tp = 0;
var left = 600;
var rightMove = true;
var downMove = true;

function run() {
    var paddle1_front = 970;
    var paddle1_top = parseInt(paddle1.style.top) + 55;
    var paddle1_bottom = paddle1_top + 100;
    var paddle2_front = 30;
    var paddle2_top = parseInt(paddle2.style.top) + 55;
    var paddle2_bottom = paddle2_top + 100;
    var ele_left = left;
    var ele_right = left + 60;
    var ele_bottom = tp + 60;

    ele.style.top = `${tp}px`;
    ele.style.left = `${left}px`;

    if (ele_left == paddle2_front && tp <= paddle2_bottom && ele_bottom >= paddle2_top) {
        rightMove = true;
    }
    if (ele_right == paddle1_front && tp <= paddle1_bottom && ele_bottom >= paddle1_top) {
        rightMove = false;
    }

    if (left >= rightWall) {
        rightMove = false;
        p1.innerHTML++;
    }
    if (left <= 0) {
        rightMove = true;
        p2.innerHTML++;
    }

    if (p1.innerHTML == max_score) {
        p1.innerHTML = "WINNER &nbsp; &nbsp; &nbsp; &nbsp; " + p1.innerHTML;
        p2.innerHTML = p2.innerHTML + " &nbsp; &nbsp; &nbsp; &nbsp; LOSER ";
        clearInterval(interval);
    }

    if (p2.innerHTML == max_score) {
        p1.innerHTML = "LOSER &nbsp; &nbsp; &nbsp; &nbsp; " + p1.innerHTML;
        p2.innerHTML = p2.innerHTML + " &nbsp; &nbsp; &nbsp; &nbsp; WINNER";
        clearInterval(interval);
    }

    if (rightMove == true) {
        left += speed;
    }
    else {
        left -= speed;
    }

    if (tp >= bottomWall) {
        downMove = false;
    }
    if (tp <= 0) {
        downMove = true;
    }
    if (downMove == true) {
        tp += speed;
    }
    else {
        tp -= speed;
    }

}

const paddle1_move = (event) => {
    let keyName = event.key;
    let paddle1_pos = parseInt(paddle1.style.top);
    if (keyName == "ArrowUp" && paddle1_pos > paddleTopLim) {
        paddle1_pos -= 20;
        paddle1.style.top = `${paddle1_pos}px`;
    }
    if (keyName == "ArrowDown" && paddle1_pos < paddleBottomLim) {
        paddle1_pos += 20;
        paddle1.style.top = `${paddle1_pos}px`;
    }
}

const paddle2_move = (event) => {
    let mouse_pos = event.pageY;

    if (mouse_pos > 100 && mouse_pos < 610) {
        paddle2.style.top = `${(mouse_pos - 170)}px`;
    }
    else if (mouse_pos <= 100) {
        paddle2.style.top = "-60px";
    }
    else if (mouse_pos >= 610) {
        paddle2.style.top = "440px";
    }
}

window.addEventListener("keydown", paddle1_move, false);
window.addEventListener("mousemove", paddle2_move, false)

interval = setInterval(run, 4);