export interface HitokotoModel {
  createdAt: Date;
  creator: string;
  from: string;
  user_id?: string;
  hitokoto: string;
  id: number;
  nonce: Snowflake;
  type: string;
}
export enum SentenceType {
  SYSTEM,
  USER,
}
export interface SentenceModel {
  type: SentenceType;
  id: string;
  author?: string;
  from?: string;
  nonce: string;

  createdAt: Date;
  updatedAt: Date;
  text: string;
}

export type Snowflake = string;
export type ObjectID = string;

export type FavoriteModel = {
  createdAt: Date;
  text: string;
  creator: string | undefined;
  from: string | undefined;
  id: Snowflake | ObjectID;
  user_id?: string;
};
