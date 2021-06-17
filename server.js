const express = require('express')
const app = express()

app.get('/getAllTasks', (req, res) => {
    console.log('getAllTasks')
    res.json('tasks')
})
app.listen(4000, () => {
    console.log('alo')
})
