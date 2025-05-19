import { useState } from 'react';
import { Box, Button, MenuItem, Select, TextField, Typography, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setCurrentRequest, addToHistory } from '../features/requests/requestSlice';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const MainPage = () => {
  const dispatch = useDispatch();
  const [method, setMethod] = useState<'GET' | 'POST'>('GET');
  const [url, setUrl] = useState('');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSendRequest = async () => {
    setLoading(true);
    dispatch(setCurrentRequest({ method, url }));

    try {
      let result;
      if (method === 'GET') {
        result = await axios.get(url);
      } else {
        console.log('ooga', body);
        const parsedBody = body ? JSON.parse(body) : {};
        console.log('boga');
        result = await axios.post(url, parsedBody);
      }

      console.log('ooga');
      console.log(result);
      setResponse(result.data);
      dispatch(
        addToHistory({
          id: uuidv4(),
          method,
          url,
          status: result.status,
          response: result.data,
          timestamp: new Date().toISOString(),
        })
      );
    } catch (error: any) {
      setResponse(error.response ? error.response.data : error.message);
    }

    setLoading(false);
  };

  return (
    <Box p={4} display="flex" flexDirection="column" gap={3}>
      <Typography variant="h4">getman</Typography>

      <Box display="flex" gap={2}>
        <Select value={method} onChange={(e) => setMethod(e.target.value as 'GET' | 'POST')}>
          <MenuItem value="GET">GET</MenuItem>
          <MenuItem value="POST">POST</MenuItem>
        </Select>
        <TextField
          fullWidth
          label="Request URL"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button variant="contained" onClick={handleSendRequest} disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </Button>
      </Box>

      {method === 'POST' && (
        <TextField
          label="Request Body (JSON)"
          multiline
          fullWidth
          rows={6}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          variant="outlined"
        />
      )}

      <Paper variant="outlined" sx={{ p: 2, mt: 2, backgroundColor: '#1e1e1e', color: '#fff' }}>
        <Typography variant="h6">Response</Typography>
        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          {response ? JSON.stringify(response, null, 2) : 'No response yet'}
        </pre>
      </Paper>
    </Box>
  );
};

export default MainPage;
