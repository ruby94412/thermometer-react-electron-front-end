import {useState, useEffect} from 'react';
import axios from 'axios';
import {Button} from '@mui/material';
import CssTextField from '../CssTextField';

const url = 'http://localhost:8081/';
const DisplayPanel = () => {
  const [svData, setSVData] = useState(0);
  const [local, setLocal] = useState(0);
  useEffect(() => {
    getSVData();
  }, [])
  const getSVData = () => {
    axios.get(`${url}temperture`).then(res => {
      if(res?.data?.data?.length) {
        setSVData(res.data.data[3] / 10);
      }
    });
  }
  const handleSVLocalInputChange = e => {
    setLocal(e.target.value);
  }
  const sendSVData = () => {
    axios.post(`${url}setSVData`, {svData: local}).then(res => {
      console.log(res);
      setTimeout(getSVData, 200);
    });
  }
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <span>SV值: {svData} </span>
      <CssTextField
        label="设定SV值"
        style={{marginLeft: '10px', marginRight: '10px', width: '100px'}}
        size="small"
        type="number"
        defaultValue={1}
        InputProps={{
          inputProps: { 
            max: 500, min: 0
          }
        }}
        onChange={handleSVLocalInputChange}
      />
      <Button
        onClick={sendSVData}
        variant="outlined"
        sx={{borderColor: '#d2194a', color: '#d2194a', ":hover": {borderColor: '#d2194a'}}}
      >发送</Button>
    </div>
  );
}

export default DisplayPanel;