/**
 * Created by kondratyevam on 03.08.2017.
 */
(function () {
angular.module('data')
    .controller('CategoriesController',CategoriesController)
    .component('categories',{
        templateUrl: 'categories.html',
        //controller: CategoriesCompController,
        bindings: {
            items: '<',
            myTitle: '@title',
            getCategories: '&'
        }
    });

CategoriesController.$inject=['MenuDataService','categories'];
function CategoriesController(MenuDataService, categories) {
    var cats = this;
    cats.title = "This is cats title";
    cats.items = categories;
}
})();