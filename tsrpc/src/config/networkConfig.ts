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
                DataPool: "",
                EndlessGame: ""
            }
        }
    },
    testnet: {
        url: getFullnodeUrl("testnet"),
        variables: {
            GP: {
                PackageID: "0xed76019f4dd4bebdf513d03acdb66f6a728d69248e9046eead4d9a3420081e43",
                UpgradeCap: "0xf7313e2482ae62ca3ee60bfc88b921e64c7782cc302f3e168e65050483a22414",
                Publisher: "0xd17ab472275e9ab7e7c3254227d34313892c709ec6b4989d6fbcc51e309c85c0",
                GPTreasuryCap: "0xf5c66cec799efa7498b454c9b85132e77bf4a6265015043ab8046a98c730dc3c",
                Pool: "0x428f4d7a24bd58f3a52cff40eb6714679e8b7635009467797982140160b90446",
                UserTable: "0x9424be761fd89f5d2c6615536f1747f45ac6c3ad60e7f90f2f92744ad5d6752f"
            },
            Jumping: {
                PackageID: "0xb946d43d5da24db1e205735312e82c181d81d2e44bf03ca88aca62e4bfa72c7c",
                UpgradeCap: "0x92f9a9692962a32f877a99758ff9ed80074b71d0834412f1655f6ac0ebc4fa81",
                Publisher: "0xb372b1bc5c33e89496590f2c321b7c15431e270dae659651c5acfa1b2a57900a",
                DataPool: "0xabc08bb95e96361780ed603fd969a88512440411796fdc11aa953a0798c1033b",
                EndlessGame: "0x88d3d456f109ef555648b9f1cd5533531d8482e508e24a2a66982a54a835faa0"
            }
        }
    }
}

dotenv.config();

export const suiClient = new SuiClient({url: networkConfig[network].url});
export const keypair = Ed25519Keypair.fromSecretKey(process.env.PRIVATE_KEY!);