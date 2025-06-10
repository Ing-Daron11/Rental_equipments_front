# Plataforma de Gestión de Equipos Tecnológicos

## Descripción general

Este proyecto, es una aplicación web full-stack diseñada para optimizar la gestión de equipos tecnológicos (computadores, cámaras, proyectores, etc.) en una organización. Provee una solución robusta y segura para el manejo de inventarios, reservas, mantenimientos y usuarios mediante una interfaz moderna y responsiva.

Este proyecto fue desarrollado como parte del Taller de Next.js en la asignatura de **Componentes III** del programa de Ingeniería de Sistemas e Informática de la **Universidad ICESI**.

---

## Objetivos del proyecto

- Construir una aplicación web basada en Next.js con separación clara de responsabilidades.
- Aplicar buenas prácticas en la arquitectura de software utilizando componentes reutilizables.
- Implementar autenticación y autorización con control de roles.
- Conectar eficientemente con una API RESTful desarrollada en NestJS.
- Desplegar una aplicación completa en un entorno de producción real.
- Garantizar la calidad mediante pruebas automatizadas.

---

## Tecnologías utilizadas

### Frontend

- [Next.js 14](https://nextjs.org/) con App Router
- [React 18](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (iconografía)
- [Axios](https://axios-http.com/) (API calls)
- [ShadCN UI](https://ui.shadcn.com/) (sistema de diseño)
- [TypeScript](https://www.typescriptlang.org/)

### Backend (externo)

- [NestJS](https://nestjs.com/)
- PostgreSQL + TypeORM
- JWT para autenticación
- Validación con class-validator

### Testing & Calidad

- Jest (pruebas unitarias y cobertura)
- React Testing Library (componentes)
- ESLint, Prettier

### Despliegue

- Railway para backend y frontend
- GitHub como sistema de control de versiones

---

## Roles y Autorización
- admin: Acceso completo, gestión de equipos, mantenimiento y reservas.

- technical: Gestión de mantenimiento, consulta de equipos.

- user: Consulta y reserva de equipos.

---

## Funcionalidades implementadas

### 1. Autenticación y autorización

- Inicio de sesión y registro con token JWT
- Persistencia de sesión mediante cookies
- Rutas protegidas según el rol del usuario
- Componentes condicionales basados en autenticación
- Decorador personalizado `@Auth()` para roles en backend

### 2. Gestión de Equipos

- Visualización de todos los equipos
- Filtros por categoría, estado, ordenamiento y búsqueda
- Creación, edición y eliminación de equipos (solo admin)
- Cambio de estado: disponible, rentado o en mantenimiento
- Validaciones de estados permitidos
- Componente de lista responsiva con animaciones y feedback visual

### 3. Reservas

- Visualización de equipos rentados por usuario
- Creación de reserva
- Validación de fechas (fecha de inicio < fin)
- Posibilidad de liberar equipos (eliminar reserva)

### 4. Mantenimientos

- Registro de mantenimientos con equipo, técnico y fechas
- Edición o eliminación de registros
- Búsqueda y filtrado por técnico, equipo o estado

### 5. Gestión de usuarios

- Vista de perfil actual
- Acceso a datos del usuario logueado
- Listado completo de usuarios (admin)
- Edición de roles y eliminación de usuarios (admin)

---

## Modulos

| Módulo        | Funcionalidad                                              |
| ------------- | ---------------------------------------------------------- |
| Login         | Autenticación por token JWT                                |
| Equipos       | CRUD, filtros, detalles, cambio de estado, UI adaptativa   |
| Reservas      | Visualización de equipos rentados, ampliación, eliminación |
| Mantenimiento | Crear, editar, eliminar registros técnicos                 |
| Dashboard     | Indicadores visuales por rol                               |

---

## Interfaz y experiencia de usuario

- Diseño moderno, limpio y adaptativo
- Layout consistente con navegación fija y secciones principales:
  - Equipos
  - Reservas
  - Mantenimientos
- Modales reutilizables para formularios

---

## Estructura del proyecto

```bash

src/
├── app/ # Rutas y vistas principales
│ ├── layout.tsx # Layout general con Header/Footer
│ ├── page.tsx # Landing page
│ ├── equipos/ # Página de equipos
│ ├── reservas/ # Página de reservas
│ └── mantenimiento/ # Página de mantenimiento
├── components/
│ ├── shared/ # Navbar, footer, layout
│ ├── ui/ # Componentes base de ShadCN UI(button, card, badge, toast)
│ └── equipment/ # Lista, filtros, búsqueda
├── hooks/ # Hooks personalizados (useAuth, useEquipment, etc.)
├── lib/ # Configuración Axios y utilidades
├── interfaces/ # Tipos y enums de dominio
└── tests/ # Pruebas unitarias

```

Despliegue
El frontend fue desplegado en Railway y conectado con la API RESTful del backend también desplegada en Railway.

Puedes acceder a la app en: https://rentalequipmentsfront-production.up.railway.app/

Autores:

* David Malte
* Daron Mercado
* Miguel Martinez