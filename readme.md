# Pruebas Automatizadas E2E - Día 2 (Playwright + TypeScript)

Repositorio que contiene la solución automatizada del ejercicio práctico del Día 2, utilizando **Playwright**, **TypeScript** y el patrón de pruebas orientado a calidad de software en un ambiente sandbox autorizado.

---

## Tecnologías y Herramientas Utilizadas
* **Playwright** (Test runner y motor de automatización web)[cite: 4]
* **TypeScript** (Lenguaje de programación tipado)[cite: 4]
* **Node.js** (Entorno de ejecución)[cite: 4]
* **Dotenv** (Gestión segura de variables de entorno)
* **VS Code** (Editor de código)[cite: 4]

---

## Alcance del Proyecto y Casos Implementados
El script automatiza el flujo estricto requerido: **Login → búsqueda/filtrado → acción principal → validación → logout**, cubriendo los siguientes escenarios:
1. **Happy Path:** Flujo E2E completo de compra/transacción exitosa[cite: 5].
2. **Caso Negativo 1:** Intento de acceso con credenciales incorrectas[cite: 5].
3. **Caso Negativo 2:** Bloqueo de flujo por campos obligatorios vacíos[cite: 5].
4. **Validación de Datos:** Verificación de formato correcto en precios o datos en pantalla[cite: 5].
5. **Validación de Mensajes:** Comprobación del texto exacto arrojado por alertas del sistema[cite: 5].

---

## Instrucciones de Instalación y Ejecución

### 1. Clonar el repositorio y configurar dependencias
```bash
git clone <URL_DE_TU_REPOSITORIO>
cd <NOMBRE_DE_LA_CARPETA>
npm install