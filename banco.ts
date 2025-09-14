import "reflect-metadata";
import { DataSource } from "typeorm";

export const banco = new DataSource({
  type: "sqlite", 
  database: __dirname + "/banco.sqlite",
  synchronize: true, 
  logging: false,
  entities: [__dirname + "/entity/*.ts"],
});
