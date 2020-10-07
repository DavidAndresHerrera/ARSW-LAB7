/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.cinema.service;

import edu.eci.arsw.cinema.model.Cinema;
import edu.eci.arsw.cinema.model.CinemaFunction;
import edu.eci.arsw.cinema.model.Movie;
import edu.eci.arsw.cinema.persistence.CinemaException;
import edu.eci.arsw.cinema.persistence.CinemaFilter;
import edu.eci.arsw.cinema.persistence.CinemaPersistenceException;
import edu.eci.arsw.cinema.persistence.CinemaPersitence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 *
 * @author cristian
 */
@Service
public class CinemaServices {
    @Autowired
    @Qualifier("inMemoryCinema")
    CinemaPersitence cps;

    @Autowired
    //@Qualifier("byGender")
    @Qualifier("bySeat")
    CinemaFilter cinemaFilter;

    
    public Set<Cinema> getAllCinemas() throws CinemaException {

        return cps.getAllCinemas();

    }
    
    /**
     * 
     * @param name cinema's name
     * @return the cinema of the given name created by the given author
     * @throws CinemaException
     */
    public Cinema getCinemaByName(String name) throws CinemaException{
        Cinema temp = null;
        try {
             temp = cps.getCinema(name);
        } catch (CinemaPersistenceException e) {
            e.printStackTrace();
        }
        return temp;

    }
    
    
    public void buyTicket(int row, int col, String cinema, String date, String movieName){
        try {
            cps.buyTicket(row,col,cinema,date,movieName);
        } catch (CinemaException e) {
            e.printStackTrace();
        }
    }
    
    public List<CinemaFunction> getFunctionsbyCinemaAndDate(String cinema, String date) throws CinemaException {

        return cps.getFunctionsbyCinemaAndDate(cinema,date);
    }
    public void addCinema(Cinema cinema) throws CinemaException{
        cps.addCinema(cinema);
    }

    public ArrayList<Movie> getBy(String cinema, String date,String gender,  int seats){
        return cinemaFilter.filter(cinema,date,gender,seats,cps);
    }
    public CinemaFunction getMovieByNameAndDate(String cinema,String date,String movie) throws CinemaException{
        return cps.getMovieByCinemaAndDate(cinema,date,movie);

    }
    public void setFuction(String cinema,CinemaFunction c){
        cps.setFunction(cinema,c);
    }
    public void setDate(String cinema, CinemaFunction c){
        cps.setDate(cinema, c);
    }
    public void deleteFuntion(String cinema,CinemaFunction c){
        cps.deleteMovie(cinema,c);
    }

    public void buyTicket(String cinema,int row, int col, CinemaFunction c){cps.buyTicket(row,col,cinema,c);}
}
