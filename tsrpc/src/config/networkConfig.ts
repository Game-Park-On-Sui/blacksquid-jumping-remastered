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
                PackageID: "0x2d8b96580273eb7ef54ad125afd9f04a132f35f074e8622147332fab6ad14298",
                UpgradeCap: "0x5421d353ddd2ca23daf7a007464eff7da6fbf775f6e3e105b3d0bdfd469f38c4",
                Publisher: "0x9e7cc43bcdf5ca4f4bcf7457ca67f358a91390ed7406b9ee571716fa3967d60c",
                DataPool: "0x26a7abfff3edf5ccd18f3bccc21fc1af02ef7c74d6cbaab3d4997fc302dd5f5d"
            }
        }
    }
}

dotenv.config();

export const suiClient = new SuiClient({url: networkConfig[network].url});
export const keypair = Ed25519Keypair.fromSecretKey(process.env.PRIVATE_KEY!);