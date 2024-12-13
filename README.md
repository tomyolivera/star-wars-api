# Star Wars API

Instrucciones necesarias para configurar y levantar el proyecto de manera local.

## Tabla de Contenidos

- **[Requisitos del Proyecto](#requisitos-del-proyecto)**
- **[Instalación](#instalación)**
- **[Levantar Base de Datos y la aplicación](#levantar-base-de-datos-y-la-aplicación)**
- **[Configuración](#configuración)**
- **[Endpoints disponibles](#endpoints-disponibles)**

## Requisitos del Proyecto

- Node.js (LTS)
- npm (Node Package Manager)

Node.js (versión recomendada: LTS)
npm (Node Package Manager)

### Instalación

Cloná este repositorio a tu máquina local:

```bash
git clone https://github.com/tomyolivera/star-wars-api.git
cd star-wars-api
```

Instalá las dependencias necesarias con el siguiente comandos:

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
pnpm start:dev
```

o

```bash
npm run start:dev
```

o

```bash
yarn start:dev
```

### Configuración

Ahora ya debería estar disponible la API en `http://localhost:PUERTO`
El PUERTO va a estar configurado en el archivo .env y por defecto es el 5000.

### Endpoints disponibles

Vas a poder acceder a la documentación de la API en
`http://localhost:PUERTO/docs`
