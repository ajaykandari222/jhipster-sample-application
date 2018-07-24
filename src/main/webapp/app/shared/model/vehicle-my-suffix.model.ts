export interface IVehicleMySuffix {
    id?: number;
    vehicleNumber?: string;
    vehicleNumberId?: number;
}

export class VehicleMySuffix implements IVehicleMySuffix {
    constructor(public id?: number, public vehicleNumber?: string, public vehicleNumberId?: number) {}
}
