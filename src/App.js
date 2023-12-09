import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Component/Register';
import Login from './Component/Login';
import Home from './Component/Home';
import NewPost from './Component/NewPost';
import Header from './Component/Header';
import Protected from './Component/Protected';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionType } from './Reduc/ActionType';
import { setLogout } from './Reduc/ActionCreator';
import axios from 'axios';
import ImageTRYPage from './Component/imagetry';

function App() {

  const logindata = useSelector((state) => state?.Login?.email)
  const [auth, setAuth] = useState(Boolean(logindata))
  const dispatch = useDispatch()

  useEffect(() => {

    axios.defaults.baseURL = process.env.REACT_APP_API_LOCAL;

    let time1 = localStorage.getItem('token');
    const time = JSON.parse(time1);

    if (time === null) {
      // dispatch(setLogout());
      // console.log("jkjkj");
    }
    else if (time.expiresIn < Date.now()) {
      localStorage.removeItem('token')
      dispatch(setLogout());
      // console.log("heelo")
    }
    else {
      setAuth(true)
      dispatch({
        type: ActionType.SET_LOGIN,
        payload: time
      })
      // console.log("hhhello");
    }
  })

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Protected Component={Home} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/imgg" element={<ImageTRYPage />} />
          {/* <Route path="/comment" element={<CommentPage />} />
          <Route path="/comment" element={<ShowComment />} /> */}
          <Route path="/newpost" element={<Protected Component={NewPost} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
