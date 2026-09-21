## Información General

- El torneo es individual, 1v1.
- Todos los horarios están dados en horario peninsular español.
- BWS es calculado con la fórmula estándar: $BWS = \text{rango} ^ {0.9937 ^ {\text{badges} ^ 2}}$
- BWS es calculado contabilizando badges desde 2022 y en adelante. Las badges conseguidas anteriormente no se contabilizarán para el cálculo de BWS.
- Los jugadores deben estar en el rango permitido hasta que acaben los registros.
- Todos los mapas serán jugados en el cliente antiguo, NO en osu!(lazer), en TeamVS, usando ScoreV2 y NF forzado.
- Habrán unos clasificatorios que determinarán los 36 jugadores que accederán a la Fase de Liga. Estos serán calculados usando el método Z-sum.

## Información sobre la Ronda Clasificatoria

- Todo jugador debe reservar su lobby en la página web con al menos 1 hora de antelación.
- Todo jugador que no esté en su lobby pasados 5 minutos después de su hora asignada, dejará de poder participar en esa misma lobby.
- El orden de los mapas en los clasificatorios no puede ser alterado. Se jugarán de forma secuencial empezando por el NM1 y acabando en el DT2.
- Hay un temporizador de hasta 90 segundos entre mapas.
- Cada mapa se jugará una sola vez, la administración se reserva el derecho de que algún jugador pueda repetir algún mapa, en caso de que haya tenido algún problema técnico.
- Los 36 jugadores con mejor clasificación, basada en la fórmula detallada a continuación, avanzarán a la Fase de Liga.

$$
\text{Sean }m\in[1,2,\dots,10], \ \ N_m\in [1, 2, \dots, N_\text{total\_jugadores}], \ \ j_m \in [1, 2, \dots, N_m], \ \ |p_{g}| = \sum _{m=1}^{10} N_m, \ \ p_{i_m} \in p_{g}
$$

$$
\text{Z-Sum} = \ln\sqrt[\sigma_{m}]{\prod_{m=1}^{10} {{e^{(p_{i_m}-{\mu_m)}}}}}

\text{donde}

\begin{cases}m & = & \text{Enumerador de mapas}
\\
N_m & =&\text{Cantidad de puntuaciones en un mapa }m
\\
j_m & =& \text{Jugador } j \text{ en el mapa } m
\\
p_{g} &=& \text{Conjunto de puntuaciones de todos los mapas }
\\
p_{i_m} &=& \text{Score concreta sobre el mapa } m
\\
\sigma_m &=&\sqrt[] {\ln{\prod_{j_m=1}^{N_m}\sqrt[{N_m}]{ e^{(p_{g_{j_m}} - \mu_m)}}}}
\\\mu_m &=& \ln {\prod_{j_m=1}^{N_m}\sqrt[{N_m}]{e^{p_{g_{j_m}}}}}\end{cases}
$$

## Información sobre la Fase de Liga

### Funcionamiento

- La Fase de Liga tendrá una duración de 2 semanas y estará dividida en dos fases: Liga Fase 1 (**LF1**) y Liga Fase 2 (**LF2**).
- Cada jugador disputará 2 partidos BO8 en cada fase, para un total de 4 partidos durante la Fase de Liga.
- Cada fase de liga, **LF1** y **LF2**, contará de una pool distinta, distintos mapas y distinta dificultad.
- En la **LF1** los 36 jugadores clasificados serán representados mediante una papeleta individual y colocados en un único recipiente transparente.
- El sorteo se realizará íntegramente en directo. Se extraerán dos jugadores del recipiente de forma aleatoria para determinar un partido. Este proceso se repetirá hasta determinar los 18 partidos correspondientes a la primera tanda de la **LF1**.
- Una vez completada la primera tanda, se volverá a realizar el mismo procedimiento para determinar una segunda tanda de 18 partidos, completando así los 2 partidos que disputará cada jugador durante la **LF1**.
- La **LF**2 seguirá el mismo procedimiento de sorteo utilizado en la **LF1**, realizando dos tandas de 18 partidos para determinar los 2 partidos que disputará cada jugador en la **LF2**.
- Los sorteos de **LF1** y **LF2** se realizarán en semanas distintas, así como los Mappool Showcase de las respectivas fases.

### Restricciones de la Fase de Liga

- Un jugador no podrá enfrentarse al mismo rival más de una vez durante toda la Fase de Liga.
- Si durante el sorteo se extrae un enfrentamiento que ya se ha producido, las dos papeletas se volverán a introducir en el bol y se repetirá la extracción de ese partido. Los enfrentamientos que ya hayan sido determinados correctamente se mantendrán.
- Si al llegar a las últimas extracciones los jugadores restantes no permiten formar enfrentamientos válidos, se desharán únicamente los últimos partidos necesarios y los jugadores implicados volverán al bol para realizar un nuevo sorteo entre ellos.
- En ningún caso se repetirá el sorteo completo de una tanda o de una fase; únicamente se modificarán los enfrentamientos necesarios para cumplir esta restricción.

### Sistema de puntuación y clasificación

