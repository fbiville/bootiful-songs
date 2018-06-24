module.exports = (req, res, next) => {
  const send = res.send;
  res.send = function (body) {
    if (body.indexOf("\"id\"") >= 0) {
      const json = JSON.parse(body);
      delete json.id;
      body = JSON.stringify(json);
    }
    send.call(this, body);
  };
  next();
};
