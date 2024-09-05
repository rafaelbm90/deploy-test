import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { LinksFunction } from "@remix-run/node";

import NavBar from "./components/NavBar";

import mainStyles from "./styles/main.css?url";
import tailwindStyles from "./styles/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: mainStyles },
  { rel: "stylesheet", href: tailwindStyles },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <NavBar />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
