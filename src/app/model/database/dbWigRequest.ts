export interface DbWigRequest {
  _id?: string,
  requestDay: string,
  wigType: string,
  finished: boolean,
  canceled: boolean,
}
