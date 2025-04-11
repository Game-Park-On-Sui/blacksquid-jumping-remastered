import {getFullnodeUrl, SuiClient} from "@mysten/sui/client";
import {createNetworkConfig} from "@mysten/dapp-kit";
import {Transaction} from "@mysten/sui/transactions";

type Network = "mainnet" | "testnet";

const network = (process.env.NEXT_PUBLIC_NETWORK as Network) || "testnet";

const {networkConfig, useNetworkVariable, useNetworkVariables} = createNetworkConfig({
    mainnet: {
        url: getFullnodeUrl("mainnet"),
        variables: {
            PackageID: "",
            GPTreasuryCap: "",
            Pool: "",
            UserTable: "",
            JumpingPackageID: "",
            UpgradeCap: "",
            Publisher: "",
            DataPool: ""
        }
    },
    testnet: {
        url: getFullnodeUrl("testnet"),
        variables: {
            PackageID: "0x4db1c630558c5c1d9b648b253875750a5dfd5cb8d116392f580cbb21928e9198",
            GPTreasuryCap: "0xbd5eb7ca80a5e46e6f3dc782a50f582411a984819924a5b8c161486492b38d78",
            Pool: "0x2ee15f3d9acda37e0b7c4e486226c4171998e6db0dc39113d93e43e44c54365f",
            UserTable: "0x1d3f8e242b212d08fe552f3fb9908b61f97984ab5709acb1e1d208406e199a2d",
            JumpingPackageID: "0xeb1a280c61c130b7a7bbe67c37ad5f88b05903b5d4e1eae8a272af22a1417848",
            UpgradeCap: "0xf77eab4ed512f2bee526f77774beaf789f726d03d71a3346e8c99bb7abd16660",
            Publisher: "0x802544663454c362fd6e1396a8882cbe4a29ee96f8b456decd0e164bb3e84fdc",
            DataPool: "0xc604cf9db32fdda6417b86b98ea0f546374b74be8585016b80e738284bd43c45"
        }
    }
});

const suiClient = new SuiClient({
    url: networkConfig[network].url
});

type NetworkVariables = ReturnType<typeof useNetworkVariables>;

function getNetworkVariables() {
    return networkConfig[network].variables;
}

function createBetterTxFactory<T extends Record<string, unknown>>(
    fn: (tx: Transaction, networkVariables: NetworkVariables, params: T) => Transaction
) {
    return (params: T) => {
        const tx = new Transaction();
        const networkVariables = getNetworkVariables();
        return fn(tx, networkVariables, params);
    }
}

export type {NetworkVariables};
export {
    network,
    useNetworkVariable,
    useNetworkVariables,
    networkConfig,
    suiClient,
    createBetterTxFactory
}