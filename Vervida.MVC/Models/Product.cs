public record Product(
    int Id,
    string Title,
    decimal Price,
    string Category,
    string Description,
    string Image,
    RatingInfo Rating
);

public record RatingInfo(decimal Rate, int Count);