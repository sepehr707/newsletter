import express from 'express';
import {router as newsletter} from "./routes/newsletter.routes";
import {cronJob} from './jobs/sendMail.job'
const app = express();

app.use(express.json());
cronJob.start();
app.use('/api/newsletter', newsletter);
app.get('/', (req, res) => {
  res.send('Well done!')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App is listening on ${PORT}`));
