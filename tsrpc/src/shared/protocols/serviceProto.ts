import { ServiceProto } from 'tsrpc-proto';
import { ReqGetNFT, ResGetNFT } from './PtlGetNFT';
import { ReqLogin, ResLogin } from './PtlLogin';

export interface ServiceType {
    api: {
        "GetNFT": {
            req: ReqGetNFT,
            res: ResGetNFT
        },
        "Login": {
            req: ReqLogin,
            res: ResLogin
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 4,
    "services": [
        {
            "id": 1,
            "name": "GetNFT",
            "type": "api"
        },
        {
            "id": 0,
            "name": "Login",
            "type": "api"
        }
    ],
    "types": {
        "PtlGetNFT/ReqGetNFT": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "address",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlGetNFT/ResGetNFT": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "nftID",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlLogin/ReqLogin": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "username",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "password",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "address",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlLogin/ResLogin": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "state",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        }
    }
};