// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
// app.js

// Estado de la app
let listaAmigos = [];

// Utilidades (inspiradas en tu ejemplo)
function asignarTextoElemento(selector, texto) {
  const el = document.querySelector(selector);
  if (el) el.innerHTML = texto;
}

function limpiarCaja() {
  document.querySelector('#amigo').value = '';
}

function normalizarNombre(nombre) {
  // Quita espacios extra, ignora mayúsculas/minúsculas y acentos para evitar duplicados “disfrazados”
  return nombre
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function renderListaAmigos() {
  const ul = document.querySelector('#listaAmigos');
  ul.innerHTML = '';
  listaAmigos.forEach((nombre, idx) => {
    const li = document.createElement('li');
    li.textContent = `${idx + 1}. ${nombre}`;
    ul.appendChild(li);
  });

  // Limpia el resultado anterior cada vez que cambia la lista
  asignarTextoElemento('#resultado', '');
  // Habilita / deshabilita el botón de sorteo
  document.querySelector('.button-draw').disabled = listaAmigos.length === 0;
}

// Funcionalidades principales
function agregarAmigo() {
  const input = document.querySelector('#amigo');
  const nombre = input.value.trim();

  if (!nombre) {
    alert('Por favor, ingresa un nombre válido.');
    input.focus();
    return;
  }

  // Evitar nombres repetidos (case/acentos/espacios)
  const existe = listaAmigos.some(
    (n) => normalizarNombre(n) === normalizarNombre(nombre)
  );
  if (existe) {
    alert('Ese nombre ya está en la lista.');
    limpiarCaja();
    input.focus();
    return;
  }

  listaAmigos.push(nombre);
  renderListaAmigos();
  limpiarCaja();
  input.focus();
}

function sortearAmigo() {
  if (listaAmigos.length === 0) {
    alert('Agrega al menos un nombre antes de sortear.');
    document.querySelector('#amigo').focus();
    return;
  }

  const indice = Math.floor(Math.random() * listaAmigos.length);
  const elegido = listaAmigos[indice];

  // Mostramos el resultado en la <ul id="resultado"> (aria-live="polite")
  asignarTextoElemento(
    '#resultado',
    `<li>🎉 Tu amigo secreto es: <strong>${elegido}</strong></li>`
  );
}

// Mejores prácticas de UX: Enter para añadir y botón de sorteo bloqueado al inicio
document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('#amigo');
  const botonSortear = document.querySelector('.button-draw');

  botonSortear.disabled = true;

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      agregarAmigo();
    }
  });
});

// Exponemos funciones al HTML
window.agregarAmigo = agregarAmigo;
window.sortearAmigo = sortearAmigo;
