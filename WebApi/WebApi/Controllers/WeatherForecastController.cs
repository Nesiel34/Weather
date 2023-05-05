using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http.Headers;
using System.Xml.Linq;
using WebApi.Models;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;
        private string baseUrl = "http://api.weatherapi.com/v1/forecast.json?key=65308fb5f482485c82182247230505&q=London&aqi=yes&days=3";


        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetWeather()
        {
            HttpClient client = new HttpClient();
            // Add an Accept header for JSON format.
            client.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));

            // List data response.
            HttpResponseMessage response = client.GetAsync(baseUrl).Result;

            // Dispose once all HttpClient calls are complete. This is not necessary if the containing object will be disposed of; for example in this case the HttpClient instance will be disposed automatically when the application terminates so the following call is superfluous.
            client.Dispose();


            string apiResponse = await response.Content.ReadAsStringAsync();
            var json = JObject.Parse(apiResponse);
            string currentJson = json["current"].ToString();
            var current = JObject.Parse(currentJson);
            string temp_c = current["temp_c"].ToString();
            var conditionJson = JObject.Parse(current["condition"].ToString());
            string condition = conditionJson["text"].ToString();
            return Ok("the weatehr in london is: temp "+temp_c+" condition:"+condition);

        }

        [HttpGet("GetWeatherForecast")]
        public async Task<IActionResult> GetWeatherForeCast()
        {
            HttpClient client = new HttpClient();
            // Add an Accept header for JSON format.
            client.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));

            // List data response.
            HttpResponseMessage response = client.GetAsync(baseUrl).Result;

            // Dispose once all HttpClient calls are complete. This is not necessary if the containing object will be disposed of; for example in this case the HttpClient instance will be disposed automatically when the application terminates so the following call is superfluous.
            client.Dispose();
            string apiResponse = await response.Content.ReadAsStringAsync();


            WeatherForeCast weatherForeCast = JsonConvert.DeserializeObject<WeatherForeCast>(apiResponse);
            return Ok(weatherForeCast.forecast);
        }

        [HttpPost("RandomNumber")]
         public IActionResult RandomNumber(RandomNumber random)
        {
            int min = random.min;
            int max = random.max;
            decimal last = (decimal)(DateTime.Now.Ticks % max)/10;
            int rand = (int)(last * (max - min) + min);
            return Ok(rand);
        }


    }
}