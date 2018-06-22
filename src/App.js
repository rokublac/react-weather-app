// jshint esversion:6
import React from "react";
// Components
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

// API key
const API_KEY = "67786483acb87fe9b121dcb1be806afb";

class App extends React.Component {
	state = {
		temperature: undefined,
		city: undefined,
		country: undefined,
		humidity: undefined,
		windSpeed: undefined,
		description: undefined,
		error: undefined 
	}

	getWeather = async (e) => {
		e.preventDefault();
		const city = e.target.elements.city.value;
		const country = e.target.elements.country.value;
		const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
		const data = await api_call.json();
		
		// check if input actually has a value
		if (city && country && data.cod === 200) {
			console.log(data);
			this.setState({
				temperature: data.main.temp,
				city: data.name,
				country: data.sys.country,
				humidity: data.main.humidity,
				windSpeed: data.wind.speed,
				description: data.weather[0].description,
				error: ""
			})
		} else {
			this.setState({
				temperature: undefined,
				city: undefined,
				country: undefined,
				humidity: undefined,
				windSpeed: undefined,
				description: undefined,
				error: "Please enter a valid City and Country"
			})
		}
	}

	render() {
		return (
			<div> 
				<div className="wrapper">
					<div className="main">
						<div className="container">
							<div className="row">
								<div className="col-xs-5 title-container">
									<Titles />
								</div>
								<div className="col-xs-7 form-container">
									<Form getWeather={this.getWeather}/>
									<Weather
										temperature={this.state.temperature}
										city={this.state.city}
										country={this.state.country}
										humidity={this.state.humidity}
										description={this.state.description}
										windSpeed={this.state.windSpeed}
										error={this.state.error}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}



export default App;