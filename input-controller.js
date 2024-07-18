
export default class InputController {
    enabled = false;
    focused = false;
    keyPressed = new Set();
    
    constructor(actionsToBind, target) {
        //Константы
        Object.defineProperty(this, 'ACTION_ACTIVATED', {
            value: "input-controller:action-activated",
            writable: false,
        });
        Object.defineProperty(this, 'ACTION_DEACTIVATED', {
            value: "input-controller:action-deactivated",
            writable: false,
        });
        //////////////

        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.handleKeyUp = this.handleKeyUp.bind(this)

        actionsToBind && this.bindActions(actionsToBind);

        target && this.attach(target);
    }

    bindActions(actionsToBind) {
        for(const prop in actionsToBind) {
            !actionsToBind[prop].enabled &&
            (actionsToBind[prop].enabled = false); 
        }
        this._actionsToBind = actionsToBind;
    }

    enableAction(actionName) {
        this._actionsToBind[actionName].enabled = true;
    }

    disableAction() {
        this._actionsToBind[actionName].enabled = false;
    }

    isActionActive(action) {
        return this._actionsToBind[action].enabled;
    }

    attach(target, dontEnable = false) {
        if(this.$target) {
            return;
        }
        this.enabled = !dontEnable;
        this.$target = target;

        target.addEventListener('keydown', this.handleKeyDown);
        target.addEventListener('keyup', this.handleKeyUp);
    }

    handleKeyDown(e) {
        this.keyPressed.add(e.keyCode);
        if(!this.enabled) {
            return;
        }

        for(const action in this._actionsToBind) {
 
            if(!this.isActionActive(action))
                continue;

            for(const key of this._actionsToBind[action].keys) {

                if(key == e.keyCode) {
                    const active_event = new CustomEvent(this.ACTION_ACTIVATED, {
                        detail: {
                            nameAction: action
                        }
                    });
                    this.$target.dispatchEvent(active_event);
                }
            }
        }
    }

    handleKeyUp(e) {
        this.keyPressed.delete(e.keyCode);
        if(!this.enabled) {
            return;
        }

        for(const action in this._actionsToBind) {
            if(!this.isActionActive(action))
                continue;

            for(const key of this._actionsToBind[action].keys) {
                if(key == e.keyCode) {
                    const active_event = new CustomEvent(this.ACTION_DEACTIVATED, {
                        detail: {
                            nameAction: action
                        }
                    });
                    this.$target.dispatchEvent(active_event);
                }
            }
        }
    }

    detach() {
        this.$target.removeEventListener('keydown', this.handleKeyDown);
        this.$target.removeEventListener('keyup', this.handleKeyUp);
        this.$target = null;
        this.enabled = false;
    }

    isKeyPressed(keyCode) {
        return this.keyPressed.has(keyCode);
    }

    enableController() {
        this.enabled = true;
    }

    disableController() {
        this.enabled = false;
    }
}