window.$ = window.jQuery = require('jquery');

require('angular/angular.js');
require('angular-route');

require('angular-ui-bootstrap');
require('angular-resource');


var app = angular.module('interviewApp', [
    'ngRoute'
]);
app.controller('companiesCtrl', ['$scope', '$http', function companiesCtrl($scope, $http) {
    $scope.message = "Companies"
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

// Display Departments
app.controller('departmentsCtrl', ['$scope', '$http', function departmentsCtrl($scope, $http) {

    $scope.message = "Departments"
    $scope.departments = []
    function getDepartments(){
        $http.get('http://127.0.0.1:5000/departments').then(function(response){
            $scope.departments = response.data.objects
        })
    }

    getDepartments()
}]);


function appConfig($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');

    // $routeProvider.when('/', {
    //   views: {
    //     'companies': {
    //     templateUrl: '/templates/companies.html',
    //     controller: 'companiesCtrl'
    //      }
    //     }
    // });

    $routeProvider.when('/', {
        templateUrl: '/templates/companies.html',
        controller: 'companiesCtrl'
    });

    $routeProvider.when('/department', {
        templateUrl: '/templates/departments.html',
        controller: 'departmentsCtrl'
    });

}

appConfig.$inject = ['$routeProvider', '$locationProvider'];
app.config(appConfig);
app.run();



// // add new department by company id param
//     $scope.addDepartment = function(id){
//         $http.post(`http://127.0.0.1:5000/companies/${id}/departments`, {name: $scope.newDepartment}).then(function(response){
//             getCompanies()
//         })
//     }
