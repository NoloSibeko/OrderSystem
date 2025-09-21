namespace OrderSystem.Models
{
    public class Customer
    {
        public int CustomerId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string AddressType { get; set; } = string.Empty;
        public string StreetAddress { get; set; } = string.Empty;
        public string Suburb { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string PostalCode { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty; 
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
