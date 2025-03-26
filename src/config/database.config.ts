import dotenv from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Password } from "../entities/password.entity";

dotenv.config();

const host = "aws-0-ap-south-1.pooler.supabase.com";
const database_port = 5432;
const user_name = "postgres.mpfkdmqkblrprpzifiqp";
const password = "@rshitm@niya04";
const database = "postgres";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: host,
  port: database_port,
  username: user_name,
  password: password,
  database: database,
  synchronize: true,
  logging: false,
  entities: [Password],
  migrations: [],
  subscribers: [],
  ssl: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    return;
  })
  .catch((err) => {
    console.error("Error during Data Source initialization.", err);
    return;
  });
