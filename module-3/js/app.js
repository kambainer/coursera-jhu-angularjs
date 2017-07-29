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
          found: '<',
          firstRun: '<',
          onRemove: '&'
        },
        controller: 'FoundItemsDirectiveController as list',
        bindToController: true
      };
      return ddo;
    }

    function FoundItemsDirectiveController() {
      var list = this;

      list.isFoundEmpty = function () {
          return (list.found.length === 0 && !list.firstRun);
      };
    }
    NarrowItDownController.$inject = ['MenuSearchService', '$scope'];
    function NarrowItDownController(MenuSearchService, $scope){
      //todo : how to provide a search term correctly?
      var ctrl = this;
      $scope.searchTerm = "";
      ctrl.found=[];
      ctrl.firstRun = true;

      ctrl.FindMeAFood = function () {
        var promise = MenuSearchService.getMatchedMenuItems($scope.searchTerm);
        promise.then(function (result) {
            ctrl.found = result;
            ctrl.firstRun = false;
        });
      };

      ctrl.removeItem = function (index) {
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
                if (searchTerm.trim()==="")
                    items = [];
                else {
                    items = response.data['menu_items'].filter(
                        function MatchToSearchTerm(value) {
                            return (value['description'].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
                        });
                }
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