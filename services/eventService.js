
const pool = require('../config/db');


async function createEvent(req) {
    const { title, date, capacity, location } = req.body;

    if (!title || !date || !capacity || !location) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    if (capacity <= 0 || capacity > 1000) {
        return res.status(400).json({ error: 'Capacity must be between 1 and 1000' });
    }

    const result = await pool.query(
        'INSERT INTO events (title, date, capacity, location) VALUES ($1, $2, $3, $4) RETURNING id',
        [title, date, capacity, location]
    );
    return result.rows[0];

}

async function getAllEvents(req) {

}

async function registerForEvent(req) {

}

async function cancelEventRegistration(req) {

}

async function listUpcomingEvents(req) {

}

async function getEventDetails(req) {

}

module.exports = {
    createEvent,
    getAllEvents,
    registerForEvent,
    cancelEventRegistration,
    listUpcomingEvents,
    getEventDetails
}