import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeText, addMsg } from '../actions';

function SendMsg({ value, handleSubmit, handleChange }) {

  return (
    <div className='input'>
      <form onSubmit={e => {e.preventDefault();handleSubmit();}} action='chat'>
        <input name='question' type='text' className='input-box' value={value} placeholder='send a message...' onChange={e => handleChange(e.target.value)} />
      </form>
      <button className='button' onClick={() => handleSubmit()}>send</button>
    </div>
  );
}

function Messages({ msg }){
  return (
    <div className={msg.sender === 1 ? 'chat-other' : 'chat-me'}>
      {msg.content}
    </div>
  );
}

function App() {
  const dispatch = useDispatch();
  const onChangeText = text => dispatch(changeText(text));
  const onAddMsg = sender => dispatch(addMsg(sender));

  const firstRender = async() => {
    const response = await axios.get('http://localhost:5000');
    onChangeText(response.data.message);
    onAddMsg(1);
  }

  useEffect(() => {
    firstRender();
  }, []);

  const { text, msgList } = useSelector(state => ({
    text: state.text,
    msgList: state.list
  }));

  const sendMsg = async() => {
    const response = await axios.get('http://localhost:5000/?msg='+text);
    console.log(response.data.message);
    onAddMsg(0);
    onChangeText(response.data.message);
    onAddMsg(1);
  }

  return (
    <div className='app'>
      <div className='chat' id='chat-box'>
        {msgList.map((msg, index) => (
          <Messages key={index} index={index} msg={msg} />
        ))}
      </div>
      <SendMsg value={text} handleChange={onChangeText} handleSubmit={sendMsg} />
    </div>
  );
}

export default App;