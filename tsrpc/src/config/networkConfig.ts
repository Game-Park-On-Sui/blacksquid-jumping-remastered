import {getFullnodeUrl, SuiClient} from "@mysten/sui/client";
import {Ed25519Keypair} from "@mysten/sui/keypairs/ed25519";
import dotenv from "dotenv";

type Network = "mainnet" | "testnet";

export const network = (process.env.NEXT_PUBLIC_NETWORK as Network) || "testnet";

export const networkConfig = {
    mainnet: {
        url: getFullnodeUrl("mainnet"),
        variables: {
            PackageID: "",
            UpgradeCap: "",
            Publisher: "",
            GPTreasuryCap: "",
            Pool: "",
            UserTable: ""
        }
    },
    testnet: {
        url: getFullnodeUrl("testnet"),
        variables: {
            PackageID: "0x4db1c630558c5c1d9b648b253875750a5dfd5cb8d116392f580cbb21928e9198",
            GPTreasuryCap: "0xbd5eb7ca80a5e46e6f3dc782a50f582411a984819924a5b8c161486492b38d78",
            Pool: "0x2ee15f3d9acda37e0b7c4e486226c4171998e6db0dc39113d93e43e44c54365f",
            UserTable: "0x1d3f8e242b212d08fe552f3fb9908b61f97984ab5709acb1e1d208406e199a2d",
            JumpingPackageID: "0x2ce7029110268ffb33ee0e724f4bd67ade39658f077314d2fbeed4f13b92ab40",
            UpgradeCap: "0x5548d8fe7146b2b4e072becca04e3c8879b79199d950d30fc8917f830ff49919",
            Publisher: "0xc6634672c61f4d33e7d6118e75d9bc2beee0d4ac292b5d66016d13c7149433f8",
            DataPool: "0x3c7a0d113c90b56e9f658865739212e62f5867fd54def60e05d6a1bd6ce5c9cc"
        }
    }
}

dotenv.config();

export const suiClient = new SuiClient({url: networkConfig[network].url});
export const keypair = Ed25519Keypair.fromSecretKey(process.env.PRIVATE_KEY!);