# Cómo usar la presentación Slidev

## Requisitos previos
- Node.js 18+ instalado → https://nodejs.org
- Un navegador moderno (Chrome recomendado)

---

## Instalación (una sola vez)

```bash
# Desde la carpeta del repositorio clonado
npm install -D @slidev/cli @slidev/theme-default
```

---

## Ejecutar la presentación

```bash
npx @slidev/cli slides.md
```

Abre automáticamente en `http://localhost:3030`

---

## Controles durante la presentación

| Tecla | Acción |
|-------|--------|
| `→` / `Espacio` | Siguiente slide / animación |
| `←` | Slide anterior |
| `F` | Pantalla completa |
| `O` | Vista general de slides |
| `G` | Ir a slide número... |

---

## Exportar a PDF (opcional)

```bash
npx @slidev/cli export slides.md --format pdf
```

---

## Estructura actual — 17 slides · ~30 min

| # | Slide | Recurso | Tiempo |
|---|-------|---------|--------|
| 1 | Portada | logo.jpeg | — |
| 2 | Agenda | — | 1 min |
| 3 | 01 · La Problemática + métricas baseline | — | 3 min |
| 4 | 02 · El Sistema Bajo Prueba | img-app-*.png (4 screenshots) | 2 min |
| 5 | 02 · Hipótesis | — | 1 min |
| 6 | 02 · Objetivo General + 6 OE | — | 2 min |
| 7 | 02 · Alcance y Limitaciones | — | 1 min |
| 8 | 02 · Arquitectura (diagrama interactivo, 6 clicks) | — | 2 min |
| 9 | 02 · Pipeline CI/CD (YAML animado) | img-github-actions.png | 2 min |
| 10 | 02 · Los 6 Casos de Prueba | img-cypress-cloud.png | 2 min |
| 11 | 03 · DEMO EN VIVO | img-cypress-ide.png | 6 min |
| 12 | 04 · Metodología de Medición | — | 1 min |
| 13 | 04 · Resultados (tabla + métricas) | img-cypress-cloud.png | 3 min |
| 14 | 04 · Validación ISO/IEC 25010:2023 | — | 2 min |
| 15 | 05 · Conclusiones | — | 2 min |
| 16 | 05 · Líneas Futuras | — | 1 min |
| 17 | Cierre + URLs reales | — | buffer/preguntas |

---

## Slide de Arquitectura (s.8) — cómo usarlo

El slide es interactivo. Presionar `→` para recorrer el flujo etapa por etapa:

| Click | Foco |
|-------|------|
| 1 | Equipo Dev + QA (commit/push) |
| 2 | GitHub Repo (trigger CI/CD) |
| 3 | GitHub Actions (Pipeline YAML) |
| 4 | Build + Deploy (React + Vite) |
| 5 | Cypress E2E (6 specs headless) |
| 6 | Cypress Cloud + GitHub Projects |

---

## División de exposición sugerida

- **Castro**: Problemática (s.3-4) → Alcance (s.7) → Demo en vivo (s.11) → Conclusiones (s.15)
- **Primitz**: Hipótesis/Objetivos (s.5-6) → Arquitectura/Pipeline/Casos (s.8-10) → Metodología/Resultados/ISO (s.12-14) → Cierre (s.16-17)

---

## Paleta de colores

| Rol | Color |
|-----|-------|
| Acento principal | `#10b981` (esmeralda) |
| Acento secundario | `#58a6ff` (azul) |
| Fondo | `#0d1117` |
| Texto | `#e6edf3` |
| Alerta/error | `#f85149` |

---

## URLs del proyecto

| Recurso | URL |
|---------|-----|
| App en producción | https://lucianocastr.github.io/ticketeraTesis/ |
| Repositorio app | https://github.com/lucianocastr/ticketeraTesis |
| Cypress Cloud | https://cloud.cypress.io/projects/mfnt8h/runs |
| Repo presentación | https://github.com/lucianocastr/tesisPresentacion |
