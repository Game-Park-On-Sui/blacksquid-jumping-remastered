import {HttpClient} from "tsrpc-browser";
import {serviceProto, ServiceType} from "db://assets/Scripts/tsrpc/protocols/serviceProto";

export class TsrpcManager {
    private static _instance: TsrpcManager;
    private _apiClient: HttpClient<ServiceType>;

    public static get instance() {
        if (!this._instance) {
            this._instance = new TsrpcManager();
            this._instance._apiClient = new HttpClient(serviceProto, {
                server: "http://127.0.0.1:7457",
                json: true
            });
        }
        return this._instance;
    }

    async login() {
        const res = await this._apiClient.callApi("Login", {
            username: "Debirth",
            password: "DePasskey",
            address: "0x9e4092b6a894e6b168aa1c6c009f5c1c1fcb83fb95e5aa39144e1d2be4ee0d67"
        });
        console.log(res.res.state);
    }
}

