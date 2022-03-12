// function for computing the income tax
function tax() {
    var monthly_income = parseFloat(document.getElementById("monthly").value); // gets value from textboxes. this line is for the monthly income
    var dependents = parseInt(document.getElementById("dependents").value); // number of dependents. ParseInt because whole number is needed
    var payableTax = 0; // parseFloat is used because there will be decimals involved
    var sss_gsis = 0; // these variables are initialized to be used later in the function
    var dep_exemp = 0;

    if (isNaN(monthly_income)) { // sends alert if monthly income is not filled
        alert("Please input a value.");
    }

    //checks if the tax is for government workers. computes the yearly charge for GSIS or SSS deduction
    if (document.getElementById("GovCheck").checked) { // checks if textbox for government worker is checked
        sss_gsis = parseFloat((monthly_income * 0.09) * 12); // GSIS (9% per month)
    } else {
        sss_gsis = parseFloat((monthly_income * 0.11) * 12) // SSS (11% per month)
    }

    var pagibig = parseFloat((monthly_income * 0.01375) * 12); //for pagibig deduction (1.375% per month)
    var philhealth = parseFloat((monthly_income * 0.035) * 12); //for philhealth deduction (3.5%% per month)
    var personal = 250000; // for personal exemption

    if (dependents > 4) { // if dependents are greater than 4, APE is immidiately 200000
        dep_exemp = 200000;
    }

    if (dependents <= 4) { // if dependents are less than 4, it will compute the APE 
        dep_exemp = parseFloat(50000 * dependents);
    }
    // computes the gross income (12 months + 1month pay)
    var grossIncome = (monthly_income * 13);
    // computes the total deduction 
    var total_dec = parseFloat(personal + dep_exemp + sss_gsis + philhealth + pagibig);
    // computes net tax income
    var TaxInc = parseFloat(grossIncome - total_dec);

    // I applied the range in the table given
    if (TaxInc <= 250000) { // if tax income is less than 250,000, payable tax will be 0. The others are included with the conditions stated in the table.
        payableTax = 0;
    }

    if (TaxInc > 250000 && TaxInc < 400000) {
        payableTax = parseFloat(0.2 * (TaxInc - 250000));
    }

    if (TaxInc > 400000 && TaxInc < 800000) {
        payableTax = parseFloat((0.25 * (TaxInc - 400000)) + 30000);
    }

    if (TaxInc > 800000 && TaxInc < 2000000) {
        payableTax = parseFloat((0.3 * (TaxInc - 800000)) + 130000);
    }

    if (TaxInc > 2000000 && TaxInc < 8000000) {
        payableTax = parseFloat((0.32 * (TaxInc - 2000000)) + 490000);
    }

    if (TaxInc > 8000000) {
        payableTax = parseFloat(0.35 * (TaxInc - 8000000)) + 2410000;
    }
    // displays the output in their respective textboxes. ".toFixed(2)" is used to round up to the nearest 2 decimals
    document.getElementById("gross_income").value = "Php " + numberWithCommas(grossIncome.toFixed(2));
    document.getElementById("total_deduction").value = "Php " + numberWithCommas(total_dec.toFixed(2));
    document.getElementById("taxable_income").value = "Php " + numberWithCommas(TaxInc.toFixed(2));
    document.getElementById("payable_tax").value = "Php " + numberWithCommas(payableTax.toFixed(2));
}

// function that restricts input in textbox. Only postive numbers and 0 are allowed
function onlyNumberKey(evt) {
    var ASCIICode = evt.which ? evt.which : evt.keyCode;
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
        alert("Only positive numbers are allowed!");
        return false;
    }
    return true;
}

//function that clears all inputs
function empty() {
    document.getElementById("monthly").value = "";
    document.getElementById("dependents").value = "";
    document.getElementById("GovCheck").checked = false;
}


//function that auto separates thousands with comma
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}