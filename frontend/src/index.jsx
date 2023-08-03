import React from 'react';
import ReactDOM from 'react-dom';
import debug from 'debug';

const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async (coords) => {
  try {
    const { latitude, longitude } = coords;
    const response = await fetch(`${baseURL}/forecast?lat=${latitude}&lon=${longitude}`);
    return response.json();
  } catch (error) {
    debug(error);
  }

  return {};
};

const getIconFor = (weatherObject) => weatherObject[0].icon.replace(/[a-zA-Z]/, '');
const convUnitKtoC = (kTemp) => Math.round(kTemp - 273.15);
const timestampToHrTime = (ts) => {
  const dt = new Date(ts);
  const hours = dt.getHours();
  const minutes = dt.getMinutes();
  const weekDay = dt.toLocaleDateString('en-US', { weekday: 'long' });

  const hoursStr = String(hours).padStart(2, '0');
  const minutesStr = String(minutes).padStart(2, '0');

  return `${weekDay}, ${hoursStr}:${minutesStr}`;
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locationInfo: {},
      forecast: [],
      weatherNow: {},
    };
  }

  async componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        getWeatherFromApi(position.coords).then(async (res) => {
          this.setState({ locationInfo: res.city });
          this.setState({ forecast: res.list });
          this.setState({ weatherNow: res.list[0] });
        });
      }, (error) => {
        debug(error);
      });
    }
  }

  render() {
    const { locationInfo, forecast, weatherNow } = this.state;

    return (
      <div className="weatherForecast">
        <div className="locationInfo">
          <div className="weatherNow">
            { weatherNow.weather && <img className="weatherIcon" src={`/public/img/${getIconFor(weatherNow.weather)}.svg`} alt="Icon" /> }
            { weatherNow.weather && <span className="temperature">{convUnitKtoC(forecast[0].main.temp)}</span> }
          </div>
          <div className="locationDetails">
            <h1>
              <span>{` ${locationInfo.name ? locationInfo.name : 'Loading...'}`}</span>
            </h1>
          </div>
        </div>

        <div className="futureWeather">
          { forecast && forecast.map((cb) => (
            <div className="forecastedDate">
              <span className="forecastTime">{ timestampToHrTime(cb.dt * 1000) }</span>
              <img className="weatherIcon" src={`/public/img/${getIconFor(cb.weather)}.svg`} alt="Icon" />
              <span className="temperature">{convUnitKtoC(cb.main.temp)}</span>
            </div>
          )) }
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app'),
);
