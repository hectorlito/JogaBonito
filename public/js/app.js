const app = angular.module("Joga-app", []);

app.controller("MainController", ["$http", function($http) {
  //begin MainController
  // ctrl variables
  this.hello = "Hello World";
  this.profile = false;
  this.useredit= false;
  this.players = false;
  this.LoginBox = false;
  this.logged = false;
  this.clickSignIn = false;
  this.createGame= false;
  this.ballers= false;

  // ctrl functions
//-------------Login Modal------------------
  this.openlogreg = () => {
    this.clickSignIn = true;
    console.log("i clicked on sign in", this.clickSignIn);
    this.LoginBox = true;
    console.log("login should open:", this.LoginBox);
  }

  this.closelogreg = () => {
    this.clickSignIn = false;
  }
//--------------Create a Game modal------------
  this.openCreate = () => {
    this.createGame = true;
    console.log("i clicked on creategame: ", this.createGame);
  }

  this.closeCreate = () => {
    this.createGame = false;
  }


  //------------ProfileModal---------------------//
  this.openProfile = () => {
    if (this.user.logged){

    this.profile = true;
  }else {
    this.openlogreg();
  }
  }

  this.closeProfile = () => {
    this.profile = false;
  }


  //--------------All Players Modal----------------//
  this.openPlayers = () => {
    if (this.user.logged){
      this.players = true;
      this.AllUsers()
    } else {
      this.error= true;
    }
  }

  this.closePlayers = () => {
    this.players = false
  }
  // --------------------------------------------
  // Users/authorization
  this.user = {};
  this.error = null;

  this.registerUser = () => {
    $http({
      url: '/users',
      method: 'post',
      data: this.newUserForm
    }).then((response) => {
      console.log('Successful registration');
      // updateUser(response.data);
      this.logged = true;
      this.user = response.data;
      this.newUserForm = {};
      this.error = null;
      this.user.logged=true;
    }, ex => {
      console.log(ex.data.err);
      // this.error = ex.statusText;
      this.registerError = 'Incorrect username?';
    }).catch(err => this.error = '');
  };


  this.editUser = () => {
    $http({
      url: '/users/' + this.user._id,
      method: 'put',
      data: this.user
    }).then((response) => {
      this.useredit=false;
    },(ex) => {
      console.log(ex.data.err);

    }).catch((err) => {
      console.log(err);
    })
  }

  this.deleteUser = () => {
    $http({
      url: '/users/' + this.user._id,
      method: 'DELETE'
    }).then((response) => {
      this.user=null;
      this.useredit=false;
      this.closeProfile();
    },(ex) => {
      console.log(ex.data.err);
    }).catch((err) => {
      console.log(err);
    })
  }

  this.loginUser = () => {
    $http({

      url: '/sessions/login',
      method: 'post',
      data: this.loginForm
    }).then((response) =>{
      // updateUser(response.data);
      this.user = response.data;
      this.logged = true;
      this.user.logged=true;
      this.loginForm = {};
      this.error = null;
      this.closelogreg();
    }, ex => {
      this.loginError = ex.statusText;
    })
    .catch(err => this.loginError = 'Something went wrong');
  };


  this.logoutUser = () => {
    $http({
      url: '/sessions/logout',
      method: 'delete'
    }).then((response) => {
      user = {};
      this.logged = false;
      this.user.logged = false;
      this.user = null;
    }, ex => {
      this.loginError = ex.statusText;
    })
    .catch(err => this.loginError = 'Something went wrong');
  };

this.AllUsers = () => {
  $http({
    url:'/sessions/all',
    method: 'get',
  }).then((response) => {
    this.Players = response.data
console.log(this.Players);
  })
}
  this.hello = "Hello World";


//--------------games-----------
this.Allgames = () => {
  $http({
    url:'/sessions/all',
    method: 'get',
  }).then((response) => {
    this.Players = response.data
console.log(this.Players);
  })
}
  this.hello = "Hello World";

}]); //end MainController
