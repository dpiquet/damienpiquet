if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    // Mobile device style: fill the whole browser client area with the game canvas:
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
    document.getElementsByTagName('head')[0].appendChild(meta);

    const canvas = document.querySelector("#background-animation");
}

let myGameInstance = null;

createUnityInstance(document.querySelector("#background-animation"), {
    arguments: [],
    dataUrl: "../assets/3d/build.data",
    frameworkUrl: "../assets/3d/build.framework.js",
    codeUrl: "../assets/3d/build.wasm",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "DamienPIQUET",
    productName: "portfolio",
    productVersion: "0.1.0",
    // matchWebGLToCanvasSize: false, // Uncomment this to separately control WebGL canvas render size and DOM element size.
    // devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
}).then(unityInstance => {
    myGameInstance = unityInstance;
    
    // Now listen to cursor updates
    document.addEventListener('activate.bs.scrollspy', function(event){
        console.log("event", event.relatedTarget.hash);

        let selectedScene = 'root';
        switch (event.relatedTarget.hash) {
            case '#projects':
                selectedScene = 'showroom';
                break;
            case '#about':
                selectedScene = 'desk';
                break;
            case '#contact':
                selectedScene = 'contact';
                break;
        }
        
        // Call unity to update camera accordingly
        myGameInstance.SendMessage('api', 'setCamera', selectedScene);
    });
});