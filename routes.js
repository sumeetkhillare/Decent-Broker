const routes = require('next-routes')();
routes
.add('/contracts/new','/contracts/new')
.add('/contracts/:address/requests','/contracts/requests/index')
.add('/contracts/:address','/contracts/show')
.add('/contracts/:address/requests/new','/contracts/requests/new')
.add('/contracts/:address/suggestions','/contracts/suggestions');

module.exports=routes;
