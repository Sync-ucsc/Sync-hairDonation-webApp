export interface DbSalon {
  name: string
  email: string
  address: string

  checkSystem: boolean
  checkSms: boolean
  checkEmail: boolean

  telephone: number
  latitude: number
  longitude: number

  NeedToDeliverStatus: NeedToDeliverStatus[]
}

export interface NeedToDeliverStatus {

  status: NEEDTODELIVERSTATUS,

  createdAt: string,
  deliveryDate: string

}

enum NEEDTODELIVERSTATUS {
  NEEDTODELIVER = 'NeedToDeliver',
  DELIVERED = 'Delivered',
  CANCEL = 'Cancel'
}
