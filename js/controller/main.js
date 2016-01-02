/**
 * Created by adiaguidry on 1/2/16.
 */
angular.module('mainApp')
    .controller('routeCtrl', function($routeProvider){
    })
    .config(function($routeProvider){
        $routeProvider
        // route to different templates
            .when('/', {
                templateUrl: 'home.html',
                templateUrl: 'pages/home.html',
            })
            .when('/goals', {
                templateUrl: 'pages/goals.html',
                controller: 'taskCtrl'
            })
            .when('/bank', {
                templateUrl: 'pages/bank.html',
                controller: 'bankCtrl'
            })
            .otherwise('/');
    })
    .controller('taskCtrl', function($scope, $firebaseArray, moneyService){
        $scope.done = false;
        var ref = new Firebase("https://flickering-torch-7798.firebaseio.com/goal");
        // create a synchronized array
        $scope.goals = $firebaseArray(ref);
        $scope.addGoal = function(){
            //firebase method add esentially push
            $scope.goals.$add({
                text: $scope.newGoalText

            });
        };
        $scope.money_amounts=moneyService.money_amounts;
        $scope.selectedValue=moneyService.selectedValue;
        $scope.getNewTotal= function(x){
            $scope.total = moneyService.getNewTotal(x);
        };

    })
    .controller('bankCtrl', function($scope, $firebaseArray, $firebaseObject, $modal, moneyService){
        var ref = new Firebase("https://flickering-torch-7798.firebaseio.com/account");
        // create a synchronized array
        $scope.accounts = $firebaseArray(ref);
        // add new items to the array & instantly to firebase database
        $scope.addAccount = function(){
            //firebase method add esentially is push
            $scope.accounts.$add({
                name: $scope.accountName,
                amount: $scope.accountAmount,
                current: $scope.accountCurrent
            });
        };
        function getAccountById(id){
            if(id){
                return new Firebase("https://flickering-torch-7798.firebaseio.com/account/"+id);
            }
            return false;
        }


        //before the drop I want to access the element getting dragged, get the amount attached to it, add that
        //amount to the dropped object current amount
        $scope.beforeDrop = function(event, obj) {
            var drag = event.toElement;
            //the amount attached to the element
            var money = $(drag).data('id');
            var drop = event.target;

            var account_id = $(drop).data('id');

            var account_ref = $firebaseObject(getAccountById(account_id));
            console.log(account_ref, account_ref.amount);
            // account_ref.current = money;
            // account_ref.$save();

            $(drag).remove();
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
            });
            return modalInstance.result;
        };
    })


    //this is the end of the bank controller
    .controller('ModalInstanceCtrl', function ($scope, $modalInstance, moneyService) {
        console.log("in the modal controller" , "amount of money ",moneyService);
        $scope.money=moneyService.current_dollars;
        $scope.ok = function () {
            $modalInstance.close();
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    })