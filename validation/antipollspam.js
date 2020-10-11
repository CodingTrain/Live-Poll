// # This package contains a simple time-based anti-spam 
// # implementation.
// # 
// # Details:
// #    The approach is to register ids (for example ip 
// #    hashes) to a hashtable (JS object) as keys with
// #    timestamps as values. 
// #    
// #    This is done while calling the main interface/func
// #    (check) -- if a record already exists, then
// #    this func will return false, else true. On each call,
// #    old entries will be removed if their timestamp is 
// #    too stale (dictated by deltaSecondsFlush integer).
// #
// # 
// # Main interface:
// #    check() -- this is the default export.
// #
// # 


// # How many seconds before a record becomes
// # stale and should be deleted.
const deltaSecondsFlush = 60

// # Holds access state. Keys are ids while
// # values are timestampts.
let accessState = {}

// # Unixtime: milliseconds -> seconds.
function nowUnixSeconds() {
    return Date.now() / 1000
}

// # Flush any record in <accessState> (pkg level var) if it is 
// # stale -- determined with <deltaSecondsFlush> (pkg lvl var).
function truFlushStale() {
    // # Look through all items.
    Object.keys(accessState).forEach(key => {
        const timestamp = accessState[key]
        // # Delete if stale.
        if (timestamp + deltaSecondsFlush <= nowUnixSeconds()) {
            delete accessState[key]
        }
    })
}

// # Check if an id has used up its access.
// # If it is new, then it will be registered
// # and true will be returned, else false.
// # 
// # Each call to this func will also remove
// # all stale records (see <truFlushStale>
// # in this pkg).
// # 
// # Recommended usage for this live-poll app:
// #    id=ip               -- scope: global.
// #    id=poll/ip          -- scope: poll.
// #    id=poll/option/ip   -- scope: option.
export default function check(id) {
    // # Remove old.
    truFlushStale()

    // # id is not registered; register & exit.
    if (accessState[id]==undefined) {
        accessState[id] = nowUnixSeconds() 
        return true
    }

    // # Registered exists.
    return false
}