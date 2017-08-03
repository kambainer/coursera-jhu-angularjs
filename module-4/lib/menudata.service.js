/**
 * Created by kondratyevam on 03.08.2017.
 */
angular.module('data')
    .service('MenuDataService', MenuDataService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$http', 'ApiBasePath'];
function MenuDataService ($http, ApiBasePath) {
    var service = this;
    console.log('MenuDataService:'+ApiBasePath);

    service.getAllCategories = function ($http) {
        var response = $http({
            method: "GET",
            url: (ApiBasePath + "/categories.json"),
        }).then(
            function (response) {
                console.log('response',response.data);
            }
        );
    };

    service.getItemsForCategory = function(categoryShortName){
        //todo
        console.log('getItemsForCategory(categoryShortName)');
    };
}