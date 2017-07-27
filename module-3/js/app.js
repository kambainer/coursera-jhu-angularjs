/**
 * Created by kambain on 26.07.2017.
 */
(function () {
    'use strict';
    angular.module('NarrowItDownApp',[])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService);

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService){
        //TODO inject
    }
    
    function MenuSearchService() {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm){
            return "blah";
        };

    }
    
})();