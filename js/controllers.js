var app = angular.module("shopApp");

app.controller("HomeController", [
  "$scope",
  "$location",
  "getCategories",
  "$rootScope", "$firebaseAuth",
  function ($scope, $location, getCategories, $rootScope, $firebaseAuth) {
    $rootScope.totalProductNumber = 0;
    getCategories.resultSet().then(function (data) {


      $scope.resultCategories = data;

    });

    $scope.searchKeyword = function (keyword) {
      $location.path("/searchResults/" + keyword);

      // $location.path('/categoriesResults');

      //  console.log(keyword);
    };
    $scope.searchCategoryId = function ($event, keyword) {
      var categoryId = $($event.currentTarget).attr("id");
      $location.path("/SearchCategoryResults/" + categoryId + "/" + keyword);
    };
    $firebaseAuth().$onAuthStateChanged(function (user) {
      if (user) {
        $scope.user = user;
      } else {
        $scope.user = null;
      }

    });
  }
]);

function calculateTotal(cartList) {
  var total = 0;
  for (let i = 0; i < cartList.length; i++) {
    total = cartList[i].subTotalPrice() + total;
  }
  return total;
}

function calculateAmount(cartList) {
  var totalProduct = 0;
  for (let i = 0; i < cartList.length; i++) {
    totalProduct += cartList[i].productQuantity;
  }
  return totalProduct;
}

function calculateTax(cartTotal) {
  return (tax = cartTotal * 0.05);
}

app.controller("SearchResultsController", [
  "$scope",
  "$routeParams",
  "getSearches",
  "$rootScope",
  "$location",
  function ($scope, $routeParams, getSearches, $rootScope, $location) {
    $scope.results = [];
    var keyword = $routeParams.keyword;
    getSearches.resultSet(keyword).then(function (data) {
      $scope.results = data.items;
      $scope.resultData = data;
      console.log(data);
    });

    $rootScope.removeFromCart = function (removedProduct) {
      var index = $rootScope.cartList.indexOf(removedProduct);
      $rootScope.cartList.splice(index, 1);
      $rootScope.cartTotal = calculateTotal($rootScope.cartList);
      $rootScope.totalProductNumber = calculateAmount($rootScope.cartList);
    };

    $scope.showProductView = function (selectedProduct) {
      var itemId = selectedProduct.itemId;
      $rootScope.viewProduct = selectedProduct;
      $location.path("/ProductDetail/" + itemId);
    };

    $scope.addToCart = function (selectedProduct) {
      var isListEmpty = false;
      if (
        typeof $rootScope.cartList === "undefined" ||
        $rootScope.cartList.length == 0
      ) {
        isListEmpty = true;
        $rootScope.cartList = [];
      }
      var cartProduct = {
        product: {},
        productQuantity: 1,
        subTotalPrice: function () {
          return this.product.salePrice * this.productQuantity;
        }
      };

      cartProduct.product = selectedProduct;
      var isProductAlreadyAdded = false;
      if (isListEmpty) {
        $rootScope.cartList.push(cartProduct);
      } else {
        for (let i = 0; i < $rootScope.cartList.length; i++) {
          if (
            cartProduct.product.itemId == $rootScope.cartList[i].product.itemId
          ) {
            $rootScope.cartList[i].productQuantity++;
            isProductAlreadyAdded = true;
          }
        }

        if (!isProductAlreadyAdded) {
          $rootScope.cartList.push(cartProduct);
        }
      }
      $rootScope.cartTotal = calculateTotal($rootScope.cartList);
      $rootScope.totalProductNumber = calculateAmount($rootScope.cartList);
    };

    ($scope.filteredResults = []),
      ($scope.currentPage = 1),
      ($scope.numPerPage = 10),
      ($scope.maxSize = 5);

    $scope.$watch("currentPage + numPerPage", function () {
      var begin = ($scope.currentPage - 1) * $scope.numPerPage,
        end = begin + $scope.numPerPage;

      $scope.filteredResults = $scope.results.slice(begin, end);
      console.log($scope.filteredResults);
    });
  }
]);
app.controller("SearchCategoryResultsController", [
  "$scope",
  "$routeParams",
  "getSearchesCategory",
  function ($scope, $routeParams, getSearchesCategory) {
    var categoryId = $routeParams.categoryId;
    var keyword = $routeParams.keyword;
    getSearchesCategory.resultSet(keyword, categoryId).then(function (data) {
      $scope.results = data.items;
      console.log($scope.results);

    });

    ($scope.filteredResults = []),
      ($scope.currentPage = 1),
      ($scope.numPerPage = 10),
      ($scope.maxSize = 5);

    $scope.$watch("currentPage + numPerPage", function () {
      var begin = ($scope.currentPage - 1) * $scope.numPerPage,
        end = begin + $scope.numPerPage;

      $scope.filteredResults = $scope.results.slice(begin, end);
      console.log($rootScope.cartList);
    });
  }
]);

