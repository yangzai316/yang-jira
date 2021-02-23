module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/login') {
    return res.status(200).json({
      user: { token: '1234' },
    });
  } else {
    return res.status(400).json({
      message: '用户名或密码错误',
    });
  }
};
