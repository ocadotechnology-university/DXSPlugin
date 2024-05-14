import { PluginDatabaseManager, errorHandler } from '@backstage/backend-common';
import { Config } from '@backstage/config';
import express from 'express';
import Router from 'express-promise-router';
import { IdentityApi } from '@backstage/plugin-auth-node';
import { Logger } from 'winston';
import { DatabaseHandler } from './database';

export interface RouterOptions {
  logger: Logger;
  config: Config;
  database: PluginDatabaseManager;
  identity: IdentityApi;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger, config, database } = options;
  const dbHandler = await DatabaseHandler.create({ database });

  const router = Router();
  router.use(express.json());

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.send({ status: 'ok' });
  });

  //surveys
  router.get('/surveys', async (_, response) => { 
    try {
        const surveyTable = await dbHandler.getSurveys();
        response.send(surveyTable);

    } catch (error) {
        console.error('Error getting questions:', error);
        response.status(500).send('Internal Server Error');
    }
});

//team names
router.get('/teamname', async (_, response) => {
    try {
        const surveyTable = await dbHandler.getTeamNames();
        response.send(surveyTable);

    } catch (error) {
        console.error('Error getting questions:', error);
        response.status(500).send('Internal Server Error');
    }
});

  //survey id
  router.get('/dxspage/:surveyid', async (request, response) => {
    const {surveyid} = request.params;
    const value = await dbHandler.getSurvey(surveyid);
    response.send({response: value });
  });

  //survey's question id user important data
  router.get('/dxspage/:surveyid/:questionid', async (request, response) => {
    try{
      const {surveyid, questionid} = request.params;
      const surveyTable = await dbHandler.getQuestion(surveyid,questionid);

      response.send(surveyTable);
    }catch (error) {
        console.error('Error getting questions:', error);
        response.status(500).send('Internal Server Error');
    }
  });
  

  router.use(errorHandler());
  return router;
}
