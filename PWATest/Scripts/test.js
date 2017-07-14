var test = (function (window, $) {

    var me = {};
    var db;

    me.init = function () {
        showCustomers();

        $("#go").unbind().bind("click",
            function () {
                saveText();
            });

        $("#clear").unbind().bind("click",
            function () {
                clearDb();
            });
    }

    me.updateOnlineStatus = function (event) {
        if (navigator.onLine) {
            // handle online status
            console.log('online');

            if (!$("#onlineStatus").hasClass("hidden")) {
                $("#onlineStatus").addClass("hidden");
            }
        } else {
            // handle offline status
            console.log('offline');

            if ($("#onlineStatus").hasClass("hidden")) {
                $("#onlineStatus").removeClass("hidden");
            }
        }
    }

    return me;

    function showCustomers() {
        var customers = [];
        var request = window.indexedDB.open("MyTestDatabase", 1);

        with (request) {
            onerror = function (event) {
                alert("Database error: " + event.target.errorCode);
            };

            onsuccess = function (event) {
                db = event.target.result;

                //Load the data if available


                var objectStore = db.transaction("customers").objectStore("customers");

                objectStore.getAll().onsuccess = function (event) {
                    $.each(event.target.result,
                        function (index, item) {
                            customers.push(JSON.parse(JSON.stringify(item)));
                        });
                    $("#customers").html("");
                    $.each(customers,
                        function(index, item) {
                            $("#customers").append("Name: " + item.name + "<br />Age: " + item.age + "<br />");
                            if (item.image) {
                                $("#customers").append("<img src=\"" + item.image + "\" style=\"width: 250px;\" /><br />");
                            }
                        });

                };

            };

            onupgradeneeded = function (event) {
                db = event.target.result;
                var objectStore = db.createObjectStore("customers", { autoIncrement: true });
            }
        }
    }

    function saveText() {
        getBase64(document.getElementById("photo").files[0],
            function (base64) {
                var transaction = db.transaction(["customers"], "readwrite");

                transaction.oncomplete = function (event) {
                    showCustomers();
                };

                transaction.onerror = function (event) {
                    alert("ag poefies");
                };

                var objectStore = transaction.objectStore("customers");

                var customer = {
                    name: $("#text1").val(),
                    age: $("#text2").val(),
                    image: base64
                }

                var request = objectStore.add(customer);
                request.onsuccess = function (event) {

                }
            });

        
    }

    function getBase64(file, _callback) {
        var reader = new FileReader();

        reader.onload = function (readerEvt) {
            _callback(readerEvt.target.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };

        reader.readAsDataURL(file);
    }

    function clearDb() {
        window.indexedDB.deleteDatabase("MyTestDatabase");
        showCustomers();
    }

})(window, jQuery);