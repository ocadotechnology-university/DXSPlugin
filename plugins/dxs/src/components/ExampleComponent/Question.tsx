import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { discoveryApiRef, useApi} from '@backstage/core-plugin-api';
import { makeStyles, Button, ListItem } from '@material-ui/core';
import LinearProgress from '@mui/material/LinearProgress';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import InfoIcon from '@material-ui/icons/Info';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

//question
export const Question = ({ surveyid, questionid }) => {
    const discoveryAPI = useApi(discoveryApiRef);
    const proxyBackendBaseUrl = discoveryAPI.getBaseUrl('dxs');
    const [jsonData, setJsonData] = useState(null); // State to store the fetched data
    const [surveyData, setSurveyData] = useState(null);
    const [isDataUpdated, setIsDataUpdated] = useState(false);
  
    const [scaleResponse, setScaleResponse] = useState(1);
    const [comment, setComment] = useState('');
  
    const navigate = useNavigate(); // Hook for navigation
    const location = useLocation();
    const navigationSource = location.state ? location.state.navigationSource : "Browse";
    
    //fetching data
    const fetchData = async (surveyId, questionId, scale_response, comment) => {
      try {
        const response = await fetch(`${await proxyBackendBaseUrl}/dxspage/${surveyId}/${questionId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch question data');
        }
        const data = await response.json(); // Store the fetched data
        setJsonData(data);
        //setScaleResponse(scale_response || 1);
        //setComment(comment || '');
        const surveyData = jsonData.map((singleData: { survey_id: any; question_id: any; team_id: any; category_name: any; notes: any; content: any; comment: any; scale_response: any;})=>{
          return{
            survey_id: singleData.survey_id,
            question_id: singleData.question_id,
            team_id: singleData.team_id,
            category_name: singleData.category_name,
            notes: singleData.notes,
            content: singleData.content,
            comment: singleData.comment,
            scale_response: singleData.scale_response,
            };
        });
        setSurveyData(data);
        
      } catch (error) {
        console.error('Error fetching question data:', error);
      }
    };
  
    //update data
    const updateSurveyData = async (surveyid: number, question_id: number, scale_response: number, comment: string) => {
      try {
        const response = await fetch(`${await proxyBackendBaseUrl}/update`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            surveyid,
            question_id,
            scale_response,
            comment,
          }),
        });
        const result = await response.json();
        console.log(JSON.stringify(result));
      } catch (error) {
        console.error('Error updating survey data:', error);
      }
    };
  
    useEffect(() => {
      fetchData(surveyid, questionid, scaleResponse, comment);
        if (isDataUpdated) {
          updateSurveyData(surveyid, questionid, scaleResponse, comment);
          setIsDataUpdated(false);
          fetchData(surveyid, questionid, scaleResponse, comment);
        }
    }, [proxyBackendBaseUrl, surveyid, questionid]) // Include dependencies in the effect
  
    //next and prev buttons
    const goToNextQuestion = async () => {
      const nextQuestionId = parseInt(questionid) + 1; // Increment questionid
      if (nextQuestionId <= 31) { // Ensure questionid stays within the range
        fetchData(surveyid, nextQuestionId.toString(), scaleResponse, comment); // Fetch data for the next question
        navigate(`/dxspage/${surveyid}/${nextQuestionId}`, { state: { navigationSource: navigationSource } });
        setIsDataUpdated(false);
         // Navigate to the next question page
      }
    };
    const goToPreviousQuestion = async () => {
      fetchData(surveyid, parseInt(questionid).toString(), scaleResponse, comment)
      const previousQuestionId = parseInt(questionid) - 1; // Decrement questionid
      if (previousQuestionId > 0) { // Ensure questionid stays within the range
        fetchData(surveyid, previousQuestionId.toString(), scaleResponse, comment); // Fetch data for the previous question
        navigate(`/dxspage/${surveyid}/${previousQuestionId}`, { state: { navigationSource: navigationSource } });
        setIsDataUpdated(false);
         // Navigate to the previous question page
      }
    };
  
    //mouse hover and pop
    const [anchorEl, setAnchorEl] = useState<SVGElement | null>(null);
    const handlePopoverOpen = (event: React.MouseEvent<SVGElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handlePopoverClose = () => {
      setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
  
    const [inputComment, setInputComment] = useState("");
    return (
      <div style={{ width: "80%", margin: "auto", border: "1px solid #ccc", padding: "20px" }}>
        <div>
          {/* Render survey data */}
        {surveyData && (
          <div>
            {surveyData.map((data, index) => (
              <div key={`${data.comment}-${data.scale_response}`}>
                <div style={{ backgroundColor: "#32a852", padding: "5px", borderRadius: "10px", fontSize: "24px", display: "flex", alignItems: "center"}}>
                  <h3>Category: {data.category_name}</h3>
                  <InfoIcon
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                  />
                  <Popover
                    id="mouse-over-popover"
                    sx={{ pointerEvents: 'none'}}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                    PaperProps={{
                      style: { maxWidth: '600px' } // Set maxWidth for the Popover content
                    }}
                  >
                    <Typography sx={{ p: 1 }}>{data.notes}</Typography>
                  </Popover>
                </div>
                
  
                <Divider textAlign="center"></Divider>
  
                <p style={{ fontSize: "28px", textAlign: "center" }}> {data.content}</p>
  
                <Divider textAlign="center"></Divider>
  
                <p style={{ fontSize: "30px", textAlign: "center"}}> {data.scale_response}</p>
                
                {(parseInt(questionid) !== 29 && parseInt(questionid) !== 30) && (
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px"}}>
                  {navigationSource === "Edit"
                  ?
                  <Slider
                    defaultValue={data.scale_response || 1}
                    shiftStep={3}
                    step={1}
                    marks
                    min={1}
                    max={10}
                    style={{ width: '50%' }}
                    onChange={(event, newValue) => {
                      if (newValue !== scaleResponse) {
                        setScaleResponse(newValue); // Update scaleResponse on change
                        setTimeout(() => {
                          setIsDataUpdated(true);
                        }, 10);
                      }
                    }}
                    onBlur={() => {
                      setTimeout(() => {
                        setIsDataUpdated(true);
                      }, 10); // Set isDataUpdated with a delay on blur
                    }}
                  />
                  :
                  <Slider disabled defaultValue={data.scale_response || 1} shiftStep={3} step={1} marks min={1} max={10} style={{ width: '50%' }}/>
                  }
                </div>
                )}
  
                {(parseInt(questionid) !== 29 && parseInt(questionid) !== 30) && (
                <Divider textAlign="center">comment (optional)</Divider>
                )}
  
                <div style={{ marginTop: "20px"}}>
                {navigationSource === "Edit"
                ?
                <TextField
                  multiline
                  fullWidth
                  id="comment"
                  defaultValue={data.comment || ''}
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    const newComment = e.target.value.trim();
                    setInputComment(newComment);
                    if (newComment !== comment) {
                      setComment(newComment); // Update comment on change
                    }
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      setIsDataUpdated(true);
                    }, 10); // Set isDataUpdated with a delay on blur
                  }}
                />
                :
                <TextField multiline fullWidth disabled  id="comment" value={data.comment || ''} // Provide a default value if data.comment is empty
                  onChange={(e) => {
                  const newValue = e.target.value;// Handle change in comment explicitly if needed
                }}/>
                }
              </div>
              </div>
            ))}
          </div>
        )}
        </div>
        <div style={{ marginTop: "20px" }}>
          <LinearProgress variant="determinate" value={(parseInt(questionid) / 31) * 100} />
        </div>
  
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
          {parseInt(questionid) > 1 ? (
            <Button style={{ width: "450px" }} onClick={() => {goToPreviousQuestion(); setComment(inputComment);}}><ArrowBackIosIcon /></Button>
          ) : (
            <div style={{ width: "450px" }}></div> // This width should match the button width to maintain the spacing
          )}
  
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "24px", margin: 0 }}>Question {parseInt(questionid)} / 31</p>
          </div>
  
          {parseInt(questionid) < 31 ? (
            <Button style={{ width: "450px" }} onClick={() => {goToNextQuestion(); setComment(inputComment);}}><ArrowForwardIosIcon /></Button>
          ) : (
            <div style={{ width: "450px" }}></div> // This width should match the button width to maintain the spacing
          )}
        </div>
      </div>
    );
  };
  export default Question;