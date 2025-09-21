using Microsoft.AspNetCore.Mvc;
//using OrderSystem.DTOs;
using OrderSystem.Services.Interfaces;

namespace OrderSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        // POST: api/orders
        [HttpPost]
        public async Task<ActionResult<OrderDTO>> Create([FromBody] CreateOrderDTO dto)
        {
            var order = await _orderService.CreateAsync(dto);
            return CreatedAtAction(nameof(Get), new { id = order.OrderId }, order);
        }

        // GET: api/orders/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDTO>> Get(int id)
        {
            var order = await _orderService.GetAsync(id);
            if (order == null)
                return NotFound();

            return Ok(order);
        }

        // PUT: api/orders/{id} — update basket
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CreateOrderDTO dto)
        {
            await _orderService.UpdateAsync(id, dto);
            return NoContent();
        }
    }
}
