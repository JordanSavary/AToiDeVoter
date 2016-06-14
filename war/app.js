var app = angular.module('plunker', []);

app.controller('QuizzController', function($scope) {
  $scope.loi = tabLois[0];
  $scope.count = 1;
  $scope.votePour = function() {
    if ($scope.count < tabLois.length) {
      $scope.loi = tabLois[$scope.count++];
      tabVotes.push('1');
    } else if ($scope.count == tabLois.length) {
      tabVotes.push('1');
      this.showR();
      this.showQ();
    }
  };
  $scope.voteContre = function() {
    if ($scope.count < tabLois.length) {
      $scope.loi = tabLois[$scope.count++];
      tabVotes.push('0');
    } else if ($scope.count == tabLois.length) {
      tabVotes.push('0');
      this.showR();
      this.showQ();
    }
  };
  $scope.voteBlanc = function() {
    if ($scope.count < tabLois.length) {
      $scope.loi = tabLois[$scope.count++];
      tabVotes.push('2');
    } else if ($scope.count == tabLois.length) {
      tabVotes.push('2');
      this.showR();
      this.showQ();
    }
  };
});

app.controller('LoginController', function($scope) {
  var utilisateursDatabase = [{
    'login': 'kevin',
    'pwd': 'test'
  }];

  $scope.connexion = function() {
    var connected = false;
    for (var i in utilisateursDatabase) {
      var utilisateur = utilisateursDatabase[i];
      if (angular.equals(utilisateur, $scope.identifiants)) {
        connected = true;
      }
    }
    if (connected) {
      this.showQ();
      this.showL();
    } else {
      $scope.resultat = 'Erreur de connexion!';
    }
  };
});

app.controller('ResultController', function($scope) {
  $scope.vosVotes = function(){
    var nb;
    var votes = [];
    for (var i in tabVotes) {
      nb =  parseInt(i)+1;
      if (tabVotes[i] == "0"){
        votes.push("Loi " + nb +": Contre");
      }else if (tabVotes[i] == "1"){
        votes.push("Loi " + nb +": Pour");
      }else{
        votes.push("Loi " + nb +": Blanc");
      }
    }
    return votes;
  };
  $scope.votrePolitique = function(){
    if (this.showResult === true){
      var tabPol = [];
      var score = 0;
      for (var i in tabPolitiques){//On parcours la liste des politicien
        var nb = 0;//Permet de compter le nombre de votes similaire entre user et politicien
        for (var j in tabVotes){//On parcours la liste des votes de l'utilisateur
          for (var k in tabPolitiques[i].pour){//Liste des votes "pour" du politicien
            if (tabVotes[j] == "1"){//Si l'utilisateur a voté "pour"
              if (tabPolitiques[i].pour[k] == j){
                nb++;
              }
            }
          }
          for (var m in tabPolitiques[i].contre){//Liste des votes "contre" du politicien
            if (tabVotes[j] == "0"){//Sinon si l'utilisateur a voté "contre"
              if (tabPolitiques[i].contre[m] == j){
                nb++;
              }
            }
          }
          for (var n in tabPolitiques[i].blanc){//Liste des votes "blanc" du politicien
            if (tabVotes[j] == "2"){//Sinon si l'utilisateur a voté "blanc"
              if (tabPolitiques[i].blanc[n] == j){
                nb++;
              }
            }
          }
        }
        if (nb > score){
          score = nb;
          tabPol = [tabPolitiques[i].nom];
        }else if (nb == score){
          tabPol.push(tabPolitiques[i].nom);
        }
      }
      return tabPol;
    }
  };
});


app.controller('GlobalController', function($scope) {
  $scope.showLogin = true;
  $scope.showQuizz = false;
  $scope.showResult = false;
  $scope.showL = function() {
    $scope.showLogin = !$scope.showLogin;
  };
  $scope.showQ = function() {
    $scope.showQuizz = !$scope.showQuizz;
  };
  $scope.showR = function() {
    $scope.showResult = !$scope.showResult;
  };
  $scope.showLogOnly = function() { //Déconnexion
    $scope.showLogin = true;
    $scope.showQuizz = false;
    $scope.showResult = false;
    location.reload();//A modifier peut-etre
  };
});var app = angular.module('plunker', []);

