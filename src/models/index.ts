export interface HitokotoModel {
  createdAt: Date;
  creator: string;
  from: string;
  userId?: string;
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
  likedId?: string;
  liked?: SentenceModel;
}

export type Snowflake = string;
export type ObjectID = string;

export type FavoriteModel = {
  createdAt: Date;
  text: string;
  author?: string | undefined;
  from?: string | undefined;
  id: Snowflake | ObjectID;
  userId?: string;
  type: SentenceType;
  likeId?: string;
};

export type UserModel = {
  username: string;
  email: string;
  avatar: string;
  id: string;
};
