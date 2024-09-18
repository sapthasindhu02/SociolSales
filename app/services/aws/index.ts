import { rdsConfig } from "../../config/config";
import logger from "../../utils/logger";
import { createRDSInstance } from "./RDS";

// Create RDS instance
const setupRDS = async () => {
  try {
    await createRDSInstance(rdsConfig);
    logger.info('RDS setup complete');
  } catch (err) {
    logger.error('Failed to set up RDS:', err);
  }
};

// Optionally, you can call deleteRDSInstance() to remove the instance
// const teardownRDS = async () => {
//   try {
//     await deleteRDSInstance('my-postgres-instance');
//     console.log('RDS instance deleted');
//   } catch (err) {
//     console.error('Failed to delete RDS:', err);
//   }
// };

setupRDS();
