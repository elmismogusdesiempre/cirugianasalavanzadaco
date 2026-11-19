const form = document.querySelector('#contact-form');
const copyButton = form.querySelector('.copy');
const status = form.querySelector('.status');
let draft = '';

for (const link of document.querySelectorAll('.choose')) {
  link.addEventListener('click', () => {
    form.elements.procedimiento.value = link.dataset.interest;
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const interest = data.get('procedimiento');
  const subject = 'Solicitud de valoración';
  const body = [
    'Hola, quisiera información para coordinar una valoración.',
    '',
    'Nombre: ' + data.get('nombre').trim(),
    'Correo: ' + data.get('correo').trim(),
    'Procedimiento: ' + interest,
    '',
    data.get('mensaje').trim()
  ].join('\r\n').trim();
  draft = subject + '\n\n' + body;
  copyButton.hidden = !navigator.clipboard;
  status.textContent = 'Si tu aplicación de correo no se abre, puedes copiar la solicitud y enviarla desde tu correo web.';
  window.location.href = 'mailto:wilson.arias@cirugianasalavanzada.co?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
});

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(draft);
    status.textContent = 'Solicitud copiada. Pégala en un correo para wilson.arias@cirugianasalavanzada.co.';
  } catch {
    status.textContent = 'No se pudo copiar. Puedes escribir directamente a wilson.arias@cirugianasalavanzada.co.';
  }
});
