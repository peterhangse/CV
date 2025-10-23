// Drag and Drop Functionality
let draggedElement = null;
let placeholder = null;

// Initialize drag functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeDragAndDrop();
    initializeFormValidation();
    addInteractiveEffects();
});

function initializeDragAndDrop() {
    const draggables = document.querySelectorAll('.draggable');
    
    draggables.forEach(draggable => {
        draggable.setAttribute('draggable', 'true');
        
        draggable.addEventListener('dragstart', handleDragStart);
        draggable.addEventListener('dragend', handleDragEnd);
        draggable.addEventListener('dragover', handleDragOver);
        draggable.addEventListener('drop', handleDrop);
        draggable.addEventListener('dragenter', handleDragEnter);
        draggable.addEventListener('dragleave', handleDragLeave);
    });
}

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    
    // Remove all drag-over classes
    const draggables = document.querySelectorAll('.draggable');
    draggables.forEach(draggable => {
        draggable.classList.remove('drag-over');
    });
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    if (this !== draggedElement) {
        this.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    e.preventDefault();
    
    if (draggedElement !== this) {
        // Get all draggable elements
        const container = this.parentNode;
        const allDraggables = Array.from(container.querySelectorAll('.draggable'));
        
        // Get indices
        const draggedIndex = allDraggables.indexOf(draggedElement);
        const targetIndex = allDraggables.indexOf(this);
        
        // Reorder elements
        if (draggedIndex < targetIndex) {
            this.parentNode.insertBefore(draggedElement, this.nextSibling);
        } else {
            this.parentNode.insertBefore(draggedElement, this);
        }
    }
    
    this.classList.remove('drag-over');
    return false;
}

// Form Validation and Handling
function initializeFormValidation() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            // Basic validation is handled by HTML5 required attributes
            // Add custom validation if needed
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                e.preventDefault();
                alert('Please fill in all fields');
                return false;
            }
            
            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                e.preventDefault();
                alert('Please enter a valid email address');
                return false;
            }
            
            // If validation passes, form will submit normally
            console.log('Form submitted successfully');
        });
    }
}

// Add Interactive Effects
function addInteractiveEffects() {
    // Smooth scroll for any internal links (if added later)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add hover effect to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Add subtle parallax effect on scroll
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrolled = window.pageYOffset;
                const header = document.querySelector('header');
                
                if (header && scrolled < 500) {
                    header.style.transform = `translateY(${scrolled * 0.3}px)`;
                }
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
    
    // Add click animation to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger on form elements or drag handles
            if (e.target.tagName === 'INPUT' || 
                e.target.tagName === 'TEXTAREA' || 
                e.target.tagName === 'BUTTON' ||
                e.target.classList.contains('drag-handle')) {
                return;
            }
            
            // Add a subtle pulse effect
            this.style.transition = 'transform 0.1s ease';
            this.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
}

// Add visual feedback for drag operations
const style = document.createElement('style');
style.textContent = `
    .drag-over {
        border: 2px dashed #3498db !important;
        background: rgba(52, 152, 219, 0.05) !important;
    }
    
    .dragging {
        opacity: 0.5;
        transform: scale(1.05);
    }
`;
document.head.appendChild(style);

// Console message for developers
console.log('%c👋 Welcome to Peter Hang\'s CV!', 'font-size: 20px; color: #3498db; font-weight: bold;');
console.log('%cFeel free to drag and reorder sections to customize your view!', 'font-size: 14px; color: #2c3e50;');
