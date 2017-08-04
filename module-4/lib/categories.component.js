/**
 * Created by kondratyevam on 03.08.2017.
 */
angular.module('data')
    .controller('CategoriesController',CategoriesController)
    .component('categories',{
        templateUrl: 'categories.html',
        controller: CategoriesCompController,
        bindings: {
            items: '<',
            myTitle: '@title',
            getCategories: '&'
        }
    });

function CategoriesCompController() {
    //TODO
    var $ctrl = this;

    $ctrl.$onInit = function () {
        console.log('$onInit');
        $ctrl.getCategories();
        console.log($ctrl);
    };
}
CategoriesController.$inject=['MenuDataService'];
function CategoriesController(MenuDataService) {
    var cats = this;
    cats.title = "This is cats title";
    cats.items=[];

    cats.GetCats = function () {
        console.log('onGetCats');
        var promise = MenuDataService.getAllCategories();
        promise.then(function (result) {
            cats.items = result;
            console.log(cats.items);
        });
    };

}