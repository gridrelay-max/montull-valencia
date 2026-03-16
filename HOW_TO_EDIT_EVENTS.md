# 📝 Cómo Editar Eventos

## Editar en GitHub (Fácil - No requiere código)

1. Ve a: https://github.com/gridrelay-max/montull-valencia/blob/main/lib/data.ts
2. Click en el ícono del **lápiz** (Edit this file) arriba a la derecha
3. Encuentra el día que quieres cambiar (busca `date: "Mar 31"` por ejemplo)
4. En la sección `activities: [...]` puedes:
   - **Añadir:** Copia un bloque `{ id: "...", ... },` y pégalo
   - **Eliminar:** Borra el bloque completo
   - **Modificar:** Cambia `name`, `time`, `desc`

5. Scroll abajo → **"Commit changes"** → Confirmar
6. Espera 1-2 minutos → Vercel redesplegará automáticamente

## Ejemplo de Actividad Nueva

```typescript
{
  id: "d0-99",  // DEBE SER ÚNICO
  time: "22:00",
  name: "Tapas nocturnas",
  type: "meal",
  free: false,
  desc: "Tapas en el barrio del Carmen"
},
```

## IDs Únicos

- Día 0: d0-0, d0-1, ...
- Día 1: d1-0, d1-1, ...
- Si añades una: usa d0-99, d1-99, etc.
