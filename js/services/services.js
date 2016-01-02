/**
 * Created by adiaguidry on 1/2/16.
 */
angular.module('mainApp')
    .service('moneyService', function(){
        this.money_amounts=["1.00","5.00","10.00","15.00","20.00"];
        this.selectedValue = "1.00";
        this.total=0;
        this.getNewTotal= function(x){
            this.total = this.total + parseInt(x);
            console.log(x, this.total);
            return this.total;
        };
        this.updateTotal = function(){
            console.log("here" ,this.total);
            return this.total;

        }
    })