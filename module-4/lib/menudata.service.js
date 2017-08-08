/**
 * Created by kondratyevam on 03.08.2017.
 */
(function () {
    angular.module('data')
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
        .service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http', 'ApiBasePath'];
function MenuDataService ($http, ApiBasePath) {
    var service = this;
    console.log('MenuDataService:'+ApiBasePath);


    service.getAllCategories = function () {
        var response = $http({
            method: "GET",
            url: (ApiBasePath + "/categories.json"),
        }).then(
            function (response) {
                return response.data;
            }
        ).catch(function (error) {
            console.log('getAllCategories error: ', error);
        });

        return response;
    };

    service.getItemsForCategory = function(categoryShortName){
        console.log('getItemsForCategory:', categoryShortName)
        var response = $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json"),
            params: {category: categoryShortName}
        }).then(
            function (response) {
                return response.data;
            }
        ).catch(function (error) {
            console.log('getItemsForCategory error: ', error);
        });
        return response;
    };
}
})();