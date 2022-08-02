import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import StudentList from "./Components/StudentList";
import BookList from "./Components/BookList";
import StudentDetailsPage from "./Components/StudentDetailsPage";
import BookDetailsPage from "./Components/BookDetailsPage";
import axios from "axios";
import HomePage from "./Components/HomePage";

function App() {
  const [studentList, setStudentList] = useState([]);
  const [bookList, setBookList] = useState([]);
  const [studentsUpdated, setStudentsUpdated] = useState(false);
  const [booksUpdated, setBooksUpdated] = useState(false);

  // UseEffect for Getting Students Data
  useEffect(() => {
    axios
      .get("/getStudents")
      .then((res) => {
        setStudentList(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [studentsUpdated]);

  // UseEffect for Getting Books Data
  useEffect(() => {
    axios
      .get("/getBooks")
      .then((res) => {
        setBookList(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [booksUpdated]);

  const onUpdateHandler = (param) => {
    switch (param) {
      case "books":
        setBooksUpdated(!booksUpdated);
        break;
      case "students":
        setStudentsUpdated(!studentsUpdated);
        break;
      default:
        break;
    }
  };
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route
            exact
            path="/addStudent"
            element={
              <StudentDetailsPage
                onUpdateHandler={onUpdateHandler}
                addStatus={true}
              />
            }
          ></Route>
          <Route
            exact
            path="/studentDetails/:student_id"
            element={
              <StudentDetailsPage
                onUpdateHandler={onUpdateHandler}
                addStatus={false}
              />
            }
          ></Route>
          <Route
            exact
            path="/addBook"
            element={
              <BookDetailsPage
                studentList={studentList}
                onUpdateHandler={onUpdateHandler}
                addStatus={true}
              />
            }
          ></Route>
          <Route
            exact
            path="/bookDetails/:book_id"
            element={
              <BookDetailsPage
                studentList={studentList}
                onUpdateHandler={onUpdateHandler}
                addStatus={false}
              />
            }
          ></Route>
          <Route
            exact
            path="/students"
            element={<StudentList studentList={studentList} />}
          ></Route>
          <Route
            exact
            path="/books"
            element={<BookList bookList={bookList} studentList={studentList} />}
          ></Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
