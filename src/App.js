import React from "react";
import isoFetch from "isomorphic-fetch";

import Authorization from "./components/Authorization";
import Employes from "./components/Employes";
import Header from "./components/Header";

class App extends React.PureComponent {
  state = {
    dataReady: false,
    userInfo: "",
    employes: [],
    login: false,
    filterEmployes: [],
    workMode: 1, // 1 - отобразить всех сотрудников, 2 - отобразить отфильтрованный список по отделам
  };

  componentDidMount() {
    this.loadData();
  }

  fetchError = (errorMessage) => {
    alert("Что-то пошло не так...");
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
      login: !this.state.login,
      userInfo: user,
    });
  };

  exit = () => {
    this.setState({
      login: !this.state.login,
    });
  };

  searchDepartment = (value) => {
    if (value.select === "Все") {
      this.setState({
        workMode: 1,
      });
    } else {
      let employes = this.state.employes;
      employes = employes.slice();
      employes = this.state.employes.filter((i) => {
        return i.department === value.select;
      });
      this.setState({
        filterEmployes: employes,
        workMode: 2,
      });
    }
  };

  newEmpPush = (newEmp) => {
  console.log(newEmp)
   let employes = this.state.employes;

  employes.push(newEmp)
   console.log(employes)
    this.setState({
      employes: employes
    })
  }

  render() {
    return (
      <div className="wrapper">
        <Authorization
          employes={this.state.employes}
          login={this.state.login}
          cbGetUser={this.getUser}
        />
        <Header
          employes={this.state.employes}
          user={this.state.userInfo.user}
          login={this.state.login}
          cbExit={this.exit}
          cbSearchDepartment={this.searchDepartment}
          cbNewEmpPush={this.newEmpPush}
        />
        <Employes
          user={this.state.userInfo.user}
          employes={this.state.employes}
          filterEmployes={this.state.filterEmployes}
          workMode={this.state.workMode}
          login={this.state.login}
        />
      </div>
    );
  }
}

export default App;
