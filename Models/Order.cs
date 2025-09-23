// Backend/Models/Order.cs
using System.ComponentModel.DataAnnotations;

namespace OrderSystem.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        
        [Required]
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public decimal TotalAmount { get; set; }
        
        public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
    }
}