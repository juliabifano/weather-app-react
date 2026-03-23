import { useState } from "react";
import "./App.css";

function App() {
  const [cidade, setCidade] = useState("");
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(false);

  const buscarClima = async () => {
    try {
      setLoading(true);

      const apiKey = "a9ae6103000e40a8ae388c5705aae86a";

      const resposta = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`,
      );

      const data = await resposta.json();

      if (data.cod !== 200) {
        throw new Error("Cidade não encontrada");
      }

      setDados(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getBackground = () => {
    if (!dados) return "/img/background.png";

    const clima = dados.weather[0].main.toLowerCase();

    if (clima.includes("cloud")) return "/img/background-cloudy.png";
    if (clima.includes("rain")) return "/img/background-rain.png";
    if (clima.includes("clear")) return "/img/background-sunny.png";

    return "/img/background.png";
  };

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${getBackground()})`,
      }}
    >
      <div className="card">
        <div className="search">
          {" "}
          <input
            type="text"
            placeholder="Digite a cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") buscarClima();
            }}
          />
          <button onClick={buscarClima} disabled={loading}>
            {loading ? "Buscando..." : "Buscar"}
          </button>
          {loading && <div className="loader"></div>}
        </div>
        {dados && !loading && (
          <>
            <h2>{dados.name}</h2>
            <img
              src={`https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`}
              alt="ícone do clima"
            />
            <p>{dados.weather[0].description}</p>
            <div className="temp">{dados.main.temp}°C</div>
            <div className="details">
              <p>Máx: {dados.main.temp_max}°</p>
              <p>Mín: {dados.main.temp_min}°</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
