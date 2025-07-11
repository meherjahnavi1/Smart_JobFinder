import axios from 'axios';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

export const sendMessageToOpenAI = async (userMessage) => {
  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  };

  const body = {
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a helpful resume assistant chatbot.' },
      { role: 'user', content: userMessage }
    ]
  };

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', body, { headers });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    return 'Sorry, something went wrong while connecting to OpenAI.';
  }
};
