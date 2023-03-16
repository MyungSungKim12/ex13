import React, { useContext, useEffect } from 'react'
import back from '../images/back.jpg'
import Navbar from 'react-bootstrap/Navbar';
import { Link, withRouter } from 'react-router-dom';
import { UserContext } from './UserContext';
import { Button, Container, Nav } from 'react-bootstrap';
import { app } from '../firebaseInit'
import {getDoc, doc, getFirestore} from 'firebase/firestore'
import { async } from '@firebase/util';
import { ColorContext } from './ColorContext';



const HeaderPage = ({ history }) => {
  const db = getFirestore(app);
  const email = sessionStorage.getItem("email");
  const { user, setUser } = useContext(UserContext);
  const {color, setColor} = useContext(ColorContext);

  const onLogout = () => {
    sessionStorage.removeItem('email');
    setUser(null);
    history.push('/')
  }

  const getUser = async() => {
    const result = await getDoc(doc(db, 'users', email))
    
    setUser(result.data());
  }

  useEffect(()=> {
    getUser();
    
  },[email]);

  return (
    <div>
      <img src={back} style={{ width: '100%' }} />
      <Navbar bg={color} variant="dark" className='header'>
        <Container>
          <Nav style={{display:'flex', alignItems:'center'}}>
            <Navbar.Brand href="/homee" exact='true'>😎</Navbar.Brand>
            <Link to="/"><i class="bi bi-house-door-fill"></i></Link>
            <Link to="/users"><i class="bi bi-person-lines-fill"></i></Link>
            {user && <Link to="/chats"><i class="bi bi-chat-dots-fill"></i></Link>}
            {email ?
              <Link to="/logout" onClick={onLogout}>로그아웃</Link> :
              <Link to="/login"><i class="bi bi-door-open-fill"></i></Link>
            }
          </Nav>
          <div>
            {(user && user.photo) &&
              <img src={user.photo} style={{ width: '50px', borderRadius: '50%' }} />}
            {(user && user.name) &&
              <Link to="mypage">{user.name}님</Link>
            }
            {/* <Button onClick={()=>setColor('dark')} variant="danger" >dark</Button>&nbsp;
            <Button onClick={()=>setColor('primary')} variant="danger">primary</Button> */}
          </div>
        </Container>
      </Navbar>
    </div>
  )
}

export default withRouter(HeaderPage)