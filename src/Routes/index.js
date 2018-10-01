//Agregar Url para poder acceder desde el navegador
const router = require('express').Router();

router.get('/',(req, res , next) => {
    res.render('index.html');

});

module.exports = router;