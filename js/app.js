var app = angular.module('shopApp', ['ngRoute','ui.bootstrap', "firebase","ngMap"]);

app.config(function($routeProvider,$locationProvider){
    $routeProvider.when('/',{
        templateUrl: 'templates/home.html',
        controller:'HomeController'
    }).when('/searchResults/:keyword', {
        templateUrl: 'templates/search-results.html',
        controller:'SearchResultsController'
    }).when('/categoriesResults', {
        templateUrl: 'templates/categories-results.html',
        controller:'CategoriesResultsController'
    }).when('/SearchCategoryResults/:categoryId/:keyword', {
        templateUrl: 'templates/search-results.html',
        controller:'SearchCategoryResultsController'
    }).when('/About', {
        templateUrl: 'templates/about.html',
        controller:'AboutController'
    }).when('/Contact', {
        templateUrl: 'templates/contact.html',
        controller:'ContactController'
    }).when('/HelpCenter', {
        templateUrl: 'templates/help-center.html',
        controller:'HelpCenterController'
    }).when('/ProductDetail/:id', {
        templateUrl: 'templates/product-detail.html',
        controller:'ProductDetailController'
    }).when('/sign-up', {
        templateUrl: 'templates/sign-up.html',
        controller: 'SignUpController'
    })
});