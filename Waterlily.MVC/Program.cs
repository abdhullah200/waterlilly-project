using System.Net.WebSockets;

var builder = WebApplication.CreateBuilder(args);

// === Services ===
builder.Services.AddControllersWithViews();
builder.Services.AddHttpClient();

// Configure CORS - very permissive for debugging (named policy)
var corsPolicyName = "AllowAll";
builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicyName, policy =>
    {
        policy
            .SetIsOriginAllowed(_ => true)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddSignalR();

// Listen on all interfaces, not just localhost
builder.WebHost.UseUrls("http://0.0.0.0:5217", "https://0.0.0.0:7217");

var app = builder.Build();

// === Pipeline ===
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}

// Global middleware to add CORS headers to EVERY response
app.Use(async (context, next) =>
{
    // Add CORS headers before any processing happens
    var origin = context.Request.Headers["Origin"].ToString();
    if (!string.IsNullOrEmpty(origin))
    {
        context.Response.Headers["Access-Control-Allow-Origin"] = origin;
    }
    else
    {
        context.Response.Headers["Access-Control-Allow-Origin"] = "*";
    }
    context.Response.Headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
    context.Response.Headers["Access-Control-Allow-Headers"] = "Content-Type, Accept, Authorization, X-Requested-With";
    context.Response.Headers["Access-Control-Allow-Credentials"] = "true";
    
    // Handle OPTIONS requests immediately
    if (context.Request.Method == "OPTIONS")
    {
        context.Response.StatusCode = 204;
        await context.Response.CompleteAsync();
        return;
    }
    
    Console.WriteLine($"Request: {context.Request.Method} {context.Request.Path} from {context.Connection.RemoteIpAddress}");
    
    try
    {
        await next();
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error processing request: {ex.Message}");
        throw;
    }
    finally
    {
        Console.WriteLine($"Response: {context.Response.StatusCode} for {context.Request.Path}");
    }
});

// Use named CORS policy early
app.UseCors(corsPolicyName);

app.UseWebSockets(new WebSocketOptions
{
    KeepAliveInterval = TimeSpan.FromMinutes(2)
});

app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

// MVC fallback
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

// Ensure attribute-routed API controllers are mapped
app.MapControllers();

// Manifest endpoint with CORS headers
app.MapGet("/manifest.json", (HttpContext context) =>
{
    context.Response.ContentType = "application/json";
    string manifest = @"{
        ""name"": ""Waterlily App"",
        ""short_name"": ""Waterlily"",
        ""start_url"": ""/"",
        ""display"": ""standalone"",
        ""background_color"": ""#ffffff"",
        ""theme_color"": ""#4285f4"",
        ""icons"": []
    }";
    return Results.Text(manifest, "application/json");
});

// NOTE: Removed the inline MapGet("/api/products") endpoint to avoid AmbiguousMatchException.
// The API is served by your ProductsController now.

// WebSocket endpoint
app.Use(async (context, next) =>
{
    if (context.Request.Path == "/ws" || context.Request.Path == "/ws/")
    {
        Console.WriteLine($"WebSocket request from {context.Connection.RemoteIpAddress}, Origin: {context.Request.Headers["Origin"]}");
        
        if (context.WebSockets.IsWebSocketRequest)
        {
            try
            {
                using var webSocket = await context.WebSockets.AcceptWebSocketAsync();
                Console.WriteLine("WebSocket connection established!");

                // Send welcome message
                var welcomeMessage = System.Text.Encoding.UTF8.GetBytes("Connected to WebSocket server");
                await webSocket.SendAsync(
                    new ArraySegment<byte>(welcomeMessage),
                    WebSocketMessageType.Text,
                    true,
                    CancellationToken.None);

                // Echo server implementation
                var buffer = new byte[1024 * 4];
                var result = await webSocket.ReceiveAsync(
                    new ArraySegment<byte>(buffer), CancellationToken.None);

                while (!result.CloseStatus.HasValue)
                {
                    await webSocket.SendAsync(
                        new ArraySegment<byte>(buffer, 0, result.Count),
                        result.MessageType,
                        result.EndOfMessage,
                        CancellationToken.None);

                    result = await webSocket.ReceiveAsync(
                        new ArraySegment<byte>(buffer), CancellationToken.None);
                }

                await webSocket.CloseAsync(
                    result.CloseStatus.Value,
                    result.CloseStatusDescription,
                    CancellationToken.None);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"WebSocket error: {ex.Message}");
                Console.WriteLine($"Exception details: {ex.StackTrace}");
            }
        }
        else
        {
            context.Response.StatusCode = 400;
            await context.Response.WriteAsync("Expected a WebSocket request");
        }
    }
    else
    {
        await next();
    }
});

app.Run();