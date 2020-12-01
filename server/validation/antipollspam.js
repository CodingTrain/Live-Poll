// # This package contains a simple time-based anti-spam
// # implementation.
// #
// # Details:
// #    The approach is to register ids (for example ip
// #    hashes) to a hashtable (JS object) as keys with
// #    timestamps as values. Vals are used for flushing.
// #
// #    This is done while calling the main interface/func
// #    <check()> -- if a record already exists, then
// #    this func will return false, else true. On each call,
// #    old entries will be removed if their timestamp is
// #    too stale (dictated by <deltaSecondsFlushID> integer),
// #    though scans are done on a interval specified with
// #    <deltaSecondsFlushScan> integer.
// #
// # Main interface:
// #    check() -- this is the default export.
// #
// #

// # Holds access state. Keys are IDs while
// # values are timestampts.
let accessState = {};

// # How many seconds before a record becomes
// # stale and should be deleted.
const deltaSecondsFlushID = 60 * 60 * 24; //Only 1 vote per day

// # How many seconds before <accessState>
// # is scanned for stale records. Used to
// # reduce unnecessary scans.
const deltaSecondsFlushScan = 60;
// # timestamp for last flush.
let timestampLastFlush = nowUnixSeconds();

// # Unixtime: milliseconds -> seconds.
function nowUnixSeconds() {
  return Date.now() / 1000;
}

// # Flush records in <accessState> (pkg lvl var) if they are
// # older than <deltaSecondsFlushID> (pkg lvl var). This
// # procedure is aborted if not enough time has passed,
// # which is specified by <deltaSecondsFlushScan> (pkg lvl var).
function tryFlushStale() {
  // # Abort flush procedure if not enough time has passed.
  if (timestampLastFlush + deltaSecondsFlushScan > nowUnixSeconds()) return;

  // # Look through all items.
  Object.keys(accessState).forEach((key) => {
    const timestamp = accessState[key];
    // # Delete if stale.
    if (timestamp + deltaSecondsFlushID <= nowUnixSeconds()) {
      delete accessState[key];
    }
  });
  // # Update timestamp for last flush.
  timestampLastFlush = nowUnixSeconds();
}

// # Check if an id has used up its access.
// # Each call to this func will also remove
// # all stale records (see <truFlushStale>
// # in this pkg).
// #
// # Recommended usage for this live-poll app:
// #    id=ip               -- scope: global.
// #    id=poll/ip          -- scope: poll.
// #    id=poll/option/ip   -- scope: option.
function check(id) {
  // # Remove old.
  tryFlushStale();

  return accessState[id] == undefined;
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
function checkAndRegister(id) {
  // # Remove old.
  tryFlushStale();

  // # id is not registered; register & exit.
  if (accessState[id] == undefined) {
    accessState[id] = nowUnixSeconds();
    return true;
  }

  // # Registered exists.
  return false;
}

// # Export of numbers is done for unit testing.
module.exports = {
  check,
  checkAndRegister,
  deltaSecondsFlushID,
  deltaSecondsFlushScan,
};
