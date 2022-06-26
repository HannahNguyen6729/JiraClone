import { Switch, Route, useHistory } from "react-router-dom";

import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import UserLogin from "./pages/UserLogin/UserLogin";
import HomeTemplate from "./templates/HomeTemplate";
import UserLoginTemplate from "./templates/UserLoginTemplate";
import JiraTemplate from "./templates/JiraTemplate";
import JiraBoard from "./pages/Jira/JiraBoard";
import JiraProject from "./pages/Jira/JiraProject";
import JiraManagement from "./pages/Jira/JiraManagement";
import JiraDrawerHOC from "./HOC/JiraDrawerHOC";

function App() {
  return (
    <>
      <JiraDrawerHOC />
      <Switch>
        <HomeTemplate exact path="/home" Comp={Home} />
        <HomeTemplate exact path="/about" Comp={About} />
        <HomeTemplate exact path="/contact" Comp={Contact} />
        <UserLoginTemplate exact path="/login" Comp={UserLogin} />
        <JiraTemplate exact path="/jiraboard" Comp={JiraBoard} />
        <JiraTemplate exact path="/jiraproject" Comp={JiraProject} />
        <JiraTemplate exact path="/jiramanagement" Comp={JiraManagement} />
        <JiraTemplate exact path="/jiraProjectDetail/:projectId" Comp={JiraBoard} />
        <JiraTemplate exact path="/" Comp={JiraManagement} />
        <HomeTemplate exact path="*" Comp={PageNotFound} />
      </Switch>
    </>
  );
}

export default App;
