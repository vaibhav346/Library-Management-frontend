import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import StudentRegister from "./Components/StudentRegister";
import StudentLogin from "./Components/StudentLogin";
import StudentProfile from "./Components/StudentProfile";
import RegisterSucess from "./Components/RegisterSucess";
import AdminRegister from "./Components/AdminRegister";
import AdminLogin from "./Components/AdminLogin";
import AdminProfile from "./Components/AdminProfile";
import BookPage from "./Components/BookPage";
import AboutPage from "./Components/AboutPage";
import ContactPage from "./Components/ContactPage";
import BookAddedSuccess from "./Components/BookAddedSuccess";
import UpdateBookPage from "./Components/UpdateBooPage";
import UpdateSuccessPage from "./Components/UpdateSuccessPage";
import AddBook from "./Components/AddBook";
import UpdateStudent from "./Components/UpdateStudent";
import UpdateAvailable from "./Components/UpdateAvailable";
import StudentAddBook from "./Components/StudentAddBook";

export default function App() {
  return (
    // <Router>
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/studentregister/:adminId" element={<StudentRegister />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/registration-success" element={<RegisterSucess />} />
        <Route path="/AdminRegister" element={<AdminRegister />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/AdminProfile" element={<AdminProfile />} />
        <Route path="/BookPage" element={<BookPage />} />
        <Route path="/AboutPage" element={<AboutPage />} />
        <Route path="/ContactPage" element={<ContactPage />} />
        <Route path="/BookAddedSuccess" element={<BookAddedSuccess />} />
        <Route path="/UpdateBookPage/:bookId" element={<UpdateBookPage />} />
        <Route path="/UpdateSuccessPage" element={<UpdateSuccessPage />} />
        <Route path="/AddBook/:adminId" element={<AddBook></AddBook>}></Route>
        <Route
          path="/udpatestudent/:sid"
          element={<UpdateStudent></UpdateStudent>}
        ></Route>

        <Route
          path="/updateavailable/:bookId"
          element={<UpdateAvailable></UpdateAvailable>}
        ></Route>
        <Route
          path="/studentaddbook/:sid"
          element={<StudentAddBook></StudentAddBook>}
        ></Route>
      </Routes>
    </div>
    // </Router>
  );
}
