/**
 * Created by kambain on 28.06.2017.
 */
(function () {
    'use strict';

    angular.module('mod-1', [])
        .controller('MealController', MealController);

    MealController.$inject = ['$scope'];
    function MealController($scope) {
        $scope.mealList="";
        $scope.mealMessage="";
        $scope.MealResult = "";
        $scope.CountMeals = function () {
            var arrMeals = $scope.mealList.split(",");
            arrMeals = arrMeals.filter(function CutEmpties(obj){ return obj.toString().trim() != ""});
            if(arrMeals.length===0){
                $scope.mealMessage = "Please enter data first";
            }
            else {
                $scope.mealMessage = (arrMeals.length <= 3)?"Enjoy!":"Too much!";
            }
        };
    }

})();
