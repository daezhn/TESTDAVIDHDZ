const socket = io();
const statsPre = document.getElementById('stats');
const downloadBtn = document.getElementById('download');

socket.on('statsUpdated', data => {
  statsPre.textContent = JSON.stringify(data, null, 2);
});

downloadBtn.addEventListener('click', () => {
  window.location.href = '/stats/export';
});
