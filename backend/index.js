import express from express;
import topUser from './routes/topUser';
import topPost from './routes/topPost';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {   
    res.send('Hello World');
});

app.use('/goMart', topUser);
app.use('/goMart', topPost);

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});