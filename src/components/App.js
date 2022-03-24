import React, { useEffect } from 'react';
import logo from './logo.svg';
// import axios from 'axios';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeText, addMsg } from '../actions';

function SendMsg({ value, handleSubmit, handleChange }) {

  return (
    <div className='input'>
      <form onSubmit={e => {e.preventDefault();handleSubmit(1);}} action='chat'>
        <input name='question' type='text' className='input-box' value={value} placeholder='send a message...' onChange={e => handleChange(e.target.value)} />
      </form>
      <button className='button' onClick={() => handleSubmit(0)}>send</button>
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

  const { text, msgList } = useSelector(state => ({
    text: state.text,
    msgList: state.list
  }));

  return (
    <div className='app'>
      <div className='chat' id='chat-box'>
        {msgList.map((msg, index) => (
          <Messages key={index} index={index} msg={msg} />
        ))}
      </div>
      <SendMsg value={text} handleChange={onChangeText} handleSubmit={onAddMsg} />
    </div>
  );
}

export default App;