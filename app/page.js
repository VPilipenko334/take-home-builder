import axios from "axios";

export default async function Home({ searchParams }) {
  const zip = searchParams?.zip 

  let weather = null;
  let error = null;

  if (zip) {
    try {
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/forecast",
        {
          params: {
            zip: `${zip},us`,
            appid: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
            units: 'imperial',
          },
        }
      );
      weather = response.data;
      console.log(weather);

    } catch (err) {
      console.error("Error fetching weather data:", err);
      error = "Please check your Zipcode and try again.";
      console.log("this did not work");
    } 
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Weather App</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {weather && (
        <div>
          <h1 className="text-xl font-semibold mb-4">
            Weather data for the zip code: {weather.city?.name }
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
                <p className="text-sm">
                  Feels Like: {data.main.feels_like} °F
                </p>
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
      <form action="/" method="get" className="mt-4">
        <input
          type="text"
          name="zip"
          placeholder="Enter a Zipcode"
          defaultValue={zip}
          className="border border-gray-300 p-2 rounded mr-2"
        />
        <button
          type="submit"
          className="bg-baby-pink text-white p-2 rounded hover:bg-blue-600"
        >
          Click here!
        </button>
      </form>
    </div>
  );
}
