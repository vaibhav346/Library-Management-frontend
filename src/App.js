import React from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from './Components/Home';
import StudentRegister from './Components/StudentRegister';
import StudentLogin from './Components/StudentLogin';
import StudentProfile from './Components/StudentProfile';
import RegisterSucess from './Components/RegisterSucess';
import AdminRegister from './Components/AdminRegister';
import AdminLogin from './Components/AdminLogin';
import AdminProfile from './Components/AdminProfile';
import BookPage from './Components/BookPage';
import AboutPage from './Components/AboutPage';
import ContactPage from './Components/ContactPage';
import BookAddedSuccess from './Components/BookAddedSuccess';
import UpdateBookPage from './Components/UpdateBooPage';
import UpdateSuccessPage from './Components/UpdateSuccessPage';
import AddBook from './Components/AddBook';

const App = () => {
  return(
   <Router>
   <div className='App'>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/studentregister/:adminId" element={<StudentRegister/>}/>
      <Route path="/studentlogin" element={<StudentLogin/>}/>
      <Route path="/student-profile" element={<StudentProfile />} />
      <Route path="/registration-success" element={<RegisterSucess/>} />
      <Route path='/AdminRegister' element={<AdminRegister/>}/>
      <Route path='/AdminLogin' element={<AdminLogin/>}/>
      <Route path='/AdminProfile' element={<AdminProfile/>}/>
      <Route path='/BookPage' element={<BookPage/>}/>
      <Route path='/AboutPage' element={<AboutPage/>}/>
      <Route path='/ContactPage' element={<ContactPage/>}/>
      <Route path='/BookAddedSuccess' element={<BookAddedSuccess/>}/>
      <Route path='/UpdateBookPage' element={<UpdateBookPage/>}/>
      <Route path='/UpdateSuccessPage' element={<UpdateSuccessPage/>}/>
      <Route path='/AddBook/:adminId' element={<AddBook></AddBook>}></Route>
    </Routes>
   </div>
   </Router>
  )
}

export default App
