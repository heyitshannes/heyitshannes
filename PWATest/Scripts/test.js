var test = (function (window, $) {

    var me = {};
    var db;

    me.init = function () {

        $("#go").unbind().bind("click",
            function () {
                saveText();
            });

        //HANNES: Create/Open database
        var request = window.indexedDB.open("MyTestDatabase", 1);

        request.onerror = function (event) {
            alert("Database error: " + event.target.errorCode);
        };
        request.onsuccess = function (event) {
            db = event.target.result;

            //Load the data if available
            var customers = [];

            var objectStore = db.transaction("customers").objectStore("customers");

            objectStore.getAll().onsuccess = function (event) {
                customers = event.target.result;
                //alert(customers.length);

                showCustomers(customers);
            };
        };
        request.onupgradeneeded = function () {
            db = event.target.result;
            var objectStore = db.createObjectStore("customers", { autoIncrement: true });
        }
    }

    return me;

    function showCustomers(customers) {
        $("#customers").append(JSON.stringify(customers));
    }

    function saveText() {
        var transaction = db.transaction(["customers"], "readwrite");

        transaction.oncomplete = function (event) {
            alert("All done!");
        };

        transaction.onerror = function (event) {
            alert("ag poefies");
        };

        var objectStore = transaction.objectStore("customers");

        var customer = {
            name: $("#text1").val(),
            age: $("#text2").val()
        }

        var request = objectStore.add(customer);
        request.onsuccess = function(event) {
            alert(event.key);
        }
    }

})(window, jQuery);