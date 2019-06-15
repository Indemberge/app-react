import React, { Component } from "react";
import api from "../../services/api";

export default class Main extends Component {
    componentDidMount() {
        this.loadPlanets();
    }
        
    loadPlanets = async () => {
        const response = await api.get("/planets");
    
        console.log(response.data.docs);
    
    };


    render() {
        return <h1>Hello Planets</h1>
    }
}
