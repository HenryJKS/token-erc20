const routes = require("next-routes")();

routes
  .add("/mytoken/minttoken", "/mytoken/minttoken")
  .add("/mytoken/burntoken", "/mytoken/burntoken")
  .add("/mytoken/transfertoken", "/mytoken/transfertoken")

module.exports = routes;
