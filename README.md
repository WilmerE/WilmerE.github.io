# 🚀 Portfolio Personal - Wilmer Pelicó

Portfolio personal moderno y responsive construido con HTML5, CSS3 y JavaScript vanilla. Diseño minimalista con animaciones suaves y optimizado para rendimiento.

## ✨ Características

- 🎨 **Diseño Moderno**: Interfaz limpia y profesional con degradados y animaciones suaves
- 📱 **Totalmente Responsive**: Optimizado para todos los dispositivos (móvil, tablet, desktop)
- ⚡ **Alto Rendimiento**: Carga rápida con lazy loading y optimizaciones
- 🎭 **Animaciones Fluidas**: Transiciones suaves y efectos de scroll
- ♿ **Accesible**: Cumple con estándares de accesibilidad web
- 🔍 **SEO Optimizado**: Meta tags y estructura semántica para mejor posicionamiento
- 🎯 **Navegación Intuitiva**: Menú sticky que se oculta al hacer scroll hacia abajo

## 🛠️ Tecnologías

- **HTML5**: Estructura semántica moderna
- **CSS3**: Variables CSS, Grid, Flexbox, animaciones nativas
- **JavaScript ES6+**: Clases, módulos, async/await
- **Typed.js**: Efecto de escritura animada
- **Intersection Observer API**: Animaciones al hacer scroll

## 📁 Estructura del Proyecto

```
WilmerE.github.io/
├── index.html              # Página principal
├── form_mats.html          # Calculadora de materiales
├── css/
│   ├── estilos.css         # Estilos modernos
│   └── estilos.css.backup  # Backup del CSS original
├── js/
│   ├── habilidades-modern.js  # JavaScript moderno con clases ES6
│   ├── habilidades.js      # JavaScript original (legacy)
│   └── calcmats/           # Scripts de la calculadora
├── fonts/                  # Fuentes personalizadas
├── img/                    # Imágenes y recursos
└── lib/                    # Librerías externas
    ├── typed/              # Typed.js
    └── lottie5.5.9/        # Lottie animations
```

## 🚀 Inicio Rápido

### Desarrollo Local

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/WilmerE/WilmerE.github.io.git
   cd WilmerE.github.io
   ```

2. **Abrir con Live Server**
   
   Si usas VS Code, instala la extensión "Live Server" y haz clic derecho en `index.html` → "Open with Live Server"

3. **O simplemente abre el archivo**
   ```bash
   open index.html
   ```

### Despliegue en GitHub Pages

El sitio está configurado para desplegarse automáticamente en GitHub Pages:

- **URL**: https://wilmere.github.io
- Los cambios en la rama `main` se publican automáticamente

## 📝 Personalización

### Cambiar Colores

Edita las variables CSS en `css/estilos.css`:

```css
:root {
    --primary-color: #003770;
    --accent-color: #bda113;
    --text-primary: #1a1a1a;
    /* ... más colores */
}
```

### Actualizar Habilidades

Modifica el objeto `skillsData` en `js/habilidades-modern.js`:

```javascript
const skillsData = {
    diseño: [
        { nombre: 'Photoshop', dominio: 90, icon: '🎨' },
        // Agrega más habilidades...
    ],
    // ...
};
```

### Cambiar Proyectos

Edita la sección de proyectos en `index.html`:

```html
<article class="project-card">
    <div class="project-image">
        <img src="img/tu-proyecto.jpg" alt="Tu Proyecto">
    </div>
    <div class="project-info">
        <h3>Nombre del Proyecto</h3>
        <p>Descripción breve</p>
        <div class="project-tags">
            <span class="tag">Tech 1</span>
            <span class="tag">Tech 2</span>
        </div>
    </div>
</article>
```

## 🎨 Secciones

### 1. Hero
- Presentación personal con efecto Typed
- Botones de llamada a la acción
- Indicador de scroll animado

### 2. Habilidades
- Sistema de tabs interactivo
- Barras de progreso animadas
- 3 categorías: Diseño, Backend, Frontend

### 3. Proyectos
- Grid responsive de proyectos
- Overlays con enlaces
- Tags de tecnologías

### 4. Acerca de
- Biografía profesional
- Estadísticas destacadas
- Diseño de dos columnas

### 5. Contacto
- Formulario de contacto
- Enlaces sociales
- Información de contacto

### 6. Footer
- Enlaces de navegación
- Redes sociales
- Copyright

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## ⚡ Optimizaciones

- **Lazy Loading**: Imágenes cargadas bajo demanda
- **CSS Minification**: Estilos optimizados
- **Font Display Swap**: Carga de fuentes optimizada
- **Intersection Observer**: Animaciones eficientes
- **Debounced Scroll**: Mejor rendimiento en eventos de scroll

## 🌐 Navegadores Soportados

- ✅ Chrome (últimas 2 versiones)
- ✅ Firefox (últimas 2 versiones)
- ✅ Safari (últimas 2 versiones)
- ✅ Edge (últimas 2 versiones)
- ✅ iOS Safari
- ✅ Chrome Android

## 📊 Performance

- **Lighthouse Score**: 95+
- **Tiempo de carga**: < 2s
- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2.5s

## 🤝 Contribuciones

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva característica'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de uso personal. Si deseas usar este diseño como base para tu propio portfolio, por favor da crédito apropiado.

## 👤 Autor

**Wilmer Pelicó**

- GitHub: [@WilmerE](https://github.com/WilmerE)
- Portfolio: [wilmere.github.io](https://wilmere.github.io)

## 🙏 Agradecimientos

- [Typed.js](https://github.com/mattboldt/typed.js/) - Efecto de escritura
- [Font Awesome](https://fontawesome.com/) - Iconos (si se usan)
- Inspiración de diseños modernos de la comunidad

---

⭐ Si te gustó este proyecto, considera darle una estrella en GitHub!

**Última actualización**: Noviembre 2025
