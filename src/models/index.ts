export interface HitokotoModel {
  createdAt: string;
  creator: string;
  from: string;
  user_id?: string;
  hitokoto: string;
  id: number;
  nonce: Snowflake;
  type: string;
}

type Date = string;
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
