import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { Routes, Route } from "react-router-dom";
import Splash from "./Splash";
import Signup from "./users/Signup";
import Signin from "./users/Signin";
import Profile from "./users/Profile";
import Activetest from "./users/Activetest";
import ASignup from "./admin/Signup";
import ASignin from "./admin/Signin";
import AProfile from "./admin/Profile";
import AActivetest from "./admin/Activetest";
import Test from "./exam/Test";
import AInTest from "./users/InTest";
import InTest from "./admin/InTest";
import Result from "./users/Result"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Splash />} />
        <Route exact path="/Splash" element={<Splash />} />
        <Route exact path="/student/signin" element={<Signin />} />
        <Route exact path="/student/signup" element={<Signup />} />
        <Route exact path="/student/profile" element={<Profile />} />
        <Route exact path="/student/activetest" element={<Activetest />} />
        <Route exact path="/student/intest" element={<AInTest />} />
        <Route exact path="/student/result" element={<Result />} />
        <Route exact path="/admin/signin" element={<ASignin />} />
        <Route exact path="/admin/signup" element={<ASignup />} />
        <Route exact path="/admin/activetest" element={<AActivetest />} />
        <Route exact path="/admin/profile" element={<AProfile />} />
        <Route exact path="/admin/intest" element={<InTest />} />
        <Route exact path="/exam/test" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
