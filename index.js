import express from 'express';

const app=express();
// parse application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());
app.use(express.static('public'));

const greetings = {
    'english' : 'Hello'
}



//http://localhost:4001/api/greet?username=Sabelo
app.get("/api/greet",function(req,res){
    const username=req.query.username;
    const language = req.query.language;

    if (!greetings [language]) {
        return res.json({
            error : 'Invalid language supplied'
        })
    };

    const greeting = greetings [language];
     res.json({
        message: `${greeting}, ${username}!`
  })
});

app.post('/api/greet', function(req, res) {
 
// add an entry to our greetings map 
const language = req.body.language
greetings [language] = req.body.greeting
res.json ({
    status: 'success',
    message: 'Added a greeting for ${language}'
});

});

//http://localhost:4001/api/greet/Sabelo
app.get("/api/greet/:username",function(req,res){
    console.log(req.params);
    const username=req.params.username;
  res.json({
    message: `Hello, ${username}!`
  });
});


const PORT=4001;
app.listen(PORT,function(){
    console.log(`app started on PORT ${PORT}`)
});