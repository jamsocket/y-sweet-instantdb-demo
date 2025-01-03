<img src="/app/opengraph-image.png" alt="opengraph-image" style="display: block; margin: 0 auto;" />
<h1 align="center">
<a href="">Jamsocket and InstantDB Starter Kit</a>
</h1>

<p align="center">
 The fastest way to build apps with InstantDB and Y-Sweet by Jamsocket
</p>

<p align="center">
<a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#how-instantdb-and-jamsocket-work-together"><strong>How it works</strong></a> ·
  <a href="#running-the-app"><strong>Running the app</strong></a> ·
  <a href="#deploy-to-netlify"><strong>Deploy to Netlify</strong></a>
</p>
<br/>

## Introduction

The Jamsocket and InstantDB Starter Kit shows you how to implement core features of a real-time application like Google Docs. It covers collaborative text editing with Y-Sweet and document management with InstantDB.

## Features

A full-fledged collaborative text editor with:

- **Live Collaboration**: Real-time sync powered by Y-Sweet, Jamsocket's Yjs server with built-in persistence to AWS S3.
- **Slate Rich Text Editor**: A fully customizable editor interface.
- **Document Permissions & User Management**: Managed through InstantDB, which handles authentication, permissions, and document storage.
- **Easy Persistence**: Managed document storage with Y-Sweet.
- **Effortless Deployment**: Ready for local development or deployment to Netlify.

## How InstantDB and Jamsocket work together

Use [Y-Sweet](https://jamsocket.com/y-sweet), Jamsocket's Yjs server, for document collaboration.

- Y-Sweet is a Yjs sync server with built-in persistence. This demo uses Y-Sweet to sync and persist documents as users edit.

Use [InstantDB](https://instantdb.com/) for document management.

- InstantDB manages everything around the document, from document permissions to user authentication.

## Running the app

1. Create a Y-Sweet service [via the Jamsocket dashboard](https://app.jamsocket.com)

2. Create a InstantDB project [via the InstantDB dashboard](https://www.instantdb.com/dash)

3. Clone the Y-Sweet InstantDB Starter repo using

   ```bash
   gh repo clone jamsocket/y-sweet-instantdb-demo
   ```

   ```bash
   git clone git@github.com:jamsocket/y-sweet-instantdb-demo.git
   ```

4. Rename `.env.example` to `.env` and update the following:

   ```
   Y_SWEET_CONNECTION_STRING=[INSERT Y_SWEET CONNECTION STRING]
   NEXT_PUBLIC_INSTANT_APP_ID=[INSERT INSTANTDB APP ID]
   ```

   Your `NEXT_PUBLIC_INSTANT_APP_ID` can be found in [your Instant project](https://app.jamsocket.com)

   Create a connection string in [your Y-Sweet service page](https://app.jamsocket.com) and supply the value to `Y_SWEET_CONNECTION_STRING`

5. When you run your app locally, InstantDB will automatically create the necessary Namespaces and attributes.

6. We do apply permissions to the Docs namespace. To set up permissions, run `npx instant-cli push perms` or add them directly in the permissions editor in [the dashboard.](https://app.jamsocket.com)

7. You can now run the Next.js local development server:

   ```bash
   npm install
   ```

   ```bash
   npm run dev
   ```

   The starter kit should now be running on [localhost:3000](http://localhost:3000/).

## Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/extension/start/deploy?repository=https://github.com/jamsocket/y-sweet-instantdb-demo)

The above will also clone the Starter kit to your GitHub, which you can use to develop locally.

Once you've added this project to Netlify, install the [Jamsocket extension](https://app.netlify.com/extensions/jamsocket) to add the necessary Y-Sweet environment variables for your application. You can also add the InstantDB environment variables using the Netlify UI. But make sure you add the database permissions (see Step 6) with the InstantDB dashboard or CLI for the application to work correctly.
