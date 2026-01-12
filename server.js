const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>DevOps Demo</title></head>
      <body style="font-family: Arial; text-align: center; padding: 50px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <h1 style="color: white;">🚀 DevOps CI/CD Pipeline Demo</h1>
        <p style="color: white; font-size: 20px;">Successfully Deployed with Jenkins!</p>
        <p style="color: #f0f0f0;">Version: 1.0.0</p>
      </body>
    </html>
  `);
});
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
