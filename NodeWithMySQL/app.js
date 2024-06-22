const express = require('express');
const app=express();

const pool = require('./db');

//Middleware parse JSON bodies
app.use(express.json());

app.get('/employee', async(req,res)=>{
    try{
        const[rows] = await pool.query('SELECT * FROM EMPLOYEES');
        res.status(200).json(rows);
    }
    catch(error){
        res.status(500).json({error:'Database Error'})
    }
});

app.post('/employee', async(req,res)=>{
    const {first_name, last_name} = req.body;
    try{
        const[rows] = await pool.query('INSERT INTO EMPLOYEES(FIRST_NAME, LAST_NAME) VALUES(?,?)',[first_name, last_name]);
        res.status(200).json({message: "employee inserted"});
    }
    catch(error){
        res.status(500).json({error:'Database Error'})
    }
});

app.put('/employee/:id', async(req,res)=>{
    const {first_name, last_name} = req.body;
    try{
        const result = await pool.query('UPDATE EMPLOYEES SET FIRST_NAME=?, LAST_NAME=? WHERE ID=?',[first_name, last_name, req.params.id]);

        if(result.affectedRows == 0){
            res.status(404).json({error:'Employee not found'})
        }
        res.status(200).json({message: 'Employee updated'})
    }
    catch(error){
        res.status(500).json({error:'Database Error'})
    }
});

app.listen(3001, ()=>{
    console.log('server running')
})