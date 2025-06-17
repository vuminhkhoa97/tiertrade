/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import jsonServer from 'json-server';
import products from './raw-data/products.json';
import authors from './raw-data/authors.json';
import categories from './raw-data/categories.json';
import themes from './raw-data/themes.json';
import tiers from './raw-data/tiers.json';
import images from './raw-data/images.json';

const app = express();

const db = {
  products,
  authors,
  categories,
  themes,
  tiers,
  images,
};

// JSON Server setup
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

// Use JSON Server middlewares
app.use(middlewares);

// Use JSON Server router for data endpoints
app.use('/', router);

app.use('/products/get-totals', (_, res) => {
  const total = db.products.length;
  res.json({ total });
});

const port = process.env.PORT || 5005;
const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
server.on('error', console.error);
