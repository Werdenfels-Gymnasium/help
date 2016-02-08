/*!
 * Copyright 2016 Werdenfels-Gymnasium All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
function GuideController($scope,$routeParams,$location,GuideService){function loadGuide(){if(angular.isDefined(mergedGuides[id])){var guide=mergedGuides[id];$scope.title=guide.title,$scope.path="content/guides/"+guide.path}else $scope.title="Fehler",$scope.error="Die gesuchte Anleitung konnte nicht in unserer Datenbank gefunden werden."}var mergedGuides=[],id=$routeParams.id;GuideService.fetchData().then(function(data){for(var key in data){var item=data[key];if(item.collapse)for(var ckey in item.items)mergedGuides[ckey]=item.items[ckey];else mergedGuides[key]=item}loadGuide()},function(error){$scope.title="Fehler",$scope.error="Es ist ein Fehler beim Laden der Anleitungen aufgetreten."})}function RootController($scope,$routeParams,GuideService){GuideService.fetchData().then(function(data){$scope.guides=data},function(error){new Error("There occoured an error while reading the guides: "+error)})}function MdCollapseMenuItem($compile,$timeout){function postLink(scope,element,attr){function updateIsOpen(){function getTargetHeight(){var targetHeight;return $ul.addClass("no-transition"),$ul.css("height",""),targetHeight=$ul.prop("clientHeight"),$ul.css("height",0),$ul.removeClass("no-transition"),targetHeight}var targetHeight=isActive?getTargetHeight():0;$timeout(function(){$ul.css({height:targetHeight+"px"})},0,!1)}var isActive=!1,$ul=angular.element(element[0].querySelectorAll("ul")),collapsePlaceholder=angular.element('<md-menu-item ng-label="{{ ngLabel }}"></md-menu-item>');collapsePlaceholder=$compile(collapsePlaceholder)(scope),element.prepend(collapsePlaceholder),collapsePlaceholder.on("click",function(){isActive=!isActive,updateIsOpen()}),updateIsOpen()}return{restrict:"E",scope:{ngLabel:"@"},transclude:!0,template:"<ul><div ng-transclude></div></ul>",link:postLink}}function GuideService($q,$http){this.fetchData=function(){return $q(function(resolve,reject){$http.get("content/guides/guides.json",{headers:{"Content-type":"application/json"}}).then(function(success){resolve(success.data)},function(failure){resolve(failure)})})}}!function(){var app=angular.module("wgHilfe",["ngMaterial","ngRoute","hc.marked"]);app.config(function($mdThemingProvider){$mdThemingProvider.theme("default").primaryPalette("blue").accentPalette("grey")}),app.run(function($rootScope,$mdSidenav){$rootScope.toggleSidenav=function(){$mdSidenav("left").toggle()}}),app.config(function($routeProvider,$locationProvider){$routeProvider.when("/",{templateUrl:"partials/home.tmpl.html"}).when("/guide/:id",{templateUrl:"partials/guide.tmpl.html",controller:"GuideController"}).otherwise({templateUrl:"partials/404.tmpl.html"}),$locationProvider.html5Mode(!1)})}(),angular.module("wgHilfe").controller("GuideController",GuideController),angular.module("wgHilfe").controller("RootController",RootController),angular.module("wgHilfe").directive("mdCollapseMenuItem",MdCollapseMenuItem),angular.module("wgHilfe").directive("mdMenuItem",function(){return{restrict:"AE",replace:!1,template:'<md-button ng-href="{{ ngHref }}">{{ ngLabel }}</md-button>',scope:{ngHref:"@",ngLabel:"@"}}}),angular.module("wgHilfe").service("GuideService",GuideService);