import * as dotenv from 'dotenv';
dotenv.config();
import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { connectDatabase } from './database';
import { typeDefs, resolvers } from './graphql';
const PORT = 9000;
const mount = async (app: Application) => {
	const db = await connectDatabase();
	app.use(express.json({ limit: '2mb' }));
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: (req: Request, res: Response) => ({ req, res, db })
	});

	server.applyMiddleware({ app, path: '/api' });
	
	app.listen(PORT);
	
	console.log(`[app]: http://localhost:${process.env.PORT + "/api/listings" ?? PORT}`);
	const listings = await db.listings.find({}).toArray();
	
	console.log(listings);
};
mount(express());