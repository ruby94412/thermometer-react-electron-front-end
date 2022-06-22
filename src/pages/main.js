import {useState, useEffect, useRef} from 'react';
import Connection from '../components/Connection';
import Read from '../components/Read';
import Write from '../components/Write';
import DataLog from '../components/DataLog';
const Main = () => {
  const [connected, setConnected] = useState(false);
  const [reading, setReading] = useState(false);
  const [readingObj, setReadingObj] = useState(null);
  const [cutoff, setCutoff] = useState(1000);
  const [currentReadingData, setCurrentReadingData] = useState('');
  const readRef = useRef();
  useEffect(() => {
    if (!connected && readingObj) {
      setReadingObj(null);
      clearInterval(readingObj);
    }
  }, [connected]);

  useEffect(() => {
    if (reading) {
      const temp = setInterval(readRef?.current?.getTemperture, cutoff);
      setReadingObj(temp);
    } else {
      clearInterval(readingObj);
      setReadingObj(null);
    }
  }, [reading]);

  return (
    <div>
        <Connection
          connected={connected}
          setConnected={setConnected}
        />
        {
          connected
            && <>
              <Read
                ref={readRef}
                setCutoff={setCutoff}
                cutoff={cutoff}
                setReading={setReading}
                reading={reading}
                setCurrentReadingData={setCurrentReadingData}
              />
              <Write />
              <DataLog
                currentReadingData={currentReadingData}
              />
            </>
        }
    </div>
  );
};

export default Main;