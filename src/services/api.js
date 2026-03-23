const API_KEY = "a9ae6103000e40a8ae388c5705aae86a";

export async function buscarClima(cidade) {
  const cidadeFormatada = encodeURIComponent(cidade);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidadeFormatada}&appid=${API_KEY}&units=metric&lang=pt_br`;

  const resposta = await fetch(url);
  const dados = await resposta.json();

  if (dados.cod !== 200) {
    throw new Error("Cidade não encontrada");
  }

  return dados;
}