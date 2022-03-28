import * as React from 'react'; 
import { useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeText, addMsg, ChangeTextAction, AddMsgAction } from '../actions';
import { Message } from '../reducers';
import { RootState, AppDispatch } from '../index';

interface SendMsgParam {
  value: string,
  handleSubmit: () => void,
  handleChange: (v: string) => void
}

interface MessagesParam {
  msg: Message
}

interface State {
  text: string;
  msgList: Message[];
}

function SendMsg({ value, handleSubmit, handleChange }: SendMsgParam): JSX.Element {

  return (
    <div className='input'>
      <form onSubmit={e => {e.preventDefault();handleSubmit();}} action='chat'>
        <input name='question' type='text' className='input-box' value={value} placeholder='send a message...' onChange={e => handleChange(e.target.value)} />
      </form>
      <button className='button' onClick={() => handleSubmit()}>send</button>
    </div>
  );
}

function Messages({ msg }: MessagesParam): JSX.Element {
  return (
    <div className={msg.sender === 1 ? 'chat-other' : 'chat-me'}>
      {msg.content}
    </div>
  );
}

function App(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const onChangeText: ((text: string) => ChangeTextAction) = text => dispatch(changeText(text));
  const onAddMsg: ((sender: number) => AddMsgAction) = sender => dispatch(addMsg(sender));

  const firstRender: (() => void) = async() => {
    const response = await axios.get('http://localhost:5000');
    onChangeText(response.data.message);
    onAddMsg(1);
  }

  useEffect(() => {
    firstRender();
  }, []);

  const { text, msgList }: State = useSelector((state: RootState) => ({
    text: state.text,
    msgList: state.list
  }));

  const sendMsg = async() => {
    onAddMsg(0);
    const response = await axios.get('http://localhost:5000/?msg='+text);
    console.log(response.data.message);
    onChangeText(response.data.message);
    onAddMsg(1);
  }

  return (
    <div className='app'>
      <div className='chat' id='chat-box'>
        {msgList.map((msg: Message, index: number) => (
          <Messages key={index} msg={msg} />
        ))}
      </div>
      <SendMsg value={text} handleChange={onChangeText} handleSubmit={sendMsg} />
    </div>
  );
}

export default App;