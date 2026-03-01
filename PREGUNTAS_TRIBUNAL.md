# Preparación para el Tribunal — Preguntas y Respuestas

**Tesis:** Estrategia de Automatización de Pruebas Funcionales y de Regresión para la Mejora de la Calidad del Software en Entornos Cloud
**Autores:** Luciano Castro · Matías Primitz
**Tutora:** Lic. Natalia Mira

---

## Observaciones críticas a tener en cuenta

### 1. Validez estadística de n=5
La tabla de resultados se basa en 5 iteraciones. El tribunal puede cuestionar si es suficiente para afirmar "mejora medible y sostenible".

**Postura recomendada:** reconocer que es un estudio exploratorio/prototipo, no un experimento con inferencia estadística formal. El valor está en la demostración de viabilidad y en la consistencia de los resultados entre las 5 iteraciones.

### 2. Sistema creado por los autores
La Mini Ticketera fue diseñada por los propios autores, lo que puede introducir sesgo de confirmación.

**Postura recomendada:** reconocerlo como limitación explícita. El aporte es la estrategia y el pipeline, no el sistema en sí. La estrategia es replicable (OE6).

### 3. "100% de cobertura" sin especificar tipo
El slide de resultados menciona 100% de cobertura sin aclarar si es de líneas, ramas o funcionalidades.

**Postura recomendada:** aclarar que es cobertura de flujos críticos definidos en los requisitos, no cobertura de código. Son conceptos distintos.

### 4. Mapeo superficial a ISO/IEC 25010 en Seguridad
TC-006 cubre apenas autenticidad parcial. Seguridad según la norma incluye confidencialidad, integridad, no repudio, etc.

**Postura recomendada:** reconocer que la validación de Seguridad es parcial y acotada al alcance del prototipo.

### 5. "Entornos cloud" vs. GitHub Pages
GitHub Pages es hosting estático gratuito, no un cloud empresarial (AWS, Azure, GCP).

**Postura recomendada:** justificar que GitHub Pages cumple la definición de cloud en cuanto a acceso remoto, disponibilidad y eliminación de infraestructura local. El pipeline de CI/CD corre en runners Ubuntu de GitHub (cloud). El término aplica al modelo operativo, no a la escala.

---

## Preguntas probables y respuestas modelo

---

### Pregunta 1
**¿Cuál es la diferencia entre prueba funcional y prueba de regresión en su trabajo?**

En nuestro trabajo diferenciamos ambos conceptos por su propósito, aunque comparten la misma implementación técnica. Las **pruebas funcionales** validan que cada flujo crítico cumple el comportamiento esperado según los requisitos — por ejemplo, que el proceso de compra complete la transacción correctamente. Las **pruebas de regresión** reutilizan exactamente esos mismos casos, pero se ejecutan automáticamente ante cada nuevo commit para detectar si un cambio introdujo un defecto en funcionalidad ya validada. En nuestro pipeline, cada push dispara ambos tipos simultáneamente: se verifica el comportamiento esperado y se protege el comportamiento previo.

---

### Pregunta 2
**¿Qué pasa si el deploy falla? ¿Los tests corren igual?**

No. El job `cypress-e2e` tiene declarada la dependencia `needs: build-and-deploy` en el YAML. Si el build o el deploy falla, GitHub Actions no inicia el job de Cypress. Esto es intencional: no tendría sentido ejecutar los tests contra una versión desactualizada o inexistente de la app. El pipeline aborta con falla en el step correspondiente y notifica. Esto también garantiza que los resultados de Cypress siempre corresponden a la versión que acaba de ser desplegada.

---

### Pregunta 3
**¿Cómo aseguran la independencia entre los 6 test cases?**

Cada spec file fue diseñado para ser autónomo. Cypress limpia el estado del navegador entre specs por defecto. Para flujos que requieren autenticación, cada test hace su propio login al inicio en lugar de depender del estado dejado por un test anterior. En los casos donde necesitamos datos previos — como tener ítems en el carrito para probar el checkout — usamos comandos `cy.request()` para preparar el estado via API en lugar de navegar por la UI, lo que hace los tests más rápidos y menos frágiles. La independencia es un requisito de diseño, no un accidente.

