import axios from "axios";
import WeatherCard from "@/components/weatherCard";

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
        },
      );
      weather = response.data;
      city = weather.city?.name;
    } catch (err) {
      console.error("Error fetching weather data:", err);
      error = "Please check your Zipcode and try again.";
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-baby-blue p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Weather App
        </h1>
        <form action="/" method="get" className="flex flex-col items-center">
          <div className="mb-4 w-full max-w-xs">
            <input
              type="text"
              name="zip"
              placeholder="Enter a Zipcode"
              defaultValue={zip}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-baby-green text-white p-2 rounded hover:bg-green-600 transition duration-300"
          >
            Click here!
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {weather && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">
              Weather Data For: {city}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {weather.list.map((data, index) => (
                <WeatherCard key={index} data={data} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
