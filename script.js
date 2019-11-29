window.addEventListener("load", () => {
    let left = 0;
    let top = 0;
    let nums = [];
    let boxes = document.querySelectorAll('.box');
    let movedBox = document.querySelector('#moved');
    let start = false;


    randNum = ( min, max ) => {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        if (nums.indexOf(Math.round(rand)) == -1 ) {
            nums.push(Math.round(rand))
        }
    };

    while(nums.length < 16) {
        randNum(1, 15);
        if (nums.length === 15) break;
    }

    for (let i = 0; i < boxes.length; i++) {
        boxes[i].innerHTML = nums[i];
        if (i == boxes.length-1) {
            boxes[i].innerHTML = '';
        }
        boxes[i].setAttribute("data-y", left);
        boxes[i].setAttribute("data-x", top);
        boxes[i].style.left = `${left * boxes[i].offsetWidth}px`;
        boxes[i].style.top = `${top * boxes[i].offsetHeight}px`;
        if (left != 0 && left % 3 == 0) {
            left = 0;
            top++;
        }
        else if (left != 0 && left % 7 == 0) {
            left = 0;
            top++;
        }
        else {
            left++;
        }
        document.addEventListener('keydown', func);
    }

    

    function doAttributes(item, attr, num, style, move) { 
        item.style[style] = `${move}px`;
        item.removeAttribute(`data${attr}`);
        item.setAttribute(`data${attr}`, num);
        return item;
    }
    function checkOut(pos, max) { 
        let bool = pos == max;
        return bool;
    }
    
    function pregMatching(el, dir) {
        let reg = /(\d+)/;
        let out = getComputedStyle(el)[dir].match(reg)[0];
        return out;
    }

    function func(e) {
        e.preventDefault();
        start = true;
        let {x: movedX, y: movedY} = movedBox.dataset;
        let modernBoxes;
        let startLeft = pregMatching(movedBox, 'left');
        let startTop = pregMatching(movedBox, 'top');
        switch (e.keyCode) {
            case 38:
                if (checkOut(movedX, 3)) {
                    return;
                }
                modernBoxes = [...boxes];
                var [neededToMoveBox] = modernBoxes.filter( (elem) => {
                    let {x, y} = elem.dataset;
                    if (+movedX + 1 == x && movedY == y) {
                        doAttributes(elem, '-x', movedX, 'top', startTop);
                    }
                });
                startTop = +startTop+100;
                doAttributes(movedBox, '-x', +movedX+1, 'top', startTop);
                break;
            case 40:
                if (checkOut(movedX, 0)) {
                    return;
                }
                modernBoxes = [...boxes];
                var [neededToMoveBox] = modernBoxes.filter( (elem) => {
                    let {x, y} = elem.dataset;
                    if (movedX - 1 == x && movedY == y) {
                        doAttributes(elem, '-x', movedX, 'top', startTop);
                    }
                });
                startTop = startTop-100;
                doAttributes(movedBox, '-x', movedX-1, 'top', startTop);
                break;
            case 37:
                if (checkOut(movedY, 3)) {
                    return;
                }
                modernBoxes = [...boxes];
                var [neededToMoveBox] = modernBoxes.filter( (elem) => {
                    let {x, y} = elem.dataset;
                    if (movedX == x && +movedY + 1 == y) {
                        doAttributes(elem, '-y', movedY, 'left', startLeft);
                    }
                });
                startLeft = +startLeft+100;
                doAttributes(movedBox, '-y', +movedY+1, 'left', startLeft);
                break;
            case 39:
                if (checkOut(movedY, 0)) {
                    return;
                }
                modernBoxes = [...boxes];
                var [neededToMoveBox] = modernBoxes.filter( (elem) => {
                    let {x, y} = elem.dataset;
                    if (movedX == x && movedY - 1 == y) {
                        doAttributes(elem, '-y', movedY, 'left', startLeft);
                    }
                });
                startLeft = startLeft-100;
                doAttributes(movedBox, '-y', movedY-1, 'left', startLeft);
                break;
        }
    }

    function startTimer() {
        let secField = document.querySelector('.seconds');
        let minField = document.querySelector('.minutes');
        let seconds = 0;
        let minutes = 0;
        setInterval( () => {
            seconds++;
            if (seconds < 10) {
                secField.innerHTML = `0${seconds}`;
            }
            else if (seconds > 59){
                minutes++;
                seconds = 0;
                secField.innerHTML = seconds < 10 ? `0${seconds}` : seconds;
                minField.innerHTML = minutes < 10 ? `0${minutes}` : minutes;
            }
            else {
                secField.innerHTML = seconds;
            }

        }, 1000)
    }
    startTimer();

});