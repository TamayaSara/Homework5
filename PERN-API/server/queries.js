const { Pool } = require('pg');

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'favlinks',
  password: 'password',
  port: 5432,
});


const getLinks = (req, res) => {
  pool.query('SELECT * FROM links ORDER BY id ASC', (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
};

const createLink = (req, res) => {
  const { title, url } = req.body;
  pool.query(
    'INSERT INTO links (title, url) VALUES ($1, $2)',
    [title, url],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(201).send('Link created successfully');
    }
  );
};

const updateLink = (req, res) => {
  const linkId = req.params.id;
  const { title, url } = req.body;
  pool.query(
    'UPDATE links SET title = $1, url = $2 WHERE id = $3',
    [title, url, linkId],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).send('Link updated successfully');
    }
  );
};

const deleteLink = (req, res) => {
  const linkId = req.params.id;
  pool.query('DELETE FROM links WHERE id = $1', [linkId], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).send('Link deleted successfully');
  });
};

module.exports = {
  getLinks,
  createLink,
  updateLink,
  deleteLink,
};
//With the corrected code, you have the getLinks, createLink, updateLink, and deleteLink functions defined as request handlers in your Express server. 