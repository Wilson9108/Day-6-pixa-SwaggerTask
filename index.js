
let {dbConnect} = require('./config/dbConnect')
dbConnect("mongodb://127.0.0.1:27017/swagger")
let {userRouter}  = require('./routers/user')
let express = require('express')
let app = express()
app.use(express.json())
app.use('/api/user',userRouter)

const yaml = require('js-yaml')
const fs = require('fs')
const swaggerUi = require('swagger-ui-express')

const swaggerDocument = yaml.load(fs.readFileSync('./openapi.yaml','utf-8'))
console.log(swaggerDocument.paths)
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument))

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.listen(2025,()=>{
    console.log(`your port is running on 2025`)
})