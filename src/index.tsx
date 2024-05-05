/* @refresh reload */
import { render } from "solid-js/web";

import "reflect-metadata";

import App from "./App";
import "./index.css";

import AppInjector from "./app.injector.ts";

/**
 * Use AppInjector to bind concrete classes via tokens
 */
AppInjector.inject();

const root = document.getElementById("root");

render(() => <App />, root!);
