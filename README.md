# TechFix Agenda - Landing Page

Proyecto integrador desarrollado para el módulo de Web Foundations & Agentic Coding (ESPOL). Es una landing page responsiva para un portal de soporte IT y gestión de tickets de Nivel 2.

## Tecnologías Utilizadas
* HTML5 Semántico
* CSS3 (Grid, Flexbox, Custom Properties)
* TypeScript (Validación de formularios orientada a accesibilidad)

## Características principales (Tareas 1 y 2)
1. **Accesibilidad (a11y):** Implementación de atributos `aria-`, alertas `aria-live` para manejo de errores en el formulario, y soporte para navegación por teclado (`skip-link` y estilos `:focus`).
2. **Responsive Design:** Maquetación *Mobile-First* que se adapta a pantallas de escritorio utilizando CSS Grid para las tarjetas de servicio y Flexbox para layouts internos.
3. **Validación en Tiempo Real:** El formulario está gestionado por `main.ts` compilado a JavaScript, asegurando la captura y validación de campos requeridos y formatos regulares (Regex para emails) previo al submit.
4. **SEO Técnico:** Inclusión de archivo `robots.txt` y etiquetas de meta open-graph y twitter cards.

## Instrucciones de Instalación y Uso

1. Clonar el repositorio:
   ```bash
   git clone <https://github.com/jcartagenadevit/techfix-agenda-espol.git>
