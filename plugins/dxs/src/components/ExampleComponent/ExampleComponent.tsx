import React, { useEffect, useState } from 'react';
import { Typography, makeStyles, Button, ListItem } from '@material-ui/core';
import { Table, TableColumn, Link} from '@backstage/core-components';
import {
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  Progress,
  StatusOK,
  StatusAborted
} from '@backstage/core-components';
import { discoveryApiRef, useApi} from '@backstage/core-plugin-api';
import useAsync from 'react-use/esm/useAsync';
import { Alert } from '@material-ui/lab';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import LinearProgress from '@mui/material/LinearProgress';
import IconButton from '@mui/material/IconButton';

import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';


function valuetext(value: number) {
  return `${value}°C`;
}
//progress bar
export default function LinearDeterminate() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}

//styles
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
    backButton: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
    },
  }));

//main page
const DxsProxyComponent = () => {  
  const navigate = useNavigate();
  const classes = useStyles();

  const discoveryAPI = useApi(discoveryApiRef);
  const proxyBackendBaseUrl = discoveryAPI.getBaseUrl('dxs');

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const { value, loading, error } = useAsync(async() => {
    const response = await fetch(`${ await proxyBackendBaseUrl}/surveys`)
    const jsonData = await response.json();

    const teamIdToNameMap = {};
    const teamNamesResponse = await fetch(`${await proxyBackendBaseUrl}/teamname`);
    const teamNamesData = await teamNamesResponse.json();
    teamNamesData.forEach((team: any ) => {
            teamIdToNameMap[team.team_id] = team.team_name;
        });
    
    const columns: TableColumn[] = [
      {
        title: 'Date',
        field: 'date',
        render: (row: any) => (
          <>
          {new Date(row.date).toLocaleString('en-US', { month: 'long', year: 'numeric' })}
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
        title: 'Status',
        field: "status",
        render: (row: any) => (
          <Box display="flex" alignItems="center">
            {(currentMonth === new Date(row.date).getMonth() && currentYear === new Date(row.date).getFullYear()) ?
              <StatusOK />
             : 
              <StatusAborted />
            }
            <Typography variant="body2">
              {(currentMonth === new Date(row.date).getMonth() && currentYear === new Date(row.date).getFullYear()) ?
                "open"
              : 
                "closed"
              }
            </Typography>
          </Box>
        ),
      },
      {
        title: 'Options',
        field: 'options',
        render: (row: any) => (
          <ListItem >
            <div style={{ marginRight: '50px' }}>
              <IconButton size="large" onClick={() => navigate(`/dxspage/${row.survey_id}/1`, { state: { navigationSource: "Browse" } })}>
                <VisibilityIcon/>
              </IconButton>
            </div>
            {currentMonth === new Date(row.date).getMonth() && currentYear === new Date(row.date).getFullYear() && (
              <IconButton size="large" onClick={() => navigate(`/dxspage/${row.survey_id}/1`, { state: { navigationSource: "Edit" } })}>
                <EditIcon/>
              </IconButton>
            )}
          </ListItem>
        )
        }];

    //sorted list of surveys
    const data = jsonData.map((singleData: { survey_id: any; date: any; team_id: any; })=>{
      return{
        survey_id: singleData.survey_id,
        date: singleData.date,
        team_id: singleData.team_id,
        };
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
    

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

//survey page
export const SurveyPage = () => {
  const { surveyid, questionid} = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const navigationSource = location.state ? location.state.navigationSource : "Browse";
  
  const classes = useStyles();

  const discoveryAPI = useApi(discoveryApiRef);
  const proxyBackendBaseUrl = discoveryAPI.getBaseUrl('dxs');

  const { value, loading, error } = useAsync(async() => {
    const response = await fetch(`${ await proxyBackendBaseUrl}/dxspage/${surveyid}`)

    const jsonData = await response.json();
    
  }, [] );
  
  const goToPreviousPage = () => {
    navigate('/dxs'); // Navigate to the previous page
  };

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <Alert severity='error'/>;
  }
  return (
    <Page themeId="tool">
      <Header title="Survey page" subtitle={`${
          navigationSource === "Edit" ? "Editing" : "Browsing"
        } mode`}>
        <HeaderLabel label="Owner" value="Ocado Technology" />
        <HeaderLabel label="Lifecycle" value="Alpha" />
      </Header>
      <Content>
        <div className={classes.backButton}>
          <Button onClick={goToPreviousPage}>&lt; Back</Button> {/* Back button */}
        </div>
        <ContentHeader title="Questionairre">
        </ContentHeader>
        <Question questionid = {questionid} surveyid={surveyid}/>
      </Content>
    </Page>
);
}

//question
export const Question = ({ surveyid, questionid }) => {
  const discoveryAPI = useApi(discoveryApiRef);
  const proxyBackendBaseUrl = discoveryAPI.getBaseUrl('dxs');
  const [jsonData, setJsonData] = useState(null); // State to store the fetched data
  const [surveyData, setSurveyData] = useState(null);
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation();
  const navigationSource = location.state ? location.state.navigationSource : "Browse";
  
  const fetchData = async (surveyId, questionId) => {
    try {
      const response = await fetch(`${await proxyBackendBaseUrl}/dxspage/${surveyId}/${questionId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch question data');
      }
      const data = await response.json(); // Store the fetched data
      //setJsonData(data); // Update the state with the fetched data
      
    } catch (error) {
      console.error('Error fetching question data:', error);
    }
  };

  const fetchAllData = async (surveyId, questionId) => {
    try {
      const response = await fetch(`${await proxyBackendBaseUrl}/dxspage/${surveyId}/${questionId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch question data');
      }
      const data = await response.json(); // Store the fetched data
      setJsonData(data);
      const surveyData = jsonData.map((singleData: { category_name: any; notes: any; content: any; comment: any; scale_response: any; long_response: any;})=>{
        return{
          category_name: singleData.category_name,
          notes: singleData.notes,
          content: singleData.content,
          comment: singleData.comment,
          scale_response: singleData.scale_response,
          long_response: singleData.long_response,
          };
      });
      setSurveyData(surveyData); // Update the state with the fetched data

    } catch (error) {
      console.error('Error fetching question data:', error);
    }
  };

  useEffect(() => {
      fetchData(surveyid, questionid);
      fetchAllData(surveyid, questionid);
  }, [proxyBackendBaseUrl, surveyid, questionid]) // Include dependencies in the effect

  const goToNextQuestion = () => {
    const nextQuestionId = parseInt(questionid) + 1; // Increment questionid
    if (nextQuestionId <= 31) { // Ensure questionid stays within the range
      fetchData(surveyid, nextQuestionId.toString()); // Fetch data for the next question
      fetchAllData(surveyid, nextQuestionId.toString());
      navigate(`/dxspage/${surveyid}/${nextQuestionId}`, { state: { navigationSource: navigationSource } }); // Navigate to the next question page
    }
  };

  const goToPreviousQuestion = () => {
    const previousQuestionId = parseInt(questionid) - 1; // Decrement questionid
    if (previousQuestionId > 0) { // Ensure questionid stays within the range
      fetchData(surveyid, previousQuestionId.toString()); // Fetch data for the previous question
      fetchAllData(surveyid, previousQuestionId.toString());
      navigate(`/dxspage/${surveyid}/${previousQuestionId}`, { state: { navigationSource: navigationSource } }); // Navigate to the previous question page
    }
  };

  return (
    <div>
      <div>
        <h2>Question {parseInt(questionid)} / 31</h2>
        {/* Render survey data */}
      {surveyData && (
        <div>
          {surveyData.map((data, index) => (
            <div key={`${data.long_response}-${data.comment}-${data.scale_response}`}>
              <h3>Category: {data.category_name}</h3>
              <p style={{ color: "#999" }}> {data.notes}</p> {/* Added style for grey color */}
              <Divider textAlign="left">question</Divider>
              <p style={{ fontSize: "25px", textAlign: "left" }}> {data.content}</p> {/* Increased font size */}
              <Divider textAlign="left">scale response</Divider>
              <p style={{ fontSize: "20px", marginLeft: "190px" }}> {data.scale_response}</p>
              {navigationSource === "Edit"
              ?
              <Slider defaultValue={data.scale_response || 1} shiftStep={3} step={1} marks min={1} max={10} style={{ width: '25%' }}/>
              :
              <Slider disabled defaultValue={data.scale_response || 1} shiftStep={3} step={1} marks min={1} max={10} style={{ width: '25%' }}/>
              }
              <Divider textAlign="left">long response (optional)</Divider>

              {navigationSource === "Edit"
              ?
              <TextField multiline fullWidth  id="long_response" defaultValue={data.long_response || ''} style={{ width: '50%' }}/>
              :
              <TextField multiline fullWidth disabled  id="long_response" value={data.long_response || ''} // Provide a default value if data.long_response is empty
                onChange={(e) => {
                const newValue = e.target.value;// Handle change in long_response explicitly if needed
              }}/>
              }

              <Divider textAlign="left">comment (optional)</Divider>

              {navigationSource === "Edit"
              ?
              <TextField multiline fullWidth  id="comment" defaultValue={data.comment || ''} style={{ width: '50%' }}/>
              :
              <TextField multiline fullWidth disabled  id="comment" value={data.comment || ''} // Provide a default value if data.comment is empty
                onChange={(e) => {
                const newValue = e.target.value;// Handle change in comment explicitly if needed
              }}/>
              }
            </div>
          ))}
        </div>
      )}
      </div>
      <div style={{ marginTop: "20px" }}>
        <LinearProgress variant="determinate" value={(parseInt(questionid) / 31) * 100} />
      </div>
      <div style={{ marginRight: parseInt(questionid) > 1 ? "50px" : "114px", display: "inline-block" }}>
        {parseInt(questionid) > 1 && <Button onClick={goToPreviousQuestion}><ArrowBackIosIcon /></Button>}
      </div>
      <div style={{ marginLeft: parseInt(questionid) < 31 ? "50px" : "114px", display: "inline-block" }}>
        {parseInt(questionid) < 31 && <Button onClick={goToNextQuestion}><ArrowForwardIosIcon /></Button>}
      </div>
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


