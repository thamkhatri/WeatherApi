import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";
import SearchBar from "./SearchBar";
import ForecastList from "./ForeCastList";

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
          params: { key: import.meta.env.VITE_API_KEY, q: city, days: 5 },
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

  const FormatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-200 via-blue-100 to-yellow-100 p-4">

      <div className=" flex flex-col items-center p-6  bg-amber-50/50 rounded-2xl shadow-2xl">
        <SearchBar input={input} setInput={setInput} handleSubmit={handleSubmit} />
        {/* Results */}
        {loading && <p className="text-white">Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {data && !loading &&
          <WeatherCard data={data} FormatDate={FormatDate} />
        }
        {/* Forecast (5 days) */}
        {data && data.forecast && (
          <ForecastList forecast={data.forecast} getWeekday={getWeekday} />

        )}

      </div>
    </div>
  );
}

export default Dashboard