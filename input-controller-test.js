import InputController from "./input-controller.js";

const target = document.querySelector(".display");
let actionsToBind = {
    "up": {
        keys:[38, 87],
        enabled: true,
    },
    "right": {
        keys:[39, 68],
        enabled: true,
    },
    "down": {
        keys:[40, 83],
        enabled: true,
    },
    "left": {
        keys:[37, 65],
        enabled: true,
    },
}
const inputController = new InputController(actionsToBind, target);

target.focus();
target.addEventListener("click", (e) => e.target.focus());

//Обработчики кастомных ивентов

let top = 0;
let left = 0;

target.addEventListener("input-controller:action-activated", (e) => {
    e.target.innerHTML = e.detail.nameAction;
    if(e.detail.nameAction === "jump") {
        e.target.style.backgroundColor = 'blue';
    }

    switch(e.detail.nameAction) {
        case "up":
            top -= 200;
            e.target.style.top = `${top}px`;
            break;
        case "right":
            left += 200;
            e.target.style.left = `${left}px`;
            break;
        case "down":
            top += 200;
            e.target.style.top = `${top}px`;
            break;
        case "left":
            left -= 200;
            e.target.style.left = `${left}px`
    }
})

target.addEventListener("input-controller:action-deactivated", (e) => {
    e.target.innerHTML = "";
    if(e.detail.nameAction === "jump") {
        e.target.style.backgroundColor = 'white';
    }
});

//Кнопки

const attach_but = document.querySelector(".attach-button");
attach_but.onclick = () => inputController.attach(target);

const detuch_but = document.querySelector(".detach-button");
detuch_but.onclick = () => inputController.detach();

const activate_but = document.querySelector(".activate-button");
activate_but.onclick = () => inputController.enableController();

const deactivate_but = document.querySelector(".deactivate-button");
deactivate_but.onclick = () => inputController.disableController();

let isSwitchJump = false;
const switch_jump_but = document.querySelector(".switch-jump-button");
switch_jump_but.onclick = () => {
    isSwitchJump = !isSwitchJump;

    if(isSwitchJump){
        actionsToBind["jump"] = {
            keys: [32],
            enabled: true,
        }
    }
    else {
        delete actionsToBind["jump"];
    }

    inputController.bindActions(actionsToBind);
    
};


