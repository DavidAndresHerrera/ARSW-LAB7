var cliente = apiclient ;
var stomp = stomp;
var app = (function () {

    var cine;
    var fecha;
    var pelicula;
    var stompClient = null;
    var asiento;
    var pos = [];
    var seats = [[true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true]];
    var c,ctx;

    class Seat {
        constructor(row, col) {
            this.row = row;
            this.col = col;
        }
    }




    //get the x, y positions of the mouse click relative to the canvas
    var getMousePosition = function (evt) {
        var canvas = document.getElementById("myCanvas");
        $('#myCanvas').click(function (e) {
            var rect = canvas.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            for (var i = 0; i < 7; i++) {
                for (var j = 0; j < 12; j++) {
                    var limiteX = (pos[j][i][0]) + 23;
                    var limiteY = (pos[j][i][1]) + 23
                    if (x>=pos[j][i][0] && x<=(limiteX) && y >=pos[j][i][1] && y <=(limiteY)){
                        app.buyTicket(i,j);
                    }
                }
            }
        });
    };



    var connectAndSubscribe = function (callback) {
        console.info('Connecting to WS...');
        var socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);


        //subscribe to /topic/TOPICXX when connections succeed
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/buyticket.'+cine + '.' + fecha + '.' + pelicula, function (message) {
                alert("evento recibido");
                var theObject=JSON.parse(message.body);
                callback();
            });
        });

    };

    var verifyAvailability = function (row,col) {
        var seats = asiento;
        if (seats[row][col]){
            seats[row][col]=false;

            cliente.buyTicket(fecha,cine,pelicula,seats);
            console.info("purchased ticket");

            stompClient.send('/topic/buyticket.'+cine + '.' + fecha + '.' + pelicula, {}, JSON.stringify(seats));

        }
        else{
            console.info("Ticket not available");
        }

    };

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
        asiento = seats;
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.beginPath();
        ctx.fillStyle = "#94c441";
        ctx.fillRect(c.width*0.2, c.height*0.05, c.width*0.6, c.height*0.075);
        for (var i = 0; i < seats[0].length; i++) {
            var fila = [];
            for (var j = 0; j < seats.length; j++) {

                ctx.fillStyle = "#c40a29";
                if(seats[j][i]){
                    ctx.fillStyle = "#217ad9"
                }
                ctx.fillRect(i*30+20, j*40+100, 23, 23);
                var cuadro = [];
                cuadro.push(i*30+20);
                cuadro.push(j*40+100);
                fila.push(cuadro);
            }
            pos.push(fila);


        }
        console.log(JSON.stringify(pos));
        $("#myCanvas").click( function(e) {
            getMousePosition(e);
        });

    };

    function restaurar(){
        cliente.getFunctionsByMovieCinemaAndDate(fecha,cine,pelicula,draw);
    };




    return {
        setCinema: function (cinema) {

            document.getElementById("CinemaS").innerHTML = "Cinema selected: " + cinema;

        },
        getCinemas: function (cinema,fecha1) {
            app.setCinema(cinema);
            setCineandFecha(cinema,fecha1);
            cliente.getFunctionsByCinemaAndDate(fecha1,cinema, maperTabla);


        },
        picture: function (movie){
            app.setMovie(movie);

            app.init();
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
            cliente.buyTicket(fecha, cine,pelicula,row,col);
        },
        init: function () {
            //var can = document.getElementById("canvas");
            //drawSeats();
            //websocket connection

            connectAndSubscribe(restaurar);
        },

        buyTicket: function (row, col) {
            console.info("buying ticket at row: " + row + "col: " + col);
            verifyAvailability(row,col);

            //buy ticket
        },

        disconnect: function () {
            if (stompClient !== null) {
                stompClient.disconnect();
            }
            setConnected(false);
            console.log("Disconnected");
        }
    };

})();