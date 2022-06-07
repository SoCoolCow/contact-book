var express = require('express');
const { model } = require('mongoose');
var router = express.Router();
var Contact = require('../models/Contact');




router.get('/', function(req, res){
    Contact.find({}, function(err, contacts){
      console.log('@@@@@@@@@@@ : ',contacts)
      if(err) return res.json(err);
      res.render('contacts/index', {abc:contacts});
    });
  });
  // Contact - New
  router.get('/new', function(req, res){
    res.render('contacts/new');
  });
  // Contact - create
  router.post('/', function(req, res){
    Contact.create(req.body, function(err, contact){
      if(err) return res.json(err);
      res.redirect('/contacts');
    });
  });
  
  //Contact - show
  router.get('/:id', function(req, res){
    Contact.findOne({_id:req.params.id}, function(err, contact){
      if(err) return res.json(err);
      res.render('contacts/show', {contact:contact});
    
  });
  });
  // Contacts - edit
  router.get('/:id/edit', function(req, res){
    Contact.findOne({_id:req.params.id}, function(err, contact){
      if(err) return res.json(err);
      res.render('contacts/edit', {contact:contact});
  
    });
  });
  // Contacts - update
  router.put('/:id', function(req, res){
    Contact.findOneAndUpdate({_id:req.params.id}, req.body, function(err, contact){
      if(err) return res.json(err);
      res.redirect('/contacts/'+req.params.id);
    });
  });
  // Contacts - destroy
  router.delete('/:id', function(req, res){
    Contact.deleteOne({_id:req.params.id}, function(err){
      if(err) return res.json(err);
      res.redirect('/contacts');
    });
  });

  module.exports = router;