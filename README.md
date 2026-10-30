# ✨ Leti & Miguel | Family App (Especial Visita)

Una aplicación web interactiva, moderna y diseñada con mucho mimo para **Leti**, **Miguel** y sus dos pequeños: **Nico (3 años)** y **Noel (1-2 años)**, lista para desplegar en **GitHub Pages** y utilizable como **PWA instalable** en cualquier smartphone (iPhone o Android).

---

## 🌟 ¿Qué incluye la app?

### 🏠 1. Inicio Familiar
- Fichas interactivas personalizadas para cada miembro:
  - **Leti**: Estilo, Glamour & Interiorismo
  - **Miguel**: Piloto FPV & Tech Master
  - **Nico (3 años)**: Pequeño Aventurero
  - **Noel (1-2 años)**: El Rey de la Casa
- Contador de estadísticas familiares con humor (plantas de Leti, drones estrellados/reparados de Miguel, risas de los peques).
- Botón de celebración con confeti y fanfarria.

### 💖 2. El Rincón de Leti (Moda & Deco Glam)
- **Estudio de Interiorismo Interactivo**: Diseñador visual de estancias con paletas chic (Lino Cálido, Verde Salvia, Terracota...), piezas centrales (sofás bouclé, terciopelo), plantas XXL y lámparas de diseño.
- **Probador de Estilos & Outfits**: Combinaciones completas de vestido, bolso, calzado y maquillaje según la ocasión (¡incluyendo el look especial para la visita de amigos!).
- **Wishlist & Proyectos**: Lista de deseos interactiva para marcar proyectos cumplidos.

### 🛸 3. El Laboratorio de Miguel (Tech & Drones)
- **Simulador Arcade Dron FPV**: Minijuego en HTML5 Canvas con física de vuelo (empuje, gravedad, inercia), sonido de motores a reacción, recogida de objetivos fotográficos, lentes y baterías LiPo.
- **El Cacharrómetro (Generador DIY)**: Mezclador de componentes (ESP32, Raspberry Pi, LiDAR, fibra de carbono) para resolver problemas domésticos con humor.
- **Visor Réflex Profesional**: Interfaz de cámara réflex (apertura f/1.4, obturador 1/500s, ISO, retícula de tercios) con botón disparador y opción de usar la cámara real del teléfono.

### 🎈 4. Zona Sensorial Peques (Nico & Noel)
- Diseñada específicamente para deditos de niños de 1 a 3 años:
  - **Explota-Burbujas**: Burbujas de colores, drones y estrellas que flotan suavemente. Al tocarlas: sonido musical afinado (xilófono pentatónico relajante), ¡PLOP! y explosión de confeti.
  - **Piano Mágico de Animalitos & Gadgets**: Botones gigantes con iconos alegres (el dron de papá, la cámara, el perrito, el gatito, el coche...) que emiten sonidos y animaciones simpáticas.

### ❤️ 5. El Duelo de Pareja ("Leti vs Miguel")
- Juego de salón para jugar mañana en el sofá: preguntas sobre quién compra a las 2 AM, quién tarda más en salir, quién es más manitas o quién tiene más paciencia.
- Sistema de votación dual en la misma pantalla para ver si coinciden o hay debate.

### 📸 6. La Visita Especial
- **Ruleta Gastronómica**: Resuelve en 5 segundos el "¿Qué cenamos/pedimos hoy?" (Pizzas, sushi, hamburguesas, lo que cocine Miguel o lo que mande Nico).
- **Fotomatón de la Visita**: Sube una foto de todos juntos y descárgala enmarcada como recuerdo inolvidable de la visita.
- **Compartir por QR**: Botón siempre accesible para escanear y abrir en el móvil en 1 segundo.

---

## 🚀 Cómo probarla ahora mismo en tu equipo

1. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```
2. Abre la URL que te indique en la terminal (normalmente `http://localhost:5173`).

---

## 🌐 Cómo publicarla en GitHub Pages (en 2 minutos)

Ya hemos dejado configurado:
- `vite.config.ts` con rutas relativas (`base: './'`) para que funcione en cualquier subruta de GitHub Pages.
- El flujo automático de GitHub Actions en `.github/workflows/deploy.yml`.

### Pasos:
1. **Crea un repositorio en tu cuenta de GitHub** (por ejemplo llamado `LetiMiguel`).
2. **Vincula tu repositorio local y súbelo**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/LetiMiguel.git
   git push -u origin main
   ```
3. **Activa GitHub Pages**:
   - Entra en tu repositorio en GitHub -> **Settings** -> **Pages**.
   - En **Source**, selecciona **GitHub Actions**.
   - ¡Listo! En 1 o 2 minutos tu web estará publicada en:  
     `https://TU_USUARIO.github.io/LetiMiguel/`

---

## 📱 Cómo abrirla e instalarla en el móvil (como App nativa)

Cuando estés en casa de Leti y Miguel:
1. Abre la web en el móvil o pulsa el botón **"Móvil / QR"** en la barra superior de la app para que ellos apunten con su cámara y la abran al instante.
2. **Instalar en pantalla de inicio (PWA)**:
   - **En iPhone (Safari)**: Tocar el botón de compartir (el cuadrado con la flecha hacia arriba) y seleccionar **"Añadir a la pantalla de inicio"**.
   - **En Android (Chrome)**: Tocar los tres puntos arriba a la derecha y seleccionar **"Instalar aplicación"** o **"Añadir a la pantalla de inicio"**.

Aparecerá el icono brillante de la app en su móvil y funcionará a pantalla completa como una aplicación nativa.
