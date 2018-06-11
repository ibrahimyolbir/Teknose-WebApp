var app = angular.module('shopApp');

app.factory('getCategories',['$http', function($http){

    var categories = {
        resultSet : function(){
            var url ='https://api.walmartlabs.com/v1/taxonomy?format=json&apiKey=aqybkh8wx4zbppp7ww9vqwf9'; 
            var result = "";
         
            return $http.get(url)
            .then(function(data){
                return data.data.categories;
            });
           // return $.getJSON(url, rules, function (data) {
             //   result = data.categories;
               // console.log(result);
                // return result;
          
        }
    }
    return categories;
}]);

app.factory('getSearches',['$http', function($http){

    var searches = {
        resultSet : function(input){
            var url =`https://api.walmartlabs.com/v1/search?query=${input}&format=json&apiKey=aqybkh8wx4zbppp7ww9vqwf9&numItems=25`; 
            var result = "";
  
            return $http.get(url)
            .then(function(data){
                return data.data;
                console.log(data);
                
            });

     //       return $.getJSON(url, rules, function (data) {
       //         result = data;
         //       
           //      return result;
            //});
        }
    }
    return searches;
}]);
app.factory('getSearchesCategory',['$http', function($http){

    var searchesCategory = {
        resultSet : function(input,id){
            var url =`https://api.walmartlabs.com/v1/search?query=${input}&format=json&apiKey=aqybkh8wx4zbppp7ww9vqwf9&categoryId=${id}&numItems=25`; 
            var result = "";
  
            return $http.get(url)
            .then(function(data){
                return data.data;
                console.log(data);
                
            });

     //       return $.getJSON(url, rules, function (data) {
       //         result = data;
         //       
           //      return result;
            //});
        }
    }
    return searchesCategory;
}]);
 