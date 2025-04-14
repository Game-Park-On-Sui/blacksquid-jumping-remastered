import {getFullnodeUrl, SuiClient} from "@mysten/sui/client";
import {Ed25519Keypair} from "@mysten/sui/keypairs/ed25519";
import dotenv from "dotenv";

type Network = "mainnet" | "testnet";

export const network = (process.env.NEXT_PUBLIC_NETWORK as Network) || "testnet";

export const networkConfig = {
    mainnet: {
        url: getFullnodeUrl("mainnet"),
        variables: {
            GP: {
                PackageID: "",
                UpgradeCap: "",
                Publisher: "",
                GPTreasuryCap: "",
                Pool: "",
                UserTable: ""
            },
            Jumping: {
                PackageID: "",
                UpgradeCap: "",
                Publisher: "",
                DataPool: ""
            }
        }
    },
    testnet: {
        url: getFullnodeUrl("testnet"),
        variables: {
            GP: {
                PackageID: "0x87277dd3ce62f7b024c2fb2e5698bd75eded0e414135ee038420b0a3b5462eed",
                UpgradeCap: "0x109304fb11bc6ac1db1758c487ed6df81cba08bca85194b6a06e524e243a1225",
                Publisher: "0xaaa07e29943772a84f61aadfb7c0e324a871af0c06f08adc4307e67c7ce53b6c",
                GPTreasuryCap: "0x700a67c15dca2cbef1b3ebaaafb00b55fd634726d3d0345e36dc548c24472879",
                Pool: "0xf9e962ed230c98064612d0d775c44fb54f7ed024e73dabbb2a153484d91dbea3",
                UserTable: "0x55b6cccc67226ec748aa9f932705c01dd226db3b5aa9527b8ba968cd04114ee2"
            },
            Jumping: {
                PackageID: "0xeb1a280c61c130b7a7bbe67c37ad5f88b05903b5d4e1eae8a272af22a1417848",
                UpgradeCap: "0xf77eab4ed512f2bee526f77774beaf789f726d03d71a3346e8c99bb7abd16660",
                Publisher: "0x802544663454c362fd6e1396a8882cbe4a29ee96f8b456decd0e164bb3e84fdc",
                DataPool: "0xc604cf9db32fdda6417b86b98ea0f546374b74be8585016b80e738284bd43c45"
            }
        }
    }
}

dotenv.config();

export const suiClient = new SuiClient({url: networkConfig[network].url});
export const keypair = Ed25519Keypair.fromSecretKey(process.env.PRIVATE_KEY!);