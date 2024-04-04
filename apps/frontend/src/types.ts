export interface Message {
  author: string;
  text: string;
}

export interface MessageWithId extends Message {
  id: string;
}