- Cada partido de la Fase de Liga será un BO8.
- El jugador que consiga 5 o más mapas ganados obtendrá la victoria y recibirá 3 puntos.
- En caso de terminar el partido 4–4, ambos jugadores recibirán 1 punto.
- El jugador que pierda el partido recibirá 0 puntos.
- Al finalizar la Fase de Liga, los jugadores serán ordenados en una clasificación general según los puntos obtenidos durante sus 4 partidos.
- En caso de empate a puntos, se utilizará como primer desempate la diferencia de mapas, calculada como mapas ganados menos mapas perdidos.
- Si dos o más jugadores continúan empatados tanto en puntos como en diferencia de mapas, se utilizará la posición obtenida en los clasificatorios como último criterio de desempate. Por tanto, una mejor posición en los clasificatorios puede determinar una mejor posición final en la Fase de Liga en caso de empate.
- **El top 1-8 de la Fase de Liga clasificará directamente a la ronda de doble eliminación de octavos de final (RO16), el top 9-24 pasará a una ronda intermedia llamada "La Purga" y el top 25-36 quedarán eliminados del torneo.**

## Información General de los Partidos

**Procedimiento Partidos**

- Los jugadores recibirán una notificación 15 minutos antes de su hora asignada.
- Aquel jugador que llegue 5 minutos tarde, perderá su protección de mapa y bans.
- Aquel jugador que no llegue pasados 10 minutos de su hora asignada, será dado como perdedor del match.
- Los mapas de calentamiento están permitidos, deben durar un máximo de 3:30 minutos.

**Protecciones, Picks y Bans**

- La seed más alta de los clasificatorios se reserva el derecho de elegir entre la primera protección de mapa o la segunda protección de mapa. Solo habrá una protección de mapa disponible en cada partido, 1 para cada jugador. Estos mapas no podrán ser baneados posteriormente y podrán ser pickeados en cualquier momento.
- Un !roll decidirá el orden de picks y bans. El jugador con el !roll más alto podrá elegir entre el orden de picks o bans, dejando al otro jugador con la opción restante.
- El orden de bans será ABAB. (AB en la Fase de Liga)
- El doble ban no está permitido.

**Temporizadores y Timeouts**

- Habrá un temporizador de hasta 90 segundos para pickear un mapa y posteriormente 30 segundos para estar listo posteriormente.
- Cada jugador podrá ser avisado hasta 2 veces por no estar listo antes de que acabe cada temporizador. Al tercer aviso será dado por perdedor del partido.
- Cada jugador tiene a su disposición un temporizador (timeout) de 90 segundos, que puede utilizar entre mapas después del temporizador que ya hay dado.
- En caso de darse algún problema técnico en los primeros 20 segundos del mapa, el árbitro asignado deberá abortar el mapa.
- En caso de darse algún problema técnico pasados los primeros 20 segundos del mapa, el árbitro pedirá una replay o prueba para poder verificar el score del afectado.

## Normas del torneo y aclaraciones

- Es obligatorio permanecer en el servidor de discord oficial del torneo hasta que cada jugador finalice su participación en el torneo.
- La administración se reserva el derecho de expulsar del torneo a cualquier jugador que incumpla las normas establecidas.
- La administración podrá aclarar o modificar el redactado de una norma cuando sea necesario para resolver una ambigüedad o facilitar su interpretación.
- La administración podrá añadir nuevas normas cuando sea necesario para garantizar el correcto funcionamiento, la integridad y el juego limpio del torneo.
- No se permitirá ningún tipo de falta de respeto, acoso o comportamiento antideportivo hacia jugadores, miembros del personal u otras personas relacionadas con el torneo.
- No se podrán compartir ni publicar los resultados de la Ronda Clasificatoria antes de su anuncio oficial por parte de la administración.
- Queda prohibido el uso de multicuentas, cheats o cualquier otro método que proporcione una ventaja ilegítima.
- Todos los jugadores deberán cumplir las normas oficiales de osu!. Su incumplimiento podrá ser sancionado por la administración.
- Los miembros del personal del torneo no podrán participar como jugadores, con excepción de comentaristas, streamers y creadores de GFX.
- Los jugadores eliminados podrán participar en labores de arbitraje y/o realización de replays.
- La administración podrá resolver cualquier situación no contemplada en estas normas tomando las medidas necesarias para preservar la integridad y el correcto desarrollo del torneo.

## Mappools

<div class="overflow-x-auto">

| RONDA           |  SR  | NM  | HD  | HR  | DT  | TB  | BEST OF |
| :-------------- | :--: | :-: | :-: | :-: | :-: | :-: | :------ |
| Clasificatorias | 6,5★ |  4  |  2  |  2  |  2  |  0  |         |
| Liga Fase 1     | 6,2★ |  4  |  2  |  2  |  3  |  0  | Bo8     |
| Liga Fase 2     | 6,4★ |  4  |  2  |  2  |  3  |  0  | Bo8     |
| La Purga        | 6,6★ |  5  |  3  |  3  |  3  |  1  | Bo9     |
| Octavos         | 6,4★ |  5  |  3  |  3  |  3  |  1  | Bo9     |
| Cuartos         | 6,6★ |  6  |  3  |  3  |  4  |  1  | Bo11    |
| Semifinales     | 6,8★ |  6  |  3  |  3  |  4  |  1  | Bo11    |
| Finales         | 7,0★ |  7  |  3  |  3  |  4  |  1  | Bo13    |
| Gran final      | 7,2★ |  7  |  3  |  3  |  4  |  1  | Bo13    |

</div>

## Formulario de reportes de torneos

<https://tcomm.hivie.tn/reports/create>
