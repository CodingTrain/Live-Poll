// # This pkg functions as a unit-test for 
// # antipollspam.js.
// # 
// # NOTE:  beware <mirror_deltaSecondsFlush>.
// #        Should mirror <deltaSecondsFlush>,
// #        which is not exported due to strong
// #        encapsulation.


import check from './antipollspam.js'

// # Should mirror deltaSecondsFlush in tested pkg.
// # Is used to wait until records are flushed.
const mirror_deltaSecondsFlush = 60

// # Generic sleep func.
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// # Verify that an id check passes on first introduction
// # and fails on a second check.
async function test_instantDoubleRegister(){
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
async function test_flushing() {
    const id = 'test_flushing'
    // # Guard false negative.
    if (check(id) == false)
        return 'test_flushing: fail 1'
    // # Wait until flush.
    await sleep(1000 * mirror_deltaSecondsFlush + 1)
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
        test_flushing,
        test_instantDoubleRegister,
    ]
    // # Run.
    funcs.forEach(f => {
        f().then(r => {console.log(r)})
    })
}

test()
