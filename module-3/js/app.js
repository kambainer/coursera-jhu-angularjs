/**
 * Created by kambain on 26.07.2017.
 */
(function () {
    'use strict';
    angular.module('NarrowItDownApp',[])
        .controller('NarrowItDownController', NarrowItDownController)
        .controller('FoundItemsDirectiveController', FoundItemsDirectiveController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
        .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective()
    {
      //routine
      var ddo = {
        templateUrl: 'found-list.html',
        scope: {
          title: '@title',
          found: '<',
          onRemove: '&'
        },
        controller: 'FoundItemsDirectiveController as list',
        //controllerAs: 'list',
        bindToController: true
      };
      return ddo;
    }

    function FoundItemsDirectiveController() {
      var list = this;

      //TODO lets use that for viewing nothing found message
      list.isFoundEmpty = function () {
          return (list.found.length === 0)
      };
    }
    NarrowItDownController.$inject = ['MenuSearchService', '$scope'];
    function NarrowItDownController(MenuSearchService, $scope){
        //todo : how to provide a search term correctly?
      var ctrl = this;
      $scope.searchTerm = "";
      ctrl.found=[];

      ctrl.FindMeAFood = function () {
        console.log($scope.searchTerm);
        var promise = MenuSearchService.getMatchedMenuItems($scope.searchTerm);
        promise.then(function (result) {
            ctrl.found = result;
        });
      };

      ctrl.removeItem = function (index) {
            console.log("Hi, "+index+"!");
            console.log('this is:',this);
            MenuSearchService.removeItem(index);
      };
    }
    
    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;
        var items = [];

        service.getMatchedMenuItems = function (searchTerm){
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json"),
            }).then(function (response) {
                items = response.data['menu_items'].filter(
                    function MatchToSearchTerm(value){
                        return (value['name'].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
                    });
                console.log(items);
                return items;
            })
            .catch(function (error) {
                console.log(error);
            });

            return response;
        };

        service.removeItem = function (itemIndex) {
            items.splice(itemIndex, 1);
        };

    }
    
})();