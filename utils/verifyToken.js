import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken; // Assuming the cookie is named 'accessToken'

  if (!token) {
    return res.status(401).json({ error: "Access token is missing in cookies" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user; // Attach user information to the request object
    next();
  });
};
