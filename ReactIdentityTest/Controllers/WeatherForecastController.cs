using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ReactIdentityTest.Data;
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

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly ExampleDbContext _context;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, ExampleDbContext context)
        {
            _logger = logger;
            _context = context;
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
        public async Task<IEnumerable<Post>> GetPostsAsync()
        {
            var posts = await _context.Post.ToListAsync();

            return posts;
        }

        [HttpPost("SavePosts")]
        public async Task SavePosts(List<Post> posts)
        {
            //刪除舊有全部紀錄
            var oldPosts = await _context.Post.ToListAsync();
            _context.Post.RemoveRange(oldPosts);

            //新增
            await _context.AddRangeAsync(posts);
            
            //更動資料庫
            await _context.SaveChangesAsync();
        }
    }
}
