import axios from "axios";
import WeatherCard from "@/components/weatherCard";
import Link from "next/link";

export default async function WeatherPage({ params }) {
  const { zip } = params;

  let weather = null;
  let error = null;
  let city = "";

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
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-baby-blue p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Weather App
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="flex justify-center mb-4">
          <Link
            href="/"
            className="bg-baby-pink text-white py-2 px-4 rounded hover:bg-pink-600"
          >
            Click here to go back
          </Link>
        </div>
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
