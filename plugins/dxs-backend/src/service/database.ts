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
      date: Date,
    });
  }

  // Surveys
  async getSurveys(teamid: string) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // getMonth() is zero-based, so add 1
    const currentYear = currentDate.getFullYear();
    
    try {
      // Check if there's already a survey for the current month and year
      const existingSurveys = await this.client('surveys')
        .andWhereRaw(`EXTRACT(MONTH FROM date::date) = ? AND EXTRACT(YEAR FROM date::date) = ?`, [currentMonth, currentYear])
        .andWhere({ team_id: teamid });

      const maxSurveyId = await this.client('surveys')
        .max('survey_id as maxId')
        .first();

      if (existingSurveys.length === 0) {
        // No survey for the current month and year, create a new one
        await this.client('surveys').insert({
          survey_id: (maxSurveyId.maxId || 0)+1,
          team_id: teamid,
          date: currentDate.toISOString().split('T')[0], // format the date as YYYY-MM-DD
          // Add other fields as necessary
        });

        const maxAnswerId = await this.client('answers')
          .max('answer_id as maxId')
          .first();

        for (let i = 0; i < 28; i++) {
          await this.client('answers').insert({
              answer_id: i + 1 + (maxAnswerId.maxId || 0),
              scale_response: 1,
              question_id: i + 1,
              comment: "",
              survey_id: (maxSurveyId.maxId || 0)+1
          });
        }
        await this.client('answers').insert({
          answer_id: 29 + (maxAnswerId.maxId || 0),
          scale_response: null,
          question_id: 29,
          comment: "",
          survey_id: (maxSurveyId.maxId || 0)+1
        });
        await this.client('answers').insert({
          answer_id: 30 + (maxAnswerId.maxId || 0),
          scale_response: null,
          question_id: 30,
          comment: "",
          survey_id: (maxSurveyId.maxId || 0)+1
        });
        await this.client('answers').insert({
          answer_id: 31 + (maxAnswerId.maxId || 0),
          scale_response: 1,
          question_id: 31,
          comment: "",
          survey_id: (maxSurveyId.maxId || 0)+1
        });
      

        console.log('New survey created for the current month and year.');
      } else {
        console.log('Survey already exists for the current month and year.');
      }

      // Return the surveys for the team 
      const surveys = await this.client.select('*').from('surveys').where({ team_id: teamid });;
      return surveys;
    } catch (error) {
      console.error('Error fetching surveys:', error);
      throw error; // Handle or propagate the error as needed
    }
  }

  // Team names
  async getTeamNames(teamname: string) {
    try {
      const existingTeams = await this.client('teams')
        .andWhere({ team_name: teamname });
      
      const maxTeamId = await this.client('teams')
        .max('team_id as maxId')
        .first();

      if (existingTeams.length === 0) {
        await this.client('teams').insert({
          team_id: (parseInt(maxTeamId.maxId, 10) || 0)+1,
          team_name: teamname,
        });

        
        console.log('New team created for the current month and year.');
      } else {
        console.log('Team already exists for the current month and year.');
      }

      const names = await this.client.select('*').from('teams');
      return names;
    } catch (error) {
      console.error('Error fetching team names:', error);
      throw error; // Handle or propagate the error as needed
    }
  }

  async fillSurvey(
    teamId: number, scaleResponse: number, comment: string, answerId: number, questionId: number
  ) {
    await this.client
      .insert({
        comment: comment,
        scale_response: scaleResponse,
        team_id: teamId,
        answer_id: answerId,
        question_id: questionId,
      })
      .into('answers');
  }

  async getSurvey(surveyid: string) {
    try {
      const questions = await this.client.select('*').from('answers').where({ survey_id: surveyid });
      return questions;
    } catch (error) {
      console.error('Error fetching survey:', error);
      throw error;
    }
  }

  async getQuestion(surveyid: any, questionid: any) {
    try {
      const questions = await this.client
        .select('answers.*', 'categories.category_name', 'categories.notes', 'questions.content', 'surveys.team_id')
        .from('answers')
        .leftJoin('questions', 'answers.question_id', 'questions.question_id')
        .leftJoin('categories', 'questions.category_id', 'categories.category_id')
        .leftJoin('surveys', 'answers.survey_id', 'surveys.survey_id')
        .where({ 'answers.survey_id': surveyid, 'answers.question_id': questionid });
      return questions;
    } catch (error) {
      console.error('Error fetching question:', error);
      throw error;
    }
  }

  async deleteSurvey(id: number, teamId: string, date: string) {
    return await this.client('surveys')
      .where({ survey_id: id, team_id: teamId, date: date })
      .del();
  }

  async updateSurvey(surveyid: string, questionid: string, scaleResponse: number, comment: string) {
    try {
      await this.client('answers')
        .where({ survey_id: surveyid, question_id: questionid })
        .update({
          comment: comment,
          scale_response: scaleResponse,
        });

      // Query the updated result and return it
      const updatedResponse = await this.client('answers')
        .select('*')
        .where({ survey_id: surveyid, question_id: questionid })
        .first();

      return updatedResponse;
    } catch (error) {
      console.error('Error updating survey:', error);
      throw error;
    }
  }
}
