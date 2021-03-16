import { ObjectId } from "mongodb";
import { defaultCreateRemoteResolver, IResolvers } from "apollo-server-express";
import { Database } from "../lib/types";

export const resolvers: IResolvers = {
  Query: {
    listings: async (_root: undefined, _args: {}, { db }: { db: Database }) => {
      return await db.listings.find({}).toArray();
    }
  },
  Mutation: {
    deleteListing: async (_root: undefined, { id }: { id: string }, { db }: { db: Database }) => {
      const deleteRes = await db.listings.findOneAndDelete({_id: new ObjectId(id)});

      if (!deleteRes.value) {
        throw new Error("Failed to delete listing")
      }

      return deleteRes.value;
    }
  }
};
