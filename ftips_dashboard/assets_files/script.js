String.prototype.replaceAt = function(index, replacement) {
    if (index < 0) index = this.length + index;
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

const comparer = (idx, asc) => (a, b) => ((v1, v2) =>
    v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
    )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

lastTh = document.querySelector("#initial");
// do the work...
document.querySelectorAll('table.bets th').forEach(th => th.addEventListener('click', (() => {
    lastTh.innerHTML = lastTh.innerHTML.replaceAt(-1, "▿")
    lastTh = th;
    if (this.asc) {
        th.innerHTML = th.innerHTML.replaceAt(-1, "▾");
    } else {
        th.innerHTML = th.innerHTML.replaceAt(-1, "▴");
    }
    const table = th.closest('table');
    const tbody = document.querySelector('table.bets tbody');
    Array.from(table.querySelectorAll('table.bets tbody tr'))
        .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
        .forEach(tr => tbody.appendChild(tr) );
})));

document.querySelectorAll('.score').forEach(td => td.addEventListener(
    'keypress', ((e) => {
        if (e.keyCode === 32) {
            e.target.nextElementSibling.focus();
            e.preventDefault();
        }
    }), false));