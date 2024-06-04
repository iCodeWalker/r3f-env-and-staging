# R3F Environments

    Background Color:
    1. With CSS:
        The default background color is transparent. We can change the color directly in the css.

    2. With setClearColor:
        WebGLRenderer has a method named setClearColor. We need to have the access to the renderer only once when it has been created.

        Create a function in index.js and pass it to the canvas's attribute named onCreated.
        We call this function once the canvas, the renderer and scene is ready.

    3. With Scene background:
        We can do it on the 'scene' and we can access it in the created function the same way.
        Instantiate a Color using Three.js and assign it to the background proprty.

    4. With R3F color:
        create a <color /> inside the canvas.
        This <color /> is equal to new THREE.Color()

        We can put the code anywhere, as long as the direct parent is the scene.
