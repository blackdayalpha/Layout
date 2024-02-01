let p_intLoan_amount;
let p_intTenure_years;
let p_floatInterest_rate;
let p_floatCalculated_emi;

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  p_intLoan_amount = Number(document.getElementById("amount").value);
  p_floatInterest_rate = Number(document.getElementById("interest").value);
  p_intTenure_years = Number(document.getElementById("tenure").value);
  p_floatCalculated_emi = calculate();
  if (!isNaN(p_floatCalculated_emi)) {
    document.getElementById("emi_amount").innerText =
      p_floatCalculated_emi.toFixed(2);
  }
});

function calculate() {
  let L_floatSimple_interest =
    (p_intLoan_amount * p_floatInterest_rate * p_intTenure_years) / 100;
  let L_floatTotal_amount_to_be_paid =
    L_floatSimple_interest + p_intLoan_amount;
  return Number(L_floatTotal_amount_to_be_paid / (12 * p_intTenure_years));
}
