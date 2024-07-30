import { PluginDatabaseManager, errorHandler } from '@backstage/backend-common';
import { Config } from '@backstage/config';
import express from 'express';
import Router from 'express-promise-router';
import { IdentityApi } from '@backstage/plugin-auth-node';
import { Logger, log } from 'winston';
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

  // Get all surveys
  router.get('/surveys/:teamid', async (request, response) => { 
    try {
        const {teamid} = request.params;
        const surveyTable = await dbHandler.getSurveys(teamid);
        response.send(surveyTable);

    } catch (error) {
        console.error('Error getting questions:', error);
        response.status(500).send('Internal Server Error');
    }
  });

  // Get all team names
  router.get('/teamname/:teamname', async (request, response) => {
      try {
          const {teamname} = request.params;
          const surveyTable = await dbHandler.getTeamNames(teamname);
          response.send(surveyTable);

      } catch (error) {
          console.error('Error getting questions:', error);
          response.status(500).send('Internal Server Error');
      }
  });

  // Get survey by ID
  router.get('/dxspage/:surveyid', async (request, response) => {
    const {surveyid} = request.params;
    const value = await dbHandler.getSurvey(surveyid);
    response.send({response: value });
  });

  // Get survey's question by survey ID and question ID
  router.get('/dxspage/:surveyId/:questionId', async (request, response) => {
    try{
      const {surveyId, questionId} = request.params;
      const surveyTable = await dbHandler.getQuestion(surveyId,questionId);

      response.send(surveyTable);
    }catch (error) {
        console.error('Error getting questions:', error);
        response.status(500).send('Internal Server Error');
    }
  });
  
  // Create a new survey
  router.post('/surveys', async (request, response) => {
    const { id, teamId, date } = request.body;
    try {
      await dbHandler.createSurvey(id, teamId, date);
      response.status(201).send({ message: 'Survey created successfully' });
    } catch (error) {
      console.error('Error creating survey:', error);
      response.status(500).send('Internal Server Error');
    }
  });

  // Update a survey
  router.post('/update', async (request, response) => {
    const { surveyid, question_id, scaleResponse, comment } = request.body;
  
    try {
      // Log the received data
      const responsed = await dbHandler.updateSurvey(surveyid, question_id, scaleResponse, comment);
      response.send(responsed);
    } catch (error) {
      console.error('Error updating survey:', error);
      response.status(500).send('Internal Server Error');
    }
  });

  router.get('/getdate/:surveyid', async (request, response) => {
    const {surveyid} = request.params;
    const value = await dbHandler.getDate(surveyid);
    response.send({response: value});
  });

  // Delete a survey
  router.delete('/surveys/:surveyid', async (request, response) => {
    const { surveyid } = request.params;
    const { teamId, date } = request.body;
    try {
      await dbHandler.deleteSurvey(parseInt(surveyid, 10), teamId, date);
      response.send({ message: 'Survey deleted successfully' });
    } catch (error) {
      console.error('Error deleting survey:', error);
      response.status(500).send('Internal Server Error');
    }
  });

  router.use(errorHandler());
  return router;
}
