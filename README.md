
# 🚀 ComunidadPro - Especificaciones del Backend (v4.0)

Este documento detalla los requerimientos, arquitectura y lógica necesaria para construir el backend de **ComunidadPro**. El sistema está diseñado para gestionar una comunidad de forma integral, incluyendo un portal público (CMS), administración de miembros, control financiero y analítica con IA.

---

## 🛠️ Stack Tecnológico Sugerido
- **Runtime**: Node.js
- **Lenguaje**: TypeScript
- **Framework**: Express
- **Base de Datos**: MongoDB (Mongoose)
- **Autenticación**: Firebase Admin SDK (Google Auth Integration)
- **Arquitectura y diseño**: Hexagonal, limpia. Uso de principios SOLID y patrones de desarrollo.

---

## 🔐 Sistema de Autenticación y Autorización (Híbrido)

El sistema utiliza **Firebase Authentication** para la validación de identidad y **MongoDB** para la gestión de permisos internos.

### 1. Flujo de Login
1.  **Frontend**: El usuario se autentica con Google mediante el SDK de Firebase.
2.  **Frontend**: Envía el `IdToken` al Backend en el header `Authorization: Bearer <token>`.
3.  **Backend (Middleware)**:
    -   Verifica el token usando `firebase-admin`.
    -   Extrae el `email` del usuario.
    -   Busca el usuario en la colección `Users` de MongoDB.
    -   **Validación Crítica**: Si el usuario no existe en MongoDB, se retorna `403 Forbidden` (aunque Firebase diga que es válido), ya que el acceso debe ser autorizado por un Administrador en el módulo de parámetros.

### 2. Middlewares Requeridos
-   `authMiddleware`: Valida el token de Firebase.
-   `rbacMiddleware(module)`: Verifica si el usuario tiene el permiso específico en el array `permissions` o si es `role: 'admin'`.

---

## 📊 Modelos de Datos (Entidades MongoDB)

### 1. User (Usuarios del Sistema)
```typescript
{
  email: String, // Unique, clave para match con Firebase
  name: String,
  role: 'admin' | 'user',
  permissions: String[], // E.g., ['Ministerios', 'Transacciones']
  avatar: String,
  createdAt: Date
}
```

### 2. Person (Miembros de la Comunidad)
```typescript
{
  identification: String, // Unique
  idType: String, // CC / TI / PAS / CE
  fullName: String,
  email: String,
  sex: String,
  civilStatus: String,
  birthDate: String,
  phone: String,
  address: String,
  neighborhood: String,
  ministryId: ObjectId, // Ref: Ministry
  membershipType: String,
  membershipDate: String,
  status: String, // Activo/Inactivo
  occupation: String,
  photoUrl: String, // Base64 o URL de Cloudinary/S3
  isBaptized: Boolean,
  populationGroup: String // Niño / Adulto
}
```

### 3. Transaction (Finanzas)
```typescript
{
  type: String, //Ingreso / Gasto,
  categoryId: ObjectId, // Ref: Category
  date: String,
  value: Number,
  personId: ObjectId, // Ref: Person (opcional)
  observations: String,
  attachmentUrl: String,
  attachmentName: String
}
```

### 4. SiteParameters (CMS del Home Público)
*Solo debe existir un documento en esta colección.*
```typescript
{
  heroImages: String[],
  aboutUs: String,
  mission: String,
  vision: String,
  events: [{
    id: String,
    title: String,
    date: String,
    imageUrl: String
  }],
  contact: {
    address: String,
    phone: String,
    email: String,
    facebook: String,
    instagram: String,
    youtube: String
  }
}


```

### 5. Ministry
```typescript
{
  name: String,
  status: String // Activo / Inactivo

}

```
### 6. Category
```typescript
{
  name: String,
  type: String // Ingreso / Gasto

}

---

## 🛤️ Endpoints de la API

### Módulo Público (Sin Auth)
- `GET /api/site-params`: Retorna la configuración para la Landing Page.

### Módulo Administrativo (Requiere `role: 'admin'`)
- `GET /api/users`: Lista usuarios del sistema.
- `POST /api/users`: Crea usuario en DB y (opcionalmente) lo invita en Firebase.
- `DELETE /api/users/:id`: Revoca acceso.
- `PATCH /api/site-params`: Actualiza el contenido del Home.

### Gestión de Comunidad (Requiere permisos específicos)
- `GET/POST/PUT/DELETE /api/people`
- `GET/POST/PUT/DELETE /api/ministries`
- `GET/POST/PUT/DELETE /api/categories`
- `GET/POST/PUT/DELETE /api/transactions`



## ⚖️ Reglas de Negocio a Implementar

1.  **Integridad Financiera**: Al crear una `Transaction`, el backend DEBE validar que el `type` (Ingreso/Gasto) coincida con el `type` definido en la `Category` referenciada.
2.  **Seguridad de Borrado**: No permitir borrar categorías que tengan transacciones asociadas (o implementar borrado lógico).

---

## 🚀 Paso a Paso para el Desarrollo

### Paso 1: Configuración Inicial
1.  Inicializar proyecto Node.js con TypeScript.
2.  Configurar Mongoose y conexión a MongoDB Atlas.
3.  Configurar Firebase Admin SDK con el archivo JSON de la Service Account.

### Paso 2: Middlewares de Seguridad
1.  Implementar `auth.middleware.ts` para capturar el Bearer Token.
2.  Verificar el token con `admin.auth().verifyIdToken()`.
3.  Validar el usuario contra la base de datos de MongoDB.

### Paso 3: Implementación de Módulos (CRUDs)
1.  Desarrollar controladores para Ministerios y Categorías (son los más simples).
2.  Desarrollar el módulo de Personas (manejo de fotos).
3.  Desarrollar el módulo de Transacciones con la validación cruzada de tipos.

### Paso 4: Implementación del CMS
1.  Crear la ruta `GET /api/site-params` con caché o respuesta rápida.
2.  Crear el `PATCH` para que el administrador actualice la misión, visión e imágenes desde el nuevo módulo del frontend.

### Paso 5: Integración Gemini
1.  Implementar un servicio que formatee los datos financieros de un periodo y los envíe a Gemini para obtener el resumen ejecutivo.

---

## ⚙️ Variables de Entorno (.env)
```bash
PORT=3001
MONGODB_CNN=mongodb+srv://restauracion:TR7O3Kaw20m45vXf@andreweb.8rk6whz.mongodb.net/restauraciondb
SECRETPRIVATEKEY=Igl3siaR35ta@23
FIREBASE_SERVICE_ACCOUNT_PATH=./serviceAccountKey.json
FIREBASE_PROJECT_ID=webrestauracionypoder
CLOUDINARY_URL=cloudinary://465153752644845:0U2NlPCdZiOlNxNKKvSDwTgk2qc@dtfr6ngda
API_RATE_LIMIT_WINDOW_MS=60000
API_RATE_LIMIT_MAX=100
CORS_ORIGIN=*
```
