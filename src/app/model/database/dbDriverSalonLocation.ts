export interface DbDriverSalonLocation {
  driverId: string,
  driverEmail: string,
  createdAt: string,

  locations: Location[],

  status: STATUS,

}

export interface Location {
  lat: string,
  lng: string,
  salonId: string,

  noOfWigs: number,

  status: STATUS,
}

enum STATUS {
  COLLECTED = 'COLLECTED',
  NOT_COLLECTED = 'NOT_COLLECTED'
}
