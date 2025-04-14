import {getFullnodeUrl, SuiClient} from "@mysten/sui/client";
import {createNetworkConfig} from "@mysten/dapp-kit";
import {Transaction} from "@mysten/sui/transactions";

type Network = "mainnet" | "testnet";

const network = (process.env.NEXT_PUBLIC_NETWORK as Network) || "testnet";

const {networkConfig, useNetworkVariable, useNetworkVariables} = createNetworkConfig({
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
                PackageID: "0x28266f075be366724c289dab92673e451d6720d515ba35c0a4c21498901fc387",
                UpgradeCap: "0xc61b0f18d8aa13b72efba6b641b2b4fc0bf0e2c5c62a0ae3b33c1f8d32e9ab6c",
                Publisher: "0x388a07bfa2f217a9b890065e75eceae4080ee8ac944a9655b581a47b4d03b564",
                DataPool: "0x57118134c3742523600a09f8e4feef7e4d03b0f153b48caf33159025d44184e3"
            }
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