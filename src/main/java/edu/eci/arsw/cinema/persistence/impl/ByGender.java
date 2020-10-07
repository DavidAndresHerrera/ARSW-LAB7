package edu.eci.arsw.cinema.persistence.impl;

import edu.eci.arsw.cinema.model.CinemaFunction;
import edu.eci.arsw.cinema.model.Movie;
import edu.eci.arsw.cinema.persistence.CinemaFilter;
import edu.eci.arsw.cinema.persistence.CinemaPersistenceException;
import edu.eci.arsw.cinema.persistence.CinemaPersitence;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service("byGender")
public class ByGender implements CinemaFilter {


    @Override
    public ArrayList<Movie> filter(String cinema, String fecha, String gender, int chair, CinemaPersitence cps) {
        ArrayList<Movie> moviesByGender = new ArrayList<Movie>();
        try {
            List<CinemaFunction> funtions = cps.getCinema(cinema).getFunctions();
            for (int i = 0; i < cps.getCinema(cinema).getFunctions().size(); i++) {

                if(funtions.get(i).getDate().equals(fecha) && funtions.get(i).getMovie().getGenre().equals(gender)){
                    moviesByGender.add(funtions.get(i).getMovie());
                }
            }
        }catch (CinemaPersistenceException e){
            e.printStackTrace();
        }
        return moviesByGender;
    }
}
