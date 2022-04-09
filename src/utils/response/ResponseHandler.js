const returnResponse = ({ code, msg, data }, res) => {
  res.status(code).json({
    code,
    msg,
    data,
  });
};

module.exports = returnResponse;
