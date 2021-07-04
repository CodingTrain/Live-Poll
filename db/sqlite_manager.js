import sqlite3 from 'sqlite3'

let db = new sqlite3.Database('./polls.db')

// # Creates a new table (if one does not already exists).
// # Each new row has to have the following template:
// #    - id (automatically added).
// #    - pollID (identifier for polls).
// #    - optionID (identifier for poll option).
// #    - score (how many votes a poll option has).
export function createNewPollTable() {
    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS Poll (
                id       INTEGER PRIMARY KEY AUTOINCREMENT,
                pollID   TEXT,
                optionID TEXT,
                score    INTEGER
            );
        `)
    })
}

// # Inserts into Poll table, using one <pollID>
// # and one or many pollID (depending on how
// # many elements are in <optionIDs> array).
// # 
// # Note: <safetyToggle> (bool) == true 
// # will prevent db duplicates by checking 
// # the db if a record already exists. This
// # will naturally come with a performance hit.
export function createPoll(pollID, optionIDs, safeToggle=true) {
    let stmt = db.prepare(`
        INSERT INTO Poll (pollID, optionID, score)
             VALUES (?,?,0)
    `)
    optionIDs.forEach(optID => {
        if (safeToggle) {
            // # Only insert new poll option if it 
            // # does not exist in the db. 
            pollOption(pollID, optID, (err, row) => {
                if (!row) {
                    stmt.run(pollID, optID)
                }
            })
        } else {
            // # Insert without checking if a poll
            // # option is already in the db.
            stmt.run(pollID, optID)
        }

    })
}

// # Increments the score/vote count of a poll
// # option using <pollID> and <optionID>.
export function incrementOption(pollID, optionID) {
    let stmt = db.prepare(`
        UPDATE Poll
           SET score = score + 1
         WHERE pollID = ?
           AND optionID = ?
    `)
    stmt.run(pollID, optionID)
}

// # Retrieve _all_ poll options associated
// # with a <pollID>. Value(s)/result(s) are 
// # extracted using a callback which requires
// # the following format:
// #    (err, row) => {...}
// # .. where row will be a single object which
// # reflects a database row. For example:
// #    { id: 3, pollID: 'goto bed?', 
// #        optionID: 'maybe', score: 1 }
// #
// # Note: callback will be called for each row.
export function pollOptions(pollID, callback) {
    let stmt = db.prepare(`
        SELECT * From Poll
         WHERE pollID = ?
    `)
    stmt.each(pollID, callback)
}

// # Retrieves _one_ poll option, specified with
// # <pollID> and <optionID>. Value/result is 
// # extracted using a callback which requires
// # the following format:
// #    (err, row) => {...}
// # .. where row will be a single object which
// # reflects a database row. For example:
// #    { id: 3, pollID: 'goto bed?', 
// #        optionID: 'maybe', score: 1 }
export function pollOption(pollID, optionID, callback) {
    let stmt = db.prepare(`
        SELECT * From Poll
         WHERE pollID = ?
           AND optionID = ?
    `)
    stmt.get(pollID, optionID, callback)
}




