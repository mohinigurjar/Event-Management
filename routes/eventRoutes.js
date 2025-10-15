const express = require('express');
const eventService = require('../services/eventService');
const eventRouter = express.Router();

//create event
eventRouter.post('/events', eventService.createEvent);

//get all events
eventRouter.get('/events', getAllEvents);

//register for an event
eventRouter.put('/events/:id/register', registerForEvent);

//cancel event registration
eventRouter.put('/events/:id/cancel-registration', cancelEventRegistration);

//list upcoming events
eventRouter.get('/events/upcoming', listUpcomingEvents);

//particular event details
eventRouter.get('/events/:id', getEventDetails);

module.exports = eventRouter;