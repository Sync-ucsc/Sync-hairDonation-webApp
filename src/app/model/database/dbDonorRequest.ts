export interface DbDonorRequest {
    _id?: string,
    requestDay: Date,
    validDate: Date,
    address: string,
    latitude: number,
    longitude: number,
    appoiment:[],
    finished: boolean,
    canceled: boolean,
  }