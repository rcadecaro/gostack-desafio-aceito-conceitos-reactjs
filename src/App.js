import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  const loadRepositories = async () => {
    const { data } = await api.get("/repositories");
    setRepositories(data);
  };

  useEffect(() => {
    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: "Cadecaro",
      url: "http://cadecaro.com.br",
      techs: ["React", "NodeJS"],
    });
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    loadRepositories();
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
