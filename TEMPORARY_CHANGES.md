# Secciones Temporalmente Comentadas

Este archivo registra las secciones que han sido temporalmente comentadas del sitio web y cómo restaurarlas en el futuro.

**Fecha de cambios:** 2025-01-07  
**Razón:** Modificación de imágenes en proceso - secciones temporalmente ocultas hasta que estén listas las nuevas imágenes.

---

## 🖼️ SECCIÓN GALERÍA

### Archivos afectados:

#### 1. **src/pages/galeria.astro** - Página completa comentada
- **Estado:** Toda la página comentada
- **Ubicación:** `src/pages/galeria.astro`
- **Descripción:** Página de galería con React component y Lightbox functionality

#### 2. **Navegación y Links** ✅ COMENTADOS

**Archivos modificados:**

**`src/config/menu.json`** - Líneas 38-43
```json
{
  "_comment": "TEMPORALMENTE COMENTADO - Galería (Ver TEMPORARY_CHANGES.md)",
  "name": "Galería",
  "url": "/galeria",
  "_disabled": true
}
```

**`src/layouts/partials/Header.astro`** - Líneas 18, 23, 57
- Agregada propiedad `_disabled?: boolean` a la interfaz
- Filtro para elementos deshabilitados: `activeMain = main.filter(item => !item._disabled)`

**`src/content/homepage/-index.md`** - Líneas 63-66
```yaml
button:
  enable: false  # TEMPORALMENTE DESACTIVADO - Ver TEMPORARY_CHANGES.md
  label: "Ver Galería de Casos"
  link: "/galeria"
```

### Componentes relacionados:
- `src/layouts/components/GalleryLightbox.tsx` - Componente React funcional ✅
- `src/styles/masonry-gallery.css` - Estilos CSS ✅
- `src/content/galeria/-index.md` - Contenido de la galería ✅

---

## 💬 SECCIÓN TESTIMONIOS

### Archivos afectados:

#### 1. **src/pages/index.astro** - Sección en homepage ✅ COMENTADO
- **Líneas 352-353**
- **Código comentado:**
```astro
<!-- TEMPORALMENTE COMENTADO - Testimonios (Ver TEMPORARY_CHANGES.md) -->
<!-- <Testimonial class="bg-pattern-mosaico" testimonial={testimonial} /> -->
```

#### 2. **Componente Testimonial** ✅ PRESERVADO
- **Ubicación:** `src/partials/Testimonial.astro`
- **Estado:** Componente mantenido, solo comentado su uso

#### 3. **Contenido Testimonial** ✅ PRESERVADO
- **Ubicación:** `src/content/sections/testimonial.md`
- **Estado:** Contenido mantenido, solo comentado su renderizado

---

## 🔄 CÓMO RESTAURAR EN EL FUTURO

### Para la Galería:
1. **Descomentar** toda la página `src/pages/galeria.astro` (remover `<!--` y `-->`)
2. **Descomentar** en `src/config/menu.json` líneas 38-43:
   ```json
   {
     "name": "Galería",
     "url": "/galeria"
   }
   ```
   (Remover las propiedades `_comment` y `_disabled`)
3. **Reactivar** botón en `src/content/homepage/-index.md` línea 64:
   ```yaml
   enable: true  # Cambiar de false a true
   ```
4. **Actualizar** imágenes en `src/content/galeria/-index.md` si es necesario
5. **Probar** funcionalidad del lightbox y responsive design

### Para los Testimonios:
1. **Descomentar** en `src/pages/index.astro` líneas 352-353:
   ```astro
   <Testimonial class="bg-pattern-mosaico" testimonial={testimonial} />
   ```
2. **Actualizar** imágenes en `src/content/sections/testimonial.md` si es necesario
3. **Verificar** que los testimonios se muestren correctamente

---

## 📋 CHECKLIST PARA RESTAURACIÓN

### Galería:
- [ ] Descomenta `src/pages/galeria.astro` (remover `<!--` y `-->`)
- [ ] Descomenta `src/config/menu.json` líneas 38-42
- [ ] Reactivar botón `src/content/homepage/-index.md` (enable: true)
- [ ] Actualiza imágenes en `src/content/galeria/-index.md`
- [ ] Prueba lightbox functionality (GalleryLightbox.tsx)
- [ ] Prueba responsive design y grid centering
- [ ] Verifica SEO meta tags
- [ ] Prueba navegación desde menú principal

### Testimonios:
- [ ] Descomenta `src/pages/index.astro` líneas 352-353
- [ ] Actualiza imágenes en `src/content/sections/testimonial.md`
- [ ] Verifica responsive design
- [ ] Prueba en diferentes dispositivos
- [ ] Verifica que no haya conflictos con otras secciones

---

## 📝 NOTAS TÉCNICAS

### Componentes mantenidos:
- ✅ **GalleryLightbox.tsx** - React component completamente funcional
- ✅ **masonry-gallery.css** - CSS styles optimizados y centrados
- ✅ **TeamSlider.tsx** - React slider component (funcional)

### Funcionalidades preservadas:
- ✅ Content collections configurados correctamente
- ✅ TypeScript types actualizados
- ✅ Responsive design implementado
- ✅ Lightbox con navegación por teclado
- ✅ Astro Islands implementation

### Próximos pasos cuando se restaure:
1. Reemplazar imágenes placeholder con las definitivas
2. Optimizar imágenes para web (WebP, diferentes tamaños)
3. Actualizar alt texts y captions
4. Verificar que todos los links funcionen correctamente

---

**⚠️ IMPORTANTE:** No eliminar este archivo hasta que ambas secciones sean restauradas completamente.