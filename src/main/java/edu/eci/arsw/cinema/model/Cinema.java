package edu.eci.arsw.cinema.model;
import java.util.List;

public class Cinema {
    private String name;
    private List<CinemaFunction> functions;


    public Cinema(){}

    public Cinema(String name,List<CinemaFunction> functions){
        this.name=name;
        this.functions=functions;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<CinemaFunction> getFunctions() {
        return this.functions;
    }

    public void setSchedule(List<CinemaFunction> functions) {
        this.functions = functions;
    }
}
