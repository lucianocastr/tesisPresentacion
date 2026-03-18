# Speech de Defensa — Castro & Primitz

> **Criterio de división**
> - **Matías** → abre y cierra: problema, contexto, ISO, conclusiones
> - **Luciano** → núcleo técnico: hipótesis, sistema, casos, pipeline, demo, resultados
>
> Tiempo estimado: ~27-28 min de speech + ~5-6 min demo en vivo

---

## [MATÍAS] — /2 Portada

"Nuestro trabajo parte de una pregunta concreta: ¿puede una estrategia de automatización de pruebas funcionales y de regresión, integrada en un pipeline CI/CD en la nube, mejorar de forma medible la calidad de un sistema web transaccional? Lo que van a ver hoy es cómo validamos esa estrategia sobre un prototipo funcional, demostrando que es replicable a cualquier sistema web transaccional real, con herramientas open-source y costo cero."

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

"Para medir calidad necesitábamos un marco de referencia que no fuera subjetivo. Elegimos ISO/IEC 25010 porque su definición es precisa: la norma establece que la calidad de un producto software es 'el grado en que dicho producto satisface los requisitos de sus usuarios, aportando de esta manera un valor'. No es una lista de buenas prácticas — es la piedra angular para evaluar propiedades reales de un sistema real.

De las características que define la norma, identificamos seis que son directamente afectadas cuando un sistema transaccional falla: funcionalidad, fiabilidad, eficiencia, mantenibilidad, seguridad y flexibilidad. Esas seis son las que diseñamos, medimos y validamos. Cada una va a aparecer de nuevo cuando veamos los resultados."

---

## [LUCIANO] — /9 El Sistema Bajo Prueba

"Necesitábamos un sistema real sobre el que aplicar la estrategia. Lo desarrollamos íntegramente nosotros — precisamente para tener un prototipo de pruebas que cumpla con todos los requisitos de testeabilidad que necesitábamos. Mini Ticketera es una aplicación de venta de entradas con los flujos que tiene cualquier e-commerce — login, catálogo, carrito, checkout, confirmación. Está desplegada en producción, los dos links en pantalla son funcionales."

---

## [LUCIANO] — /10 Alcance y Limitaciones

"Una aclaración importante antes de ver la solución: el alcance de este trabajo son los flujos transaccionales críticos. No pruebas de performance, no análisis estático, no sistemas de terceros. El objetivo no era cubrir todo — era demostrar que el modelo funciona en lo que más impacta."

---

## [LUCIANO] — /11 Los 6 Casos de Prueba

"Definimos seis casos de prueba, y la elección no fue arbitraria. Cada uno cubre un momento donde una falla tiene consecuencia directa: el acceso, la compra completa, el rechazo de pago, el carrito, la disponibilidad del catálogo y la sesión. Son los seis puntos donde el sistema no puede fallar."

---

## [LUCIANO] — /12 Pipeline CI/CD

"El pipeline es el núcleo de este trabajo. No es una herramienta de soporte — es la pieza que orquesta toda la estrategia, y lo que se ve en pantalla es una versión representativa: el archivo YAML real tiene más de cien líneas; lo que mostramos son los tres pasos estructurales que importan entender.

Todo ocurre en la nube. Cuando decimos 'entornos cloud' en el título, no es una etiqueta — significa que desde el push, ningún paso requiere una máquina local encendida, ningún servidor propio, ninguna configuración manual. GitHub Actions provee el runner, GitHub Pages el entorno de staging, Cypress Cloud la ejecución y los reportes. El equipo no mantiene nada.

El primer paso es el build: compila, instala dependencias, verifica que el artefacto es desplegable. Si algo falla, el pipeline se detiene — no tiene sentido continuar con algo que no compila.

El segundo paso es el deploy a staging: la aplicación queda disponible en una URL real, lista para ser probada sobre el sistema funcionando, no sobre un entorno simulado.

El tercer paso es donde está el valor: Cypress corre los seis specs en Chrome contra ese deploy real. Al terminar, sube resultados con video y capturas, genera el reporte y actualiza los issues en GitHub Projects.

En un equipo tradicional ese ciclo involucra al menos tres roles distintos: alguien que despliega, alguien que prueba, alguien que actualiza el estado del proyecto. Acá lo hace el pipeline solo, de principio a fin, cada vez que se empuja código."

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

El tiempo de validación bajó un 87%: lo que antes llevaba 15 minutos, ahora tarda 2. Ese tiempo corre en la nube mientras el equipo hace otra cosa.

La cobertura de flujos críticos pasó del 43% al 100%. Con testing manual no llegábamos a cubrir ni la mitad de los casos que importan.

La detección de defectos antes del deploy pasó del 20% al 100%. Antes, 8 de cada 10 problemas llegaban a producción. Ahora ninguno pasa sin ser detectado primero.

El esfuerzo humano dedicado a validación se redujo un 80%. El equipo dejó de ser el cuello de botella del proceso.

Y las ejecuciones pasaron a ser 100% reproducibles. El resultado no depende de quién ejecuta, desde qué máquina, ni en qué momento del día.

Cada uno de esos números tiene un antes y un después medido sobre el mismo sistema, con el mismo protocolo. Matías."

---

## [MATÍAS] — /16 Validación ISO/IEC 25010:2023

"Aqui es donde todo converge

Recordemos qué dice la norma. ISO/IEC 25010 define calidad como el grado en que un producto satisface los requisitos de sus usuarios y les aporta valor. Para cada atributo que priorizamos al inicio del trabajo, generamos evidencia concreta a partir de las ejecuciones del prototipo.

La adecuación funcional se evidencia en la validación completa de flujos críticos con 100% de pass rate; 

La fiabilidad se demuestra con ejecuciones reproducibles sin variaciones ni falsos positivos; 

La eficiencia de desempeño se refleja en la reducción del 90% en tiempos de validación; 

La mantenibilidad se sustenta en que los casos están versionados junto al código.

Flexibilidad: la estrategia está documentada para que cualquier equipo la replique.

Reconocemos que atributos como la fiabilidad bajo carga (MTBF) o la satisfacción del usuario no fueron medidos, y esto está declarado en las limitaciones. Sin embargo, argumentamos que mejorar la capacidad de detección temprana de defectos funcionales es una mejora en la calidad del producto, no solo del proceso: un producto que se valida automáticamente en cada commit llega a producción con menos defectos que uno validado manualmente de forma parcial e intermitente."

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
