
![Logo](https://myaias.blob.core.windows.net/myaias/myaias/logo.png)


# MyAIAS

A vue 3 component wrapper for Azure AI Foundry Chat completion models

Note that I just did this for a personal use and decide to share it to whoever might need something like this. Even if not the case, some people might have inspiration from it to do something better.


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
import MainMyAIAS from 'myaias';
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

The package if setup right make a POST api call to the following endpoint: **https://myaias.azurewebsites.net**

### Chat completion only

```http
  POST /api/askMe
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `data` | `Object` | **Required**. Your model settings, system prompt, user prompt and the last 10 messages if any |


## Contributing

Contributions are always welcome!

Modify the code to suit your need or even tackle me for bad code 😊


## Authors

- [@xunita](https://www.github.com/xunita)


## MainMyAIAS component UI

![MyAIAS](https://myaias.blob.core.windows.net/myaias/myaias/brb.png)


