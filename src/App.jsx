import React, { useState, useEffect } from "react";
import axios from "axios";

import "./styles.css";

function App() {
    const [busqueda, setBusqueda] = useState("");
    const [fotos, setFotos] = useState([]);
    const [error, setError] = useState(false);

    const { VITE_API } = import.meta.env;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    VITE_API,
                    {
                        params: {
                            method: "flickr.photos.search",
                            api_key: "e4a657ddbc415ca4fa961f0c4b91e68b",
                            format: "json",
                            nojsoncallback: 1,
                            text: busqueda,
                            per_page: 10,
                        },
                    }
                );
                if (response.data.photos === undefined) {
                    setFotos([]);
                    setError(true);
                } else {
                    setError(false);
                    setFotos(response.data.photos.photo);
                }
            } catch (e) {
                setError(true);
            }
        };
        fetchData();
    }, [busqueda]);

    return (
        <>
            <header>
                <h1>Prueba tecnica trainee</h1>
                <input
                    type="text"
                    onChange={(e) => setBusqueda(e.target.value)}
                />
            </header>

            <section>
                {fotos &&
                    fotos.map((foto) => (
                        <img
                            key={foto.id}
                            src={`https://farm${foto.farm}.staticflickr.com/${foto.server}/${foto.id}_${foto.secret}.jpg`}
                            alt={foto.title}
                        />
                    ))}
                {error && <span>No hay imagenes</span>}
            </section>
        </>
    );
}

export default App;
