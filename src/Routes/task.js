const router = require('express').Router();
const mongojs = require('mongojs');

//Conectar base de datos
const db = mongojs('mean-db',['tasks']);


router.get('/tasks',(req , res, next) =>{
     db.tasks.find((err, tasks) => {
         if(err) return next(err);
         res.json(tasks);
     });
});
//Obtener datos
router.get('/tasks/:id',(req , res, next) =>{
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)},(err, task) => {
        if(err) return next(err);
        res.json(task);
    });
});
//Post
router.post('/tasks',(req, res, next) =>{
//Req.body trae informacion del cliente
    const task = req.body;
    if(!task.title ||!(task.isDone + '') ){
        res.status(400).json({
           error: 'Bad Data'
            
        });
    } else{
        db.tasks.save(task, (err , task)=>{
            if(err) return next(err);
            res.json(task);
        });
    }
});
//Delete
router.delete('/tasks/:id',(req, res, next) => {
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, (err, result) =>{
        if(err) return next(err);
        res.json(result);
    });
});
//Actualizar
router.put('/tasks/:id', (req, res, next) => {
    const task = req.body;
    let updateTask = {};
    
    if(task.isDone) {
        updateTask.isDone = task.isDone;
    }
    if(task.title) {
        updateTask.title = task.title;
    }
    if(!updateTask) {
        res.status(400);
        res.json({'error': 'bad request'});
    } else {
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updateTask, {}, (err, task) => {
            if (err) return next(err);
            res.json(task);
        });
    }
});

module.exports= router;