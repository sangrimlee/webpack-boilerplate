const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`${PORT}번 포트에서 실행 중입니다!\n`);
});
