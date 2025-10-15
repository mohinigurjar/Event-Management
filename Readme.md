# Setup Instructions 

## Prerequisites
<ol>
<li> Download and install <a>Node.js</a>
<li> Download and install <a>PostgreSQL</a>
</ol>

## Installation

First clone the repository with the following commands:

<pre><code>git clone https://github.com/mohinigurjar/Event-Management.git
cd /Event-Management
code .
</code></pre>

Then start by installing npm, write the following commands:

<pre><code>npm i
node app.js
</code></pre>


## APIs

<ul>
<li> POST - /api/events - for creating events
<li> GET - /api/events - for listing all events
<li> GET - /api/events/upcoming - for listing upcoming events
<li> GET - /api/events/:id - for listing details of a particular event
<li> PUT - /api/events/:id/register - for registering a user for an event 
<li> PUT - /api/events/:id/cancel-registration - for cancelling a particular registration
</ul>



