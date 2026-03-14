# Speech de Defensa — Castro & Primitz

> **Criterio de división**
> - **Matías** → abre y cierra: problema, contexto, ISO, conclusiones
> - **Luciano** → núcleo técnico: hipótesis, sistema, casos, pipeline, demo, resultados
>
> Tiempo estimado: ~27-28 min de speech + ~5-6 min demo en vivo

---

## [MATÍAS] — /2 Portada

"Buenos días. Somos Luciano Castro y Matías Primitz. Durante este trabajo nos preguntamos si era posible transformar la forma en que se valida la calidad del software en un sistema real, usando herramientas gratuitas y accesibles. Lo que van a ver hoy es la respuesta a esa pregunta. Agradecemos a la Licenciada Natalia Mira y al tribunal por el espacio."

---

## [MATÍAS] — /3 Agenda

"Vamos a recorrer cinco momentos: el problema que nos llevó a esto, la solución que diseñamos, una demo del sistema funcionando en vivo, los números que obtuvimos, y qué dejamos planteado para el futuro."

---

## [MATÍAS] — /4 La Problemática

"El punto de partida fue una pregunta simple: ¿por qué los equipos de software siguen liberando código con defectos que ya deberían haber encontrado antes?

La industria tiene respuestas documentadas. El 60% de las organizaciones no tiene automatización integrada. Detectar un defecto en producción cuesta seis veces más que haberlo encontrado antes del deploy. Apenas el 26% de los equipos tiene CI/CD con testing real.

Pero más relevante para nosotros fue lo que medimos en nuestro propio sistema: con testing manual, cubríamos menos de la mitad de los casos críticos, detectábamos uno de cada cinco defectos antes de liberar, y ninguna ejecución era garantía de reproducir el resultado anterior. Ese era nuestro punto de partida real."

---

## [MATÍAS] — /5 ¿Por qué importa?

"Alguien podría pensar que esto es un problema técnico del equipo de QA. No lo es. Un flujo de compra que falla tiene cuatro consecuencias distintas simultáneamente: el sistema se vuelve inestable, la venta se pierde, el usuario no vuelve, y el equipo tiene que apagar incendios en lugar de construir. La pregunta que dejamos en pantalla resume el desafío. Luciano."

---

## [LUCIANO] — /6 Hipótesis

"Lo que nos propusimos demostrar fue que esto tiene solución sistemática. No alcanza con 'hacer más pruebas' — tiene que ser medible, para que los resultados sean comparables. Tiene que ser reproducible, para que el resultado no dependa de quién ejecuta ni desde qué máquina. Y tiene que ser sostenible, para que no se abandone al mes de implementarlo. Esas tres condiciones son la hipótesis."

---

## [LUCIANO] — /7 Objetivos

"El trabajo tuvo un objetivo general y seis específicos. Lo importante no es la lista — es la secuencia: primero entender el problema, después identificar qué atributos de calidad están en juego, diseñar la estrategia, implementarla, medir si funcionó, y dejar todo documentado para que otro equipo pueda replicarlo. Esa secuencia es intencionada."

---

## [MATÍAS] — /8 Marco Conceptual

"Para medir calidad necesitábamos un marco de referencia que no fuera subjetivo. La norma ISO/IEC 25010:2023 nos da exactamente eso: un modelo que define qué significa que un software sea de calidad, en términos observables y medibles.

De las características que define la norma, identificamos seis que son directamente afectadas cuando un sistema transaccional tiene defectos: funcionalidad, fiabilidad, eficiencia, mantenibilidad, seguridad y flexibilidad. Cada una de estas va a aparecer de nuevo cuando veamos los resultados."

---

## [LUCIANO] — /9 El Sistema Bajo Prueba

"Necesitábamos un sistema real sobre el que aplicar la estrategia. Desarrollamos Mini Ticketera: una aplicación de venta de entradas con los flujos que tiene cualquier e-commerce — login, catálogo, carrito, checkout, confirmación. Está desplegada en producción, los dos links en pantalla son funcionales ahora mismo."

---

## [LUCIANO] — /10 Alcance y Limitaciones

"Una aclaración importante antes de ver la solución: el alcance de este trabajo son los flujos transaccionales críticos. No pruebas de performance, no análisis estático, no sistemas de terceros. El objetivo no era cubrir todo — era demostrar que el modelo funciona en lo que más impacta."

---

