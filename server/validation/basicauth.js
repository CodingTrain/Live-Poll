function isAuthenticated(req, res) {
  // parse login and password from headers
  const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
  const [login, password] = Buffer.from(b64auth, "base64")
    .toString()
    .split(":");

  // Verify login and password are set and correct
  if (
    login &&
    password &&
    login === process.env.LOGIN_USERNAME &&
    password === process.env.LOGIN_PASSWORD
  ) {
    return true;
  }

  // Access denied...
  res.set("WWW-Authenticate", 'Basic realm="401"'); // change this
  res.status(401).send("Authentication required."); // custom message
  return false;
}

module.exports = { isAuthenticated };
