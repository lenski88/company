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
    isOpenHeader: 1
  };

  componentDidMount() {
    this.loadData();
    /* setInterval(() => {
      this.loadData();
    }, 10000); */
  }

  getClassName = (obj) => {
    return Object.prototype.toString.apply(obj);
  };

  deepComp = (v1, v2) => {
    if (v1 === v2) {
      return true;
    }
    if (typeof v1 !== typeof v2) {
      return false;
    }
    if (typeof v1 === "number" && isNaN(v1) && isNaN(v2)) {
      return true;
    }

    let v1Class = this.getClassName(v1);
    let v2Class = this.getClassName(v2);

    if (v1Class != v2Class) {
      return false;
    }

    if (
      v1 === null ||
      typeof v1 !== "object" ||
      v2 === null ||
      typeof v2 !== "object"
    ) {
      return false;
    }

    if (v1 instanceof Array && v2 instanceof Array) {
      if (v1.length != v2.length) {
        return false;
      }
      for (let i = 0; i < v1.length; i++) {
        if (!this.deepComp(v1[i], v2[i])) {
          return false;
        }
      }
      return true;
    }

    if (v1 instanceof Object && v2 instanceof Object) {
      if (Object.keys(v1).length != Object.keys(v2).length) {
        return false;
      }

      for (let key in v1) {
        if (!(key in v2) || !this.deepComp(v1[key], v2[key])) {
          return false;
        }
      }
      return true;
    }
  };

  fetchError = (errorMessage) => {
    console.log("Что-то произошло");
  };

  fetchSuccess = (loadedData) => {
    let user = {} 
    let data = JSON.parse(loadedData.result);
    /* console.log(!this.deepComp(this.state.employes, data)) */
    if (!this.deepComp(this.state.employes, data)) {
      /* console.log("данные обновлены"); */
      this.setState({
        dataReady: true,
        employes: data, 
      });
      if(this.state.userInfo) {
        console.log('Вошел')
        console.log(data[this.state.userInfo.id])
        this.setState({
          userInfo: data[this.state.userInfo.id]
        })
      }
    } else {
      /* console.log("Обновление не требуется"); */
      return;
    }
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

  /* updateData = () => {
    let employes = this.state.employes;
    let updatePassword = Math.random();
    let sp = new URLSearchParams();
    sp.append("f", "LOCKGET");
    sp.append("n", "LENSKI_COMPANY_EMPLOYES");
    sp.append("p", updatePassword);

    isoFetch("https://fe.it-academy.by/AjaxStringStorage2.php", {
      method: "POST",
      body: sp,
    });

    sp.append("f", "UPDATE");
    sp.append("n", "LENSKI_COMPANY_EMPLOYES");
    sp.append("p", updatePassword);
    sp.append("v", JSON.stringify(employes));

    isoFetch("https://fe.it-academy.by/AjaxStringStorage2.php", {
      method: "POST",
      body: sp,
    });
    console.log('send')
  }; */

  newEmpPush = (newEmp) => {
    let employes = this.state.employes;
    employes.push(newEmp);
    this.setState({
      employes: employes,
    });
    
    let updatePassword = Math.random();
    let sp = new URLSearchParams();
    sp.append("f", "LOCKGET");
    sp.append("n", "LENSKI_COMPANY_EMPLOYES");
    sp.append("p", updatePassword);

    isoFetch("https://fe.it-academy.by/AjaxStringStorage2.php", {
      method: "POST",
      body: sp,
    });

    sp.append("f", "UPDATE");
    sp.append("n", "LENSKI_COMPANY_EMPLOYES");
    sp.append("p", updatePassword);
    sp.append("v", JSON.stringify(employes));

    isoFetch("https://fe.it-academy.by/AjaxStringStorage2.php", {
      method: "POST",
      body: sp,
    });
  };

  deleteTask = (idTask) => {
    console.log(idTask)
    let userTask = this.state.userInfo.task;
    userTask = userTask.filter((i) => { 
      return i.id !== Number(idTask);
    });
    let user = this.state.userInfo;
    let user2 = user;
    user = {...user,task:userTask};

    let employes = this.state.employes;
    employes = employes.slice();
    employes.splice(employes[this.state.userInfo.id],1,{...employes[this.state.userInfo.id],task:userTask})

    this.setState({
      employes: employes,
      userInfo: user
    })

    let updatePassword = Math.random();
    let sp = new URLSearchParams();
    sp.append("f", "LOCKGET");
    sp.append("n", "LENSKI_COMPANY_EMPLOYES");
    sp.append("p", updatePassword);

    isoFetch("https://fe.it-academy.by/AjaxStringStorage2.php",  {
      method: "POST",
      body: sp,
    });

    sp.append("f", "UPDATE");
    sp.append("n", "LENSKI_COMPANY_EMPLOYES");
    sp.append("p", updatePassword);
    sp.append("v", JSON.stringify(employes));

    isoFetch("https://fe.it-academy.by/AjaxStringStorage2.php", {
      method: "POST",
      body: sp,
    });
  };

  isOpenWindowInHeader = (value) => {
    this.setState({
      isOpenHeader: value
    })
  }

  render() {
    console.log('app')
    return (
      <div className="wrapper">
        <Authorization
          employes={this.state.employes}
          login={this.state.login}
          cbGetUser={this.getUser}
        />
        <Header
          employes={this.state.employes}
          user={this.state.userInfo}
          login={this.state.login}
          cbExit={this.exit}
          cbSearchDepartment={this.searchDepartment}
          cbNewEmpPush={this.newEmpPush}
          cbDeleteTask={this.deleteTask}
          cbIsOpen={this.isOpenWindowInHeader}
        />
        <Employes
          user={this.state.userInfo}
          employes={this.state.employes}
          filterEmployes={this.state.filterEmployes}
          workMode={this.state.workMode}
          login={this.state.login}
          isOpenWindowInHeader={this.state.isOpenHeader}
        />
      </div>
    );
  }
}

export default App;
