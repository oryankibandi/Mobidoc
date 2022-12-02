let corsOptionsDelegate = (req, callback) => {
  var corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };
  // if (allowlist.indexOf(req.header('Origin')) !== -1) {
  //   corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  // } else {
  //   corsOptions = { origin: false } // disable CORS for this request
  // }

  callback(null, corsOptions); // callback expects two parameters: error and options
};

module.exports = corsOptionsDelegate;
