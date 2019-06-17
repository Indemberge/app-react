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
                    <div className="planet-name">
                        <strong>{planet.name}</strong>
                    </div>
                    <div className="planet-description">
                        <p>Population: {planet.population}</p>
                        <p>Climate: {planet.climate}</p>
                        <p>Terrain: {planet.terrain}</p>
                        <div className="planet-features">
                            <p>Features in {planet.films} films</p>
                        </div>
                    </div>
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Previous</button>
                    <button disabled={page === planetInfo.pages} onClick={this.nextPage}>Next</button>
                </div>
            </div>
        );
    }
}
