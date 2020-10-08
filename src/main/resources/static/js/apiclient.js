const apiUrl = "http://localhost:8080/cinemas/"
apiclient = (function () {
    var seats = [[true, true, false, true, true, false, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true]];
    return {
        getFunctionsByCinemaAndDate: function (date, cinema, callback) {
            jQuery.ajax({
                url: apiUrl + cinema + "/" + date,
                success: function (result) {
                    callback(result);
                },
                async: true
            });
        },
        getFunctionsByMovieCinemaAndDate: function (date, cinema, movie2, callback) {
            jQuery.ajax({
                url: apiUrl + cinema + "/" + date + "/" + movie2,
                success: function (result) {
                    callback(result);
                },
                async: true
            });
        },

        updateDate: function (cinema,nombre,fecha) {
            var putPromise = $.ajax({
                url: apiUrl+ cinema,
                type: 'PUT',
                data: JSON.stringify({"movie": {"name": nombre, "genre": ""}, "seats": [], "date": fecha, "numSeats": ""}),
                contentType: "application/json"
            });

            putPromise.then(function () {
                console.info("OK");
                //callback();
            }, function () {
                console.info("ERROR");
            });

        },
        newFunction: function (cinema,nombre,genre,fecha){
            var putPromise = $.ajax({
                url: apiUrl+ cinema,
                type: 'POST',
                data: JSON.stringify({"movie": {"name": nombre, "genre": genre}, "seats": seats, "date": fecha, "numSeats": 84}),
                contentType: "application/json"
            });

            putPromise.then(function () {
                console.info("OK");
                //callback();
            }, function () {
                console.info("ERROR");
            });
        },
        deleteFunction: function (cinema,nombre,fecha){
            var putPromise = $.ajax({
                url: apiUrl+ cinema,
                type: 'DELETE',
                data: JSON.stringify({"movie": {"name": nombre, "genre": ""}, "seats": [], "date": fecha, "numSeats": 84}),
                contentType: "application/json"
            });
            putPromise.then(function () {
                console.info("OK");
                //callback();
            }, function () {
                console.info("ERROR");
            });
        },
        buyTicket: function (fecha,cine,pelicula,seats){
            var putPromise = $.ajax({
                url: apiUrl+ cine,
                type: 'PUT',
                data: JSON.stringify({"movie": {"name": pelicula, "genre": ""}, "seats": seats, "date": fecha, "numSeats": ""}),
                contentType: "application/json"
            });

            putPromise.then(function () {
                console.info("OK");
                //callback();
            }, function () {
                console.info("ERROR");
            });
        }
    }

})();