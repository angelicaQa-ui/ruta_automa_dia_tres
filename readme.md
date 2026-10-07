# Ruta de Automatización - Día 3: IA, GitHub Copilot y Page Object Model (POM)

Este repositorio contiene las evidencias y el desarrollo correspondiente al **Día 3** de la ruta de capacitación en automatización de pruebas, enfocado en la integración de Inteligencia Artificial (GitHub Copilot, ecosistema de agentes y protocolos MCP), análisis de requerimientos con historias de usuario, arquitectura POM y resiliencia en pruebas E2E.

---

## Contexto y Requerimiento de Negocio (Historia de Usuario)
* **Historia Base:** Como usuario registrado en la plataforma *SauceDemo*, quiero iniciar sesión, navegar por el catálogo, agregar productos al carrito y completar el flujo de compra hasta la confirmación de la orden, para asegurar el correcto funcionamiento E2E de la tienda online y validar los comportamientos ante errores o datos inválidos.
* **Matriz de Pruebas Derivada con IA:** Cobertura de escenarios positivos (Happy Path), negativos (bloqueos y autenticación fallida) y casos límite (*boundary cases*).

---

## Resumen de Actividades Realizadas

1. **Análisis de Requerimientos con IA:**
   * Utilización de prompts estructurados para la extracción de escenarios de prueba sobre el flujo de compra E2E.
2. **Refactorización bajo Page Object Model (POM):**
   * Migración del script inicial hacia una arquitectura modular y escalable.
   * Creación de clases independientes: `LoginPage` e `InventoryPage`.
3. **Resiliencia, Diagnóstico y Manejo de Errores (*Healer*):**
   * Simulación deliberada de fallos en selectores del DOM para evaluar el diagnóstico asistido por IA y corrección de aserciones en flujos negativos.
4. **Stack Tecnológico Avanzado:**
   * Análisis conceptual e integración de flujos asistidos con GitHub Copilot para el diagnóstico de selectores.
   * Configuración y diseño preparado para la adopción de Model Context Protocol (MCP) y agentes autónomos de Playwright en la automatización de pruebas E2E.

---

## Tecnologías Utilizadas
* **Playwright** (Framework E2E)
* **TypeScript** (Tipado estático)
* **GitHub Copilot** (Asistente de IA)
* **Node.js & @types/node** (Entorno y tipos globales)

---

## Instrucciones de Ejecución
1. Instalar dependencias: `npm install`
2. Ejecutar la suite: `npx playwright test`
3. Ejecutar en modo visual: `npx playwright test --ui`