/**
 * Created by kondratyevam on 07.08.2017.
 */
(function () {
'use strict';
    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to tab 1 if no other URL matches
        $urlRouterProvider.otherwise('/home');

        // Set up UI states
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'home.html'
            })

            .state('categories', {
                url: '/categories',
                templateUrl: 'main-categories.html',
                controller: 'CategoriesController as cats',
                resolve:{
                    categories: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })
            .state('viewItem', {
                url: '/view-item/{category}',
                templateUrl: 'items.html',
                controller: 'ItemsController as itemctrl',

                resolve : {
                    menu_items: ['$stateParams','MenuDataService',
                        function ($stateParams, MenuDataService) {
                            return MenuDataService.getItemsForCategory($stateParams.category);
                        }]
                }
                }
            );
    }
})();