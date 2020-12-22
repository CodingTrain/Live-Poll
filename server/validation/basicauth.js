// Middleware function that blocks the route unless basicauth headers are present
function requiresAuthentication(req, res, next) {
  // parse login and password from headers
  const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
  const [login, password] = Buffer.from(b64auth, "base64")
    .toString()
    .split(":");

  // Verify login and password are set and correct and allow the request to continue
  if (
    login &&
    password &&
    login === process.env.LOGIN_USERNAME &&
    password === process.env.LOGIN_PASSWORD
  ) {
    next();
  } else {
    // Access denied! end the request-response cycle
    res.set("WWW-Authenticate", 'Basic realm="401"'); // change this
    res.status(401).send("Authentication required."); // custom message
  }
}

module.exports = {requiresAuthentication};
