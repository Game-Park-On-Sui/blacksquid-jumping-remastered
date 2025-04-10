import { ApiCall } from "tsrpc";
import { ReqLogin, ResLogin } from "../shared/protocols/PtlLogin";

export default async function (call: ApiCall<ReqLogin, ResLogin>) {
    console.log(call.req.username, call.req.password, call.req.address);
    await call.succ({
        state: "success",
    });
}