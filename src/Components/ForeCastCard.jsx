const ForecastCard = ({ day, getWeekday }) => {
  return (
    <div className="bg-white rounded-xl shadow-xl hover:shadow-2xl p-4 flex flex-col items-center transition-all duration-300">
      <p className="font-semibold">{getWeekday(day.date)}</p>
      <img
        src={day.day.condition.icon}
        alt={day.day.condition.text}
        className="w-12 h-12"
      />
      <p className="text-lg font-bold">{day.day.avgtemp_c}°C</p>
    </div>
  );
};

export default ForecastCard;
