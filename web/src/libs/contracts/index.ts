'use client'

import {createBetterTxFactory, network, networkConfig, suiClient} from "@/configs/networkConfig";
import {coinWithBalance} from "@mysten/sui/transactions";

export async function getNFTID(owner: string | undefined, cursor: string | null | undefined): Promise<string | undefined> {
    if (!owner)
        return undefined;
    const data = await suiClient.getOwnedObjects({
        owner,
        cursor,
        options: {
            showType: true
        }
    });
    const found = data.data.find(data => data.data?.type === `${networkConfig[network].variables.JumpingPackageID}::nft::BlackSquidJumpingNFT`);
    return found ? found.data?.objectId : (data.hasNextPage ? await getNFTID(owner, data.nextCursor) : undefined);
}

function randomHashKey(address: string) {
    let key = "";
    for (let i = 0; i < Math.floor(Math.random() * 30) + 30; i++)
        key += address[Math.floor(Math.random() * 60)];
    return key;
}

export const newGameTx = createBetterTxFactory<{
    nftID: string | null | undefined,
    sender: string
}>((tx, networkVariables, params) => {
    tx.setSender(params.sender);
    if (params.nftID) {
        tx.moveCall({
            package: networkVariables.JumpingPackageID,
            module: "data",
            function: "new_game",
            arguments: [
                tx.object(networkVariables.DataPool),
                tx.pure.id(params.nftID),
                tx.pure.string(randomHashKey(params.sender)),
                coinWithBalance({
                    balance: 10,
                    type: `${networkVariables.PackageID}::gp::GP`
                })
            ]
        });
    } else {
        const [nft] = tx.moveCall({
            package: networkVariables.JumpingPackageID,
            module: "nft",
            function: "mint",
        });
        tx.moveCall({
            package: networkVariables.JumpingPackageID,
            module: "data",
            function: "new_game_with_nft",
            arguments: [
                tx.object(networkVariables.DataPool),
                nft,
                tx.pure.string(randomHashKey(params.sender)),
                coinWithBalance({
                    balance: 10,
                    type: `${networkVariables.PackageID}::gp::GP`
                })
            ]
        });
        tx.transferObjects([nft], params.sender);
    }
    return tx;
});