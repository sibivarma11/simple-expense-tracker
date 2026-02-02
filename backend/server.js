const express = require('express')
const mongoose = require("mongoose");
const app = express()
const PORT = 8006
const cors = require('cors')

app.use(express.json())
app.use(cors())
mongoose.connect("mongodb://localhost:27017/expense_tracker");
app.use('/api/expense', require('./src/routes/expenseRoutes'))
app.listen(PORT, ()=> console.log(`server is running on http://localhost:${PORT}`))