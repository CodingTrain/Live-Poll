// # This pkg functions as a unit-test for antipollspam.js.


import {check, deltaSecondsFlushID, deltaSecondsFlushScan} from './antipollspam.js'

console.log(`
    Note:   Make sure to reduce <deltaSecondsFlushID> and
            <deltaSecondsFlushScan> in './antipollspam.js'
            to a low integer before running this test.
            Not doing so will make this test time-expensive.

            Current <deltaSecondsFlushID>  : ${deltaSecondsFlushID}
            Current <deltaSecondsFlushScan>: ${deltaSecondsFlushScan}
`)

// # Generic sleep func.
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// # Verify that an id check passes on first introduction
// # and fails on a second check.
async function testInstantDoubleRegister(){
    const id = 'test_instantDoubleRegister'
    // # Guard false negative.
    if (check(id) == false)
        return 'test_instantDoubleRegister: fail 1'

    // # Guard false positive.
    if (check(id) == true)
        return 'test_instantDoubleRegister: fail 2'

    // # ok.
    return 'test_instantDoubleRegister: ok'
}

// # Verify that flushing works (won't want a
// # memory leak).
async function testFlushing() {
    const id = 'test_flushing'
    // # Guard false negative.
    if (check(id) == false)
        return 'test_flushing: fail 1'
        
    // # Use largest waiting delta;
    // # Should guarantee record flush.
    let seconds = Math.max(
        deltaSecondsFlushID, 
        deltaSecondsFlushScan
    )
    // # Wait until flush.
    await sleep(1000 * seconds + 1)

    // # Guard false negative. -- should act as new
    // # introduction since the old record is gone.
    if (check(id) == false)
        return 'test_flushing: fail 2'

    // ok.
    return 'test_flushing: ok'
}


// # Run all tests.
function test() {
    // # Collection.
    const funcs = [
        testFlushing,
        testInstantDoubleRegister,
    ]
    // # Run & print.
    funcs.forEach(f => {
        f().then(r => {console.log(r)})
    })
}

test()
