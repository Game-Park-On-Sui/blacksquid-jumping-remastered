import {_decorator, Component, Node} from 'cc';
import {SpikesManager} from "db://assets/Scripts/SpikesManager";

const {ccclass, property} = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    @property({type: Node})
    login: Node = null;
    @property({type: Node})
    startButton: Node = null;
    @property({type: Node})
    chooseGame: Node = null;
    @property({type: SpikesManager})
    spikesManager: SpikesManager = null;

    handleClickLogin() {
        this.login.active = false;
        this.startButton.active = true;
    }

    handleClickStart() {
        this.startButton.active = false;
        this.chooseGame.active = true;
        this.spikesManager.handleStart(0, 1, 21, 2);
    }
}

