export interface HitokotoModel {
  commitFrom: string;
  createdAt: string;
  creator: string;
  creatorUid: number;
  from: string;
  fromWho: string;
  hitokoto: string;
  id: number;
  length: number;
  reviewer: number;
  type: string;
  uuid: string;
}

type Date = string;
export type Snowflake = string;
export type FavoriteModel = {
  createdAt: Date;
  text: string;
  creator: string | undefined;
  from: string | undefined;
  id: Snowflake;
};
