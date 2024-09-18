import { PgPool as pool } from "../../config/config";
import { Column } from "../types";
import { defineTableSchema } from "./schema";

export const createTable = async (tableName: string, columns: Column) => {
  const createTableQuery = defineTableSchema(tableName, columns);

  try {
    const client = await pool.connect(); // Get a client from the pool
    await client.query(createTableQuery); // Execute the create table query
    console.log(`Table "${tableName}" created successfully`);
    client.release(); // Release the client back to the pool
  } catch (error) {
    console.error(`Error creating table "${tableName}":`, error);
  }
};

export const columnsInShop = async () => {

};

/*
// Example usage
const tableName = 'sareesArrangement';
const columns = [
  { name: 'NarayanaPattu', type: 'string'},
  { name: 'count', type: 'number' },
   {name: Column Number, type: 'number'}
{name: show sarees, type:'string'} //should be a button that opens Narayanapattu table which contains sarees with images and row number
];


createTable(tableName, columns);

*/
