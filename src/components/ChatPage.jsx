import React, { useContext, useEffect, useRef, useState } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import './Chats.css'
import { UserContext } from './UserContext';
import { app } from '../firebaseInit';
import { getDatabase, ref, set, push, onValue, remove } from 'firebase/database'
import moment from 'moment'
import { async } from '@firebase/util';



const ChatPage = () => {
  
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref_bottom = useRef(null);
  const db = getDatabase(app);
  const [text, setText] = useState('');
  const { user } = useContext(UserContext);

  const getMessage = () => {
    setLoading(true);
    onValue(ref(db, 'chats'), (result) => {
      let rows = [];
      result.forEach(row => {
        rows.push(row.val())
      })
      console.log(rows);
      setMessages(rows);
      setLoading(false);
    })
  }

  useEffect(() => {
    getMessage();
  }, [])

  const onSend = async (e) => {
    e.preventDefault();
    if (text === "") {
      alert('내용을 입력하세요.')
      return;
    }
    //메세지 전송
    const key = push(ref(db, 'chats')).key;
    const message = {
      key: key, email: user.email, name: user.name, photo: user.photo,
      text: text, date: moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
    }
    await set(ref(db, `chats/${key}`), message);
    setText('');
    ref_bottom.current.scrollIntoView({ behavior: 'smooth' }); //스크롤 스무스
  }

  const onDelete = (e) => {
    e.preventDefault();
    const key = e.target.getAttribute('href');
    if(!window.confirm(`${key}번 데이터를 삭제하실래요?`)) return;
    remove(ref(db, `chats/${key}`));
  }

  return (
    <Row className='justify-content-cneter m-3 p-3'>
      <Col xl={8}>
        <Card>
          <Card.Title className='p-3'>
            <h4>대화방</h4>
          </Card.Title>
          <Card.Body>
            <div className='wrap'>
              {messages.map(msg =>
                <div key={msg.key} className={user.email === msg.email ? 'chat ch2' : 'chat ch1'}>
                  {msg.email !== user.email &&
                    <div className='icon'>
                      <img src={msg.photo} />
                      <div className='sender'>
                        {msg.name}
                      </div>
                    </div>
                  }
                  <div className='textbox'>
                    {msg.text}
                    {msg.email === user.email &&
                      <a href={msg.key} onClick={onDelete} className="delete">x</a>
                    }
                    <br />
                    {msg.date}
                  </div>
                </div>
              )}
              <div ref={ref_bottom} />
            </div>
            <Form onSubmit={onSend}>
              <Form.Control value={text} onChange={(e) => setText(e.target.value)}
                placeholder='내용을 입력하세요...' />
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default ChatPage