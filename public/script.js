const socket = io();
const tableBody = document.querySelector('#statsTable tbody');
const downloadBtn = document.getElementById('download');

socket.on('statsUpdated', data => {
  tableBody.innerHTML = '';
  if (data.players) {
    data.players.forEach(p => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${p.name}</td><td>${p.AVG}</td><td>${p.CP}</td><td>${p.HR}</td>`;
      tableBody.appendChild(row);
    });
  }
});

downloadBtn.addEventListener('click', () => {
  window.location.href = '/stats/export';
});
