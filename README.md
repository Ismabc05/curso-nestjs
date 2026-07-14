# 🚀 NestJS Blog API

Proyecto desarrollado durante un curso de **NestJS**, en el que se construye una API REST para un blog aplicando buenas prácticas de desarrollo, autenticación y arquitectura modular.

## 📚 Tecnologías

- NestJS
- TypeScript
- Node.js
- Express
- Passport.js
- Passport Local
- JWT (JSON Web Token)
- bcrypt
- Type ORM
- PostgreSQL
- Class Validator
- Class Transformer

## 📂 Funcionalidades

- ✅ Arquitectura modular de NestJS.
- ✅ CRUD de usuarios.
- ✅ CRUD de publicaciones (Posts).
- ✅ Autenticación mediante Passport Local.
- ✅ Generación y validación de JWT.
- ✅ Protección de rutas con Guards.
- ✅ Hash de contraseñas con bcrypt.
- ✅ Validación de datos mediante DTOs.
- ✅ Manejo centralizado de excepciones.
- ✅ Variables de entorno con ConfigModule.
- ✅ Base de datos PostgreSQL mediante Prisma ORM.

## ⚙️ Instalación

Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/nest-blog-api.git
```

Entrar en el proyecto:

```bash
cd my-blog-api
```

Instalar dependencias:

```bash
npm install
```

## 🔧 Variables de entorno

Crear un archivo `.env` en la raíz del proyecto.

```env
DATABASE_URL=
JWT_SECRET=
OPEN_API_KEY=
```

## 🗄️ Base de datos

Generar el cliente de Prisma:

```bash
npm run typeorm migration:generate
```

Ejecutar las migraciones:

```bash
npm run typeorm migration:run
```

## ▶️ Ejecutar el proyecto

Modo desarrollo:

```bash
npm run start:dev
```

Modo producción:

```bash
npm run start:prod
```

## 🔐 Flujo de autenticación

1. Registrar un usuario.
2. Iniciar sesión con usuario y contraseña.
3. Passport Local valida las credenciales.
4. Se genera un JWT.
5. El cliente utiliza el token para acceder a las rutas protegidas.

## 📌 Endpoints principales

### Auth

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| POST | `/auth/login` | Iniciar sesión |
| POST | `/auth/register` | Registrar usuario |

### Users

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| GET | `/users` | Obtener usuarios |
| GET | `/users/:id` | Obtener usuario |
| POST | `/users` | Crear usuario |
| PATCH | `/users/:id` | Actualizar usuario |
| DELETE | `/users/:id` | Eliminar usuario |

### Posts

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| GET | `/posts` | Obtener publicaciones |
| GET | `/posts/:id` | Obtener publicación |
| POST | `/posts` | Crear publicación |
| PATCH | `/posts/:id` | Actualizar publicación |
| DELETE | `/posts/:id` | Eliminar publicación |

## 📖 Conceptos aprendidos

- Arquitectura modular de NestJS.
- Controladores, servicios y módulos.
- Inyección de dependencias.
- DTOs y validación.
- Pipes.
- Guards.
- Middleware.
- Decoradores personalizados.
- Passport Local.
- JWT.
- Prisma ORM.
- Relaciones entre entidades.
- Variables de entorno.
- Manejo de excepciones.
- Autenticación y autorización.

## 🎯 Objetivo del proyecto

El objetivo de este proyecto es aprender el funcionamiento interno de **NestJS**, implementando una API REST completa siguiendo buenas prácticas, una arquitectura escalable y un sistema de autenticación seguro utilizando **Passport**, **JWT** y **Prisma**.

## 📄 Licencia

Este proyecto ha sido desarrollado con fines educativos como parte de un curso de **NestJS**.
