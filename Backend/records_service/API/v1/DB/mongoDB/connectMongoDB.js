const connect = async (odm, url) => {
  try {
    await odm.connect(url);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = connect;
