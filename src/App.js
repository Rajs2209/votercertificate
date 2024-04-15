import Home from "./Component/Home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Certificates from "./Certificate/Certificates";
function App() {
  return (
    <Router >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/certificate/:name/:option/:UniqueId" element={<Certificates />} />
      </Routes>
    </Router>
  );
}

export default App;
