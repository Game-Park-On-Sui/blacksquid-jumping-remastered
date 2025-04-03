import {_decorator, Component, Node, CCInteger, instantiate} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('SpikesManager')
export class SpikesManager extends Component {
    @property({type: Node})
    startPlatform: Node = null;
    @property({type: Node})
    spikesTemp: Node = null;
    @property({type: CCInteger})
    spikesCount: number = 20;
    @property({type: Node})
    endPlatform: Node = null;

    private spikes: Node[] = [];

    start() {
        for (let i = 0; i < this.spikesCount; i++) {
            const spike = instantiate(this.spikesTemp);
            spike.setParent(this.node);
            spike.setPosition(i, 0, 0);
            spike.active = true;
            this.spikes.push(spike);
        }
    }

    update(deltaTime: number) {

    }
}

