import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationPage from "./Pages/RegistrationPage";
import ListUsersPage from "./Pages/ListUsersPage";
import EditUserPage from "./Pages/EditUserPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<RegistrationPage/>}/>
          <Route path="/users" element={<ListUsersPage/>}/>
          <Route path="/edit-user" element={<EditUserPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
