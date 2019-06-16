(function() {
    'use strict';

    angular
        .module('RWMF')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$rootScope', 'CoreService', '$state', '$state'];

    function HomeController($rootScope, CoreService, $state) {
        var vm = this;
        vm.day = "1";
        vm.events = [];
        $rootScope.pageName = "home";
        vm.checkboxChecked = checkboxChecked;
        vm.gotoDetail = gotoDetail;
        var dbPromise = idb.open("rwmf-store", 1, function(db) {
            if (!db.objectStoreNames.contains("events")) {
                db.createObjectStore("events", { keyPath: "id" });
                db.createObjectStore("eventDetails", { keyPath: "id" });
            }
        });
        CoreService.addLoader();
        CoreService.getAllEvents().then(function(res) {
            dbPromise.then(function(db) {
                var tx = db.transaction("events", "readwrite");
                var tx2 = db.transaction("eventDetails", "readwrite");
                var store = tx.objectStore("events");
                var store2 = tx2.objectStore("eventDetails");
                for (var i = 0; i < res.data.programme_list.length; i++) {
                    store.put(res.data.programme_list[i]);
                    CoreService.getProgramDetails(res.data.programme_list[i].id).then(function(res) {
                        store2.put(res.data.programme_data);
                    })
                }
                tx.complete;
            });
            vm.events = res.data.programme_list;
            CoreService.removeLoader();
        }, function(err) {
            dbPromise.then(function(db) {
                var tx = db.transaction("events", "readonly");
                var store = tx.objectStore("events");
                store.getAll().then(function(data) {
                    vm.events = data;
                    CoreService.removeLoader();
                })
            });
        }).catch(function(error) {
            console.log(error)
            CoreService.removeLoader();
        });

        function gotoDetail(id) {
            $state.go("programDetail", { program_id: id });
        }

        function checkboxChecked($event) {
            vm.day = $event.currentTarget.firstElementChild.value;
        }
    }

})();