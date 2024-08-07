import { createServiceBuilder, DatabaseManager, loadBackendConfig } from '@backstage/backend-common';
import { ConfigReader } from '@backstage/config';
import { Server } from 'http';
import { Logger } from 'winston';
import { createRouter } from './router';

export interface ServerOptions {
  port: number;
  enableCors: boolean;
  logger: Logger;
}

export async function startStandaloneServer(
  options: ServerOptions,
): Promise<Server> {
  const logger = options.logger.child({ service: 'dxs-backend-backend' });
  const config = await loadBackendConfig({ logger, argv: process.argv });
  logger.debug('Starting application server...');
  const manager = DatabaseManager.fromConfig(
    new ConfigReader({
      backend: {
        database: { client: 'pg', connection: 'postgresql://postgres:secret@localhost:5432/dxs' },
      },
    }),
  );
  const database = manager.forPlugin('dxs');
  const router = await createRouter({
    logger,
    database,
    config: config,
  });

  let service = createServiceBuilder(module)
    .setPort(options.port)
    .addRouter('/dxs-backend', router);
  if (options.enableCors) {
    service = service.enableCors({ origin: 'http://localhost:3000' });
  }

  return await service.start().catch(err => {
    logger.error(err);
    process.exit(1);
  });
}

module.hot?.accept();
