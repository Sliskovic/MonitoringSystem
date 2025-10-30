import jsonServer from 'json-server';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SECRET_KEY = 'THIS_IS_A_SECRET_KEY_12345';
const ACCESS_EXPIRES_IN = '1h';
const REFRESH_EXPIRES_IN = '7d';
const PORT = 3001;

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const defaults = jsonServer.defaults();
const refreshStore = new Set();

const signAccess = (payload) => jwt.sign(payload, SECRET_KEY, { expiresIn: ACCESS_EXPIRES_IN });
const signRefresh = (payload) => jwt.sign({ ...payload, type: 'refresh' }, SECRET_KEY, { expiresIn: REFRESH_EXPIRES_IN });
const verify = (token) => jwt.verify(token, SECRET_KEY);

const handleLogin = (req, res) => {
  const { username, password } = req.body;
  const user = router.db.get('users').find({ username, password }).value();

  if (!user) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  const { password: _pw, ...userWithoutPassword } = user;
  const token = signAccess({ id: user.id, username, role: user.role });
  const refreshToken = signRefresh({ id: user.id, username, role: user.role });

  refreshStore.add(refreshToken);
  return res.status(200).json({ token, refreshToken, user: userWithoutPassword });
};
const handleRefresh = (req, res) => {
  const { refreshToken } = req.body || {};
  if (!refreshToken || !refreshStore.has(refreshToken)) {
    return res.status(401).json({ message: 'Invalid or missing refresh token' });
  }

  try {
    const payload = verify(refreshToken);
    if (payload?.type !== 'refresh') throw new Error('Invalid token type');

    refreshStore.delete(refreshToken);
    const newAccess = signAccess({ id: payload.id, username: payload.username, role: payload.role });
    const newRefresh = signRefresh({ id: payload.id, username: payload.username, role: payload.role });
    refreshStore.add(newRefresh);

    return res.status(200).json({ token: newAccess, refreshToken: newRefresh });
  } catch {
    return res.status(401).json({ message: 'Expired or invalid refresh token' });
  }
};

const exposeHeadersMiddleware = (req, res, next) => {
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  next();
};
const protectionMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS' || req.path.startsWith('/api/auth')) {
    return next();
  }

  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Missing or invalid Authorization header' });
  }

  try {
    req.user = verify(token);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
const remapSearchQueryMiddleware = (req, res, next) => {
  if (req.query && req.query.searchQuery) {
    req.query.q = req.query.searchQuery;
    delete req.query.searchQuery;
  }
  next();
};

server.use(defaults);
server.use(jsonServer.bodyParser);
server.use(exposeHeadersMiddleware);
server.use(remapSearchQueryMiddleware);

server.post('/api/auth/login', handleLogin);
server.post('/api/auth/refresh', handleRefresh);

server.use(protectionMiddleware);
server.use('/api', router);

server.listen(PORT, () => {
  console.log(`JSON Server with JWT (access+refresh) running on http://localhost:${PORT}`);
});