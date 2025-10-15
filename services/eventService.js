
const pool = require('../config/db');


async function createEvent(req, res, next) {
    const { title, date, capacity, location } = req.body;

    if (!title || !date || !capacity || !location) {
        return res.status(400).json({ status: 400, error: 'All fields are required' });
    }
    if (capacity <= 0 || capacity > 1000) {
        return res.status(400).json({ status: 400, error: 'Capacity must be between 1 and 1000' });
    }

    const result = await pool.query(
        'insert into events (title, date, capacity, location) values ($1, $2, $3, $4) returning id',
        [title, date, capacity, location]
    );
    res.status(201).json({ status: 201, data: { eventId: result.rows[0].id } });

}

async function getAllEvents(req, res, next) {
    const result = await pool.query('select * from events order by date ASC, location ASC');
    res.status(200).json({ status: 200, data: result.rows });
}

async function registerForEvent(req, res, next) {
    let eventId  = req.params.id;
    const { name, email } = req.body;

    if (!eventId || !name || !email) {
        return res.status(400).json({ status: 400, error: 'Event id, name and email are required' });
    }

    eventId = parseInt(eventId);

    let userId;
        const userResult = await pool.query('select id from users where email = $1', [email]);
        if (userResult && userResult.rows.length > 0) {
            userId = userResult.rows[0].id;
        } else {
            const newUserResult = await pool.query(
                'insert into users (name, email) values ($1, $2) returning id', 
                [name, email]
            );
            userId = newUserResult.rows[0].id;
        }

        if(!userId) {
            return res.status(400).json({ status: 400, error: 'Failed to create or fetch user' });
        }

    try {
        const result = await pool.query(
            'insert into registrations (eventId, userId) values ($1, $2) returning registration_id',
            [eventId, userId]
        );
        res.status(201).json({ status: 201, data: { registrationId: result.rows[0].registration_id } });
    } catch (error) {
        next(error);
    }
}

async function cancelEventRegistration(req, res, next) {
    const registrationId = req.params.id;

    if (!registrationId) {
        return res.status(400).json({ status: 400, error: 'Registration id is required' });
    }
    const result = await pool.query('delete from registrations where id = $1 returning id', [registrationId]);
    if (result.rows.length === 0) {
        return res.status(404).json({ status: 404, error: 'Registration not found' });
    }
    res.status(200).json({ status: 200, data: { id: result.rows[0].id } });

}

async function listUpcomingEvents(req, res, next) {
    const result = await pool.query('select * from events where date >= NOW() order by date ASC, location ASC');
    res.status(200).json({ status: 200, data: result.rows });

}

async function getEventDetails(req, res, next) {
    const eventId = req.params.id;

    if (!eventId) {
        return res.status(400).json({ status: 400, error: 'Event id is required' });
    }

    const result = await pool.query('select * from events where id = $1', [eventId]);
    if (result.rows.length === 0) {
        return res.status(404).json({ status: 404, error: 'Event not found' });
    }

    const registrations = await pool.query('select count(*) from registrations where eventId = $1', [eventId]);
    const totalRegistrations = parseInt(registrations.rows[0].count, 10);

    const resp = {
        remainingCapacity: result.rows[0].capacity - totalRegistrations,
        totalRegistrations: totalRegistrations,
        capacityUsedPercentage: ((totalRegistrations / result.rows[0].capacity) * 100).toFixed(2),
    }

    res.status(200).json({ status: 200, data: resp });
}



module.exports = {
    createEvent,
    getAllEvents,
    registerForEvent,
    cancelEventRegistration,
    listUpcomingEvents,
    getEventDetails
}