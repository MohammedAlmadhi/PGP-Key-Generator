const express = require('express');
const router = express.Router();
const Key = require('../models/Key');

// Middleware to check if user is logged in
isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/user/login');
}

// Route to render the key generation page
router.get('/', (req, res) => {
  res.render('event/generateKey', {
    title: 'PGP Key Generator',
    activePage: 'home'
  });
});

// Route to handle key generation
router.post('/', isAuthenticated, async (req, res) => {
  const { name, email, algorithm, keySize, expires, passphrase, publicKey, privateKey } = req.body;

  try {
    const newKey = new Key({
      userId: req.user._id,
      name,
      email,
      algorithm,
      keySize,
      expires: new Date(Date.now() + expires * 365 * 24 * 60 * 60 * 1000), // convert years to milliseconds
      passphrase,
      publicKey,
      privateKey
    });

    await newKey.save();
    req.flash('success', 'PGP Key generated successfully');
    res.redirect('/user/profile');
  } catch (error) {
    console.error('Error generating PGP Key:', error);
    req.flash('error', 'Failed to generate PGP Key');
    res.redirect('/event/generateKey');
  }
});

// Route to handle key deletion
router.post('/delete/:id', isAuthenticated, async (req, res) => {
  try {
    await Key.findByIdAndDelete(req.params.id);
    req.flash('success', 'Key deleted successfully');
    res.redirect('/user/profile');
  } catch (error) {
    console.error('Error deleting key:', error);
    req.flash('error', 'Failed to delete key');
    res.redirect('/user/profile');
  }
});

// Route to render the edit key page
router.get('/edit/:id', isAuthenticated, async (req, res) => {
  try {
    const key = await Key.findById(req.params.id);
    if (!key || key.userId.toString() !== req.user._id.toString()) {
      req.flash('error', 'You are not authorized to edit this key');
      return res.redirect('/user/profile');
    }
    res.render('event/editKey', {
      title: 'Edit PGP Key',
      activePage: 'home',
      key
    });
  } catch (error) {
    console.error('Error fetching key:', error);
    req.flash('error', 'Failed to fetch key for editing');
    res.redirect('/user/profile');
  }
});

// Route to handle key update
router.post('/edit/:id', isAuthenticated, async (req, res) => {
  const { name, email, algorithm, keySize, expires, passphrase, publicKey, privateKey } = req.body;

  try {
    const key = await Key.findById(req.params.id);
    if (!key || key.userId.toString() !== req.user._id.toString()) {
      req.flash('error', 'You are not authorized to edit this key');
      return res.redirect('/user/profile');
    }

    key.name = name;
    key.email = email;
    key.algorithm = algorithm;
    key.keySize = keySize;
    key.expires = new Date(Date.now() + expires * 365 * 24 * 60 * 60 * 1000); // convert years to milliseconds
    key.passphrase = passphrase;
    key.publicKey = publicKey;
    key.privateKey = privateKey;

    await key.save();
    req.flash('success', 'Key updated successfully');
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating key:', error);
    req.flash('error', 'Failed to update key');
    res.json({ success: false, message: 'Failed to update key' });
  }
});


module.exports = router;
