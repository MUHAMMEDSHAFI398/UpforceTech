import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationPage from "./Pages/RegistrationPage";
import ListUsersPage from "./Pages/ListUsersPage";
import EditUserPage from "./Pages/EditUserPage";
import ViewDetailPage from "./Pages/ViewDetailPage";
import ErrorPage from "./Components/ErrorPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ListUsersPage/>}/>
          <Route path="/add-user" element={<RegistrationPage/>}/>
          <Route path="/edit-user" element={<EditUserPage/>}/>
          <Route path="/view-details" element={<ViewDetailPage/>}/>
          <Route path="/error" element={<ErrorPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
