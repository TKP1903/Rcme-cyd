import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/authcomponents/Login";
import Upload from "./components/ImageUpload.js/Upload";
import ImageUpload from "./components/ImageUpload.js/ImageUpload";
import { ProtectedRoute } from "./protected.route";
import AdminRcme from "./components/AdminCom/AdminRcme";
import AdminStudent from "./components/AdminCom/AdminStudent";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/" exact component={Signup} />
          <Route path="/upload" exact component={Upload} />
          <Route path="/upload/:id" exact component={ImageUpload} />
          <ProtectedRoute exact path="/dashboard/rcme" component={AdminRcme} />
          <ProtectedRoute exact path="/dashboard/student" component={AdminStudent} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
