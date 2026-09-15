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

## Información General de los Partidos

__Procedimiento Partidos__

- Los jugadores recibirán una notificación 15 minutos antes de su hora asignada.
- Aquel jugador que llegue 5 minutos tarde, perderá su protección de mapa y bans.
- Aquel jugador que no llegue pasados 10 minutos de su hora asignada, será dado como perdedor del match.
- Los mapas de calentamiento están permitidos, deben durar un máximo de 3:30 minutos.

__Protecciones, Picks y Bans__

- La seed mas alta de los clasificatorios se reserva el derecho de elegir entre la primera protección de mapa o la segunda protección de mapa. Solo habrá una protección de mapa disponible en cada partido, 1 para cada jugador. Estos mapas no podrán ser baneados posteriormente y podrán ser pickeados en cualquier momento.
- Un !roll decidirá el orden de picks y bans. El jugador con el !roll más alto podrá elegir entre el orden de picks o bans, dejando al otro jugador con la opción restante.
- El orden de bans será ABAB.
- El doble ban no está permitido.

__Temporizadores y Timeouts__

- Hay un temporizador de hasta 90 segundos entre mapas, contabilizando la elección de mapa y el estar listo posteriormente.
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
