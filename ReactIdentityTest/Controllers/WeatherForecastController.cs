using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ReactIdentityTest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactIdentityTest.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private List<Post> Posts = new List<Post>();

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;

            //初始化資料
            for (int index = 1; index < 3; index++)
            {
                this.Posts.Add(new Post
                {
                    Id = index.ToString(),
                    Note = "記事" + index,
                    Date = "2021-09-0" + index,
                    Time = "18:00"
                });
            }
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpGet("GetPosts")]
        public IEnumerable<Post> GetPosts()
        {
            return this.Posts;
        }

        [HttpPost("SavePosts")]
        public void SavePosts(List<Post> posts)
        {
            this.Posts = posts;
        }
    }
}
