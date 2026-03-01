# Cómo usar la presentación Slidev

## Requisitos previos
- Node.js 18+ instalado → https://nodejs.org
- Un navegador moderno (Chrome recomendado)

---

## Instalación (una sola vez)

```bash
# Desde la carpeta tesisIng
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
| `D` | Modo oscuro/claro |
| `G` | Ir a slide número... |

---

## Antes de presentar: personalizar

1. **Logo universidad** → buscar `[ LOGO UNIVERSIDAD ]` en slides.md y reemplazar con:
   ```html
   <img src="./logo-universidad.png" style="height:50px;" />
   ```
   (colocar el archivo de imagen en la misma carpeta)

2. **Link al repositorio** → buscar `github.com / [usuario] / [repositorio]` y poner el link real

3. **Fecha** → buscar `2025` en la portada si necesitan actualizar

---

## Exportar a PDF (opcional)

```bash
npx @slidev/cli export slides.md --format pdf
```

---

## Estructura de la presentación (15 slides · 30 min)

| Slide | Contenido | Imagen real | Tiempo |
|-------|-----------|-------------|--------|
| 1 | Portada | logo.jpeg | — |
| 2 | Agenda | — | 1 min |
| 3 | Problemática + métricas | — | 3 min |
| 4 | **El sistema bajo prueba** | 4 screenshots de la app | 3 min |
| 5 | Hipótesis | — | 1 min |
| 6 | Objetivo general + 6 OE | — | 2 min |
| 7 | **Arquitectura** | img-arquitectura.png | 2 min |
| 8 | **6 casos de prueba** | img-cypress-cloud.png | 2 min |
| 9 | **Pipeline CI/CD** | img-github-actions.png | 2 min |
| 10 | **DEMO EN VIVO** | img-cypress-ide.png | 6 min |
| 11 | **Resultados** | img-cypress-cloud.png | 3 min |
| 12 | ISO/IEC 25010 | — | 2 min |
| 13 | Conclusiones | — | 2 min |
| 14 | Líneas futuras | — | 1 min |
| 15 | Cierre + URLs reales | — | buffer/preguntas |
