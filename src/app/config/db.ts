import { connect } from "mongoose";
const mongooseUrl = process.env.MONGODB_URI;

if (!mongooseUrl) {
    throw new Error("MONGODB_URI is not defined in the environment variables");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async ()=>{
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        cached.promise = connect(mongooseUrl).then((c)=>c.connection);
    }
    try {
        cached.conn = await cached.promise;
    } catch (error) {
        throw new Error("Failed to connect to MongoDB");
    }
    return cached.conn;
}

export default connectDB;