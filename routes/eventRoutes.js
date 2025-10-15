const express = require('express');
const eventService = require('../services/eventService');
const eventRouter = express.Router();

//create event
eventRouter.post('/events', eventService.createEvent);

//get all events
eventRouter.get('/events', eventService.getAllEvents);

//register for an event
eventRouter.put('/events/:id/register', eventService.registerForEvent);

//cancel event registration
eventRouter.put('/events/:id/cancel-registration', eventService.cancelEventRegistration);

//list upcoming events
eventRouter.get('/events/upcoming', eventService.listUpcomingEvents);

//particular event details
eventRouter.get('/events/:id', eventService.getEventDetails);

module.exports = eventRouter;