## [LUCIANO] — /11 Los 6 Casos de Prueba

"Definimos seis casos de prueba, y la elección no fue arbitraria. Cada uno cubre un momento donde una falla tiene consecuencia directa: el acceso, la compra completa, el rechazo de pago, el carrito, la disponibilidad del catálogo y la sesión. Son los seis puntos donde el sistema no puede fallar."

---

## [LUCIANO] — /12 Pipeline CI/CD

"El pipeline tiene tres pasos. El primero construye y verifica que la aplicación compila. El segundo la despliega en el entorno de staging. El tercero — que es el núcleo — corre los seis specs automáticamente sobre el deploy real, en Chrome, en la nube. Al terminar, genera evidencia y actualiza la gestión de incidencias sin que nadie lo haga manualmente."

---

## [LUCIANO] — /13 Arquitectura de la Solución

"La arquitectura refleja dos mundos: lo que ocurre en local y lo que ocurre en la nube. En local, el equipo empuja código y specs. En la nube, GitHub recibe ese push y el pipeline se ocupa del resto — build, deploy, testing, reporte, gestión. El equipo humano no vuelve a intervenir hasta que hay un resultado."

---

## [LUCIANO] — DEMO EN VIVO

> Avanzar los clicks según el estado de la ejecución en pantalla. Dejar que el sistema hable.

"Vamos a verlo corriendo."

- Mostrar el último workflow en GitHub Actions
- Mostrar Cypress Cloud con los 6 specs en verde
- Mostrar un reporte Mochawesome
- Mostrar el issue actualizado en GitHub Projects

---

## [LUCIANO] — /14 Metodología de Medición

"Para que los resultados sean comparables y no sesgados, diseñamos un protocolo: cinco corridas en cada modalidad, en entornos equivalentes. Manual con cronómetro y guía fija. Automatizado en el runner de GitHub Actions. Las métricas fueron tiempo, cobertura, detección, esfuerzo humano y reproducibilidad."

---

## [LUCIANO] — /15 Resultados

"Estos son promedios de cinco corridas registradas — no estimaciones.

El tiempo por ciclo bajó un 87%: de 15 minutos a 2. La cobertura de flujos críticos pasó del 43% al 100%. La detección de defectos antes del deploy pasó del 20% al 100%. El esfuerzo humano se redujo un 80%. Y las ejecuciones pasaron de ser impredecibles a ser 100% reproducibles.

Cada uno de esos números tiene un antes y un después medido sobre el mismo sistema, con el mismo protocolo."

---

## [LUCIANO] — /16 Validación ISO/IEC 25010:2023

"Cada uno de esos resultados cierra el ciclo con el marco teórico. No diseñamos los casos de prueba y después los mapeamos a la norma — la norma fue el criterio de diseño desde el principio. Lo que ven en pantalla es la verificación de que ese diseño funcionó. Le devuelvo a Matías."

---

## [MATÍAS] — /17 Conclusiones

"La hipótesis se confirmó. Pero más allá del resultado puntual, hay tres cosas que nos parecen relevantes para llevarse de este trabajo.

Una: no hace falta infraestructura costosa. Todo esto corre con herramientas gratuitas y abiertas.

Dos: el modelo no es específico de este sistema. Cualquier equipo con un sistema web transaccional puede replicarlo.

Tres: el testing manual no es una cuestión de disciplina — es un problema de escala. No puede crecer junto con el sistema. La automatización sí."

---

## [MATÍAS] — /18 Contribuciones del Trabajo

"Lo que dejamos como aporte concreto tiene tres capas. Para el ámbito académico, un caso documentado de cómo la norma ISO pasa de ser teoría a ser métricas reales. Para lo técnico, un pipeline que no solo despliega — también valida y gestiona. Para lo profesional, un modelo que un equipo puede adoptar sin importar su nivel de madurez actual."

---

## [MATÍAS] — /19 Líneas Futuras

"El trabajo abre caminos que no cerramos intencionalmente: pruebas no funcionales, inteligencia artificial aplicada a QA, monitoreo continuo, análisis estático. Cada uno de esos es un proyecto en sí mismo — dejamos la puerta abierta."

---

## [MATÍAS] — /20 Cierre

"Eso es todo de nuestra parte. Los artefactos — repositorio, aplicación en vivo, reportes de Cypress Cloud — están en pantalla. Quedamos a disposición del tribunal."
