import {_decorator, Component, Node, CCInteger, instantiate, Mesh, MeshRenderer} from 'cc';
import {Player} from "db://assets/Scripts/Player";

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
    @property({type: Player})
    player: Player = null;
    @property({type: Mesh})
    showSpikesMesh: Mesh = null;
    @property({type: Mesh})
    hiddenSpikesMesh: Mesh = null;

    private spikes: Node[] = [];
    private direction: 1 | -1 = -1;
    private speed: number = 1;
    private timer: number = 0;
    private killOne: number = 0;

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
        if (this.timer <= 0)
            return;
        this.timer -= deltaTime;
        if (this.timer <= 0) {
            this.startPlatform.setPosition(Math.round(this.startPlatform.getPosition().x), 0, 0);
            for (let i = 0; i < this.spikesCount; i++)
                this.spikes[i].setPosition(Math.round(this.spikes[i].getPosition().x), 0, 0);
            this.endPlatform.setPosition(Math.round(this.endPlatform.getPosition().x), 0, 0);
            this.showSpikes();
            return;
        }
        this.startPlatform.setPosition(this.startPlatform.getPosition().x + this.direction * this.speed * deltaTime, 0, 0);
        for (let i = 0; i < this.spikesCount; i++)
            this.spikes[i].setPosition(this.spikes[i].getPosition().x + this.direction * this.speed * deltaTime, 0, 0);
        this.endPlatform.setPosition(this.endPlatform.getPosition().x + this.direction * this.speed * deltaTime, 0, 0);
    }

    ChangeMoveDirection(direction: 1 | -1) {
        this.direction = direction;
    }

    handleClickSpike() {
        if (this.player.isJumping())
            return;
        this.ChangeMoveDirection(-1);
        this.speed = 1 / this.player.getJumpDuration();
        this.timer = this.player.getJumpDuration();
        this.killOne = this.randomKill();
    }

    randomKill() {
        return Math.floor(Math.random() * 2);
    }

    showSpikes() {
        this.spikes.find(spike => spike.getPosition().x === -1).getChildByName(this.killOne.toString()).getChildByName("Spikes").getComponent(MeshRenderer).mesh = this.showSpikesMesh;
    }
}

