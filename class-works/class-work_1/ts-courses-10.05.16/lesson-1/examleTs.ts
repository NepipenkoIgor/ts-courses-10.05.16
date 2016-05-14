/**
 * Created by igor on 5/13/16.
 */

'use strict';
Object.defineProperty(window, 'MySweetApp', {value: 'v1.0.0', writable: false});

function deliveryMethod() {
    return 'overnight';
}

function shipWeight() {
    return parseInt(document.getElementById('weight').innerHTML);
}

/*
 * @param {(string | string[])} emailAddr - An email address of array of email addresses
 */

function sendUpdates(emailAddr: string | string[]) {
    function sendEmail(addr) {
        // Default to standard delivery if empty
        console.log(`Shipping to ${addr} via ${deliveryMethod() || 'standard'} delivery`);

        if (shipWeight() > 100) {
            console.log('WARNING: Oversize package');
        }
    }

    // If it's an array, loop over it
    if (Array.isArray(emailAddr)) {
        emailAddr.forEach((val) => {
            sendEmail(val.trim());
        });
    } else {
        sendEmail(emailAddr.trim());
    }
}

