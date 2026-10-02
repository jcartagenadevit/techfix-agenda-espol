# Justificación de Estilos – Componentes del Playground

Este documento explica las decisiones de diseño de los componentes de **botones** y **alertas** definidos en [style.css](style.css) y mostrados en [playground.html](playground.html). El enfoque principal es la **usabilidad** y la **retroalimentación visual**.

---

## 1. Principios generales

| Principio | Cómo se aplica |
|---|---|
| **Consistencia** | Todos los colores, radios y espaciados salen de variables CSS (`:root`). Un cambio de marca se hace en un solo lugar. |
| **Affordance** | Cada elemento interactivo *parece* interactivo: relleno o borde visible, cursor `pointer`, área táctil de 44 px como mínimo. |
| **Retroalimentación inmediata** | Cada interacción (pasar el cursor, presionar, enfocar con teclado) produce un cambio visible en menos de 150 ms. |
| **Accesibilidad (WCAG 2.1 AA)** | Contraste de texto ≥ 4.5:1, foco visible con `:focus-visible`, soporte para `prefers-reduced-motion`. |
| **No depender solo del color** | Las alertas combinan color, icono y título en texto; los botones deshabilitados cambian también el cursor. |

---

## 2. Reset de botones

Los navegadores aplican estilos propios a `<button>` (borde gris, fondo, fuente del sistema, `padding` distinto en Chrome, Firefox y Safari). Antes de estilizar, `.btn` y `.alert__close` eliminan esos valores:

```css
appearance: none;
background: none;
border: 0;
font: inherit;
color: inherit;
```

**Por qué:** así el botón se ve igual en todos los navegadores y hereda la tipografía del sitio (`Segoe UI`), sin sorpresas visuales.

---

## 3. Botones

### 3.1 Variantes (jerarquía de acciones)

| Variante | Uso | Razón |
|---|---|---|
| **Primario** (`.btn--primary`) | La acción principal de la vista: *Generar Ticket*, *Guardar*. | Relleno azul sólido: el ojo lo encuentra primero. Debe haber uno solo por vista. |
| **Secundario** (`.btn--secondary`) | Acciones alternativas: *Ver Historial*, *Cancelar*, *Filtrar*. | Fondo blanco con borde: sigue pareciendo botón, pero no compite con el primario. |
| **Peligro** (`.btn--danger`) | Acciones destructivas o irreversibles: *Cerrar Ticket*, *Eliminar usuario*. | El rojo avisa del riesgo antes del clic. |

El azul primario es `#2563eb` y no el `--secondary-color` (`#3b82f6`) del sitio, porque el texto blanco sobre `#3b82f6` solo llega a ~3.7:1 de contraste. `#2563eb` supera 5:1 y cumple AA.

### 3.2 Estados

| Estado | Señal visual | Qué le dice al usuario |
|---|---|---|
| **Normal (idle)** | Color base y sombra sutil. | "Esto se puede presionar." |
| **`:hover`** | Color más oscuro, sube 1 px y gana sombra. | "El sistema detecta tu cursor; este es el objetivo." |
| **`:active`** (presionado) | Color aún más oscuro, baja 1 px y sombra interna (`inset`). | Imita un botón físico que se hunde: confirma que el clic se registró. |
| **`:focus-visible`** | Anillo azul de 3 px. | Muestra dónde está el foco al navegar con teclado, sin mostrarlo en clics con el ratón. |
| **`:disabled`** | Fondo gris, texto gris, sin sombra ni movimiento, cursor `not-allowed`. | "Esta acción no está disponible ahora." Su regla anula *hover* y *active* para que no dé falsas señales. |

El estado deshabilitado también responde a `[aria-disabled="true"]`. Esto sirve en casos donde el botón debe seguir siendo enfocable para que un lector de pantalla explique por qué no está disponible.

### 3.3 Movimiento

Las transiciones duran entre 100 y 150 ms: es lo bastante rápido para sentirse inmediato y lo bastante suave para notarse. Con `prefers-reduced-motion: reduce`, se desactivan los desplazamientos y transiciones para usuarios con sensibilidad vestibular.

---

## 4. Alertas

### 4.1 Tipos semánticos

| Tipo | Color | Icono | Rol ARIA | Ejemplo en TechFix |
|---|---|---|---|---|
| Información | Azul | `i` | `status` | Ticket asignado a un técnico. |
| Éxito | Verde | `✓` | `status` | Ticket generado correctamente. |
| Advertencia | Ámbar | `!` | `alert` | SLA a punto de vencer. |
| Error | Rojo | `×` | `alert` | Falla de conexión con el servidor. |

### 4.2 Decisiones de diseño

- **Fondo claro + texto oscuro del mismo tono:** el mensaje se lee bien (contraste > 7:1) y sigue teniendo el color de su categoría.
- **Borde izquierdo de 5 px:** sirve para identificar el tipo de un vistazo, incluso al recorrer una lista larga de notificaciones.
- **Icono + título en texto:** quien no distingue rojo de verde (daltonismo) sigue entendiendo el tipo de mensaje.
- **Roles ARIA diferenciados:** `status` se anuncia de forma educada (*polite*) y no interrumpe; `alert` interrumpe al lector de pantalla y se reserva para lo urgente.
- **Botón de cierre (×):** usa el mismo reset de botones, un área de 32 px, un `aria-label="Cerrar alerta"` y sus propios estados *hover*, *active* y *focus*. Hereda el color de la alerta con `currentColor`, así que combina con cualquier variante.

---

## 5. Integración con el backoffice

El backoffice de TechFix es donde los técnicos y administradores gestionan los tickets que crea el formulario público. Estos componentes están pensados para usarse allí sin cambios.

### 5.1 Un solo sistema, dos interfaces

- El sitio público y el backoffice comparten `style.css` y sus variables. El cliente que abre un ticket y el técnico que lo resuelve ven el mismo lenguaje visual.
- Las clases siguen la convención **BEM** (`.btn--primary`, `.alert__close`). No dependen de la estructura del HTML, así que se pueden usar en tablas, modales o barras de herramientas del backoffice sin conflictos.

### 5.2 Mapeo de componentes a flujos del backoffice

| Flujo del backoffice | Componente |
|---|---|
| Guardar cambios de un ticket, asignar técnico | `.btn--primary` |
| Filtrar, exportar, ver historial, cancelar edición | `.btn--secondary` |
| Cerrar o eliminar ticket, revocar acceso | `.btn--danger` (idealmente con confirmación) |
| Botón "Guardar" mientras se envía la petición o si el formulario es inválido | `.btn:disabled`: evita envíos duplicados |
| Confirmación tras guardar | `.alert--success` |
| Ticket reasignado, nuevo comentario | `.alert--info` |
| SLA próximo a vencer, equipo sin garantía | `.alert--warning` |
| Error de API o de validación | `.alert--error` |

### 5.3 Escalabilidad

- **Temas:** al estar todo en variables, un modo oscuro o una versión con la marca de un cliente solo requiere redefinir los tokens de `:root`.
- **Integración con TypeScript:** como en `main.ts`, el backoffice puede insertar alertas en contenedores con `aria-live` y alternar el atributo `disabled` en los botones según el estado de las peticiones. El CSS ya cubre todos esos estados.
- **Playground como documentación viva:** `playground.html` sirve como catálogo de referencia. Cada componente nuevo del backoffice (badges de estado, tablas, modales) debería agregarse aquí primero para validar sus estados antes de usarlo en producción.
