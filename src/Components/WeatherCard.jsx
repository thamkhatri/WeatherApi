import React from 'react'

const WeatherCard = ({ data, FormatDate }) => {
    return (
        <div>
            <div className=" rounded-xl  p-6 text-center w-80">
                <h2 className="text-xl font-bold">{data.location.name},{data.location.country}</h2>
                <p className="">
                    {FormatDate(data.location.localtime)}
                </p>
                <div className="flex justify-around mt-4 text-sm text-gray-700">
                    <img src={data.current.condition.icon} alt="weather icon" />
                    <h2 className="  text-4xl font-bold">{data.current.temp_c}°C</h2>
                </div>
                <p className="text-red-500">{data.current.condition.text}</p>
                <div className="flex justify-around mt-4 text-sm text-gray-700">
                    <p className="font-medium">{data.current.wind_kph}m/s
                        <span>wind</span> </p>
                    <p className="font-medium"> {data.current.humidity}%
                        <span>humidity</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default WeatherCard