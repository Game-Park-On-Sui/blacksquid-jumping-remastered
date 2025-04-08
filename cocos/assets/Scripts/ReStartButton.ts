import {_decorator, Component, Node, Label} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('ReStartButton')
export class ReStartButton extends Component {
    @property({type: Node})
    awardNode: Node = null;
    @property({type: Label})
    buttonLabel: Label = null;

    showReStart() {
        this.awardNode.getComponent(Label).string = "Award: 999";
        this.awardNode.active = true;
        this.buttonLabel.string = "Restart";
        this.node.active = true;
        this.node.parent.active = true;
    }
}

