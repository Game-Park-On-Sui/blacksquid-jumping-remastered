import {_decorator, Component, Node, CCInteger, instantiate, Mesh, MeshRenderer, EventTouch, Label} from 'cc';
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
    @property({type: Label})
    curPosLabel: Label = null;
    @property({type: Label})
    curPosAwardLabel: Label = null;
    @property({type: Label})
    totalPosLabel: Label = null;
    @property({type: Label})
    totalAwardLabel: Label = null;

    private spikes: Node[] = [];
    private isVisibleSpikes: boolean[] = [];
    private direction: 1 | -1 = -1;
    private speed: number = 1;
    private spikesUpSpeed: number[] = [];
    private timer: number = 0;
    private killOne: number = 0;
    private oldRow: number = -1;
    private curRow: number = -1;
    private curList: number = 0;
    private lastSpikePosX: number = 0;

    start() {
        for (let i = 0; i < this.spikesCount; i++) {
            const spike = instantiate(this.spikesTemp);
            spike.setParent(this.node);
            spike.setPosition(i, 0, 0);
            spike.active = true;
            this.spikes.push(spike);
            this.isVisibleSpikes.push(true);
            this.spikesUpSpeed.push(0);
        }
        this.lastSpikePosX = 19;
        this.curPosLabel.string = this.curList.toString();
        this.curPosAwardLabel.string = "0";
        this.totalPosLabel.string = this.spikesCount.toString();
        this.totalAwardLabel.string = "100";
    }

    update(deltaTime: number) {
        if (this.timer <= 0)
            return;
        this.timer -= deltaTime;
        if (this.timer <= 0) {
            this.startPlatform.setPosition(Math.round(this.startPlatform.getPosition().x), 0, 0);
            let curLastSpikePosX = -6;
            for (let i = 0; i < this.spikesCount; i++)
                if (this.isVisibleSpikes[i]) {
                    const pos = this.spikes[i].getPosition();
                    this.spikes[i].setPosition(Math.round(pos.x), 0, 0);
                    this.spikesUpSpeed[i] = 0;
                    curLastSpikePosX = Math.max(curLastSpikePosX, Math.round(pos.x));
                }
            this.lastSpikePosX = curLastSpikePosX;
            this.endPlatform.setPosition(Math.round(this.endPlatform.getPosition().x), 0, 0);
            if (this.killOne !== -1) {
                this.showSpikes();
                this.checkAlive();
            } else {
                this.hiddenSpikes();
            }
            return;
        }
        const startPlatformPos = this.startPlatform.getPosition();
        if (startPlatformPos.x > -6)
            this.startPlatform.setPosition(startPlatformPos.x + this.direction * this.speed * deltaTime, 0, 0);
        let canMoveEndPlatform = true;
        for (let i = 0; i < this.spikesCount; i++)
            if (this.isVisibleSpikes[i]) {
                const pos = this.spikes[i].getPosition();
                this.spikes[i].setPosition(pos.x + this.direction * this.speed * deltaTime, pos.y + this.spikesUpSpeed[i] * deltaTime, 0);
                if (this.spikesUpSpeed[i] > 0)
                    canMoveEndPlatform = false;
            }
        this.endPlatform.setPosition(this.endPlatform.getPosition().x + this.direction * this.speed * deltaTime * (canMoveEndPlatform ? 1 : 2), 0, 0);
    }

    lateUpdate() {
        this.moveSpikesToEnd();
    }

    ChangeMoveDirection(direction: 1 | -1) {
        this.direction = direction;
    }

    handleClickSpike(_: EventTouch, index: number) {
        if (this.player.isJumping())
            return;
        this.ChangeMoveDirection(-1);
        this.speed = 1 / this.player.getJumpDuration();
        this.timer = this.player.getJumpDuration();
        this.killOne = this.randomKill();
        this.curRow = index;
    }

    randomKill() {
        return 1;
        // return Math.floor(Math.random() * 2);
    }

    showSpikes() {
        this.spikes.find(spike => spike.getPosition().x === -1).getChildByName(this.killOne.toString()).getChildByName("Spikes").getComponent(MeshRenderer).mesh = this.showSpikesMesh;
    }

    innerHiddenSpikes(spike: Node) {
        spike.getChildByName("0").getChildByName("Spikes").getComponent(MeshRenderer).mesh = this.hiddenSpikesMesh;
        spike.getChildByName("1").getChildByName("Spikes").getComponent(MeshRenderer).mesh = this.hiddenSpikesMesh;
    }

    hiddenSpikes() {
        this.innerHiddenSpikes(this.spikes.find(spike => spike.getPosition().x === 0));
    }

    checkAlive() {
        if (this.curRow != this.killOne) {
            this.oldRow = this.curRow;
            this.curList++;
            this.curPosLabel.string = this.curList.toString();
            for (let i = 0; i < this.spikesCount; i++)
                if (this.isVisibleSpikes[i])
                    this.isVisibleSpikes[i] = Math.round(this.spikes[i].getPosition().x) !== -6;
            return;
        }
        this.ChangeMoveDirection(1);
        this.speed = 1 / this.player.getJumpDuration();
        this.timer = this.player.getJumpDuration();
        this.killOne = -1;
        this.player.die(this.oldRow);
        this.spikesCount++;
        this.totalPosLabel.string = this.spikesCount.toString();
    }

    moveSpikesToEnd() {
        const visibleNumber = this.isVisibleSpikes.filter(visible => visible).length;
        if (visibleNumber > 15)
            return;
        if (visibleNumber - 5 < this.spikesCount - this.curList) {
            const idx = this.spikes.findIndex((_, index) => !this.isVisibleSpikes[index]);
            const spike = this.spikes[idx];
            spike.setPosition(this.lastSpikePosX + 1, -2, 0);
            this.innerHiddenSpikes(spike);
            this.isVisibleSpikes[idx] = true;
            this.spikesUpSpeed[idx] = 2 / this.timer;
            this.fixEndPlatformPos(this.lastSpikePosX + 1);
        }
    }

    fixEndPlatformPos(fixedX: number) {
        this.endPlatform.setPosition(fixedX, 0, 0);
    }
}

