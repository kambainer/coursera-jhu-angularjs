/**
 * Created by kambain on 26.07.2017.
 */
(function () {
    'use strict';
    angular.module('NarrowItDownApp',[])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)

        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
        .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective()
    {
      //routine
      var ddo = {
        scope: {items: '<'}
        //controller: ShoppingListDirectiveController,
        //controllerAs: 'list',
        //bindToController: true
      };
      return ddo;
    }


    NarrowItDownController.$inject = ['MenuSearchService', 'ApiBasePath'];
    function NarrowItDownController(MenuSearchService){
      //TODO inject
      var ctrl = this;
      ctrl.found = MenuSearchService.getMenuCategories();

      ctrl.LogSomething = function () {
      	console.log('Controllers found: '+ ctrl.found);
        console.log(ctrl.found);
      }
    }
    
    MenuSearchService.$inject = ['$http', 'ApiBasePath'];

    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMenuCategories = function () {
			    var response = $http({
			      method: "GET",
			      url: (ApiBasePath + "/categories.json")
			    });

			    return response;
			  };

        service.getMatchedMenuItems = function (searchTerm){
            return "blah";
        };

    }
    
})();