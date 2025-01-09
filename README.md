![Logo](https://myaias.blob.core.windows.net/myaias/myaias/logo.png)

# MyAIAS

A vue 3 component wrapper for Azure AI Foundry Chat completion models

## Installation

```bash
 npm i myaias
```

## MyAIAS Usage requirement

```javascript
// main.js or main.ts file

import 'myaias/dist/myaias.css'
...
```

## External dependancies requirements

https://vueuse.org/ & https://motion.vueuse.org/

```bash
 npm i @vueuse/core

 npm i @vueuse/motion
```

## Vueuse Motion Usage requirement

```javascript
// main.js or main.ts file

import './assets/main.css'
import { MotionPlugin } from '@vueuse/motion'

import { createApp } from 'vue'

import App from './App.vue'

const app = createApp(App)

app.use(MotionPlugin)

app.mount('#app')
```

## MainMyAIAS component props requirement & usage

```javascript
// Example of usage
// Eg: App.vue
<script setup lang="ts">
import { MainMyAIAS } from 'myaias';

const modelSettings = {
  endpoint: <endpoint>,
  apiKey: <apiKey>,
  apiVersion: <apiVersion>,
  deployment: <deployment>,
}

const sysPrompt =
  '{ "role": "system", "content": [ { "text": "You are a helpfull assistant." } ] }'
</script>

<template>
  <MainMyAIAS :modelSettings="modelSettings" :sysPrompt="sysPrompt" />
</template>

```

## API Reference

The package if setup right make a POST api call to the following endpoint: **https://myaias.azurewebsites.net** ()

### Endpoint Github (for transparency)

**https://github.com/xunita/MyAIAS-Express-Js.git**

**Feel free to request a feature to set up you own backend endpoint**

### Chat completion only

```http
  POST /api/askMe
```

| Body   | Type     | Description                                                                                  |
| :----- | :------- | :------------------------------------------------------------------------------------------- |
| `data` | `Object` | **Required**. Your model settings, system prompt,user prompt and the 10 last messages if any |

## Contributing

Contributions are always welcome!

Modify the code to suit your need or even tackle me for bad code 😊

## Authors

- [@xunita](https://www.github.com/xunita)

## MainMyAIAS component UI

![MyAIAS](https://myaias.blob.core.windows.net/myaias/myaias/brb.png)

## Run Locally

Clone the project

```bash
  git clone https://github.com/xunita/MyAIAS-Vue-3.git
```

Go to the project directory

```bash
  cd <my-project>
```

Install dependencies

```bash
  npm install
```

Start the development server

```bash
  npm run dev
```

Don't forget to update the **App.vue** data with your own models settings (**modelSettings** and **sysPrompt**)
