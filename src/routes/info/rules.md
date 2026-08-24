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
\text{Sean }m\in[1,2,\dots,10], \ \  N_m\in [1, 2, \dots, N_\text{total\_jugadores}], \ \ j_m \in [1, 2, \dots, N_m], \ \ |p_{g}| = \sum _{m=1}^{10} N_m, \ \ p_{i_m} \in p_{g}
$$

$$
\text{Z-Sum} = \ln\sqrt[\sigma_{m}]{\prod_{m=1}^{10} {{e^{(p_{i_m}-{\mu_m)}}}}}

\text{donde}

\begin{cases}m & = & \text{Enumerador de mapas}
\\
N_m & =&\text{Cantidad de puntuaciones en un mapa }m
\\
j_m &  =& \text{Jugador } j \text{ en el mapa } m
\\
p_{g} &=& \text{Conjunto de puntuaciones de todos los mapas }
\\
p_{i_m} &=& \text{Score concreta sobre el mapa } m
\\
\sigma_m &=&\sqrt[] {\ln{\prod_{j_m=1}^{N_m}\sqrt[{N_m}]{ e^{(p_{g_{j_m}} - \mu_m)}}}}
\\\mu_m &=& \ln {\prod_{j_m=1}^{N_m}\sqrt[{N_m}]{e^{p_{g_{j_m}}}}}\end{cases}
$$

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

| RONDA           | ESTRELLAS | NOMODS | OCULTOS | ROCADURAS | TIEMPODOBLES | ROMPEEMPATES |
| :-------------- | --------: | -----: | ------: | --------: | -----------: | -----------: |
| Clasificatorias |      6,5★ |      4 |       2 |         2 |            2 |            0 |
| Liga Fase 1     |      6,2★ |      4 |       2 |         2 |            3 |            0 |
| Liga Fase 2     |      6,4★ |      4 |       2 |         2 |            3 |            0 |
| La Purga        |      6,6★ |      5 |       3 |         3 |            3 |            1 |
| Octavos         |      6,4★ |      5 |       3 |         3 |            3 |            1 |
| Cuartos         |      6,6★ |      6 |       3 |         3 |            4 |            1 |
| Semifinales     |      6,8★ |      6 |       3 |         3 |            4 |            1 |
| Finales         |      7,0★ |      7 |       3 |         3 |            4 |            1 |
| Gran final      |      7,2★ |      7 |       3 |         3 |            4 |            1 |

</div>

## Formulario de reportes de torneos

<https://tcomm.hivie.tn/reports/create>
