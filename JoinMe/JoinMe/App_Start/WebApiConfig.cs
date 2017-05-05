using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace JoinMe
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Configuration et services API Web

            // Itinéraires de l'API Web
            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute(
                name: "JoinMe",
            routeTemplate: "JoinMeService/{controller}/{action}/{id}",
              defaults: new { controller = "Service", action = "index", id = RouteParameter.Optional }
            );
            var json = config.Formatters.JsonFormatter;
            json.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.Objects;
            config.Formatters.Remove(config.Formatters.XmlFormatter);
        }
    }
}