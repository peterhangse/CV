// Enkel delegerad drag & drop för sektioner
let draggedElement = null;

document.addEventListener('mousedown', e => {
  if (e.target.classList.contains('drag-handle')) {
    draggedElement = e.target.closest('.draggable');
    draggedElement.style.opacity = '0.5';
  }
});

document.addEventListener('dragover', e => {
  e.preventDefault();
  if (!draggedElement) return;
  const afterElement = getDragAfterElement(e.clientY);
  const container = document.querySelector('.container');
  if (afterElement == null) {
    container.appendChild(draggedElement);
  } else {
    container.insertBefore(draggedElement, afterElement);
  }
});

document.addEventListener('mouseup', () => {
  if (draggedElement) {
    draggedElement.style.opacity = '';
    draggedElement = null;
  }
});

function getDragAfterElement(y) {
  const draggableElements = [...document.querySelectorAll('.draggable:not(.dragging)')];
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Svensk formulärvalidering
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      e.preventDefault();
      alert('Vänligen fyll i alla fält.');
      return false;
    }

    if (!email.includes('@')) {
      e.preventDefault();
      alert('Vänligen ange en giltig e-postadress.');
      return false;
    }
  });
}

// Enkel parallax för header vid scroll
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (header) {
    const scrolled = window.pageYOffset;
    header.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// UI-effekt: smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
