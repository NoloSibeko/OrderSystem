    public class CreateOrderDTO
    {    public int CustomerId { get; set; } 
    public List<CreateOrderItemDTO> Items { get; set; } = new();
    }