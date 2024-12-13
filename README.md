# Star Wars API

Instrucciones necesarias para configurar y levantar el proyecto de manera local.

## Tabla de Contenidos

- **[Requisitos del Proyecto](#requisitos-del-proyecto)**
- **[Instalación](#instalación)**
- **[Levantar Base de Datos y la aplicación](#levantar-base-de-datos-y-la-aplicación)**
- **[Configuración](#configuración)**
- **[Documentación](#documentación)**
- **[Popular la tabla de películas](#popular-la-tabla-de-películas)**
- **[Acceder desde la nube](#acceder-desde-la-nube)**

## Requisitos del Proyecto

- Node.js (LTS)
- npm (Node Package Manager) u otro gestor de paquetes como pnpm ó yarn.
- Docker y Docker Compose

### Instalación

Cloná este repositorio a tu máquina local:

```bash
git clone https://github.com/tomyolivera/star-wars-api.git
cd star-wars-api
```

Instalá las dependencias necesarias con el siguiente comando:

```bash
npm install
```

Configurá las variables de entorno. Duplicá el archivo .env.example y nombralo como .env:

### Levantar Base de Datos y la aplicación

Para utilizar Docker, necesitás tener instalado Docker y Docker Compose en tu máquina. Podés verificar su instalación con los siguientes comandos:

```bash
docker --version
docker-compose --version
```

Dentro del directorio raíz del proyecto, ejecutá el siguiente comando para levantar la base de datos MySQL:

```bash
docker-compose up -d
```

Luego ejecutá el siguiente comando para levantar la API:

```bash
npm run start
```

### Configuración

Ahora ya debería estar disponible la API en `http://localhost:PUERTO`
El PUERTO va a estar configurado en el archivo .env y por defecto es el 5000.

### Documentación

Vas a poder acceder a la documentación de la API en
`http://localhost:PUERTO/docs`

### Popular la tabla de películas

Para popular la tabla `movies`, necesitás primero crear un usuario con el `role` de `admin`, autenticarte con su `username` y `password` y luego ejecutar el endpoint `GET /movies/seed`

## Acceder desde la nube

Este proyecto está deployado en `Railway` por un lado para hostear la API y en `Supabase` para hostear la base de datos.
La URL para acceder a la API es: `https://star-wars-api-production-8548.up.railway.app/`
