/**
 * Created by kambain on 28.06.2017.
 */
(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);


    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var buylist = this;
        buylist.items = ShoppingListCheckOffService.getNeededItems();

        buylist.ShowWarning = function () {
            return (buylist.items.length === 0);
        }

        buylist.removeItem = function (itemIndex) {
            ShoppingListCheckOffService.RemoveNeededItem(itemIndex);
        }
    }

    //Already bought
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var showlist = this;

        showlist.items = ShoppingListCheckOffService.getBoughtItems();
        showlist.ShowWarning = function () {
            return (showlist.items.length === 0);
        }

        showlist.removeItem = function (itemIndex) {
            ShoppingListCheckOffService.RemoveBoughtItem(itemIndex);
        }
    }

    //service code
    function ShoppingListCheckOffService(){
        var service = this;

        // List of shopping items
        var boughtItems = [];
        var needItems = [{name:"potatoes", quantity: 10},
                         {name:"tomatoes",quantity:5},
                         {name: "Ryazhenka", quantity:1},
                         {name: "Kefir", quantity:2},
                         {name: "Blinchiki s myasom", quantity:102}];

        //removing items
        service.SwapItem = function (itemIndex, arrFrom, arrTo)
        {
            arrTo.push(arrFrom[itemIndex]);
            arrFrom.splice(itemIndex, 1);
        };
        
        service.RemoveBoughtItem = function (itemIndex)
        {
            service.SwapItem(itemIndex, boughtItems, needItems);
        };

        service.RemoveNeededItem = function (itemIndex)
        {
            service.SwapItem(itemIndex, needItems, boughtItems);
        };

        //init
        service.getNeededItems = function () {
            return needItems;
        };

        service.getBoughtItems = function () {
            return boughtItems;
        };
    }
})();
