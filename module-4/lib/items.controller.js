/**
 * Created by kondratyevam on 08.08.2017.
 */
(function () {
    'use strict';

    angular.module('data')
        .controller('ItemsController', ItemsController);

    ItemsController.$inject = ['menu_items']
    function ItemsController(menu_items) {
        var itemDetail = this;
        itemDetail.categoryName = menu_items.category.name;
        itemDetail.menu_items = menu_items.menu_items;
    }
})();
