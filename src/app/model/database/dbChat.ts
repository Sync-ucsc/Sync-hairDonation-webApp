export interface DbChat {
  _id?: string;
  senderId: string,
  receiverId: string,
  senderRole:string,
  receiverRole:string,
  content:string,
  createdAt: string,
}

export interface ChatRoom {
  roomId: string
}
