# 🍊 Montull Valencia 2026 — Guía de Despliegue

## Resumen
App de votación familiar para planificar el viaje a Valencia.
**Stack:** Next.js + Firebase Realtime Database + Vercel (todo gratis).

---

## Paso 1: Crear proyecto en Firebase (5 min)

1. Ve a **https://console.firebase.google.com**
2. Clic en **"Crear un proyecto"** → Ponle nombre: `montull-valencia`
3. Desactiva Google Analytics (no lo necesitas) → **Crear proyecto**
4. En el panel del proyecto, clic en el icono **Web `</>`** para registrar una app web
5. Ponle nombre: `montull-web` → **Registrar app**
6. Firebase te mostrará un bloque `firebaseConfig` — **copia esos valores**, los necesitarás luego

### Activar Realtime Database

1. En el menú lateral: **Build → Realtime Database**
2. Clic en **"Crear base de datos"**
3. Elige la ubicación más cercana (ej: `us-central1` o `europe-west1`)
4. Selecciona **"Empezar en modo de prueba"** (las reglas las ajustamos después)
5. Clic en **Activar**

### Reglas de seguridad (importante)

En la pestaña **"Reglas"** del Realtime Database, pega esto:

```json
{
  "rules": {
    "votes": {
      "$member": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

Esto permite que cualquiera lea y escriba votos (protegido por la contraseña de la app).

---

## Paso 2: Subir el código a GitHub (3 min)

1. Crea un repositorio nuevo en **https://github.com/new**
   - Nombre: `montull-valencia` (puede ser privado)
   - NO inicialices con README
2. En tu terminal:

```bash
cd montull-valencia
git init
git add .
git commit -m "Planificador Montull Valencia 2026"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/montull-valencia.git
git push -u origin main
```

---

## Paso 3: Desplegar en Vercel (5 min)

1. Ve a **https://vercel.com** e inicia sesión con GitHub
2. Clic en **"Add New Project"**
3. Importa tu repositorio `montull-valencia`
4. En **"Environment Variables"**, añade cada una con los valores de Firebase del Paso 1:

| Variable | Valor |
|----------|-------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | tu_api_key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | tu_proyecto.firebaseapp.com |
| `NEXT_PUBLIC_FIREBASE_DATABASE_URL` | https://tu_proyecto-default-rtdb.firebaseio.com |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | tu_project_id |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | tu_proyecto.appspot.com |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | tu_sender_id |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | tu_app_id |

5. Clic en **Deploy**
6. Espera ~2 minutos. Vercel te dará una URL tipo: `montull-valencia.vercel.app`

---

## Paso 4: ¡Compartir con la familia!

Envía el link a todos con este mensaje:

> 🍊 ¡Hola familia! Ya está listo el planificador de Valencia.
> Entrad aquí: **[tu-url].vercel.app**
> Contraseña: **valencia2026**
> Seleccionad vuestro nombre y votad SÍ o NO en las actividades de cada día.
> ¡Cuando todos hayan votado, armamos el plan definitivo!

---

## Dominio personalizado (opcional)

Si quieres una URL más bonita (ej: `valencia.montull.family`):
1. En Vercel → Settings → Domains → Añadir dominio
2. Sigue las instrucciones de DNS

---

## Solución de problemas

**"Los votos no se guardan"**
→ Verifica que `NEXT_PUBLIC_FIREBASE_DATABASE_URL` es correcta (con `https://`)
→ Verifica que las reglas de Firebase permiten lectura/escritura

**"Pantalla en blanco"**
→ Revisa la consola del navegador (F12) → Probablemente falta alguna variable de entorno

**"Error al desplegar en Vercel"**
→ Ejecuta `npm run build` localmente primero para ver errores

---

## Costes

Todo es **100% gratuito**:
- Firebase Spark (gratis): 1GB almacenamiento, 10GB/mes transferencia
- Vercel Hobby (gratis): deploys ilimitados
- Para 7 personas votando, ni de lejos llegaréis al límite
