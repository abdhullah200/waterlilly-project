using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using Vervidalily.MVC.Models; // Import the existing models namespace

namespace Vervidalily.MVC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors] 
    public class ProductsController : ControllerBase
    {
        private readonly HttpClient _http;
        private readonly ILogger<ProductsController> _logger;
        
        public ProductsController(HttpClient http, ILogger<ProductsController> logger)
        {
            _http = http;
            _logger = logger;
        }

        // Change the route to avoid conflict with the minimal API endpoint
        [HttpGet("list")]
        public IActionResult Get()
        {
            // This controller method now responds to /api/products/list instead
            return Ok(new { message = "This endpoint uses a different route to avoid conflicts with the minimal API" });
        }

        [HttpGet]
        public async Task<IActionResult> Get(string? category = null, string? search = null)
        {
            // Add CORS headers
            Response.Headers["Access-Control-Allow-Origin"] = "*";
            Response.Headers["Access-Control-Allow-Methods"] = "GET, OPTIONS";
            Response.Headers["Access-Control-Allow-Headers"] = "Content-Type, Accept, Authorization";
            
            try {
                _logger.LogInformation("Fetching products from external API");
                _http.DefaultRequestHeaders.UserAgent.ParseAdd("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
                
                // Get all products
                var json = await _http.GetStringAsync("https://fakestoreapi.com/products");
                
                // If no filters, return all products
                if (string.IsNullOrEmpty(category) && string.IsNullOrEmpty(search))
                {
                    return Content(json, "application/json");
                }
                
                // Parse the JSON to filter
                var products = JsonSerializer.Deserialize<List<ApiProduct>>(json, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });
                
                if (products == null)
                {
                    return StatusCode(500, new { Error = "Failed to deserialize products" });
                }
                
                // Filter by category if provided
                if (!string.IsNullOrEmpty(category) && category.ToLower() != "all")
                {
                    products = products.Where(p => p.Category.ToLower() == category.ToLower()).ToList();
                }
                
                // Filter by search term if provided
                if (!string.IsNullOrEmpty(search))
                {
                    products = products.Where(p => p.Title.ToLower().Contains(search.ToLower())).ToList();
                }
                
                // Return filtered products
                return Ok(products);
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error fetching products");
                return StatusCode(500, new { Error = ex.Message });
            }
        }
        
        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            Response.Headers["Access-Control-Allow-Origin"] = "*";
            Response.Headers["Access-Control-Allow-Methods"] = "GET, OPTIONS";
            Response.Headers["Access-Control-Allow-Headers"] = "Content-Type, Accept, Authorization";
            
            try {
                _http.DefaultRequestHeaders.UserAgent.ParseAdd("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
                var json = await _http.GetStringAsync("https://fakestoreapi.com/products/categories");
                return Content(json, "application/json");
            }
            catch (Exception ex) {
                _logger.LogError(ex, "Error fetching categories");
                return StatusCode(500, new { Error = ex.Message });
            }
        }
        
        // Add OPTIONS method to handle preflight requests
        [HttpOptions]
        public IActionResult Options()
        {
            Response.Headers["Access-Control-Allow-Origin"] = "*";
            Response.Headers["Access-Control-Allow-Methods"] = "GET, OPTIONS";
            Response.Headers["Access-Control-Allow-Headers"] = "Content-Type, Accept, Authorization";
            return Ok();
        }
    }

    // API Product class to avoid name conflict with the existing Product model
    public class ApiProduct
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public ApiRating Rating { get; set; } = new ApiRating();
    }

    public class ApiRating
    {
        public decimal Rate { get; set; }
        public int Count { get; set; }
    }
}