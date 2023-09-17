import index from "./index.vue";
export default index;

let textureLoaded = false;
export const initButtonTextures = async () => {
    if (import.meta.env.SSR || textureLoaded) return;

    const textureLink = "/textures/gui/widgets.png";
    const loader = new Image();
    loader.src = textureLink;
    await new Promise(resolve => loader.onload = resolve);

    const WidgetsMap = [
        {
            name: "button-left",
            x: 0,
            y: 66,
            w: 2,
            h: 20
        }, {
            name: "button-center",
            x: 2,
            y: 66,
            w: 196,
            h: 20
        }, {
            name: "button-right",
            x: 198,
            y: 66,
            w: 2,
            h: 20
        }, {
            name: "button-hover-left",
            x: 0,
            y: 86,
            w: 2,
            h: 20
        }, {
            name: "button-hover-center",
            x: 2,
            y: 86,
            w: 196,
            h: 20
        }, {
            name: "button-hover-right",
            x: 198,
            y: 86,
            w: 2,
            h: 20
        }
    ];

    let result = "";
    WidgetsMap.forEach(widget => {
        const texture = document.createElement("canvas");
        texture.width = widget.w;
        texture.height = widget.h;
        const ctx = texture.getContext("2d", {});
        if (!ctx) throw Error("Cannot get canvas context!");
        ctx.drawImage(loader, widget.x, widget.y, widget.w, widget.h, 0, 0, widget.w, widget.h);
        result += "--texture-" + widget.name + ": url(" + texture.toDataURL("image/png") + ");";
    });
    const style = document.createElement("style");
    style.innerText = `.m-button {${result}}`;
    style.id = "__m-button-textures";
    document.head.appendChild(style);
    textureLoaded = true;
};