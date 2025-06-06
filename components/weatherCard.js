import Image from "next/image";

export default function WeatherCard({ data }) {
  
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
    <div className="p-4 border border-gray-300 rounded bg-white shadow-sm">
      <div className="flex justify-center items-center">
        <Image
          src={getIconSrc(data.weather[0].main)}
          alt={data.weather[0].main}
          width={100}
          height={100}
        />
      </div>
        <p className="font-semibold">Date & Time:</p>
        <p>{new Date(data.dt * 1000).toLocaleString()}</p>
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
  );
}
