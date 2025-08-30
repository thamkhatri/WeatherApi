import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [city, setCity] = useState("Butwal");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");

  // fetch weather
  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(import.meta.env.VITE_BASE_URL, {
          params: { key: import.meta.env.VITE_API_KEY, q: city ,days:5},
        });
        setData(res.data);
      } catch (err) {
        setError("City not found");
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setCity(input.trim());
      setInput("");
    }
  };
  const getWeekday = (dateString) => {
  const options = { weekday: "short" }; // "Mon", "Tue", ...
  return new Date(dateString).toLocaleDateString(undefined, options);
};


const FormatDate= (dateString)=>{
  return new Date(dateString).toLocaleDateString(undefined,{
    weekday: "long",
    month:"long",
    day: "numeric",
    year:"numeric"
  });
};

  return (
    <div>
      <div className="min-h-screen flex flex-col items-center p-6 bg-gradient-to-b from-sky-200 to-blue-500">
        <h1 className="text-3xl font-bold mb-6 text-white">Weather App</h1>

        {/* Search */}
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter city..."
            className="border rounded px-3 py-2 flex-1"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 rounded"
          >
            Search
          </button>
        </form>

        {/* Results */}
        {loading && <p className="text-white">Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {data && !loading && (
          <div className="p-6 rounded-lg shadow-md bg-white text-center w-80">
            <h2 className="text-xl font-bold">{data.location.name},{data.location.country}</h2>

            <p className="">
              {FormatDate(data.location.localtime)}
            </p>
            
            <div className="flex justify-center items-center gap-4 mt-4">
              <img src={data.current.condition.icon} alt="weather icon" />
              <p className="text-3xl font-semibold">{data.current.temp_c}°C</p>
            </div>
            <p className="mt-2">{data.current.condition.text}</p>
            <p>Humidity: {data.current.humidity}%</p>
            <p>Wind: {data.current.wind_kph} kph</p>
          </div>
        )}

        {/* Forecast (5 days) */}
        {data && data.forecast && (
          <div className="mt-6 w-full max-w-3xl">
            <h3 className="text-xl font-bold text-white mb-4 text-center">
              5-Day Forecast
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {data.forecast.forecastday.map((day) => (
                <div
                  key={day.date}
                  className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
                >
                  <p className="font-semibold">{getWeekday(day.date)}</p>
                  <img
                    src={day.day.condition.icon}
                    alt={day.day.condition.text}
                    className="w-12 h-12"
                  />
                  <p className="text-lg font-bold">{day.day.avgtemp_c}°C</p>
                  <p className="text-sm text-gray-500">{day.day.condition.text}</p>
                  <p className="text-xs mt-1">
                    H: {day.day.maxtemp_c}° / L: {day.day.mintemp_c}°
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard