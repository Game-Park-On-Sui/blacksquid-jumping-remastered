import { ServiceProto } from 'tsrpc-proto';


export interface ServiceType {
    api: {

    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 2,
    "services": [],
    "types": {}
};