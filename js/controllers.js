var app = angular.module('shopApp');

app.controller('HomeController', ['$scope', '$location', 'getCategories', '$rootScope', function ($scope, $location, getCategories, $rootScope) {
    $rootScope.totalProductNumber = 0;
    getCategories.resultSet().then(function (data) {
        console.log(data);

        $scope.resultCategories = data;
        console.log($scope.resultCategories);
    });
    console.log($rootScope);
    $scope.searchKeyword = function (keyword) {
        $location.path('/searchResults/' + keyword);




        // $location.path('/categoriesResults');

        //  console.log(keyword);
    };
    $scope.searchCategoryId = function ($event, keyword) {
        var categoryId = $($event.currentTarget).attr('id');
        $location.path('/searchResults/' + categoryId + "/" + keyword);

    };

}]);

function calculateTotal(cartList){
    var total = 0;
    for(let i=0; i<cartList.length; i++){
        total = cartList[i].subTotalPrice() + total;
    }
    return total;
}

function calculateAmount(cartList){
    var totalProduct = 0;
    for(let i=0; i<cartList.length; i++){
        totalProduct += cartList[i].productQuantity;
    }
    return totalProduct;
}

function calculateTax(cartTotal){
    return tax = cartTotal * 0.05;
}

app.controller('SearchResultsController', ['$scope', '$routeParams', 'getSearches', '$rootScope','$location', function ($scope, $routeParams, getSearches, $rootScope,$location) {
    $scope.results = [];
    var keyword = $routeParams.keyword;
    getSearches.resultSet(keyword).then(function (data) {
        $scope.results = data.items;
        $scope.resultData = data;
        console.log(data);
    });

$rootScope.removeFromCart = function (removedProduct){
    var index = $rootScope.cartList.indexOf(removedProduct);
    $rootScope.cartList.splice(index, 1);
    $rootScope.cartTotal = calculateTotal($rootScope.cartList);
    $rootScope.totalProductNumber = calculateAmount($rootScope.cartList);
} 

$scope.showProductView = function (selectedProduct) {
    var itemId = selectedProduct.itemId;
    $rootScope.viewProduct = selectedProduct;
    $location.path('/ProductDetail/' + itemId );

};

    $scope.addToCart = function (selectedProduct) {
        var isListEmpty = false;
        if (typeof $rootScope.cartList === "undefined" || $rootScope.cartList.length == 0) {
                isListEmpty = true;
            $rootScope.cartList = [];
        }
        var cartProduct = {
            product: {},
            productQuantity: 1,
            subTotalPrice: function () {
                return this.product.salePrice * this.productQuantity
            }
        }

        cartProduct.product = selectedProduct;
        var isProductAlreadyAdded = false;
        if (isListEmpty){
            $rootScope.cartList.push(cartProduct);
        }else  {
            for ( let i=0; i < $rootScope.cartList.length; i++){
                if (cartProduct.product.itemId == $rootScope.cartList[i].product.itemId){
                    $rootScope.cartList[i].productQuantity ++;
                    isProductAlreadyAdded = true;
                }
            }

            if(!isProductAlreadyAdded){
                $rootScope.cartList.push(cartProduct);
            }
        }
        $rootScope.cartTotal = calculateTotal($rootScope.cartList);
        $rootScope.totalProductNumber = calculateAmount($rootScope.cartList);
        
    }

    $scope.filteredResults = []
        , $scope.currentPage = 1
        , $scope.numPerPage = 10
        , $scope.maxSize = 5;

    $scope.$watch('currentPage + numPerPage', function () {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;

        $scope.filteredResults = $scope.results.slice(begin, end);
        console.log($rootScope.cartList);
        
        
    });
}]);






app.controller('SearchCategoryResultsController', ['$scope', '$routeParams', 'getSearchesCategory', function ($scope, $routeParams, getSearchesCategory) {
    var categoryId = $routeParams.categoryId;
    var keyword = $routeParams.keyword;
    getSearchesCategory.resultSet(keyword, categoryId).then(function (data) {
        $scope.results = data.items;
        console.log($scope.results);

    });


}]);

app.controller('AboutController', ['$http', '$scope', function ($http, $scope) {

}]);
app.controller('ContactController', ['$http', '$scope', function ($http, $scope) {

}]);
app.controller('HelpCenterController', ['$http', '$scope', function ($http, $scope) {

}]);

app.controller('ProductDetailController', ['$http', '$scope', function ($http, $scope) {

}]);
// controller.js
app.controller('FirstController', ['$scope', function ($scope) {


}]);

app.controller('SignUpController', ['$scope', '$location', '$firebaseAuth', function ($scope, $location, $firebaseAuth) {

    $scope.signUpWithFacebook = function (service) {
        $firebaseAuth().$signInWithPopup(service);
    };

    $firebaseAuth().$onAuthStateChanged(function (user) {
        console.log(user);
        $scope.user = user;
    });

}]);
app.controller('LoginController', ['$scope', '$location', function ($scope, $location) {

}]);

app.controller('AuthCtrl', ['$scope', '$location', '$firebaseAuth', function ($scope, $location, $firebaseAuth) {

    $firebaseAuth().$onAuthStateChanged(function (user) {
        console.log(user);
    });



}]);