---

### Pregunta 4
**¿Por qué Cypress y no Playwright o Selenium?**

Evaluamos las tres opciones. Selenium fue descartado por su mayor complejidad de setup y la necesidad de drivers externos, lo que agrega fricción en el pipeline CI. Entre Cypress y Playwright, ambos son herramientas modernas y válidas. Elegimos Cypress por tres razones concretas: primero, su integración nativa con Cypress Cloud provee dashboards de resultados sin configuración adicional; segundo, la comunidad y documentación para testing de aplicaciones React es más madura; tercero, el tiempo de setup en GitHub Actions usando la action oficial `cypress-io/github-action@v6` es de cero configuración. Para el alcance de este trabajo, Cypress cubría todos los requisitos funcionales con menor costo operativo.

---

### Pregunta 5
**Si tuvieran que aplicar esto en una empresa real, ¿cuál sería el principal obstáculo?**

El principal obstáculo no sería técnico sino organizacional: la resistencia al cambio en equipos que tienen procesos manuales consolidados. Desde el punto técnico, el desafío real sería la **testeabilidad del sistema existente** — un sistema legacy sin selectores estables, con estados compartidos entre tests o con dependencias externas no mockeadas hace que los tests E2E sean frágiles y de alto mantenimiento. Por eso en nuestro trabajo esto es una limitación reconocida: la Mini Ticketera fue construida con testeabilidad en mente. En un sistema preexistente, el primer paso sería una auditoría de testeabilidad antes de definir el alcance de la automatización. Precisamente eso lo dejamos documentado en OE6 como estrategia replicable.

---

### Pregunta 6
**¿El "costo cero" incluye el tiempo de mantenimiento de los tests?**

Es una observación válida y la aclaramos: cuando decimos "costo cero" nos referimos al **costo de infraestructura y licencias** — GitHub Actions, GitHub Pages y Cypress Cloud tienen tier gratuito que cubre el volumen de este proyecto. No afirmamos que el costo de tiempo sea cero. El tiempo de escritura inicial de los 6 specs tiene un costo, y el mantenimiento por cambio de UI requiere actualizar selectores. Sin embargo, ese costo de mantenimiento es la contraparte del −80% en esfuerzo de ejecución. El balance sigue siendo positivo: el break-even se alcanza al tercer o cuarto ciclo de regresión. Reconocemos que en proyectos grandes el mantenimiento de tests puede ser un costo significativo — de hecho lo mencionamos como línea futura al proponer análisis estático con SonarQube para detectar tests frágiles antes de que fallen.

---

## Preguntas adicionales posibles

| Pregunta | Núcleo de la respuesta |
|----------|----------------------|
| ¿Qué es un falso positivo en testing automatizado y tuvieron alguno? | Un test que falla sin que haya un bug real. Con n=5 no registramos ninguno, pero reconocemos que la muestra es pequeña para garantizarlo. |
| ¿Cómo eligieron los 6 flujos y no otros? | Por cobertura de riesgo: son los flujos que generan valor económico directo (transacciones) y cuya falla tiene mayor impacto en el negocio. |
| ¿Qué es Mochawesome? | Generador de reportes HTML/JSON para pruebas Mocha (base de Cypress). Produce un artefacto descargable desde GitHub Actions con el detalle de cada test. |
| ¿Pueden mostrar un test que falló? | Si tuvieron algún fallo durante el desarrollo, es valioso mencionarlo. Muestra que el sistema detecta regresiones reales. |
| ¿Qué diferencia hay entre CI y CD en su pipeline? | CI = integración continua (build + test en cada push). CD = entrega continua (deploy automático a GitHub Pages). Su pipeline implementa ambos. |

---

## Consejo para la defensa

Las preguntas **2 y 3** son las más técnicas y las que más impresionan al tribunal porque demuestran que realmente escribieron y entendieron el código. Practiquen responderlas sin dudar y sin leer.

Las preguntas **1 y 6** son de comprensión conceptual — si las responden con seguridad muestran dominio del marco teórico.

La pregunta **5** es de madurez profesional — el tribunal quiere ver que entienden las limitaciones de su propio trabajo.
