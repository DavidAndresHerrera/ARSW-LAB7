package edu.eci.arsw.cinema.model;

import edu.eci.arsw.cinema.persistence.CinemaException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 *
 * @author cristian
 */
public class CinemaFunction {

    private Movie movie;
    private List<List<Boolean>> seats=new ArrayList<>();
    private String date;

    public CinemaFunction(){}

    public CinemaFunction(Movie movie, String date){
        this.movie=movie;
        this.date=date;
        for (int i=0;i<7;i++){
            List<Boolean> row= new ArrayList<>(Arrays.asList(new Boolean[12]));
            Collections.fill(row, Boolean.TRUE);
            this.seats.add(row);
        }
    }

    public void buyTicket(int row,int col) throws CinemaException{
        if (seats.get(row).get(col).equals(true)){
            seats.get(row).set(col,Boolean.FALSE);
        }
        else{
            throw new CinemaException("Seat booked");
        }
    }



    public List<List<Boolean>> getSeats() {
        return this.seats;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }


    public int getNumSeats() {
        int count = 0;
        for(int i = 0; i < seats.size(); i++){
            for(int j = 0; j < seats.get(i).size(); j++){
                if (seats.get(i).get(j)){
                    count += 1;
                }
            }
        }
        return count;
    }
}
