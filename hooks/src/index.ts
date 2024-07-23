import express from 'express';
console.log('hello');
const app = express();

const PORT = process.env.PORT || 3000;

// url format: https://hooks.zapier.com/hooks/catch/135136dvzfv/684dfvdzfv

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Hooks server is healthy' });
});

app.listen(PORT, () => {
  console.log(`Hooks server listening in http://localhost:${PORT}`);
});
