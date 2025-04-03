import {_decorator, Component, Animation, AnimationState, EventTouch} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('Player')
export class Player extends Component {
    @property({type: Animation})
    jump: Animation = null;

    private jumpState: AnimationState = null;

    start() {
        this.jumpState = this.jump.getState("SlimeJump");
    }

    update(deltaTime: number) {
    }

    handleClickSpike(_: EventTouch, index: number) {
        if (this.jumpState.isPlaying)
            return;
        this.jump.play();
    }
}

