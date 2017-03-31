using System.Web.Http;

namespace JoinMe.Controllers
{
    public class AppController : ApiController
    {
        [HttpGet, HttpPost]
        public IHttpActionResult Index()
        {
            return Ok("toto");
        }
    }
}