import { Column } from "../types";

// Define your table schema as a string, with columns and their types
export const defineTableSchema = (tableName:string, columns:Column) => {
    const columnDefinitions = columns.map(column => {
      switch (column.type) {
        case 'string':
          return `${column.name} VARCHAR(${column.length || 255})`; // Default length
        case 'number':
          return `${column.name} INTEGER`;
        case 'boolean':
          return `${column.name} BOOLEAN`;
        case 'Date':
          return `${column.name} DATE`;
        default:
          throw new Error(`Unsupported column type: ${column.type}`);
      }
    }).join(', ');
  
    return `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        ${columnDefinitions}
      );
    `;
  };