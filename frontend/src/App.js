import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationPage from "./Pages/RegistrationPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<RegistrationPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
