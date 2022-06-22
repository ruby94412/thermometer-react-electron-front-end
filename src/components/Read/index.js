import {useState, forwardRef, useImperativeHandle} from 'react';
import axios from 'axios';
import {Button} from '@mui/material';
import CssTextField from '../CssTextField';

const url = 'http://localhost:8081/';
const DisplayPanel = forwardRef(({
  reading,
  setReading,
  cutoff,
  setCutoff,
  setCurrentReadingData,
}, ref) => {
  const [temperture, setTemperture] = useState(0);
  const handleReadingChange = () => {
    setReading(!reading);
  };

  const getTemperture = () => {
    axios.get(`${url}temperture`).then(res => {
      if(res?.data?.data?.length) {
        setTemperture(res.data.data[0] / 10);
        const hexArr = res?.data?.buffer?.data;
        const temp = new Date().toLocaleString() + '--' + hexArr.join();
        setCurrentReadingData(temp);
      }
    });
  };

  useImperativeHandle(ref, () => ({
    getTemperture,
  }))

  const intervalChange = e => {
    setCutoff(Number(e.target.value) * 1000);
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center', paddingBottom: '20px'}}>
      <span>仪表温度: {temperture} °C</span>
      <CssTextField
        label="发送间隔"
        style={{marginLeft: '10px', marginRight: '10px', width: '100px'}}
        size="small"
        type="number"
        defaultValue={cutoff / 1000}
        InputProps={{
          inputProps: { 
            max: 10, min: 1,
          }
        }}
        onChange={intervalChange}
      />
      <Button
        onClick={handleReadingChange}
        variant="outlined"
        sx={{borderColor: '#d2194a', color: '#d2194a', ":hover": {borderColor: '#d2194a'}}}
      >{reading ? '结束读取' : '开始读取'}</Button>
    </div>
  );
})

export default DisplayPanel;