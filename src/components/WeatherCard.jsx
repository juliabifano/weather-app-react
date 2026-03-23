function WeatherCard({ dados }) {
  if (!dados) return null;

  const nome = dados.name;
  const temp = dados.main.temp;
  const clima = dados.weather[0].description;
  const umidade = dados.main.humidity;
  const icon = dados.weather[0].icon;

  return (
    <div className="card">
      <h2>{nome}</h2>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
      <h1>{temp}°C</h1>
      <p>{clima}</p>
      <p>💧 {umidade}%</p>
    </div>
  );
}

export default WeatherCard;