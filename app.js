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

    $scope.deleteCompany = function(id){
        $http.delete(`http://127.0.0.1:5000/company/${id}`).then(function(response){
          var index = $scope.companies.indexOf(company);
          $scope.companies.splice(index,1);
        })
    }

    getCompanies()
}]);


// Display Departments
app.controller('departmentsCtrl', ['$scope', '$http', '$routeParams', function departmentsCtrl($scope, $http, $routeParams) {
    $scope.message = "Departments"
    $scope.departments = []
    var id = $routeParams.companyId

    function getDepartments(id){
        $http.get(`http://127.0.0.1:5000/company/${id}/departments`).then(function(response){
            $scope.departments = response.data.objects
        })
    }

    getDepartments(id)
}]);


app.controller('employeesCtrl', ['$scope', '$http', '$routeParams', function employeesCtrl($scope, $http, $routeParams) {
    $scope.message = "Employees"
    $scope.employees = []
    var id = $routeParams.departmentId

    function getEmployees(id){
        $http.get(`http://127.0.0.1:5000/department/${id}/employees`).then(function(response){
            $scope.employees = response.data.objects
        })
    }

    getEmployees(id)
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

    $routeProvider.when('/company/:companyId/departments', {
        templateUrl: '/templates/departments.html',
        controller: 'departmentsCtrl'
    });

    $routeProvider.when('/department/:departmentId/employees', {
        templateUrl: '/templates/employees.html',
        controller: 'employeesCtrl'
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
