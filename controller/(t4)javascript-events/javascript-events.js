const { executeQuery } = require('../../database_functions/executeQuery');

const t4_javascript_events = async (req, res) => {
    try{
    result = await executeQuery('combinedTask', `select firstname,lastname from users_task12 where id=${req.id} and status=1;`);
    res.render('./(t4)javascript-events/javascript-events.ejs', { firstname: result[0]['firstname'], lastname: result[0]['lastname'] });
    }
catch (err) {
    res.redirect('/error');
}
};
module.exports = t4_javascript_events;