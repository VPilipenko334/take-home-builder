import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default async function Home({ searchParams }) {
  const zip = searchParams?.zip;

  let weather = null;
  let error = null;
  let city = "";

  if (zip) {
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
      console.error("Error fetching weather data:", err);
      error = "Please check your Zipcode and try again.";
    }
  }

  const getIconSrc = (main) => {
    let imgSrc = "/sunny.png";

    if (main === "Clear") {
      imgSrc = "/sunny.png";
    } else if (main === "Clouds") {
      imgSrc = "/cloudy.png";
    } else if (main === "Rain") {
      imgSrc = "/rain.png";
    } else if (main === "Snow") {
      imgSrc = "/snow.png";
    } else if (main === "Overcast") {
      imgSrc = "/overcast.png";
    }

    return imgSrc;
  };

  return (
    <div className="p-4 my-2">
      <h1 className="text-2xl font-bold mb-4">Weather App</h1>
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
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {weather && (
        <div>
          <h2 className="text-xl font-semibold mb-4 my-3">
            Weather data for the zip code: {city}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {weather.list.map((data, index) => (
              <div
                key={index}
                className="p-4 border border-gray-300 rounded bg-white shadow-sm"
              >
                <div className="flex justify-center items-center">
                  <img
                    src={getIconSrc(data.weather[0].main)}
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
                <div className="flex flex-col items-center text-md">
                  <p className="font-semibold">Date & Time:</p>
                  <p>{new Date(data.dt * 1000).toLocaleString()}</p>
                </div>
                <br />
                <div>
                  <div className="text-md">
                    <p className="font-semibold">Temperature</p>
                    {data.main.temp} °F
                  </div>

                  <div className="text-md">
                    <p className="font-semibold">Feels Like</p>
                    {data.main.feels_like} °F
                  </div>

                  <div className="text-md">
                    <p className="font-semibold">Humidity</p>
                    {data.main.humidity} %
                  </div>

                  <div className="text-md">
                    <p className="font-semibold">Weather</p>
                    {data.weather[0].main}
                  </div>

                  <div className="text-md">
                    <p className="font-semibold">Description</p>
                    {data.weather[0].description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
