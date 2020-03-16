window.$ = window.jQuery = require('jquery');

require('angular/angular.js');
require('angular-route');

require('angular-ui-bootstrap');
require('angular-resource');


var app = angular.module('interviewApp', [
    'ngRoute'
]);
app.controller('companiesCtrl', ['$scope', '$http', function companiesCtrl($scope, $http) {
    $scope.companies = []
    function getCompanies(){
        $http.get('http://127.0.0.1:5000/companies').then(function(response){
            
            $scope.companies = response.data.objects
        })
    }
    

    $scope.addCompany = function(){
        $http.post('http://127.0.0.1:5000/companies', {name: $scope.newName}).then(function(response){
            getCompanies()
        })
    }

    getCompanies()
}]);

function appConfig($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');

    $routeProvider.when('/', {
        templateUrl: '/companies.html',
        controller: 'companiesCtrl'
    });
}

appConfig.$inject = ['$routeProvider', '$locationProvider'];
app.config(appConfig);
app.run();

