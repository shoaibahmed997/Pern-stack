const express = require('express')
const app = express()
const cors = require('cors')
const pool  = require('./database')
app.use(cors())
app.use(express.json())

// ROUTES

// create a todo
app.post('/todos',async (req,res)=>{
    try {
        const {description} = req.body
        const newtodo = await pool.query("INSERT INTO todo (description) VALUES($1)",[description])
        res.json({message:'Todo Added'})
        console.log('post request served')
    } catch (error) {
        console.error(error)
    }
})

// get all todo
app.get('/todos',async (req,res)=>{
    try {
        const data =await pool.query("SELECT * FROM todo")
    res.send(data.rows)
    console.log('get all todo request served')
    }
    catch (error) {
        console.error(error)
    }
})

// get a todo
app.get('/todos/:id',async (req,res)=>{
    try {
        const {id} = req.params
        const data = await pool.query('SELECT * FROM todo WHERE todo_id=$1',[id])
        res.json(data.rows)
    } catch (error) {
        console.error(error)
    }
})

// update a todo

app.put('/todos/:id',async(req,res)=>{
    try {
        const {id} = req.params
        const {description} = req.body
        const data = await pool.query('UPDATE todo SET description=$1 WHERE todo_id=$2',[description,id])
        res.json({message:'Todo was updated'})
        console.log('update request served')

    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

// delete a todo
app.delete('/todos/:id',async(req,res)=>{
    try {
        const {id} = req.params
        const data = await pool.query('DELETE FROM todo WHERE todo_id=$1',[id])
        res.json({message:"Todo was deleted"})
        console.log('delete request served')

    } catch (error) {
        console.log(error)
    }
})



app.listen(5000,()=>{
    console.log('the server has started on port 5000')
}); 