This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1) Install the dependencies: yarn install

2) Run the development server: yarn dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Aplicación NextJS sin backend, en la que podamos manejar una agenda de contactos. Los contactos tendrán los siguientes datos:
- Nombre
- Dirección
- Teléfono
- Grupos a los que pertenece

Tendremos una página en la que aparecerán dos columnas, a la izquierda tendremos una lista de grupos y a la derecha la lista de contactos. Para agrupar podremos arrastrar un contacto sobre un grupo de la lista de grupos. Podremos filtrar la lista de contactos pulsando sobre un grupo, o por filtros sobre la lista de contactos.

Sobre los contactos podremos hacer un CRUD completo.

Todos los datos se deberan almacenar en LocalStorage del navegador.
