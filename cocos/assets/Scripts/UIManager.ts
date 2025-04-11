import {_decorator, Component, Node, EditBox, Label} from 'cc';
import {SpikesManager} from "db://assets/Scripts/SpikesManager";
import {TsrpcManager} from "db://assets/Scripts/TsrpcManager";

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
    @property({type: EditBox})
    usernameEditBox: EditBox = null;
    @property({type: EditBox})
    passwordEditBox: EditBox = null;
    @property({type: EditBox})
    addressEditBox: EditBox = null;
    @property({type: Label})
    confirmLabel: Label = null;

    start() {
        this.readStorage();
    }

    handleClickLogin() {
        this.confirmLabel.string = "Waiting...";
        TsrpcManager.instance.login(this.usernameEditBox.string, this.passwordEditBox.string, this.addressEditBox.string).then(ok => {
            if (ok) {
                this.login.active = false;
                this.startButton.active = true;
                this.writeStorage();
            }
            this.confirmLabel.string = "Confirm";
        });
    }

    handleClickStart() {
        this.startButton.active = false;
        this.chooseGame.active = true;
        this.spikesManager.handleStart(0, 1, 21, 2);
    }

    readStorage() {
        const username = localStorage.getItem("username");
        const password = localStorage.getItem("password");
        const address = localStorage.getItem("address");
        this.usernameEditBox.string = username ? username : "";
        this.passwordEditBox.string = password ? password : "";
        this.addressEditBox.string = address ? address : "";
    }

    writeStorage() {
        localStorage.setItem("username", this.usernameEditBox.string);
        localStorage.setItem("password", this.passwordEditBox.string);
        localStorage.setItem("address", this.addressEditBox.string);
    }
}

