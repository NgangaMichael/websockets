import './App.css';
import io from 'socket.io-client';
import {useEffect, useState} from 'react';
const socket = io.connect('http://localhost:3001');

function App() {
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');
  
  const sendmessage = () => {
    socket.emit('send_message', {message})
  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageReceived(data.message)
    })
  }, [socket])

  return (
    <div className="App">
      <input 
      placeholder='mesage...'
      onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendmessage}>Send message</button>

      <h5>Message</h5>
      {messageReceived}
    </div>
  );
}

export default App;