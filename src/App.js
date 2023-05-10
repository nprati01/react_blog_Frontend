
import Header from './components/Header';
import Main from './components/Main';
import Nav from './components/Nav';
import Profile from './components/Profile';
import LoginButton from './components/Login';
import LogoutButton from './components/Logout';
import './App.css';

function App() {
  return (
    <div className="App">

    <Header />
    <Nav />
    <Main />
    <LoginButton />
    <LogoutButton />
    <Profile />



    </div>
  );
}

export default App;
