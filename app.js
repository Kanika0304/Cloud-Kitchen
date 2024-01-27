// app.js

const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3000;

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'cakes'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to the database!');
});

// Middleware for JSON data parsing
app.use(express.json());

// Get all cakes
// Add these endpoints to your existing Node.js app

// Get all orders
app.get('/orders', (req, res) => {
    connection.query('SELECT * FROM orders', (error, results) => {
      if (error) {
        console.error('Error querying the database:', error);
        res.status(500).json({ error: 'Database error' });
      } else {
        res.json(results);
      }
    });
  });
  
  // Get a specific order by ID
  app.get('/orders/:id', (req, res) => {
    const orderId = req.params.id;
    connection.query('SELECT * FROM orders WHERE id = ?', [orderId], (error, results) => {
      if (error) {
        console.error('Error querying the database:', error);
        res.status(500).json({ error: 'Database error' });
      } else {
        if (results.length === 0) {
          res.status(404).json({ error: 'Order not found' });
        } else {
          res.json(results[0]);
        }
      }
    });
  });
  
  // Create a new order
  app.post('/orders', (req, res) => {
    const { customer_name, email, phone_number, food_item, delivery_address } = req.body;
    connection.query('INSERT INTO orders (customer_name, email, phone_number, food_item, delivery_address) VALUES (?, ?, ?, ?, ?)',
      [customer_name, email, phone_number, food_item, delivery_address],
      (error, results) => {
        if (error) {
          console.error('Error inserting into the database:', error);
          res.status(500).json({ error: 'Database error' });
        } else {
          res.status(201).json({ message: 'Order placed successfully', orderId: results.insertId });
        }
      }
    );
  });
  
  // Update an order by ID
  app.put('/orders/:id', (req, res) => {
    const orderId = req.params.id;
    const { customer_name, email, phone_number, food_item, delivery_address } = req.body;
    connection.query('UPDATE orders SET customer_name = ?, email = ?, phone_number = ?, food_item = ?, delivery_address = ? WHERE id = ?',
      [customer_name, email, phone_number, food_item, delivery_address, orderId],
      (error, results) => {
        if (error) {
          console.error('Error updating the database:', error);
          res.status(500).json({ error: 'Database error' });
        } else {
          if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Order not found' });
          } else {
            res.json({ message: 'Order updated successfully' });
          }
        }
      }
    );
  });
  
  // Delete an order by ID
  app.delete('/orders/:id', (req, res) => {
    const orderId = req.params.id;
    connection.query('DELETE FROM orders WHERE id = ?', [orderId], (error, results) => {
      if (error) {
        console.error('Error deleting from the database:', error);
        res.status(500).json({ error: 'Database error' });
      } else {
        if (results.affectedRows === 0) {
          res.status(404).json({ error: 'Order not found' });
        } else {
          res.json({ message: 'Order deleted successfully' });
        }
      }
    });
  });
  
// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
