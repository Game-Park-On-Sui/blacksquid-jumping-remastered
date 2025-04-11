import { ApiCall } from "tsrpc";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";
import { ReqLogin, ResLogin } from "../shared/protocols/PtlLogin";
import {SuiClient} from "@mysten/sui/client";
import {network, networkConfig} from "../config/networkConfig";
import {Transaction} from "@mysten/sui/transactions";
import {Ed25519Keypair} from "@mysten/sui/keypairs/ed25519";

dotenv.config();

function hmacSHA256(pwd: string) {
    const hash = CryptoJS.HmacSHA256(pwd, process.env.SHA_KEY!);
    return hash.toString(CryptoJS.enc.Hex);
}

async function checkInMove(username: string, password: string, address: string) {
    const client = new SuiClient({url: networkConfig[network].url});
    const tx = new Transaction();
    const keypair = Ed25519Keypair.fromSecretKey(process.env.PRIVATE_KEY!);
    tx.moveCall({
        package: networkConfig[network].variables.PackageID,
        module: "user_info",
        function: "rebind",
        arguments: [
            tx.object(networkConfig[network].variables.Publisher),
            tx.object(networkConfig[network].variables.UserTable),
            tx.pure.address(address),
            tx.pure.string(username),
            tx.pure.string(hmacSHA256(password)),
            tx.pure.string(hmacSHA256(password + "devtest"))
        ]
    });
    const devResult = await client.devInspectTransactionBlock({
        transactionBlock: tx,
        sender: keypair.toSuiAddress()
    });
    return devResult.effects.status.status;
}

export default async function (call: ApiCall<ReqLogin, ResLogin>) {
    await call.succ({
        state: await checkInMove(call.req.username, call.req.password, call.req.address)
    });
}