# ThisVui
> ThiVui is a Component Framework for Vue.js, intended to give developers easy tools to build powerful web apps with beautiful UI's. It's focused on flexibility and ease of use, without forgetting efficiency.

![thisVui Logo](http://www.thisvui.com/thisvui_logo_small.png)

## Quick Start


#### Install 

```
npm install thisvui --save
```

>ThisVui relies on **Vue.js 2.x** runtime so you need to install it
```
npm install vue --save
```
#### Getting started with ThisVui

To start using ThisVui first you need to create a new vue project. We recommend using the amazing [`Vue CLI`](https://cli.vuejs.org/) for rapid Vue.js development

#### Creating a new project

If you already have a vue project just ignore these steps and go to the installing ThisVui section
To install the Vue CLI package, use one of the following commands.
```
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

Then to create a new project use the following command and follow the steps. You can check the details in the [`Creating a project`](https://cli.vuejs.org/guide/creating-a-project.html#vue-create) Vue CLI docs.
```
vue create thisvui-quickstart
```

Then go into the new created project.
```
cd thisvui-quickstart/
```

You can run the new app using the following command.
```
npm run serve
```

You can see the new app through the [`localhost:8080`](http://localhost:8080) url in your browser.

#### Installing ThisVui

You can install the ThisVui package, using one of the following commands.
```
npm install thisvui --save
# OR
yarn add thisvui
```

Once installed, in your `main entry`
(commonly `main.js`) file import ThisVui and tell Vue to use it.
```
import Vue from 'vue'
import ThisVui from 'thisvui'

Vue.use(ThisVui);
```

#### Importing styles

You will also need to include the ThisVui styles. Simply include the `thisvui.css` file in
your `index.html`
or import `the sass file` or the `minified css`.
```
// Main entry file (ex: index.js or main.js)
import 'thisvui/dist/thisvui.min.css' // Make sure you are using proper css loader
```

```
// Main sass file (ex: main.sass)
@import "~thisvui/dist/sass/thisvui" // Make sure you are using proper sass loader
```
>For a detailed explanation on how things work, check out the official thisVui [documentation](http://www.thisvui.com) site.
