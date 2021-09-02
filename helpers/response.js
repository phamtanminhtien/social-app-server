const Err = (code, message) => {
  return {
    success: false,
    code: code,
    message: message,
  };
};

const Data = (data) => {
  return {
    success: true,
    data: data,
  };
};

module.exports = { Err, Data };
