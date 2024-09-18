import AWS from '@/app/config/aws';
import logger from '@/app/utils/logger';

const rds = new AWS.RDS();

export const createRDSInstance = async (params:any) => {
    try {
      const data = await rds.createDBInstance(params).promise();
      logger.info('RDS instance created successfully:', data);
      return data;
    } catch (err) {
      logger.error('Error creating RDS instance:', err);
      throw err;
    }
  };

// Function to delete RDS instance
export const deleteRDSInstance = async (dbInstanceIdentifier:any) => {
    const params = {
      DBInstanceIdentifier: dbInstanceIdentifier,
      SkipFinalSnapshot: true,  // Be cautious with this setting
    };
  
    try {
      const data = await rds.deleteDBInstance(params).promise();
      logger.info('RDS instance deleted successfully:', data);
      return data;
    } catch (err) {
      logger.error('Error deleting RDS instance:', err);
      throw err;
    }
  };
  