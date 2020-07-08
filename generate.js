'use strict'

import {getDatesBetweenDates}  from './dateutils.js';

function validateDate() {
    let start_date = new Date(document.getElementById("start_date").value);
    let end_date = new Date(document.getElementById("end_date").value);

    if (start_date > end_date) {
        alert("End date cannot be less than start date");
        return false;
    }
    return true;
}

function generateReceipts() {
    if (!validateDate())
        return false;

    let tenant = document.getElementById("tenant").value;
    let address = document.getElementById("address").value;
    let amount = document.getElementById("amount").value;
    let owner = document.getElementById("owner").value;

    let start = new Date(document.getElementById("start_date").value);
    let end = new Date(document.getElementById("end_date").value);

    let selection = document.getElementsByName("frequency");
    let frequency = "monthly";

    for (let i = 0; i < selection.length; ++i) {
        if (selection[i].checked)
            frequency = selection[i].value;
    }

    // get dates between given dates
    let dates = getDatesBetweenDates(start, end, frequency);

    let text = "";
    document.body.innerHTML = '';

    for (let i = 0; i < dates.length; ++i) {
        let start_date = dates[i].start_date;
        let end_date = dates[i].end_date;

        let assessment_date = dates[i].assessment_date;
        let receipt_amount = dates[i].duration * amount;

        text += `<div class="rent-slips" id="receipt_block" style="border: 1px solid black">
        <h3>RENT RECEIPT</h3>
        <p>Date: ${ assessment_date }</p>
    
        <p>Received sum of <strong>Rs ${ receipt_amount }</strong> from <strong>${ tenant }</strong> towards the rent of property located at 
        <strong>${ address }</strong> for the period from <strong>${ start_date }</strong> 
        to <strong>${ end_date }</strong>.</p> 
        <br>
        <p><strong>${ owner }</strong><br>
        (Landlord)</p>
        </div>`

        document.body.innerHTML = text;
    }

    return true;
}

document.getElementById("submit").addEventListener("click", generateReceipts);