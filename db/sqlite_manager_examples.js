// # This example file shows usage of ./sqlite_manager.js.
// # File contains:
// #    - [1] creating table.
// #    - [2] adding poll with options.
// #    - [3] incrementing poll option.
// #    - [4] read all options for a poll.
// #    - [5] read one option for a poll.

import * as db from './sqlite_manager.js'



// # [1] CREATE NEW TABLE:
db.createNewPollTable()


// # [2] CREATE NEW POLL:
// # ... this poll will have 3 options.
// # ... all of them will have a score of 0.
const pollID = 'goto bed?'
const optionIDs = ['yes', 'no', 'maybe']
db.createPoll(pollID, optionIDs)


// # [3] INCREMENT ONE OPTION:
db.incrementOption(pollID, optionIDs[1])


// # [4] CHECK _ALL_ POLL OPTIONS:
const callbackAllOptions = (err, row) => {
    // # Handle err.
    if (err != null) {
        console.log(err)
        return
    }
    // # Handle empty:
    if (!row) {
        console.log('got empty')
        return
    }
    // # Print some vals. Fmt: pollID/optionID/score
    console.log(`${row.pollID}/${row.optionID}/${row.score}`)
}
db.pollOptions(pollID, callbackAllOptions)


// # [5] CHECK _ONE_ POLL OPTION:
const callbackOneOption = (err, row) => {
    // # Handle err.
    if (err != null) {
        console.log(err)
        return
    }
    // # Handle empty:
    if (!row) {
        console.log('Got empty. This was expected.')
        return
    }
    // # Print some vals. Fmt: pollID/optionID/score
    console.log(`${row.pollID}/${row.optionID}/${row.score}`)
    
}
db.pollOption(pollID, 'non-existing-val', callbackOneOption)


