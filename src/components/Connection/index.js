import {Grid, Button} from "@mui/material";
import axios from 'axios';
const url = 'http://localhost:8081/';

const Connection = ({
  connected,
  setConnected,
}) => {
  const connectOnClick = () => {
    axios.post(`${url}connection`,{connect: !connected})
      .then(res => {
        if (res?.data) {
          setConnected(res?.data?.connectionStatus);
        }
      });
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
        <span>连接状态: {connected ? '已连接' : '未连接'}</span>
        <Button
          variant="outlined"
          onClick={connectOnClick}
          style={{marginLeft: '10px'}}
          sx={{borderColor: '#d2194a', color: '#d2194a', ":hover": {borderColor: '#d2194a'}}}
        >{connected ? '断开' : '连接'}</Button>
      </Grid>
      <Grid item xs={12}>
        
      </Grid>
    </Grid>
  );
}

export default Connection;