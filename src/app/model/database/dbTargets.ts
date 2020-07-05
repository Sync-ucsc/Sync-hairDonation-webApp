export interface DbTargets {
  _id?: string,
  driverId: string,
  driverEmail: string,
  targets: Targets[],
  createdAt: Date,
  status: DB_TARGETS_STATUS,
}

export interface Targets {
  _id?: string,
  noOfWigs?: number,
  deliveryDate: string,
  createdAt: string,
  salonId:string,
  salonName: string,
  salonEmail: string,
  address: string,
  requestId: string,
  lat: number,
  lng: number,
  status: TARGETS_STATUS,
}

enum TARGETS_STATUS {
  NEED_TO_DELIVER = 'NeedToDeliver',
  DELIVERED = 'Delivered',
  CANCEL = 'Cancel'
}

enum DB_TARGETS_STATUS {
  NOT_COMPLETED = 'NOT_COMPLETED',
  COMPLETED = 'COMPLETED',
  CANCEL = 'CANCEL'
}


