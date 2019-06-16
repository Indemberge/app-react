import React, { Component } from "react";
import api from "../../services/api";

import "./styles.css"

export default class Main extends Component {
    // crio uma variável de estado para armazenar os dados
    // e poder exibi-los
    state = {
        planets: [],
        planetInfo: [],
        page: 1,
    };
       
    componentDidMount() {
        this.loadPlanets();
    }
        
    loadPlanets = async (page = 1) => {
        // a constante response recebe os dados da api planets
        const response = await api.get(`/planets?page=${page}`);
        const { docs, ...planetInfo } = response.data;
        // passo para minha variavel de estado planets os dados recebidos da api
        // contidos em response
        this.setState({ planets: docs, planetInfo, page });    
    };

    prevPage = () => {
        const { page, planetInfo } = this.state;

        if (page === 1) return;
        
            const pageNumber = page - 1;
            this.loadPlanets(pageNumber);

    };

    nextPage = () => {
        const { page, planetInfo } = this.state;

        if (page === planetInfo.pages) return;
        
        const pageNumber = page + 1
        
        this.loadPlanets(pageNumber)
        
    };

    render() {
        const { planets, page, planetInfo } = this.state;

        return (
            <div className="planet-list">
                {planets.map(planet => (
                    <article key={planet._id}>
                        <strong>{planet.name}</strong>
                        <p>CLIMATE: {planet.climate}</p>
                        <p>TERRAIN: {planet.terrain}</p>
                        <p>FEATURES IN {planet.films} FILMS</p>
                    </article>
                ))}
                <div className="actions">
                    <button dissabled={page === 1} onClick={this.prevPage}>Previous</button>
                    <button dissabled={page === planetInfo.pages} onClick={this.nextPage}>Next</button>
                </div>
            </div>
        );
    }
}
