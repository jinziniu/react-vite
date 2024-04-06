import express from 'express';
import cors from 'cors';
import * as Vonage from '@vonage/server-sdk';
import dotenv from 'dotenv';
// 在么
// 好
dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());

// 使用环境变量初始化 Vonage 客户端
const vonage = new Vonage.Vonage({
apiKey: "6cabd07a",
apiSecret: "QPFC9przDZOOs5Th"
});

// 发送 SMS 的路由
app.post('/send-sms', async (req, res) => {
  const { to, from, text } = req.body;
  
  console.log('Received request to send SMS:');
  console.log('To:', to);
  console.log('From:', from);
  console.log('Text:', text);

  try {
    const responseData = await vonage.sms.send({from, to, text});
    console.log('sms result ============>', responseData);
    if (responseData.messages[0].status === '0') {
      console.log('Message sent successfully');
      res.json({ message: 'Message sent successfully', data: responseData });
    } else {
      console.error('Message failed with error:', responseData.messages[0]['error-text']);
      res.status(500).json({ error: 'Message failed with error', details: responseData.messages[0]['error-text'] });
    }
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ error: 'Error sending message', details: err });
  }
});

// 根路由处理程序
app.get('/', (req, res) => {
  res.send('Welcome to the SMS service!');
});

const PORT = process.env.PORT || 3173;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
