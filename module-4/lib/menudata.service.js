/**
 * Created by kondratyevam on 03.08.2017.
 */
angular.module('data')
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
    .service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$http', 'ApiBasePath'];
function MenuDataService ($http, ApiBasePath) {
    var service = this;
    console.log('MenuDataService:'+ApiBasePath);

    service.getFakeCategories = function() {
        var categories = [{id: 81, short_name: 'fake_1'},{id:2,short_name:'fake_2'}];
        return categories;
    };

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
        var response = $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json"),
            params: {category: categoryShortName}
        }).then(
            function (response) {
                return response.data;
            }
        ).catch(function (error) {
            console.log('getAllCategories error: ', error);
        });

        return response;
    };
}