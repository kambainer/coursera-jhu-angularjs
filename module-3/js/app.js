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

    NarrowItDownController.$inject = ['MenuSearchService', 'ApiBasePath'];
    function NarrowItDownController(MenuSearchService){
      //TODO inject
      var ctrl = this;
      ctrl.found = MenuSearchService.getMatchedMenuItems("beef");
      ctrl.title="Title property, found count: " + ctrl.found.length + " items.";
      console.log(ctrl.found);

      ctrl.removeItem = function (index) {
            console.log("Hi, "+index+"!");
            console.log('this is:',this);
            MenuSearchService.removeItem(index);
      }
    }
    
    MenuSearchService.$inject = ['$http', 'ApiBasePath'];

    function MenuSearchService($http, ApiBasePath) {
        var service = this;
        // List of shopping items
        var items = [];

        service.getMatchedMenuItems = function (searchTerm){
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json"),
            }).then(function (response) {
                console.log("response:",
                     response.data['menu_items'].filter(
                         function MatchToSearchTerm(value){
                             return (value['name'].toLowerCase().indexOf(searchTerm) !== -1)
                         })
                 );
            });



            items = new Array({name: 'Cookie', count: 5}, {name: 'Milk', count: 3});
            return items;
        };

        service.removeItem = function (itemIndex) {
            items.splice(itemIndex, 1);
        };

    }
    
})();