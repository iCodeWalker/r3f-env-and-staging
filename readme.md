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

        Accumulative shodows will accumulate multiple shadow renders, and we are going to move the light randomly before each render. The shadow will be composed of multiple renders from various angles, making it look sodt and very realistic.

        We will generate multiple shadow renders for generating a single shadow.

        The AccumulativeShadows can be rendered on a plane only.

        Since the AccumulativeShadows on its own. We should deactivate the shadows on the <mesh> correspoding to the floor.

        Add AccumulativeShadows after  DirectionalLight.

        AccumulativeShadows starts from the origin of the scene,so we have to move it a bit, ex: right above the floor. And not on the floor to avoid z-index fighting between them.

        Default scale of AccumulativeShadows is 10 units,but if we want to have bigger or smaller shadows, we can use sacle attribute.

        We need to provide light to AccumulativeShadows, it won't take light from the scene. Use position and castShadow attribute for the directional light.

        The AccumulativeShadows is doing a lot of shadow renders but always from the same directional light at the same exact point that's why we get a dark constant shadow,
        We need to move it randomly on each frame.
        To do this we are going to use RandomizedLight.

        Add RandomizedLight instead of directionalLight.

        Atrributes for AccumulativeShadows
        color : color of shadow
        opacity : opacity of the shadow
        frames : How many shadow renders to do. Control the number of renders on the first frame. Number must be choosen  wisely as it may freeze the screen. As most effect on mac.
        temporal : spread the renders across multiple frames or time. We can prevent this freeze using temporal

        The shadow dosen't move according to the cude.
        To move the shadow we can use the useFrame hook and can take use of clock and elapsedTime varibales to move the shadow.

        The solution is to tell AccumulativeShadow to keep rendering the shadow with the frame attribute of the AccumulativeShadow to inifinity.

        When using inifinite frame, AccumulativeShadow is only blending the last 20 shadow renders, set the blend attribute to 100.

        Accumulated shadow is not great for fast animated objects.
        Accumulated shadow is good for static and slow moving objects.
