import { Logger } from './logger';
import { doMigration } from './migrate';
import { startTrackingDeposits } from './tracker';

const logger = new Logger();

async function main() {
  try {
    logger.info('Executing migrations');
    await doMigration();

    logger.info('Starting tracker...');
    startTrackingDeposits();
  } catch (error) {
    logger.error(error);
  }
}

main();
