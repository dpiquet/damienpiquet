window.addEventListener('DOMContentLoaded', event => {

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        // Mobile device style: fill the whole browser client area with the game canvas:
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
        document.getElementsByTagName('head')[0].appendChild(meta);

        const canvas = document.querySelector("#background-animation");
    }

    let selectedScene = 'root'
    let myGameInstance = null;

    function callSceneChange() {
        if (myGameInstance)
            myGameInstance.SendMessage('api', 'setCamera', selectedScene);
    }

    function setScene(newScene) {
        if (selectedScene === newScene) return;
        selectedScene = newScene;
        callSceneChange();
    }

    var controller = new ScrollMagic.Controller({
        // addIndicators: true
    });

    new ScrollMagic.Scene({triggerElement: '#root'})
        .addTo(controller)
        .on("start", function () {
            setScene('root');
        });
    new ScrollMagic.Scene({triggerElement: '#about'})
        .addTo(controller)
        .on("start", function () {
            setScene('desk');
        });
    new ScrollMagic.Scene({triggerElement: '#about-bottom'})
        .addTo(controller)
        .on("start", function () {
            setScene('desk');
        });

    new ScrollMagic.Scene({triggerElement: '#projects'})
        .addTo(controller)
        .on("start", function () {
            setScene('showroom');
        });
    new ScrollMagic.Scene({triggerElement: '#projects-bottom'})
        .addTo(controller)
        .on("start", function () {
            setScene('showroom');
        });

    new ScrollMagic.Scene({triggerElement: '#contact'})
        .addTo(controller)
        .on("start", function () {
            setScene('contact');
        });
    createUnityInstance(document.querySelector("#background-animation"), {
        arguments: [],
        dataUrl: "../assets/3d/build.data.unityweb",
        frameworkUrl: "../assets/3d/build.framework.js.unityweb",
        codeUrl: "../assets/3d/build.wasm.unityweb",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "DamienPIQUET",
        productName: "portfolio",
        productVersion: "0.1.0",
        // matchWebGLToCanvasSize: false, // Uncomment this to separately control WebGL canvas render size and DOM element size.
        // devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
    }).then(unityInstance => {
        myGameInstance = unityInstance;
        myGameInstance.SendMessage('api', 'setCamera', selectedScene);
    });
});