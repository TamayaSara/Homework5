const { Pool } = require('pg');

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'favlinks',
  password: 'password',
  port: 5432,
});

const getLinks = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM links ORDER BY id ASC');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching links:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createLink = async (req, res) => {
  const { title, url } = req.body;
  try {
    await pool.query('INSERT INTO links (title, url) VALUES ($1, $2)', [title, url]);
    res.status(201).send('Link created successfully');
  } catch (error) {
    console.error('Error creating link:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateLink = async (req, res) => {
  const linkId = req.params.id;
  const { title, url } = req.body;
  try {
    await pool.query('UPDATE links SET title = $1, url = $2 WHERE id = $3', [title, url, linkId]);
    res.status(200).send('Link updated successfully');
  } catch (error) {
    console.error('Error updating link:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteLink = async (req, res) => {
  const linkId = req.params.id;
  try {
    await pool.query('DELETE FROM links WHERE id = $1', [linkId]);
    res.status(200).send('Link deleted successfully');
  } catch (error) {
    console.error('Error deleting link:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getLinks,
  createLink,
  updateLink,
  deleteLink,
};

//With the corrected code, you have the getLinks, createLink, updateLink, and deleteLink functions defined as request handlers in your Express server. 