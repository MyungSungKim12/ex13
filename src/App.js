import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import ChatPage from './components/ChatPage';
import HeaderPage from './components/HeaderPage';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import UsersPage from './components/UsersPage';
import { UserContext } from './components/UserContext';
import { useState } from 'react';
import { ColorContext } from './components/ColorContext';
import FooterPage from './components/FooterPage';



function App() {
  const [color, setColor] = useState('primary');
  const [user, setUser] = useState('');
  return (
    <ColorContext.Provider value={{ color, setColor }}>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App">
          <HeaderPage />
          <Switch>
            <Route path='/' component={HomePage} exact={true}></Route>
            <Route path='/users' component={UsersPage} ></Route>
            <Route path='/chats' component={ChatPage} ></Route>
            <Route path='/login' component={LoginPage} ></Route>
          </Switch>
          <FooterPage/>
        </div>
      </UserContext.Provider>
    </ColorContext.Provider>
  );
}

export default App;
