# R3F Environments

    Till now we have only one directional light and one ambient light.
    we will discover many environment features available like more lights, shadows, environment maps, helpers and some new features.

    Multiple ways of setting Background Color:

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

## Lights:

    All default Three.js lights are supported in R3F.

    1. <ambientLight />
    2. <hemisphereLight />
    3. <directionalLight />
    4. <pointLight />
    5. <rectAreaLight />
    6. <spotLight />

    Light Helpers.
        We can use useHelper from drei.
        We need a reference to the directional light.

        The first parameter to useHelper is the reference to the light source and the second parameter is the helper class we want to use from Three.js

        So we need to get access of the DirectionalLightHelper class from THREE.js

        Note  useHelper is not just for the light, as We can use it for camera also With CameaHelper.

## Shadows:

    First We have to activate the shadoW.
    To activte the shadoW, Add a "shadows" attribute to the <Canvas> in index.js

    1. Default Shadow
        Add "shadows" attribute to the canvas.
        In Experience.js, add "castShadow" to the <directionalLight>
        Add "castShadow" on cube's and sphere's <mesh />
        Add "recieveShadow" on the floor <mesh />

    2. Baking:

        Baking is good When We have a static scene.

        Baking in real time, Just calculate the shadow at once in the beginning and then we stop calculating the shadow. If our environment is not changing or our cubes and other geometries are not rotating.
        If we have static scene bake the shadow.

        <!-- When we use the BakeShadows helper the previously rotating shadows is not rotating now. As it is noly calculated once. And same shadow map is used again and again. -->

        If our scene were static, we could have added the BakeShadows helper from 'drei'.
        This will render the shadows only once and not on each frame.

    3. Configuring the shadows:

        Each light casting shadows will render the scene in a specific way and output it in what we call "shadow map". These shadow maps is then used to know if the surface is in the shade or not

        By default the shadow map resolution is rather low in order to maintain solid performance.

        In pure Javascript we can access it using directionalLight.shadow.mapSize.set(1024, 1024)

        Most of the properties are still accessible in react three fiber right from the attributes, by separating the different depth levels with dash (-).

        shadow map is rendered by the orthographic camera, that views parallel view.

        And we can add the same with the near, far, top, right, bottom, and left properties.

        shadow-camera-near, shadow-camera-far, shadow-camera-top, shadow-camera-right, shadow-camera-bottom, shadow-camera-left.

        Near and far value should be selected properly as it can cut the shadows if not properly.

    4. Soft Shadows:

        Soft shadow is a shadow that is sharp when near to object and blury when far from object.

        The default shadows are too sharp.

        There are multiple ways of softening them and we are going to discover one technique called Percent Closer Soft Shadow (PCSS).

        PCSS will make the shadow look blurry by picking the shadow map texture depending on the distance between the surface casting the shadow and the surface recieving the shadow.

        The further the shadow is from the object the softer it will be.

        drei has a helper named softShadows()

        To make softShadows() work, we call it once at the beginning and outside of any component because this function will modify Three.js shaders directly.

        previously : we can't add to gui as soft shadows are used directly in the compile shaders, it trigger the re-compling of ll the materials shaders.

    5. Accumulative Shadows:
