const app =  require('express')();
const PORT = process.env.PORT || 3000;
const router =  require('./src/Router/router');



app.use('/',router.router);

app.listen(PORT);
