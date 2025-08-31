import ForecastCard from "./ForeCastCard";

const ForecastList = ({ forecast, getWeekday }) => {
  return (
    <div className="mt-6 w-full max-w-3xl">
      <h3 className="text-xl font-bold text-black mb-4 text-center">
        5-Day Forecast :
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {forecast.forecastday.map((day) => (
          <ForecastCard key={day.date} day={day} getWeekday={getWeekday} />
        ))}
      </div>
    </div>
  );
};

export default ForecastList;
