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
        templateUrl: 'found-list.html',
        scope: {
          title: '@title',
          found: '<'  //one-way-binding
        },
        controller: FoundItemsDirectiveController,
        controllerAs: 'list',
        bindToController: true
      };
      return ddo;
    }

    function FoundItemsDirectiveController() {
      var list = this;
      list.title = "TITLE IN THE DIRECTIVEs CONTROLLER";

      list.cookiesInList = function () {
          for (var i = 0; i < list.found.length; i++) {
             var name = list.found[i].name;
             if (name.toLowerCase().indexOf("cookies") !== -1) {
                 return true;
             }
         }
         return false;
      };
    }


    NarrowItDownController.$inject = ['MenuSearchService', 'ApiBasePath'];
    function NarrowItDownController(MenuSearchService){
      //TODO inject
      var ctrl = this;
      //ctrl.found = MenuSearchService.getMenuCategories();
      ctrl.found = [{name: 'Cookie', count: 5},
                    {name: 'Milk', count: 3}];
      ctrl.title="Title property, found count: " + ctrl.found.length + " items.";
      ctrl.LogSomething = function () {
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