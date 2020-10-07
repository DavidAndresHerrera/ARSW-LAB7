var cliente = apiclient ;
var stomp = stomp;
var app = (function () {

    var cine;
    var fecha;
    var pelicula;

    function setCineandFecha(cinema,date){
        cine = cinema;
        fecha = date;
    };

    function maperTabla(funs){

        if (funs == null){
            return new Error("No se encontro");
        }
        lista = [];
        var lista  = funs.map(function(fn){
            return {movieName:fn.movie.name, gender:fn.movie.genre, date:fn.date}
        })

        var i = 0;
        lista.map(function(fn){

            var fila = "<tr><td id=\"Name"+i+"\">" + fn.movieName + "</td><td id='Gender'>"+fn.gender+"</td><td id='Time'>" + fn.date + "</td><td><button type=\"button\" class=\"btn btn-success\"  onclick=app.picture(document.getElementById(\"Name"+i+"\").innerHTML) >Seats</button></td> </tr>";
            $("#t01  tbody").append(fila);
            i+=1;
        })
    };

    function draw(fun){
        document.getElementById("movieS").innerHTML = "Movie selected: " + pelicula;
        var seats = fun.seats;
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.beginPath();
        ctx.fillStyle = "#94c441";
        ctx.fillRect(c.width*0.2, c.height*0.05, c.width*0.6, c.height*0.075);
        for (var i = 0; i < seats[0].length; i++) {
            for (var j = 0; j < seats.length; j++) {
                ctx.fillStyle = "#c40a29";
                if(seats[j][i]){
                    ctx.fillStyle = "#217ad9"
                }
                ctx.fillRect(i*30+20, j*40+100, 23, 23);
            }
        }

    };








    return {
        setCinema: function (cinema) {

            document.getElementById("CinemaS").innerHTML = "Cinema selected: " + cinema;

        },
        getCinemas: function (cinema,fecha1) {
            app.setCinema(cinema);
            setCineandFecha(cinema,fecha1);
            stomp.init();
            cliente.getFunctionsByCinemaAndDate(fecha1,cinema, maperTabla);


        },
        picture: function (movie){
            app.setMovie(movie);
            cliente.getFunctionsByMovieCinemaAndDate(fecha,cine,movie,draw);


        },

        updateDate: function (nuevaFecha){
            cliente.updateDate(cine,pelicula,nuevaFecha);
        },
        setMovie(movie) {
            pelicula = movie;
        },
        createFunction: function (pelicula2,genre){
            cliente.newFunction(cine,pelicula2,genre,fecha);
        },
        deleteFunction: function (pelicula2){
            cliente.deleteFunction(cine,pelicula2,fecha);
        },
        buySeat: function (row,col){
            cliente.butTicket(fecha, cine,pelicula,row,col)
        }
    };

})();