app.controller('QuizzController', function($scope) {
  $scope.loi = tabLois[0];
  $scope.count = 1;
  $scope.votePour = function() {
    if ($scope.count < tabLois.length) {
      $scope.loi = tabLois[$scope.count++];
      tabVotes.push('1');
    } else if ($scope.count == tabLois.length) {
      tabVotes.push('1');
      this.showR();
      this.showQ();
    }
  };
  $scope.voteContre = function() {
    if ($scope.count < tabLois.length) {
      $scope.loi = tabLois[$scope.count++];
      tabVotes.push('0');
    } else if ($scope.count == tabLois.length) {
      tabVotes.push('0');
      this.showR();
      this.showQ();
    }
  };
  $scope.voteBlanc = function() {
    if ($scope.count < tabLois.length) {
      $scope.loi = tabLois[$scope.count++];
      tabVotes.push('2');
    } else if ($scope.count == tabLois.length) {
      tabVotes.push('2');
      this.showR();
      this.showQ();
    }
  };
});

app.controller('LoginController', function($scope) {
  var utilisateursDatabase = [{
    'login': 'kevin',
    'pwd': 'test'
  }];

  $scope.connexion = function() {
    var connected = false;
    for (var i in utilisateursDatabase) {
      var utilisateur = utilisateursDatabase[i];
      if (angular.equals(utilisateur, $scope.identifiants)) {
        connected = true;
      }
    }
    if (connected) {
      this.showQ();
      this.showL();
    } else {
      $scope.resultat = 'Erreur de connexion!';
    }
  };
});

app.controller('ResultController', function($scope) {
  $scope.vosVotes = function(){
    var nb;
    var votes = [];
    for (var i in tabVotes) {
      nb =  parseInt(i)+1;
      if (tabVotes[i] == "0"){
        votes.push("Loi " + nb +": Contre");
      }else if (tabVotes[i] == "1"){
        votes.push("Loi " + nb +": Pour");
      }else{
        votes.push("Loi " + nb +": Blanc");
      }
    }
    return votes;
  };
  $scope.votrePolitique = function(){
    if (this.showResult === true){
      var tabPol = [];
      var score = 0;
      for (var i in tabPolitiques){//On parcours la liste des politicien
        var nb = 0;//Permet de compter le nombre de votes similaire entre user et politicien
        for (var j in tabVotes){//On parcours la liste des votes de l'utilisateur
          for (var k in tabPolitiques[i].pour){//Liste des votes "pour" du politicien
            if (tabVotes[j] == "1"){//Si l'utilisateur a voté "pour"
              if (tabPolitiques[i].pour[k] == j){
                nb++;
              }
            }
          }
          for (var m in tabPolitiques[i].contre){//Liste des votes "contre" du politicien
            if (tabVotes[j] == "0"){//Sinon si l'utilisateur a voté "contre"
              if (tabPolitiques[i].contre[m] == j){
                nb++;
              }
            }
          }
          for (var n in tabPolitiques[i].blanc){//Liste des votes "blanc" du politicien
            if (tabVotes[j] == "2"){//Sinon si l'utilisateur a voté "blanc"
              if (tabPolitiques[i].blanc[n] == j){
                nb++;
              }
            }
          }
        }
        if (nb > score){
          score = nb;
          tabPol = [tabPolitiques[i].nom];
        }else if (nb == score){
          tabPol.push(tabPolitiques[i].nom);
        }
      }
      return tabPol;
    }
  };
});


app.controller('GlobalController', function($scope) {
  $scope.showLogin = true;
  $scope.showQuizz = false;
  $scope.showResult = false;
  $scope.showL = function() {
    $scope.showLogin = !$scope.showLogin;
  };
  $scope.showQ = function() {
    $scope.showQuizz = !$scope.showQuizz;
  };
  $scope.showR = function() {
    $scope.showResult = !$scope.showResult;
  };
  $scope.showLogOnly = function() { //Déconnexion
    $scope.showLogin = true;
    $scope.showQuizz = false;
    $scope.showResult = false;
    location.reload();//A modifier peut-etre
  };
});