// Dipole Length Lab — VU2SRB
// Classic estimate: each arm (feet) = 234 / frequency in MHz.
(function () {
  const form = document.getElementById('calcForm');
  const input = document.getElementById('frequency');
  const error = document.getElementById('error');

  function showResult() {
    const frequency = Number(input.value);
    if (!Number.isFinite(frequency) || frequency <= 0 || frequency > 1000) {
      error.hidden = false;
      input.setAttribute('aria-invalid', 'true');
      return;
    }
    error.hidden = true;
    input.removeAttribute('aria-invalid');
    const feet = 234 / frequency;
    const wholeFeet = Math.floor(feet);
    const inches = (feet - wholeFeet) * 12;
    const metres = feet * 0.3048;
    const wholeMetres = Math.floor(metres);
    const centimetres = (metres - wholeMetres) * 100;
    const totalFeetExact = feet * 2;
    const totalFeet = Math.floor(totalFeetExact);
    const totalInches = (totalFeetExact - totalFeet) * 12;

    document.getElementById('resultFrequency').textContent = 'For ' + frequency.toLocaleString(undefined, {maximumFractionDigits: 6}) + ' MHz';
    document.getElementById('feetMain').innerHTML = wholeFeet + ' <small>ft</small>';
    document.getElementById('feetDetail').textContent = inches.toFixed(2) + ' inches';
    document.getElementById('metricMain').innerHTML = wholeMetres + ' <small>m</small>';
    document.getElementById('metricDetail').textContent = centimetres.toFixed(2) + ' cm';
    document.getElementById('totalLength').textContent = totalFeet + ' ft ' + totalInches.toFixed(2) + ' in  •  ' + (metres * 2).toFixed(3) + ' m';
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    showResult();
  });
  document.querySelectorAll('[data-frequency]').forEach(function (button) {
    button.addEventListener('click', function () {
      input.value = button.dataset.frequency;
      showResult();
    });
  });
  input.addEventListener('input', function () { if (!error.hidden) showResult(); });
  showResult();
})();