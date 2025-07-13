import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './ChatbotModal.css';

const ChatbotModal = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: '👋 Want to chat about resume matching or job description parsing?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
    {
      type: 'bot',
      text: 'Can you tell me exactly what you’re looking for?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (text) => {
    if (!text.trim() || loading) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { type: 'user', text, timestamp: time };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(
        process.env.REACT_APP_OPENAI_API_URL || 'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            ...messages.map((msg) => ({
              role: msg.type === 'user' ? 'user' : 'assistant',
              content: msg.text,
            })),
            { role: 'user', content: text },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );

      const botReply = response.data.choices[0].message.content;
      const botMsg = {
        type: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const errorMsg = {
        type: 'bot',
        text: 'Oops! Something went wrong. Please try again later.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
      console.error('OpenAI error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-modal">
      <div className="chatbot-header">
        <div>
          <div className="chatbot-title">Hello there.</div>
          <div className="chatbot-subtitle">How can we help?</div>
        </div>
        <button className="close-btn" onClick={onClose}><FaTimes /></button>
      </div>

      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message-row ${msg.type}`}>
            {msg.type === 'bot' && (
              <img
                className="chat-avatar"
                src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
                alt="bot"
              />
            )}
            <div className={`chat-bubble ${msg.type}`}>
              <div className="bubble-text">{msg.text}</div>
              <div className="timestamp">{msg.timestamp}</div>
            </div>
            {msg.type === 'user' && (
              <img
                className="chat-avatar"
                src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
                alt="user"
              />
            )}
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Type your message here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
          disabled={loading}
        />
        <button onClick={() => handleSend(input)} disabled={loading}>➤</button>
      </div>
    </div>
  );
};

export default ChatbotModal;
