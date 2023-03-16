import React, { useContext, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { app } from '../firebaseInit'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { UserContext } from './UserContext'
import { getDoc, doc, getFirestore } from 'firebase/firestore'
import { async } from '@firebase/util'
import LoadingPage from './LoadingPage'

const LoginPage = ({ history }) => {
  const db = getFirestore(app);
  const { user, setUser } = useContext(UserContext)
  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);
  const onLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((success) => {
        // getUser();
        // setLoading(false);
        // alert('로그인 성공');
        sessionStorage.setItem('email', email);
        history.push('/');
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message)
      })
  }
  const [form, setForm] = useState({
    email: 'user01@email.com',
    password: '12341234',
  })
  const getUser = async () => {
    const result = await getDoc(doc(db, 'users', email))
    console.log('login......', result.data())
    setUser(result.data());
  }
  const { email, password } = form;
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  if (loading) return <LoadingPage/>
  return (
    <div >
      <Row className='justfy-content-center my-4 px-5'>
        <Col l={5} md={5}>
          <Card>
            <Card.Title><h3>Login</h3></Card.Title>
            <Card.Body>
              <Form className='text-center' onSubmit={onLogin}>
                <Form.Control placeholder='아이디' className='my-2' value={email} onChange={onChange} name='email' />
                <Form.Control placeholder='비밀번호' className='my-2' value={password} onChange={onChange} name='password' type='password' />
                <Button type="submit" className='px-5'>로그인</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default LoginPage