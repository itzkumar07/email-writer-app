import { useState } from 'react';
import './App.css';
import {
  Container, FormControl, InputLabel, TextField, Typography,
  Box, Select, MenuItem, Button, CircularProgress, Paper
} from '@mui/material';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setGeneratedReply('');
    setError('');

    if (!emailContent.trim()) {
      setError("Please enter email content.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:7801/api/email/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emailContent: emailContent,
          tone: tone || "Neutral"
        })
      });

      const data = await response.text();
      setGeneratedReply(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h4" align="center" gutterBottom fontWeight={600}>
          Email Reply Generator
        </Typography>

        <Box sx={{ mt: 3 }}>
          <TextField
            fullWidth multiline rows={6} variant="outlined"
            label="Original Email Content"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            sx={{ mb: 3 }}
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Tone (Optional)</InputLabel>
            <Select
              value={tone}
              label="Tone (Optional)"
              onChange={(e) => setTone(e.target.value)}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="Formal">Formal</MenuItem>
              <MenuItem value="Informal">Informal</MenuItem>
              <MenuItem value="Friendly">Friendly</MenuItem>
              <MenuItem value="Professional">Professional</MenuItem>
              <MenuItem value="Apologetic">Apologetic</MenuItem>
            </Select>
          </FormControl>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleGenerate}
            disabled={loading}
            sx={{
              mb: 2,
              py: 1.2,
              fontWeight: 600,
              fontSize: '1rem',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#1976d2',
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Reply'}
          </Button>

          {error && (
            <Typography color="error" sx={{ mt: 1, textAlign: 'center' }}>
              {error}
            </Typography>
          )}

          {generatedReply && (
            <TextField
              fullWidth multiline rows={14} variant="outlined"
              label="Generated Reply"
              value={generatedReply}
              InputProps={{ readOnly: true }}
              sx={{
                mt: 3,
                backgroundColor: '#f9f9f9',
                borderRadius: 2,
                fontSize: '1.1rem',
                '& .MuiInputBase-root': {
                  fontSize: '1.05rem',
                  lineHeight: 1.6,
                  padding: '20px',
                }
              }}
            />
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default App;
