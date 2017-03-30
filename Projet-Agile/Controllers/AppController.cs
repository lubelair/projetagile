using System.Web.Http;

namespace Projet_Agile.Controllers
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