import axios from "axios";

export default async function WeatherPage({ params }) {
  const { zip } = params;

  let weather = null;
  let error = null;
  let city = '';

  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          zip: `${zip},us`,
          appid: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
          units: "imperial",
        },
      }
    );
    weather = response.data;
    city = weather.city?.name;
  } catch (err) {
    console.error("Error fetching weather data:", err.message);
    error = "Please check your Zipcode and try again.";
  }

  return (
    <div>
      <h1>Weather App</h1>
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h1 className="text-xl font-semibold mb-4">
            Weather data for the zip code: {city}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {weather.list.map((data, index) => (
              <div
                key={index}
                className="p-4 border border-gray-300 rounded bg-white shadow-sm"
              >
                <p className="text-sm">
                  Time: {new Date(data.dt * 1000).toLocaleString()}
                </p>
                <p className="text-sm">Temperature: {data.main.temp} °F</p>
                <p className="text-sm">Feels Like: {data.main.feels_like} °F</p>
                <p className="text-sm">Humidity: {data.main.humidity} %</p>
                <p className="text-sm">Weather: {data.weather[0].main}</p>
                <p className="text-sm">
                  Description: {data.weather[0].description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
