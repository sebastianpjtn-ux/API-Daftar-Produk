//import {PrismaClient} from "@prisma/client";
import { PrismaClient } from "../generated/prisma/client.ts";

const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});

const connectDB = async () => {
    try{
        await prisma.$connect();
        console.log("Connected to the database via Prisma");
    } catch (error){
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    await prisma.$disconnect();
}

export {prisma, connectDB, disconnectDB};