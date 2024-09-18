import { Pool } from 'pg';
import Knex from 'knex';
import Constants from 'expo-constants';

const awsConfig = {
  apiKey: Constants.expoConfig?.extra?.aws?.apiKey,
  secretAccessKey: Constants.expoConfig?.extra?.aws?.secretAccessKey,
  region: Constants.expoConfig?.extra?.aws?.region,
};

export const rdsConfig = {
  DBInstanceIdentifier: process.env.RDS_INSTANCE_IDENTIFIER || 'my-postgres-instance',
  AllocatedStorage: parseInt(process.env.RDS_ALLOCATED_STORAGE || '', 10) || 20,
  DBInstanceClass: process.env.RDS_INSTANCE_CLASS || 'db.t3.micro',
  Engine: 'postgres',
  MasterUsername: process.env.RDS_MASTER_USERNAME || 'admin',
  MasterUserPassword: process.env.RDS_MASTER_PASSWORD || 'your-password',
  DBName: process.env.RDS_DB_NAME || 'mydb',
  VpcSecurityGroupIds: process.env.RDS_VPC_SECURITY_GROUP_IDS ? process.env.RDS_VPC_SECURITY_GROUP_IDS.split(',') : ['sg-xxxxxxxx'],
  PubliclyAccessible: process.env.RDS_PUBLICLY_ACCESSIBLE === 'true',
  BackupRetentionPeriod: parseInt(process.env.RDS_BACKUP_RETENTION_PERIOD || '', 10) || 7,
  EngineVersion: process.env.RDS_ENGINE_VERSION || '13.3',
  StorageType: process.env.RDS_STORAGE_TYPE || 'gp2',
  MultiAZ: process.env.RDS_MULTI_AZ === 'true',
};  

export const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebase?.apiKey,
  authDomain: Constants.expoConfig?.extra?.firebase?.authDomain,
  projectId: Constants.expoConfig?.extra?.firebase?.projectId,
  storageBucket: Constants.expoConfig?.extra?.firebase?.storageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.firebase?.messagingSenderId,
  appId: Constants.expoConfig?.extra?.firebase?.appId,
  measurementId: Constants.expoConfig?.extra?.firebase?.measurementId,
};

// Setup PostgreSQL pool for RDS
export const PgPool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT || 3000,
  max: 10, // Max number of connections in the pool
  idleTimeoutMillis: 30000, // Idle timeout
  connectionTimeoutMillis: 2000, // Connection timeout
});

// export const knex = Knex({
//   client: 'pg',
//   connection: {
//     host: process.env.PG_HOST,
//     user: process.env.PG_USER,
//     password: process.env.PG_PASSWORD,
//     database: process.env.PG_DATABASE,
//     port: process.env.PG_PORT,
//   },
// });

export default awsConfig;
