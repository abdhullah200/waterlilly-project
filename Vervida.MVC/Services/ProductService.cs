using System.Net.Http;
using System.Text.Json;

public class ProductService
{
    private readonly HttpClient _http;
    public ProductService(HttpClient http) => _http = http;

    public async Task<List<Product>> GetAllAsync()
    {
        var json = await _http.GetStringAsync("https://fakestoreapi.com/products");
        return JsonSerializer.Deserialize<List<Product>>(json,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ?? new();
    }
}