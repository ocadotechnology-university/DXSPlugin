import React, { useEffect, useState } from 'react';
import { Typography, Grid, makeStyles, Button, ListItem } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { Table, TableColumn, Link, LinkButton, TabbedLayout, LinearGauge } from '@backstage/core-components';
import {
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  Progress,
} from '@backstage/core-components';
import { discoveryApiRef, useApi } from '@backstage/core-plugin-api';
import useAsync from 'react-use/esm/useAsync';
import { Alert } from '@material-ui/lab';
import { useParams, useNavigate } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    container: {
      width: '100%',
      alignItems: 'center',
    },
    empty: {
      padding: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }));

  

const DxsProxyComponent = () => {  

  const classes = useStyles();


  const discoveryAPI = useApi(discoveryApiRef);
  const proxyBackendBaseUrl = discoveryAPI.getBaseUrl('dxs');

  const { value, loading, error } = useAsync(async() => {
    const response = await fetch(`${ await proxyBackendBaseUrl}/order66`)

    const jsonData = await response.json();

    const teamIdToNameMap = {};
    const teamNamesResponse = await fetch(`${await proxyBackendBaseUrl}/teamname`);
    const teamNamesData = await teamNamesResponse.json();
    teamNamesData.forEach((team: any ) => {
            teamIdToNameMap[team.team_id] = team.team_name;
        });


    const columns: TableColumn[] = [
      {
        title: 'Survey ID',
        field: 'survey_id',
        highlight: true,
      },
      {
        title: 'Date',
        field: 'date',
        render: (row: any) => (
                <>
                  <Link to="/">{new Date(row.date).toLocaleString('en-US', { month: 'long', year: 'numeric' })}</Link>
                </>
      )},
      {
        title: 'Team ID',
        field: 'team_id',
        render: (row: any) => (
          <>{teamIdToNameMap[row.team_id]}</>
      )
      },
      {
        title: 'Options',
        field: 'options',
        render: (row: any) => (
          <ListItem >
            <LinkButton to={`/dxspage/${row.survey_id}/1`} color="default" variant="outlined">
            Edit
            </LinkButton> 
            <LinkButton to='/dxs'>
            Browse
            </LinkButton>
          </ListItem>
        )
        }];

    const data = jsonData.map((singleData: { survey_id: any; date: any; team_id: any; })=>{
      return{
        survey_id: singleData.survey_id,
        date: singleData.date,
        team_id: singleData.team_id,
        };
    });
    

    return (
      <div className={classes.container}>
        <Table
          options={{ paging: false }}
          data={data}
          columns={columns}
          title="Backstage Table"
        />
      </div>
    );
    
  }, [] );

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity='error'/>;
  }
  return value;
}




export const SurveyPage = () => {
  const { surveyid, questionid} = useParams();


  const discoveryAPI = useApi(discoveryApiRef);
  const proxyBackendBaseUrl = discoveryAPI.getBaseUrl('dxs');

  const { value, loading, error } = useAsync(async() => {
    const response = await fetch(`${ await proxyBackendBaseUrl}/dxspage/${surveyid}`)

    const jsonData = await response.json();
    console.log(JSON.stringify(jsonData))
  }, [] );
  

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity='error'/>;
  }
  return (
    <Page themeId="tool">
      <Header title="Survey page" subtitle="Editing mode">
        <HeaderLabel label="Owner" value="Ocado Technology" />
        <HeaderLabel label="Lifecycle" value="Alpha" />
      </Header>
      <Content>
        <ContentHeader title="Questionairre">
        </ContentHeader>
        <Question questionid = {questionid} surveyid={surveyid}/>
      </Content>
    </Page>
);

}
export const Question = ({ surveyid, questionid }) => {
  const discoveryAPI = useApi(discoveryApiRef);
  const proxyBackendBaseUrl = discoveryAPI.getBaseUrl('dxs');
  const [jsonData, setJsonData] = useState(null); // State to store the fetched data
  const navigate = useNavigate(); // Hook for navigation

  const fetchData = async (surveyId, questionId) => {
    try {
      const response = await fetch(`${await proxyBackendBaseUrl}/dxspage/${surveyId}/${questionId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch question data');
      }
      const data = await response.json(); // Store the fetched data
      setJsonData(data); // Update the state with the fetched data
    } catch (error) {
      console.error('Error fetching question data:', error);
    }
  };

  useEffect(() => {
    fetchData(surveyid, questionid); // Fetch data when the component mounts
  }, [proxyBackendBaseUrl, surveyid, questionid]); // Include dependencies in the effect

  const goToNextQuestion = () => {
    const nextQuestionId = parseInt(questionid) + 1; // Increment questionid
    const nextSurveyId = parseInt(surveyid) + 1;
    if (nextQuestionId <= 31) { // Ensure questionid stays within the range
      fetchData(nextSurveyId, nextQuestionId.toString()); // Fetch data for the next question
      navigate(`/dxspage/${nextSurveyId}/${nextQuestionId}`); // Navigate to the next question page
    }
  };

  const goToPreviousQuestion = () => {
    const previousQuestionId = parseInt(questionid) - 1; // Decrement questionid
    const previousSurveyId = parseInt(surveyid) - 1;
    if (previousQuestionId > 0) { // Ensure questionid stays within the range
      fetchData(previousSurveyId, previousQuestionId.toString()); // Fetch data for the previous question
      navigate(`/dxspage/${previousSurveyId}/${previousQuestionId}`); // Navigate to the previous question page
    }
  };

  return (
    <div>
      <div>
        <h2>Question {parseInt(questionid)}</h2>
        {/* Render additional question details using questionData */}
        <pre>{JSON.stringify(jsonData, null, 2)}</pre> {/* Display JSON data */}
      </div>
      <Button onClick={goToPreviousQuestion}>Previous Question</Button>
      <Button onClick={goToNextQuestion}>Next Question</Button>
    </div>
  );
};

export const ExampleComponent = () => (
  <Page themeId="tool">
    <Header title="Welcome to dxs!" subtitle="Optional subtitle">
      <HeaderLabel label="Owner" value="Ocado Technology" />
      <HeaderLabel label="Lifecycle" value="Alpha" />
    </Header>
    <Content>
          <DxsProxyComponent />
    </Content>
  </Page>
);


