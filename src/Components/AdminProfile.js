import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AdminProfile.css";
import defaultAdminImg from "./assets/1705830454264 - Copy.jpg";
import defaultBookImg from "./assets/Book.jpeg";
import axios from "axios";

const AdminProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // var app="http://51.20.187.166:8080/Library_Management_Project-0.0.1-SNAPSHOT"
  
  // let [availability,setAvailability]=useState('')

  const [admin, setAdmin] = useState({});
  const [bookList, setBookList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [showStudentBooks, setShowStudentBooks] = useState({}); // To toggle student books

  let [searchname,setSearchname]=useState('')
  console.log(searchname)
  let [searchtitle,setSearchtitle]=useState('')
  let [searchresult,setSearchresult]=useState([])

  let searchbystudent=()=>{

  // axios.get(`${app}/Student/findbyname/${searchname}`)
  axios.get(`http://localhost:8080/Student/findbyname/${searchname}`)
  .then((response)=>{
    if(response.data){
      setSearchresult(response.data)
      console.log(searchresult)
      setSearchname('');
    }
  })
  .catch((error)=>{alert("error")})
}

let searybybook=()=>{
console.log(searchtitle)
  // axios.get(`${app}/Book/findbytitle/${searchtitle}`)
  axios.get(`http://localhost:8080/Book/findbytitle/${searchtitle}`)
  .then((response)=>{
    if(response.data){
      setSearchresult(response.data)
      console.log(searchtitle)
      setSearchtitle('');
    }
  })
  .catch((error)=>{alert("error")})
}

  useEffect(() => {
    getdata();
  }, [location.state]);

  const getdata = () => {
    const adminData = location.state;

    if (adminData?.adminId) {
      axios
        // .get(`${app}/admin/findbyid/${adminData.adminId}`)
        .get(`http://localhost:8080/admin/findbyid/${adminData.adminId}`)
        .then((response) => {
          const data = response.data;
          setAdmin(data);
          setBookList(data.blist || []);
          setStudentList(data.student || []);
        })
        .catch((error) => {
          console.error("Error fetching admin:", error);
        });
    } else {
      console.warn("Admin ID not found in location.state");
    }
  };

  const deletebook = (bookId) => {
    axios
      // .delete(`${app}/Book/detebyid/${bookId}`)
      .delete(`http://localhost:8080/Book/detebyid/${bookId}`)
      .then((response) => {
        if (response.data != null) {
          alert("Book deleted");
          getdata(); // Refresh data
        }
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
        alert("Something went wrong.");
      });
  };

  let bookstatus=(bookId,action)=>{
    console.log(bookId)
    console.log(action)
    // axios.put(`${app}/Book/${action}/${bookId}`)
    axios.put(`http://localhost:8080/Book/${action}/${bookId}`)
    .then((response)=>{
        if(response.data){
          console.log(response.data)
            alert("Status updated sucessfully")
           getdata();
           
        }
    })
    .catch((error)=>{
        console.log("error in updateing leave status")
    })
  }

 

  return (
    <div className="profile-body">
      <div className="profile-container">
        <div className="profile-columns">
          {/* LEFT: Admin Info & Book Management */}
          <div className="left-column">
            <div className="profile-header">
              <img
                src={admin.adminimgurl || defaultAdminImg}
                alt="Admin"
                className="profile-img"
              />
              <div className="profile-info">
                <h2>{admin.adminname}</h2>
                <p>
                  <strong>Username:</strong> {admin.adminusername}
                  <br />
                  <strong>Admin ID:</strong> {admin.adminId}
                  <br />
                  <strong>Contact:</strong> {admin.admincontactno}
                  <br />
                  <strong>Email:</strong> {admin.adminemail}
                </p>
                <button className="btn-a-book">Update</button>
                <button
                  className="btn-a-book"
                  onClick={() => navigate(`/AddBook/${admin.adminId}`)}
                >
                  ➕ Add Book
                </button>
                <button
                  className="btn-a-book"
                  onClick={() => navigate(`/studentregister/${admin.adminId}`)}
                >
                  ➕ Add Student
                </button>
                <button className='btn btn-warning' onClick={()=>{navigate('/')}}>Logout</button>
              </div>
            </div>

            <div className="section">
              <h3 className="section-title">📘 Managed Books</h3>
       <div className="search-container">
  <input
    type="text"
    placeholder="Enter name to search"
    value={searchtitle}
    onChange={(e) => setSearchtitle(e.target.value)}
  />
  <button onClick={searybybook}>Search</button>
</div>
              {bookList.length > 0 ? (
                <div className="book-list">
                  {(searchresult.length>0?searchresult:bookList).map((book) => (
                    <div key={book.bookId} className="book-item">
                      <img
                        src={book.imageUrl || defaultBookImg}
                        alt={book.title}
                        className="book-img"
                      />
                      <div className="book-details">
                        <p className="book-information">
                          <strong>Book Id:</strong> {book.bookId}
                          <br />
                          <strong>Title:</strong> {book.title}
                          <br />
                          <strong>Author:</strong> {book.author}
                          <br />
                          <strong>Genre:</strong> {book.genre}
                          <br />
                          <strong>Available:</strong>{" "}
                          {book.availability}
                        </p>
                      </div>
                      <div className="book-actions">
                        <button
                          className="btn-update"
                          onClick={() =>
                            navigate(`/UpdateBookPage/${book.bookId}`)
                          }
                        >
                          ✏️ Update
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => deletebook(book.bookId)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data">No books managed yet.</p>
              )}
            </div>
          </div>

          {/* RIGHT: Student Info */}
          <div className="right-column">
            <div className="section">
              <h3 className="section-title">🎓 Managed Students</h3>
              <div className="search-container">
      <input className="form-control me-2" type="text" placeholder='Enter name to search' value={searchname} onChange={(e)=>{setSearchname(e.target.value)}} /><button class="btn btn-outline-success" onClick={searchbystudent}>Search</button>
    </div>
              {studentList.length > 0 ? (
                <div className="student-list">
                  {(searchresult.length>0?searchresult:studentList).map((student) => (
                    <div key={student.sid} className="student-item">
                      <img
                        src={student.imgurl || defaultAdminImg}
                        alt="Student"
                        className="book-img"
                      />
                      <div className="student-details">
                        <p>
                          <strong>Student ID:</strong> {student.sid}
                          <br />
                          <strong>Username:</strong> {student.studentusername}
                          <br />
                          <strong>Password:</strong> {student.studentpassword}
                          <br />
                          <strong>Name:</strong> {student.studentname}
                          <br />
                          <strong>Contact:</strong> {student.scontactno}
                          <br />
                          <strong>Email:</strong> {student.semail}
                          <br />
                          <strong>Class:</strong> {student.classname}
                          <br />
                          <strong>Address:</strong> {student.address}
                        </p>
                        <button
                          className="btn-a-book"
                          onClick={() =>
                            navigate(`/udpatestudent/${student.sid}`)
                          }
                        >
                          Update
                        </button>
                        <button
                          className="btn-a-book"
                          onClick={() =>
                            setShowStudentBooks((prev) => ({
                              ...prev,
                              [student.sid]: !prev[student.sid],
                            }))
                          }
                        >
                          {showStudentBooks[student.sid]
                            ? "👁️ Hide Books"
                            : "📚 Show Books"}
                        </button>

                        {/* Student's Borrowed Books */}
                        {showStudentBooks[student.sid] && (
                          <div className="section">
                            <h4 className="sub-section-title">
                              📚 Student Books
                            </h4>
                            {Array.isArray(student.blist) &&
                            student.blist.length > 0 ? (
                              <div className="book-list">
                                {student.blist.map((book) => (
                                  <div key={book.bookId} className="book-item">
                                    <img
                                      src={book.imageUrl || defaultBookImg}
                                      alt={book.title}
                                      className="book-img"
                                    />
                                    <div className="book-details">
                                      <p>
                                        <strong>Id:</strong> {book.bookId}
                                        <br />
                                        <strong>Title:</strong> {book.title}
                                        <br />
                                        <strong>Author:</strong> {book.author}
                                        <br />
                                        <strong>Genre:</strong> {book.genre}
                                        <br />
                                        <strong>Bor Date:</strong>{" "}
                                        {book.borrowDate}
                                        <br />
                                        <strong>Ret Date:</strong>{" "}
                                        {book.returnDate}
                                        <br />
                                        <strong>Status:</strong> {book.status}
                                        <strong>Available:</strong>{" "}
                                        {book.availability } <br></br>
                                       
                                        <button  className="btn-bor"  onClick={() =>
                            navigate(`/updateavailable/${book.bookId}`)
                          }>Update</button>
                                       
                                        <button className="btn-bor" onClick={(e)=>{bookstatus(book.bookId,"borrow")}}>
                                          Borrow Book
                                        </button>
                                        <button className="btn-ret" onClick={(e)=>{bookstatus(book.bookId,"return")}}>
                                          Return Book
                                        </button>
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="no-data">No borrowed books.</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data">No students assigned.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
