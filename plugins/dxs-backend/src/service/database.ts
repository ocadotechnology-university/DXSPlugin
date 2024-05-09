import {
    PluginDatabaseManager,
    resolvePackagePath,
  } from '@backstage/backend-common';
  import { Knex } from 'knex';
  
  const migrationsDir = resolvePackagePath(
    'backstage-plugin-dxs-backend',
    'migrations',
  );
  
  type Options = {
    database: PluginDatabaseManager;
  };
  
  export class DatabaseHandler {
    static async create(options: Options): Promise<DatabaseHandler> {
      const { database } = options;
      const client = await database.getClient();
  
      if (!database.migrations?.skip) {
        await client.migrate.latest({
          directory: migrationsDir,
        });
      }
  
      return new DatabaseHandler(client);
    }
  
    private client: Knex;
  
    private constructor(client: Knex) {
      this.client = client;
    }
  
    async createSurvey(id: number, teamId: string, Date: string) {
      return await this.client('surveys').insert({
        survey_id: id,
        team_id: teamId,
        date: Date, /*tylko brakuje sposobu wypełnienia tego jakoś, bo jedyne co zrobiliśmy to takie entry do bazy danych że jest survey*/
      })
    }

    async getSurveys() {
      try {
        
        const questions = await this.client.select('*').from('surveys');
        return questions;
      } catch (error) {
          console.error('Error fetching questions:', error);
          throw error; // Handle or propagate the error as needed
      }
  }
  
  async getTeamNames() {
    try {
      
      const names = await this.client.select('*').from('teams');
      return names;
    } catch (error) {
        console.error('Error fetching questions:', error);
        throw error; // Handle or propagate the error as needed
    }
}/*to se bierze pytania z bazy danych i zwraca ją*/

  
    async fillSurvey(
      teamId: number, scaleResponse: number, longResponse: string, comment: string, answerId: number, questionId: number
    ) {
      await this.client
        .insert({
          comment: comment,
          scale_response: scaleResponse,
          long_response: longResponse,
          team_id: teamId,
          answer_id: answerId,
          question_id: questionId,
        })
        .into('answers');
    }


    async getSurvey(surveyid: string) { 
      try {
        
        const questions = await this.client.select('*').from('answers').where({ survey_id: `${surveyid}` });
        return questions;
      } catch (error) {
          console.error('Error fetching questions:', error);
          throw error; 
      }
  }

  async getQuestion(surveyid: any, questionid: any) { 
    try {  
        const questions = await this.client.select('*')
                                           .from('answers')
                                           .where({ survey_id: surveyid, question_id: questionid });
        return questions;
    } catch (error) {
        console.error('Error fetching questions:', error);
        throw error; 
    }
}
    
  
    async deleteSurvey(id: number, teamId: string, date: string) {
      return await this.client('surveys')
      .where({ survey_id: id, team_id: teamId, date: date })
      .del();
    }
    async updateSurvey(teamId: string, scaleResponse: number, longResponse: string, comment: string, answerId: number, questionId: number) {
      await this.client('answers')
      .where({
        comment: comment,
        scale_response: scaleResponse,
        long_response: longResponse,
        team_id: teamId,
        answer_id: answerId,
        question_id: questionId,
       })
      .del();
      await this.client('surveys')
      .where({
        comment: comment,
        scale_response: scaleResponse,
        long_response: longResponse,
        team_id: teamId,
        answer_id: answerId,
        question_id: questionId,
       })
       .insert({
        comment: comment,
        scale_response: scaleResponse,
        long_response: longResponse,
        team_id: teamId,
        answer_id: answerId,
        question_id: questionId,
      })
      .into('answers');

    }
  }