import express from 'express';
import s3 from "./s3"

const app = express();

app.use(express.static('front'))

app.get('/s3', (req, res) => {
    const url = await s3.generateUploadURL()
    res.send({url});
})

app.listen(8454, () => console.log(`server listening at 8454`))