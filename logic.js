const ladder = { 7: 25, 21: 42, 28: 76, 50: 70, 71: 92, 80: 96 }
const snake = { 32: 10, 36: 6, 48: 26, 62: 18, 88: 24, 95: 78, 98: 44 }

var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');


async function play(pid) {
    btn1.disabled = true;
    btn2.disabled = true;
    console.log(pid);
    var position = 1;
    let box = document.getElementById(pid);
    let id = box.parentElement.getAttribute('id');
    position = Number(id.substring(1));

    console.log("Position : ", position);
    let steps = Math.ceil(Math.random() * 6);
    document.getElementById("res" + pid).innerText = steps
    if (position + steps == 100) {
        btn1.disabled = true;
        btn2.disabled = true;
        console.log("Steps :", steps);
        for (i = position + 1; i <= steps + position; i++) {
            await sleep(500);
            move(i, pid);
        }
        document.getElementById("pos" + pid).innerText = "Position : " + (position + steps);
        document.getElementById("result").innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
        <h4 class="alert-heading">Congratulations!!!</h4>
        <p><strong>Player `+pid+`</strong> won the Game. :)</p>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`
    }
    else if (position + steps > 100) {
        document.getElementById("result").innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <h4 class="alert-heading">Oops!!!</h4>
        <p><strong>Player `+pid+`</strong> you exceeded. Roll Again :)</p>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`
        if (pid == 1) {
            btn1.disabled = true;
            btn2.disabled = false;
        }
        else {
            btn1.disabled = false;
            btn2.disabled = true;
        }
    }
    else {
        console.log("Steps :", steps);
        let i;
        for (i = position + 1; i <= steps + position; i++) {
            // setInterval(move(i),1000);
            await sleep(500)
            move(i, pid);
        }
        await sleep(500)
        console.log(i - 1);
        let checked = laddercheck(i - 1, pid);
        if (checked == false) {
            snakecheck(i - 1, pid);
        }
        if (pid == 1) {
            btn1.disabled = true;
            btn2.disabled = false;
        }
        else {
            btn1.disabled = false;
            btn2.disabled = true;
        }
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function laddercheck(step, pid) {
    for (const key in ladder) {
        if (step == key) {
            let prevpos = document.getElementById("b" + step)
            prevpos.removeChild(prevpos.childNodes[1])
            step = ladder[key];
            let currentpos = document.getElementById("b" + step)
            currentpos.innerHTML += `<img src="` + pid + `.png" class="pawn` + pid + `" id="` + pid + `">`
            console.log("Climbed By Ladder");
            document.getElementById("pos" + pid).innerText = "Position : " + step;
            return true
        }
    }
    return false
}
function snakecheck(step, pid) {
    for (const key in snake) {
        if (step == key) {
            let prevpos = document.getElementById("b" + step)
            prevpos.removeChild(prevpos.childNodes[1])
            step = snake[key];
            let currentpos = document.getElementById("b" + step)
            currentpos.innerHTML += `<img src="` + pid + `.png" class="pawn` + pid + `" id="` + pid + `">`
            console.log("Eaten By Snake");
        }
    }
    document.getElementById("pos" + pid).innerText = "Position : " + step;
}
function move(i, pid) {
    let prevpos = document.getElementById("b" + (i - 1));
    let currentpos = document.getElementById("b" + i)
    let children = prevpos.children;
    for (let child = 0; child < children.length; child++) {
        if (children[child].id == pid) {
            prevpos.removeChild(children[child])
        }
    }
    currentpos.innerHTML += `<img src="` + pid + `.png" class="pawn` + pid + `" id="` + pid + `">`;
    console.log(currentpos.childNodes[1]);
}
function reset() {
    document.getElementById("pos1").innerHTML = "Position : 0";
    document.getElementById("pos2").innerHTML = "Position : 0";
    document.getElementById("res1").innerHTML = "0";
    document.getElementById("res2").innerHTML = "0";
    btn1.disabled = false;
    btn2.disabled = false;
    for (let i = 2; i <= 100; i++) {
        if (document.getElementById("b" + i).children != 0) {
            let length = document.getElementById("b" + i).children.length;
            for (let j = 0; j < length; j++) {
                document.getElementById("b" + i).children[j].remove()
            }
        }
    }
    document.getElementById('b1').innerHTML = `<img src="1.png" class="pawn1" id="1">
    <img src="2.png" class="pawn2" id="2">`
}
