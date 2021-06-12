import React from "react";
import isoFetch from "isomorphic-fetch";

import Authorization from "./components/Authorization";
import Employes from "./components/Employes";
import Header from "./components/Header";

class App extends React.PureComponent {
 

  state = {
    dataReady: false,
    userInfo: '',
    employes: [],
    login: false,
  };

  componentDidMount() {
    this.loadData();
  }

  fetchError = (errorMessage) => {
    console.log("dfasdf");
  };

  fetchSuccess = (loadedData) => {
    this.setState({
      dataReady: true,
      employes: JSON.parse(loadedData.result),
    });
  };

  loadData = () => {
    let sp = new URLSearchParams();
    sp.append("f", "READ");
    sp.append("n", "LENSKI_COMPANY_EMPLOYES");

    isoFetch("https://fe.it-academy.by/AjaxStringStorage2.php", {
      method: "POST",
      body: sp,
    })
      .then((response) => {
        if (!response.ok) throw new Error("fetch error " + response.status);
        else return response.json();
      })
      .then((data) => {
        this.fetchSuccess(data);
      })
      .catch((error) => {
        this.fetchError(error.message);
      });
  };

  getUser = (user) => {
    this.setState({
      login: true,
      userInfo: user
    })
  }

  render() {
    return (
      <div className="wrapper">
        <Authorization employes={this.state.employes} login={this.state.login} cbGetUser={this.getUser} />
        <Header user={this.state.userInfo.user} login={this.state.login} />
        <Employes user={this.state.userInfo.user}  employes={this.state.employes} login={this.state.login} />
      </div>
    );
  }
}

export default App;
