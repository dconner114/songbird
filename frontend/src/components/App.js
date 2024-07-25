import React from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HomePage from "./HomePage";
import QuizPage from "./QuizPage";
import ProfilePage from "./ProfilePage";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      error: "",
      isAuthenticated: false,
      selectedTab: 0  // Move selectedTab state into the component's state
    };
  }

  componentDidMount() {
    this.getSession();
  }

  getSession = () => {
    fetch("/api/session/", {
      credentials: "same-origin",
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.isAuthenticated) {
        this.setState({ isAuthenticated: true });
      } else {
        this.setState({ isAuthenticated: false });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleTabChange = (event, newValue) => {
    this.setState({ selectedTab: newValue });
  };

  isResponseOk(response) {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  }

  login = (username, password) => {
    fetch("/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: "same-origin",
      body: JSON.stringify({ username: username, password: password }),
    })
    .then(this.isResponseOk)
    .then((data) => {
      console.log(data);
      this.setState({ isAuthenticated: true, username: username, error: "", selectedTab: 0});
    })
    .catch((err) => {
      console.log(err);
      this.setState({ error: "Wrong username or password." });
    });
  }

  logout = () => {
    fetch("/api/logout", {
      credentials: "same-origin",
    })
    .then(this.isResponseOk)
    .then((data) => {
      console.log(data);
      this.setState({ isAuthenticated: false, selectedTab: 0 });
    })
    .catch((err) => {
      console.log(err);
    });
  };

  register = (username, email, password) => {
    fetch("/api/register/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": cookies.get("csrftoken"),
        },
        credentials: "same-origin",
        body: JSON.stringify({ username: username, email: email, password: password }),
    })
    .then(this.isResponseOk)
    .then((data) => {
        console.log(data);
        this.setState({ isAuthenticated: true, username: username, error: "", selectedTab: 0 });
    })
    .catch((err) => {
        console.log(err);
    });
}

  render() {
    const { isAuthenticated, username, password, error, selectedTab } = this.state;

    if (!isAuthenticated) {
      return (
        <>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={selectedTab}
              onChange={this.handleTabChange}
              centered
            >
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>
          </Box>
          {selectedTab === 0 && (
            <>
              <LoginPage login={this.login} />
            </>
          )}
          {selectedTab === 1 && (
            <>
              <RegisterPage register={this.register} />
            </>
          )}
        </>)}

    return (
      <>
        <Tabs
          orientation="horizontal"
          value={selectedTab}
          onChange={this.handleTabChange}
          centered
        >
          <Tab label="Home" />
          <Tab label="Learn" />
          <Tab label="Profile" />
        </Tabs>
        <div align="center">
          {selectedTab === 0 && (
            <>
              <Typography variant="h3">Home</Typography>
              <HomePage />
            </>
          )}
          {selectedTab === 1 && (
            <>
              <QuizPage token={cookies.get("csrftoken")}/>
            </>
          )}
          {selectedTab === 2 && (
            <ProfilePage logout={this.logout} />
          )}
        </div>
      </>
    );
  }
}

export default App;
