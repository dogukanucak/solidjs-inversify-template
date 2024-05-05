/* @refresh reload */
import { render } from "solid-js/web";

import "reflect-metadata";

import App from "./App";
import "./index.css";

import AppInjector from "./app.injector.ts";

AppInjector.inject();

const root = document.getElementById("root");

render(() => <App />, root!);
