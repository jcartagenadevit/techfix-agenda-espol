document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('ticket-form') as HTMLFormElement;

    if (form) {
        form.addEventListener('submit', (e: Event) => {
            e.preventDefault(); // Prevenir envío por defecto
            
            let isValid = true;

            // Referencias a los campos
            const nameInput = document.getElementById('name') as HTMLInputElement;
            const emailInput = document.getElementById('email') as HTMLInputElement;
            const categorySelect = document.getElementById('category') as HTMLSelectElement;

            // Referencias a los mensajes de error
            const nameError = document.getElementById('name-error') as HTMLSpanElement;
            const emailError = document.getElementById('email-error') as HTMLSpanElement;
            const categoryError = document.getElementById('category-error') as HTMLSpanElement;

            // Resetear estados previos
            const resetError = (input: HTMLElement, errorSpan: HTMLSpanElement) => {
                input.setAttribute('aria-invalid', 'false');
                errorSpan.textContent = '';
            };

            resetError(nameInput, nameError);
            resetError(emailInput, emailError);
            resetError(categorySelect, categoryError);

            // 1. Validación de Nombre
            if (nameInput.value.trim() === '') {
                nameInput.setAttribute('aria-invalid', 'true');
                nameError.textContent = 'El nombre del solicitante es obligatorio.';
                isValid = false;
            }

            // 2. Validación de Email (Formato)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === '') {
                emailInput.setAttribute('aria-invalid', 'true');
                emailError.textContent = 'El correo es obligatorio.';
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                emailInput.setAttribute('aria-invalid', 'true');
                emailError.textContent = 'Por favor, ingrese un correo válido.';
                isValid = false;
            }

            // 3. Validación de Categoría
            if (categorySelect.value === '') {
                categorySelect.setAttribute('aria-invalid', 'true');
                categoryError.textContent = 'Debe seleccionar una categoría para el ticket.';
                isValid = false;
            }

            // Envío exitoso
            if (isValid) {
                alert('Ticket generado con éxito. Nos pondremos en contacto pronto.');
                form.reset();
            }
        });
    }
});