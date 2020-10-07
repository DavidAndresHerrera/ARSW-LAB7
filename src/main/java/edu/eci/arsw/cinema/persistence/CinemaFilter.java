package edu.eci.arsw.cinema.persistence;


import edu.eci.arsw.cinema.model.Movie;

import java.util.ArrayList;

public interface CinemaFilter {

    public ArrayList<Movie> filter(String cinema, String fecha, String gender, int chair, CinemaPersitence cps);

}