app.controller("AboutController", [
  "$http",
  "$scope",
  function ($http, $scope) { }
]);
app.controller("ContactController", [
  "$http",
  "$scope",
  function ($http, $scope) { }
]);
app.controller("HelpCenterController", [
  "$http",
  "$scope",
  function ($http, $scope) { }
]);

app.controller("ProductDetailController", [
  "$http",
  "$scope",
  function ($http, $scope) { }
]);
// controller.js
app.controller('SignUpController', ['$scope', '$location', '$firebaseAuth', function ($scope, $location, $firebaseAuth) {
  $scope.signUp = function (user) {
    $firebaseAuth().$createUserWithEmailAndPassword(user.email, user.password)
      .then(function (fireUser) {
        if (fireUser) {
          var theUser = firebase.auth().currentUser;
          theUser.updateProfile({
            displayName: user.username
          }).then(function () {

          }).then(function (err) {
            console.log(err);
          });
          firebase.database().ref('/users/' + fireUser.uid).set({
            username: user.username
          });
          $location.path('/');
        }
      })
      .catch(function (err) {
        console.log(err);
        $scope.error = err.message;
      });
  };
}]);
app.controller('LoginController', ['$scope', '$location', '$firebaseAuth', function ($scope, $location, $firebaseAuth) {
  $scope.login = function (user) {
    $firebaseAuth().$signInWithEmailAndPassword(user.email, user.password)
      .then(function (user) {
        $location.path('/');
        console.log(user);
      })


      .catch(function (err) {
        $scope.error = err.message;
      });
  };

}]);
app.controller('AuthCtrl', ['$scope', '$location', '$firebaseAuth', function ($scope, $location, $firebaseAuth) {
  $firebaseAuth().$onAuthStateChanged(function (user) {
    if (user) {
      $scope.user = user;
    } else {
      $scope.user = null;
    }
  });
  $scope.signOut = function () {
    $firebaseAuth().$signOut();
    $location.path('/');
  };

}]);


app.controller('mapController', function ($http, $timeout, StreetView, NgMap) {
  var vm = this;
  vm.stores = [];
  NgMap.getMap().then(function (evtMap) {
    map = evtMap;
    vm.map = map;
    console.log('loading scripts/starbucks.json');
    $http.get('scripts/starbucks.json').then(function (resp) {
      console.log('stores', stores);
      var stores = resp.data;
      for (var i = 0; i < stores.length; i++) {
        var store = stores[i];
        store.position = new google.maps.LatLng(store.latitude, store.longitude);
        store.title = store.name;
        var marker = new google.maps.Marker(store);
        vm.stores.push(marker);
      }
      console.log('finished loading scripts/starbucks.json', 'vm.stores', vm.stores.length);
      vm.markerClusterer = new MarkerClusterer(map, vm.stores, {});
    }, function (err) { console.log('err', err) });
  });
});

app.directive('fullScreenToggle', function ($timeout) {
  return {
    controller: 'mapController',
    link: function (scope, e, a, ctrl) {
      var fullScreenClick = function () {
        e.parent().toggleClass('full-screen');
        e.text(e.parent().hasClass('full-screen') ? 'Exit Full Screen' : 'Full Screen');
        google.maps.event.trigger(scope.map, 'resize');
      };
      e.on('click', fullScreenClick);
      $timeout(function () {
        fullScreenClick();
      }, 1000);
    }
  }
});