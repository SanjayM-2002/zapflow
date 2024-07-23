import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';
console.log('hello');
const app = express();

const PORT = process.env.PORT || 3000;

const client = new PrismaClient();
app.use(express.json());
app.use(cors());

// url format: https://hooks.zapier.com/hooks/catch/135136dvzfv/684dfvdzfv

app.get('/hooks/health', (req, res) => {
  res.status(200).json({ message: 'Hooks server is healthy' });
});

app.post('/hooks/catch/:userId/:zapId', async (req, res) => {
  const userId = req.params.userId;
  const zapId = req.params.zapId;
  const body = req.body;

  await client.$transaction(async (tx) => {
    const run = await tx.zapRun.create({
      data: {
        zapId: zapId,
        metadata: body,
      },
    });
    await tx.zapRunOutbox.create({
      data: {
        zapRunId: run.id,
      },
    });
  });
  res.status(200).json({
    message: 'Webhook recieved',
  });
});

app.listen(PORT, () => {
  console.log(`Hooks server listening in http://localhost:${PORT}`);
});
