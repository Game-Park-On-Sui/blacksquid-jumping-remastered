import {_decorator, Component} from 'cc';

const {ccclass} = _decorator;

@ccclass('ChooseGame')
export class ChooseGame extends Component {
    handleStartGame() {
        this.node.active = false;
        this.node.parent.active = false;
    }
}

