# R3F application debug

## React application debug

    StrictMode in React helps to warn us about potential problems like
        1. Unused imports.
        2. Infinite render loop.
        3. Forgotten useEffect dependencies.
        4. Deprecated practices.
        5. etc
    In /src/index.js, import StrictMode from react
    import {StrictMode} from 'react';

    StrictMode will be ignored once the application is built

## Browser Extenstions

    React Developer tools extention will help us check and modify react components live.

## Debug UI with Leva

    npm i leva

    Tweaking a value, will result in the component re-rendering.
    const controls = useControls({ position: -2})

    We can destructure it in order to get only the position.
    const { position } = useControls({ position : -2 })

    Now we can use this position variable in the position-x attribute of the sphere <mesh>

    Instead of adding a second range tweak, we can use a vector 2 tweak.

    value : {x : -2, y: 0}

    We can use colors. Add acolor property in the useControls and a color variable in the destructuring.
    We can use different color formats like:
        1. rgb(255,0,0)
        2. 'orange'
        3. hsl(100deg, 100%, 50%)
        4. hsla(100deg, 100%, 50%, 0.5)
        5. { r: 200, g: 106, b: 125, a:0.4}

    Boolean:

    Add a visible property to the useControls and destructure it.

    visible: true

    Button:
    We create a button that will call a function once clicked

    Select:
    We can create a select input by setting an array on the 'options' property

    Folders:
    If things are getting a little too complex with too many tweaks, we can organise them in the folder.

    To create another folder, call useControls again but with a different name and put whatever we want in it like a scale.

    If we want to create a folder inside a folder, we can do it with the folder function that we can import from 'leva'.

    Monitoring R3F performance:

    install r3f-perf: npm install r3f-perf
