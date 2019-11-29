window.addEventListener("load", () => {
    let left = 0;
    let top = 0;
    let nums = [];
    let boxes = document.querySelectorAll('.box');
    let movedBox = document.querySelector('#moved');


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
    }
    document.addEventListener('keydown', func);

    function func(e) {

        e.preventDefault();
        let modernBoxes;
        let reg = /(\d+)/;
        let startLeft = getComputedStyle(movedBox).left.match(reg)[0];
        let startTop = getComputedStyle(movedBox).top.match(reg)[0];

        let {x: movedX, y: movedY} = movedBox.dataset;

        switch (e.keyCode) {
            case 38:
                if (movedX == 3) {
                    return;
                }
                modernBoxes = [...boxes];
                var [neededToMoveBox] = modernBoxes.filter( (elem) => {
                    let {x, y} = elem.dataset;
                    if (+movedX + 1 == x && movedY == y) {
                        elem.style.top = `${startTop}px`;
                        elem.removeAttribute('data-x');
                        elem.setAttribute('data-x', movedX);
                        return elem;
                    }
                });
                startTop = +startTop+100;

                movedBox.style.top = `${startTop}px`;
                movedBox.removeAttribute('data-x');
                movedBox.setAttribute('data-x', +movedX+1);
                break;
            case 40:
                if (movedX == 0) {
                    return;
                }
                modernBoxes = [...boxes];
                var [neededToMoveBox] = modernBoxes.filter( (elem) => {
                    let {x, y} = elem.dataset;
                    if (movedX - 1 == x && movedY == y) {
                        elem.style.top = `${startTop}px`;
                        elem.removeAttribute('data-x');
                        elem.setAttribute('data-x', movedX);
                        return elem;
                    }
                });
                startTop = startTop-100;

                movedBox.style.top = `${startTop}px`;
                movedBox.removeAttribute('data-x');
                movedBox.setAttribute('data-x', movedX-1);
                break;
            case 37:
                if (movedY == 3) {
                    return;
                }
                modernBoxes = [...boxes];
                var [neededToMoveBox] = modernBoxes.filter( (elem) => {
                    let {x, y} = elem.dataset;
                    if (movedX == x && +movedY + 1 == y) {
                        elem.style.left = `${startLeft}px`;
                        elem.removeAttribute('data-y');
                        elem.setAttribute('data-y', movedY);
                        return elem;
                    }
                });
                startLeft = +startLeft+100;

                movedBox.style.left = `${startLeft}px`;
                movedBox.removeAttribute('data-y');
                movedBox.setAttribute('data-y', +movedY+1);
                break;
            case 39:
                if (movedY == 0) {
                    return;
                }
                modernBoxes = [...boxes];
                var [neededToMoveBox] = modernBoxes.filter( (elem) => {
                    let {x, y} = elem.dataset;
                    if (movedX == x && movedY - 1 == y) {
                        elem.style.left = `${startLeft}px`;
                        elem.removeAttribute('data-y');
                        elem.setAttribute('data-y', movedY);
                        return elem;
                    }
                });
                startLeft = startLeft-100;

                movedBox.style.left = `${startLeft}px`;
                movedBox.removeAttribute('data-y');
                movedBox.setAttribute('data-y', movedY-1);
                break;
        }
    }
});