const app = angular.module("Joga-app", ['ngMap']);
app.controller("MainController", ["$http", 'NgMap', function($http, NgMap) {
  //begin MainController
  // ctrl variables
  this.hello = "Hello World";
  this.profile = false;
  this.useredit = false;
  this.playersmodal = false;
  this.LoginBox = false;
  this.logged = false;
  this.clickSignIn = false;
  this.createGame = false;
  this.ballers = false;
  this.games = [];
  this.gameedit = false;
  this.currentLocation = '';


  navigator
    .geolocation
    .getCurrentPosition((res) => {
      console.log("thsi where i be", res);
      this.currentLocation =
      `${res.coords.latitude}, ${res.coords.longitude}`
    });

  // NgMap.getMap().then(function(map) {
  //   console.log(map.getCenter());
  //   console.log('markers', map.markers);
  //   console.log('shapes', map.shapes);
  // });

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
  }

  this.closeCreate = () => {
    this.createGame = false;
  }


  //------------ProfileModal---------------------//
  this.openProfile = () => {
    if (this.user.logged) {

      this.profile = true;
    } else {
      this.openlogreg();
    }
  }

  this.closeProfile = () => {
    this.profile = false;
  }


  //--------------All Players Modal----------------//
  this.openPlayers = () => {
    if (this.user.logged) {
      this.playersmodal = true;
      this.AllUsers()
    } else {
      this.error = true;
    }
  }

  this.closePlayers = () => {
    this.playersmodal = false
  }
  // --------------------------------------------
  // Users/authorization
  this.user = {};
  this.error = null;
  this.game = {};


  this.registerUser = () => {
    $http({
      url: '/users',
      method: 'post',
      data: this.newUserForm
    }).then((response) => {
      console.log('Successful registration');
      // updateUser(response.data);
      this.user = response.data;
      this.logged = true;
      this.user.logged = true;
      this.newUserForm = {};
      this.error = null;

      this.closelogreg();
    }, ex => {
      console.log(ex.data.err);
      this.registerError = 'Incorrect username?';
    }).catch(err => this.error = '');
  };


  this.editUser = () => {
    $http({
      url: '/users/' + this.user._id,
      method: 'put',
      data: this.user
    }).then((response) => {
      this.useredit = false;
    }, (ex) => {
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
      this.user = null;
      this.useredit = false;
      this.closeProfile();
    }, (ex) => {
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
      }).then((response) => {
        // updateUser(response.data);
        this.user = response.data;
        this.logged = true;
        this.user.logged = true;
        this.loginForm = {};
        this.error = null;
        this.closelogreg();
        // this.initMap();
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
      url: '/sessions/all',
      method: 'get',
    }).then((response) => {
      this.Players = response.data
    })
  };



  //--------------games-----------
  this.Allgames = () => {
    $http({
      url: '/games',
      method: 'get',

    }).then((response) => {
      this.games = response.data;
    })
  };
  this.Allgames();

  this.creategames = (newGameForm) => {
    $http({
      url: '/games/create',
      method: 'post',
      data: {
        game: {
          title: newGameForm.title,
          type: newGameForm.type,
          time: newGameForm.time,
          location: newGameForm.location,
          user: this.user._id,
          username: this.user.username,
          latlng: newGameForm.latlong
        }
      }
    }).then((response) => {
      this.games.unshift(response.data);
      this.closeCreate();
    }, ex => {
      this.gameError = 'Incorrect game data?';
    }).catch(err => this.error = '');
  };


  this.editGame = () => {
    $http({
      url: '/game/' + this.game._id,
      method: 'put',
      data: this.game
    }).then((response) => {
      this.gameedit = false;
    }, (ex) => {
      console.log(ex.data.err);

    }).catch((err) => {
      console.log(err);
    })
  }

}]); //end MainController
