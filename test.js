// ==UserScript==
// @name         BC Reaction Wheel - Fully Featured
// @namespace    http://khile.dev/
// @version      1.4.0
// @description  Beautiful radial emote wheel with full editor, packs & more
// @author       Khile
// @match        https://www.bondageprojects.com/club_game/*
// @grant        none
// ==/UserScript==

// Bondage Club Mod Development Kit (1.2.0)
// For more info see: https://github.com/Jomshir98/bondage-club-mod-sdk
/** @type {ModSDKGlobalAPI} */
var bcModSdk=function(){"use strict";const o="1.2.0";function e(o){alert("Mod ERROR:\n"+o);const e=new Error(o);throw console.error(e),e}const t=new TextEncoder;function n(o){return!!o&&"object"==typeof o&&!Array.isArray(o)}function r(o){const e=new Set;return o.filter((o=>!e.has(o)&&e.add(o)))}const i=new Map,a=new Set;function c(o){a.has(o)||(a.add(o),console.warn(o))}function s(o){const e=[],t=new Map,n=new Set;for(const r of f.values()){const i=r.patching.get(o.name);if(i){e.push(...i.hooks);for(const[e,a]of i.patches.entries())t.has(e)&&t.get(e)!==a&&c(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e)||""}\nPatch2:\n${a}`),t.set(e,a),n.add(r.name)}}e.sort(((o,e)=>e.priority-o.priority));const r=function(o,e){if(0===e.size)return o;let t=o.toString().replaceAll("\r\n","\n");for(const[n,r]of e.entries())t.includes(n)||c(`ModSDK: Patching ${o.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return(0,eval)(`(${t})`)}(o.original,t);let i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookChainExit)||void 0===i?void 0:i.call(t,o.name,n),c=r.apply(this,e);return null==a||a(),c};for(let t=e.length-1;t>=0;t--){const n=e[t],r=i;i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookEnter)||void 0===i?void 0:i.call(t,o.name,n.mod),c=n.hook.apply(this,[e,o=>{if(1!==arguments.length||!Array.isArray(e))throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof o}`);return r.call(this,o)}]);return null==a||a(),c}}return{hooks:e,patches:t,patchesSources:n,enter:i,final:r}}function l(o,e=!1){let r=i.get(o);if(r)e&&(r.precomputed=s(r));else{let e=window;const a=o.split(".");for(let t=0;t<a.length-1;t++)if(e=e[a[t]],!n(e))throw new Error(`ModSDK: Function ${o} to be patched not found; ${a.slice(0,t+1).join(".")} is not object`);const c=e[a[a.length-1]];if("function"!=typeof c)throw new Error(`ModSDK: Function ${o} to be patched not found`);const l=function(o){let e=-1;for(const n of t.encode(o)){let o=255&(e^n);for(let e=0;e<8;e++)o=1&o?-306674912^o>>>1:o>>>1;e=e>>>8^o}return((-1^e)>>>0).toString(16).padStart(8,"0").toUpperCase()}(c.toString().replaceAll("\r\n","\n")),d={name:o,original:c,originalHash:l};r=Object.assign(Object.assign({},d),{precomputed:s(d),router:()=>{},context:e,contextProperty:a[a.length-1]}),r.router=function(o){return function(...e){return o.precomputed.enter.apply(this,[e])}}(r),i.set(o,r),e[r.contextProperty]=r.router}return r}function d(){for(const o of i.values())o.precomputed=s(o)}function p(){const o=new Map;for(const[e,t]of i)o.set(e,{name:e,original:t.original,originalHash:t.originalHash,sdkEntrypoint:t.router,currentEntrypoint:t.context[t.contextProperty],hookedByMods:r(t.precomputed.hooks.map((o=>o.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return o}const f=new Map;function u(o){f.get(o.name)!==o&&e(`Failed to unload mod '${o.name}': Not registered`),f.delete(o.name),o.loaded=!1,d()}function g(o,t){o&&"object"==typeof o||e("Failed to register mod: Expected info object, got "+typeof o),"string"==typeof o.name&&o.name||e("Failed to register mod: Expected name to be non-empty string, got "+typeof o.name);let r=`'${o.name}'`;"string"==typeof o.fullName&&o.fullName||e(`Failed to register mod ${r}: Expected fullName to be non-empty string, got ${typeof o.fullName}`),r=`'${o.fullName} (${o.name})'`,"string"!=typeof o.version&&e(`Failed to register mod ${r}: Expected version to be string, got ${typeof o.version}`),o.repository||(o.repository=void 0),void 0!==o.repository&&"string"!=typeof o.repository&&e(`Failed to register mod ${r}: Expected repository to be undefined or string, got ${typeof o.version}`),null==t&&(t={}),t&&"object"==typeof t||e(`Failed to register mod ${r}: Expected options to be undefined or object, got ${typeof t}`);const i=!0===t.allowReplace,a=f.get(o.name);a&&(a.allowReplace&&i||e(`Refusing to load mod ${r}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),u(a));const c=o=>{let e=g.patching.get(o.name);return e||(e={hooks:[],patches:new Map},g.patching.set(o.name,e)),e},s=(o,t)=>(...n)=>{var i,a;const c=null===(a=(i=m.errorReporterHooks).apiEndpointEnter)||void 0===a?void 0:a.call(i,o,g.name);g.loaded||e(`Mod ${r} attempted to call SDK function after being unloaded`);const s=t(...n);return null==c||c(),s},p={unload:s("unload",(()=>u(g))),hookFunction:s("hookFunction",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);"number"!=typeof t&&e(`Mod ${r} failed to hook function '${o}': Expected priority number, got ${typeof t}`),"function"!=typeof n&&e(`Mod ${r} failed to hook function '${o}': Expected hook function, got ${typeof n}`);const s={mod:g.name,priority:t,hook:n};return a.hooks.push(s),d(),()=>{const o=a.hooks.indexOf(s);o>=0&&(a.hooks.splice(o,1),d())}})),patchFunction:s("patchFunction",((o,t)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);n(t)||e(`Mod ${r} failed to patch function '${o}': Expected patches object, got ${typeof t}`);for(const[n,i]of Object.entries(t))"string"==typeof i?a.patches.set(n,i):null===i?a.patches.delete(n):e(`Mod ${r} failed to patch function '${o}': Invalid format of patch '${n}'`);d()})),removePatches:s("removePatches",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const t=l(o);c(t).patches.clear(),d()})),callOriginal:s("callOriginal",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to call a function: Expected function name string, got ${typeof o}`);const i=l(o);return Array.isArray(t)||e(`Mod ${r} failed to call a function: Expected args array, got ${typeof t}`),i.original.apply(null!=n?n:globalThis,t)})),getOriginalHash:s("getOriginalHash",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to get hash: Expected function name string, got ${typeof o}`);return l(o).originalHash}))},g={name:o.name,fullName:o.fullName,version:o.version,repository:o.repository,allowReplace:i,api:p,loaded:!0,patching:new Map};return f.set(o.name,g),Object.freeze(p)}function h(){const o=[];for(const e of f.values())o.push({name:e.name,fullName:e.fullName,version:e.version,repository:e.repository});return o}let m;const y=void 0===window.bcModSdk?window.bcModSdk=function(){const e={version:o,apiVersion:1,registerMod:g,getModsInfo:h,getPatchingInfo:p,errorReporterHooks:Object.seal({apiEndpointEnter:null,hookEnter:null,hookChainExit:null})};return m=e,Object.freeze(e)}():(n(window.bcModSdk)||e("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==o&&alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk);return"undefined"!=typeof exports&&(Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y}();


// bcModSdk.js MUST be pasted above this line!

(function() {
    'use strict';

    const modApi = bcModSdk.registerMod({
        name: "ReactionWheel",
        fullName: "Khile's Reaction Wheel",
        version: "1.4.0",
        repository: "https://github.com/yourname/bc-reaction-wheel"
    });

    // ====================== EXPRESSION MAPPING ======================
    // Maps friendly names to BC facial expression groups + values.
    // CharacterSetFacialExpression accepts a timer (seconds) and auto-reverts.
    const EXPRESSION_MAP = {
        "Sad":             [{group:"Eyes", expr:"Downed"},   {group:"Mouth", expr:"Sad"}],
        "Blush":           [{group:"Blush", expr:"Medium"}],
        "VeryEmbarrassed": [{group:"Blush", expr:"Extreme"}, {group:"Eyes", expr:"Shy"}],
        "Smirk":           [{group:"Mouth", expr:"Smirk"},   {group:"Eyes", expr:"Wink"}],
        "Horny":           [{group:"Eyes", expr:"Horny"},    {group:"Blush", expr:"High"}, {group:"Mouth", expr:"HalfOpen"}],
        "Angry":           [{group:"Eyes", expr:"Angry"},    {group:"Mouth", expr:"Angry"}],
    };

    // Common BC pose names (autocomplete suggestions in the emote editor)
    const BC_POSES = [
        "Kneel", "KneelingSpread", "LegsClosed", "LegsOpen",
        "Spread", "AllFours", "Hogtied", "SitFloor",
    ];

    // ====================== CONFIG & STORAGE ======================
    let currentPack = "Default";
    let packs = {
        "Default": [
            {id:1, name:"Beg",        icon:"🙏", chat:"*begs desperately on my knees*",    expr:"Sad",            pose:"Kneel", arousal:8,  duration:6, color:"#ff69b4"},
            {id:2, name:"Squirm",     icon:"😣", chat:"*squirms helplessly in my bonds*",  expr:"Blush",          pose:"",      arousal:12, duration:5, color:"#ff4500"},
            {id:3, name:"Blush Hard", icon:"😳", chat:"*blushes furiously*",               expr:"VeryEmbarrassed",pose:"",      arousal:5,  duration:4, color:"#ff1493"},
            {id:4, name:"Whimper",    icon:"🥺", chat:"*whimpers softly*",                 expr:"Sad",            pose:"",      arousal:3,  duration:4, color:"#00bfff"},
            {id:5, name:"Tease",      icon:"😏", chat:"*teases you playfully*",            expr:"Smirk",          pose:"",      arousal:7,  duration:5, color:"#ffd700"},
            {id:6, name:"Kneel",      icon:"🧎", chat:"*drops to my knees submissively*",  expr:"",               pose:"Kneel", arousal:4,  duration:8, color:"#32cd32"},
            {id:7, name:"Moan",       icon:"😩", chat:"*moans loudly*",                    expr:"Horny",          pose:"",      arousal:15, duration:4, color:"#ff0000"},
            {id:8, name:"Struggle",   icon:"💢", chat:"*struggles against the ropes*",     expr:"Angry",          pose:"",      arousal:6,  duration:5, color:"#ff8c00"},
        ]
    };

    let emoteLastUsed  = {};      // emote.id → timestamp of last use
    let suppressChat   = false;   // OOC suppress toggle
    let currentTarget  = null;    // {name: string} | null
    let idlePackName   = "";      // pack to draw random idle emotes from ("" = disabled)
    let idleMinutes    = 0;       // minutes before idle emote fires (0 = disabled)
    let sidebarCollapsed = true;  // sidebar collapsed by default
    let sidebarX = null;          // null = use default right-edge position; otherwise left px
    let sidebarY = 80;            // top px
    let hudX = null;              // null = default centred-top; otherwise left px
    let hudY = null;              // null = default 14 px from top; otherwise top px
    let emoteHistory = [];        // [{emote, packName}]  max 10
    let pinnedEmotes = [null, null, null, null]; // {packName, emoteName} | null  per slot 1-4
    let lastActivity   = Date.now();
    let wheelActive    = false;
    let selected = -1;
    let triggerMode = "hold"; // "hold" or "toggle"
    let triggerKey = "Control";

    const STORAGE_KEY = "bcReactionWheelData";

    function loadData() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const data = JSON.parse(saved);
                packs        = data.packs        || packs;
                currentPack  = data.currentPack  || "Default";
                triggerMode  = data.triggerMode  || "hold";
                triggerKey   = data.triggerKey   || "Control";
                suppressChat     = data.suppressChat     || false;
                idlePackName     = data.idlePackName     || "";
                idleMinutes      = data.idleMinutes      || 0;
                sidebarCollapsed = data.sidebarCollapsed ?? true;  // default collapsed
                sidebarX         = data.sidebarX     != null ? data.sidebarX     : null;
                sidebarY         = data.sidebarY     != null ? data.sidebarY     : 80;
                hudX             = data.hudX         != null ? data.hudX         : null;
                hudY             = data.hudY         != null ? data.hudY         : null;
                emoteHistory     = data.emoteHistory || [];
                pinnedEmotes     = data.pinnedEmotes || [null, null, null, null];
            }
        } catch(err) { console.error("[ReactionWheel] Load error:", err); }
    }
    function saveData() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            packs, currentPack, triggerMode, triggerKey,
            suppressChat, idlePackName, idleMinutes,
            sidebarCollapsed, sidebarX, sidebarY,
            hudX, hudY, emoteHistory, pinnedEmotes,
        }));
    }
    loadData();

    // ====================== WHEEL UI (Canvas) ======================
    let canvas, ctx;

    function lightenHex(hex) {
        const n = parseInt(hex.replace("#",""), 16);
        const r = Math.min(255, ((n >> 16) & 0xff) + 70);
        const g = Math.min(255, ((n >> 8)  & 0xff) + 70);
        const b = Math.min(255, (n         & 0xff) + 70);
        return `rgb(${r},${g},${b})`;
    }

    const W = 220; // canvas resolution (px) — CSS display size is corrected for BC's body zoom

    // BC sets document.body { zoom: X } to scale the game to the window.
    // A fixed-position element inherits that zoom, so we divide the CSS size by it
    // to make the wheel appear at W screen pixels regardless of zoom level.
    function getBodyZoom() {
        const z = parseFloat(window.getComputedStyle(document.body).zoom);
        return (z && isFinite(z)) ? z : 1;
    }

    function createWheel() {
        canvas = document.createElement("canvas");
        canvas.width = W;
        canvas.height = W;
        const zoom = getBodyZoom();
        const cssSize = Math.round(W / zoom) + "px";
        Object.assign(canvas.style, {
            position: "fixed",
            left: "50%", top: "50%",
            transform: "translate(-50%, -50%)",
            width: cssSize, height: cssSize,
            zIndex: "99999",
            pointerEvents: "auto",
            borderRadius: "50%",
            boxShadow: "0 0 20px rgba(255,105,180,0.6)",
        });
        document.body.appendChild(canvas);
        ctx = canvas.getContext("2d");
    }

    function drawWheel() {
        if (!canvas || !ctx) return;
        const half = W / 2;
        ctx.clearRect(0, 0, W, W);
        const emotes = packs[currentPack] || [];
        if (!emotes.length) return;
        const n = emotes.length;
        const slice = (Math.PI * 2) / n;
        const cx = half, cy = half, r = half - 10;

        emotes.forEach((e, i) => {
            const start  = i * slice - Math.PI / 2;
            const end    = start + slice;
            const mid    = (start + end) / 2;
            const onCd   = isOnCooldown(e);

            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, r, start, end);
            ctx.fillStyle = onCd ? "#2e2e2e" : (selected === i ? lightenHex(e.color) : e.color);
            ctx.fill();
            ctx.strokeStyle = "#111";
            ctx.lineWidth = 2;
            ctx.stroke();

            // Icon + label
            const lx = cx + Math.cos(mid) * (r * 0.62);
            const ly = cy + Math.sin(mid) * (r * 0.62);
            ctx.save();
            ctx.translate(lx, ly);
            ctx.font = "bold 18px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#111";
            ctx.fillText(e.icon, 0, -7);
            ctx.font = "bold 9px Arial";
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 2;
            ctx.strokeText(e.name, 0, 7);
            ctx.fillStyle = onCd ? "#555" : (selected === i ? "#000" : "#fff");
            ctx.fillText(e.name, 0, 7);
            ctx.restore();
        });

        // Center cancel circle
        const cr = 28;
        ctx.beginPath();
        ctx.arc(cx, cy, cr, 0, Math.PI * 2);
        ctx.fillStyle = "#1a1a1a";
        ctx.fill();
        ctx.strokeStyle = "#555";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.font = "bold 15px Arial";
        ctx.fillStyle = "#888";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("✕", cx, cy);
    }

    // ====================== INPUT HANDLING ======================
    function showWheel() {
        if (wheelActive) return;
        wheelActive = true;
        selected = -1;
        if (!canvas) createWheel();
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        drawWheel();
    }

    function hideWheel() {
        if (!wheelActive) return;
        wheelActive = false;
        selected = -1;
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        if (canvas) { canvas.remove(); canvas = null; ctx = null; }
    }

    function onMouseMove(e) {
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        // Use the actual rendered rect centre (accounts for zoom-corrected CSS size)
        const cx = rect.left + rect.width / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = e.clientX - cx, dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        // Cancel-zone radius: 28 canvas-px scaled to screen-px
        const cancelPx = 28 * (rect.width / W);

        if (dist < cancelPx) {
            selected = -1;
        } else {
            let angle = Math.atan2(dy, dx) + Math.PI / 2;
            if (angle < 0) angle += Math.PI * 2;
            const emotes = packs[currentPack] || [];
            selected = Math.floor(angle / (Math.PI * 2 / emotes.length)) % emotes.length;
        }
        drawWheel();
    }

    function onMouseUp() {
        const emotes = packs[currentPack] || [];
        const emote  = emotes[selected];
        if (emote && !isOnCooldown(emote)) {
            emoteLastUsed[emote.id] = Date.now();
            performEmote(emote);
        }
        hideWheel();
    }

    // ====================== PERFORM EMOTE ======================
    function sendChat(text) {
        if (suppressChat) return;
        // Substitute [Name] with the current target's name if one is set
        if (currentTarget) text = text.replace(/\[Name\]/gi, currentTarget.name);
        if (typeof ServerSend === "function" && typeof CurrentScreen !== "undefined" && CurrentScreen === "ChatRoom") {
            if (text.startsWith("*") && text.endsWith("*") && text.length > 2) {
                ServerSend("ChatRoomChat", {Content: text.slice(1, -1), Type: "Emote"});
            } else {
                ServerSend("ChatRoomChat", {Content: text, Type: "Chat"});
            }
            return;
        }
        const input = document.getElementById("InputChat") || document.getElementById("ChatMessage");
        if (input) { input.value = text; input.focus(); }
    }

    function isOnCooldown(emote) {
        const last = emoteLastUsed[emote.id] || 0;
        return Date.now() - last < (emote.duration || 5) * 1000;
    }

    function findEmoteByName(name) {
        if (!name) return null;
        // Search current pack first, then the rest
        const allPacks = [packs[currentPack], ...Object.values(packs).filter(p => p !== packs[currentPack])];
        for (const pack of allPacks) {
            const found = pack.find(e => e.name === name);
            if (found) return found;
        }
        return null;
    }

    function applyExpression(exprName, durationSec) {
        if (!exprName || !EXPRESSION_MAP[exprName]) return;
        if (typeof CharacterSetFacialExpression !== "function") return;
        EXPRESSION_MAP[exprName].forEach(({group, expr}) => {
            try { CharacterSetFacialExpression(Player, group, expr, durationSec, null); }
            catch(err) { console.warn("[ReactionWheel] Expression error:", err); }
        });
    }

    // ====================== POSE OVERRIDE ======================
    // BC's game loop calls CharacterRefresh every frame and its pose validation
    // strips poses that aren't "allowed" by equipped items.  We fight this by
    // hooking CharacterRefresh via modSDK: whenever our forced pose is active we
    // re-inject it both before and after the original function runs, so the
    // rendered frame always shows the correct pose regardless of BC's validation.

    let _forcedPose = null; // string while active, null otherwise

    modApi.hookFunction("CharacterRefresh", 0, ([C, Push], next) => {
        if (_forcedPose && C === Player) Player.ActivePose = [_forcedPose];
        const result = next([C, Push]);
        if (_forcedPose && C === Player) Player.ActivePose = [_forcedPose];
        return result;
    });

    function applyPose(poseName, durationMs) {
        if (!poseName) return;
        const savedPose = Array.isArray(Player.ActivePose) ? [...Player.ActivePose] : [];

        _forcedPose = poseName;
        Player.ActivePose = [poseName];
        if (typeof CharacterRefresh === "function") CharacterRefresh(Player);

        setTimeout(() => {
            _forcedPose = null;
            Player.ActivePose = savedPose;
            if (typeof CharacterRefresh === "function") CharacterRefresh(Player);
        }, durationMs);
    }

    // ====================== ACTIVE EMOTE HUD ======================
    // Small overlay at the top-centre that shows the active emote name and a
    // draining progress bar for the duration, then removes itself automatically.

    let _hudTimer = null;

    function getOrCreateHUD() {
        let hud = document.getElementById("rw-hud");
        if (hud) return hud;

        hud = document.createElement("div");
        hud.id = "rw-hud";
        Object.assign(hud.style, {
            position: "fixed", display: "none",
            background: "rgba(20,20,35,0.92)",
            border: "1.5px solid #ff69b4", borderRadius: "10px",
            padding: "8px 18px 10px", zIndex: "99997",
            fontFamily: "Arial,sans-serif", color: "#eee",
            minWidth: "160px", textAlign: "center",
            boxShadow: "0 0 16px rgba(255,105,180,0.35)",
            cursor: "grab", userSelect: "none",
        });
        // Apply saved or default position
        if (hudX !== null && hudY !== null) {
            hud.style.left = hudX + "px"; hud.style.top = hudY + "px";
        } else {
            hud.style.top = "14px"; hud.style.left = "50%"; hud.style.transform = "translateX(-50%)";
        }
        document.body.appendChild(hud);

        // Drag-to-reposition
        hud.addEventListener("mousedown", e => {
            if (e.button !== 0) return;
            e.preventDefault();
            const rect = hud.getBoundingClientRect();
            const ox = e.clientX - rect.left, oy = e.clientY - rect.top;
            hud.style.transform = "none";
            hud.style.left = rect.left + "px";
            hud.style.cursor = "grabbing";
            const onMove = ev => {
                hud.style.left = Math.max(0, Math.min(window.innerWidth  - hud.offsetWidth,  ev.clientX - ox)) + "px";
                hud.style.top  = Math.max(0, Math.min(window.innerHeight - hud.offsetHeight, ev.clientY - oy)) + "px";
            };
            const onUp = () => {
                document.removeEventListener("mousemove", onMove);
                document.removeEventListener("mouseup",   onUp);
                hud.style.cursor = "grab";
                hudX = parseInt(hud.style.left); hudY = parseInt(hud.style.top); saveData();
            };
            document.addEventListener("mousemove", onMove);
            document.addEventListener("mouseup",   onUp);
        });
        return hud;
    }

    function showHUD(emote, durationMs) {
        clearTimeout(_hudTimer);
        const hud = getOrCreateHUD();
        hud.innerHTML = "";
        hud.style.display = "block";

        const label = document.createElement("div");
        label.style.cssText = "font-size:14px;font-weight:bold;margin-bottom:6px;white-space:nowrap;pointer-events:none;";
        label.textContent = `${emote.icon}  ${emote.name}`;

        const track = document.createElement("div");
        Object.assign(track.style, {height: "5px", background: "#333", borderRadius: "3px", overflow: "hidden", pointerEvents: "none"});
        const bar = document.createElement("div");
        Object.assign(bar.style, {
            height: "100%", width: "100%",
            background: emote.color || "#ff69b4", borderRadius: "3px",
            transition: `width ${durationMs}ms linear`, pointerEvents: "none",
        });
        track.appendChild(bar);
        hud.append(label, track);
        requestAnimationFrame(() => { bar.style.width = "0%"; });
        _hudTimer = setTimeout(hideHUD, durationMs);
    }

    function hideHUD() {
        clearTimeout(_hudTimer); _hudTimer = null;
        const hud = document.getElementById("rw-hud");
        if (hud) hud.style.display = "none";
    }

    function performEmote(emote, _depth = 0) {
        if (!emote || _depth > 5) return;
        const duration = emote.duration || 5;

        if (emote.chat) sendChat(emote.chat);
        applyExpression(emote.expr, duration);
        applyPose(emote.pose, duration * 1000);

        if (emote.arousal && Player.ArousalSettings) {
            const current = Player.ArousalSettings.Progress || 0;
            Player.ArousalSettings.Progress = Math.min(100, current + emote.arousal);
        }

        showHUD(emote, duration * 1000);
        if (typeof CharacterRefresh === "function") CharacterRefresh(Player);
        lastActivity = Date.now();
        recordHistory(emote);

        // Follow-up chain: fire the next emote after this one ends + optional extra delay
        if (emote.followUp) {
            const next = findEmoteByName(emote.followUp);
            if (next) {
                setTimeout(() => {
                    emoteLastUsed[next.id] = Date.now();
                    performEmote(next, _depth + 1);
                }, duration * 1000 + (emote.followUpDelay || 0) * 1000);
            }
        }
    }

    // ====================== SETTINGS MODAL ======================
    // ====================== COLLAPSIBLE SIDEBAR ======================

    function createSidebar() {
        if (document.getElementById("rw-sidebar")) return;

        const sidebar = document.createElement("div");
        sidebar.id = "rw-sidebar";
        Object.assign(sidebar.style, {
            position: "fixed", zIndex: "99998",
            display: "flex", flexDirection: "column",
            gap: "6px", alignItems: "stretch",
            opacity: "0.25",
            transition: "opacity 0.25s ease",
        });
        // Apply saved or default position
        if (sidebarX !== null) {
            sidebar.style.left = sidebarX + "px";
            sidebar.style.top  = sidebarY + "px";
        } else {
            sidebar.style.right = "20px";
            sidebar.style.top   = sidebarY + "px";
        }

        sidebar.onmouseenter = () => sidebar.style.opacity = "1";
        sidebar.onmouseleave = () => sidebar.style.opacity = "0.25";

        // Toggle button — doubles as drag handle
        const toggle = document.createElement("div");
        toggle.id = "rw-sidebar-toggle";
        Object.assign(toggle.style, {
            cursor: "grab", userSelect: "none",
            background: "rgba(20,20,30,0.85)", color: "#ff69b4",
            padding: "7px 12px", borderRadius: "8px",
            border: "1.5px solid #ff69b4",
            fontSize: "13px", lineHeight: "1.4", textAlign: "center",
        });
        sidebar.appendChild(toggle);
        document.body.appendChild(sidebar);
        applySidebarState(); // set initial label

        // ---- Drag-to-move ----
        toggle.addEventListener("mousedown", e => {
            if (e.button !== 0) return;
            e.preventDefault();

            const rect   = sidebar.getBoundingClientRect();
            const startX = e.clientX - rect.left;
            const startY = e.clientY - rect.top;
            let moved    = false;

            // Switch to left-based positioning so math works while dragging
            sidebar.style.left  = rect.left + "px";
            sidebar.style.right = "auto";
            toggle.style.cursor = "grabbing";

            const onMove = ev => {
                const nx = ev.clientX - startX;
                const ny = ev.clientY - startY;
                // Clamp inside viewport
                const maxX = window.innerWidth  - sidebar.offsetWidth;
                const maxY = window.innerHeight - sidebar.offsetHeight;
                sidebar.style.left = Math.max(0, Math.min(maxX, nx)) + "px";
                sidebar.style.top  = Math.max(0, Math.min(maxY, ny)) + "px";
                if (Math.abs(ev.clientX - e.clientX) > 4 ||
                    Math.abs(ev.clientY - e.clientY) > 4) moved = true;
            };

            const onUp = () => {
                document.removeEventListener("mousemove", onMove);
                document.removeEventListener("mouseup",   onUp);
                toggle.style.cursor = "grab";
                sidebarX = parseInt(sidebar.style.left);
                sidebarY = parseInt(sidebar.style.top);
                saveData();
                // Only toggle collapse if the mouse barely moved (i.e. it was a click)
                if (!moved) toggleSidebar();
            };

            document.addEventListener("mousemove", onMove);
            document.addEventListener("mouseup",   onUp);
        });
    }

    function toggleSidebar() {
        sidebarCollapsed = !sidebarCollapsed;
        saveData();
        applySidebarState();
    }

    function applySidebarState() {
        const sidebar = document.getElementById("rw-sidebar");
        const toggle  = document.getElementById("rw-sidebar-toggle");
        if (!sidebar || !toggle) return;
        toggle.textContent = sidebarCollapsed ? "»" : "«";
        toggle.title       = sidebarCollapsed ? "Expand toolbar" : "Collapse toolbar";
        // Hide / show every child after the toggle (index 0)
        Array.from(sidebar.children).forEach((child, i) => {
            if (i === 0) return;
            child.style.display = sidebarCollapsed ? "none" : "";
        });
    }

    // Append an element to the sidebar (below the toggle)
    function sidebarAppend(el) {
        const sidebar = document.getElementById("rw-sidebar");
        if (!sidebar) return;
        sidebar.appendChild(el);
        if (sidebarCollapsed) el.style.display = "none";
    }

    function createSettingsButton() {
        const btn = document.createElement("div");
        btn.id = "rw-settings-btn";
        btn.textContent = "\u2699"; // gear
        Object.assign(btn.style, {
            fontSize: "20px", cursor: "pointer",
            background: "rgba(20,20,30,0.85)", color: "#ff69b4",
            padding: "7px 12px", borderRadius: "8px",
            border: "1.5px solid #ff69b4", lineHeight: "1.4",
            userSelect: "none", textAlign: "center",
        });
        btn.title = "Reaction Wheel Settings";
        btn.onclick = openSettingsModal;
        sidebarAppend(btn);
    }

    function mkInput(id, label, type, placeholder) {
        return `<div>
            <label style="display:block;font-size:12px;color:#aaa;margin-bottom:3px;">${label}</label>
            <input id="${id}" type="${type}" placeholder="${placeholder}"
                style="width:100%;box-sizing:border-box;background:#222;color:#eee;
                       border:1px solid #555;border-radius:6px;padding:5px 7px;font-size:13px;">
        </div>`;
    }

    // Like mkInput but adds a <datalist> for autocomplete suggestions (free text still allowed)
    function mkDataInput(id, label, options, placeholder) {
        const listId = id + "-list";
        const opts = ["", ...options].map(o => `<option value="${o}">`).join("");
        return `<div>
            <label style="display:block;font-size:12px;color:#aaa;margin-bottom:3px;">${label}</label>
            <input id="${id}" list="${listId}" autocomplete="off" placeholder="${placeholder || ""}"
                style="width:100%;box-sizing:border-box;background:#222;color:#eee;
                       border:1px solid #555;border-radius:6px;padding:5px 7px;font-size:13px;">
            <datalist id="${listId}">${opts}</datalist>
        </div>`;
    }

    function buildSettingsHTML() {
        const packNames      = Object.keys(packs);
        const emotes         = packs[currentPack] || [];
        const emoteNames     = emotes.map(e => e.name);
        const idlePackOptions = packNames.map(p =>
            `<option value="${p}" ${idlePackName===p?"selected":""}>${p}</option>`
        ).join("");
        // All emotes across all packs for the pin dropdowns
        const allEmoteOptions = i => Object.entries(packs).flatMap(([pn, es]) =>
            es.map(e => {
                const val = `${pn}::${e.name}`;
                const pin = pinnedEmotes[i];
                const sel = pin && pin.packName === pn && pin.emoteName === e.name ? "selected" : "";
                return `<option value="${val}" ${sel}>${pn}: ${e.icon||""} ${e.name}</option>`;
            })
        ).join("");

        const packTabs = packNames.map(p =>
            `<button class="rw-pack-tab" data-pack="${p}"
                style="padding:5px 13px;margin:2px;border-radius:6px;border:none;cursor:pointer;
                       background:${p===currentPack?"#ff69b4":"#333"};
                       color:${p===currentPack?"#000":"#eee"};font-weight:bold;">${p}</button>`
        ).join("");

        const emoteRows = emotes.map((e, i) =>
            `<tr data-idx="${i}" style="border-bottom:1px solid #2a2a3a;">
                <td style="padding:5px;">${e.icon}</td>
                <td style="padding:5px;">${e.name}</td>
                <td style="padding:5px;font-size:11px;max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${e.chat}</td>
                <td style="padding:5px;white-space:nowrap;">
                    <button class="rw-edit-emote" data-idx="${i}"
                        style="background:#444;color:#eee;border:none;border-radius:4px;padding:3px 8px;cursor:pointer;margin-right:3px;">Edit</button>
                    <button class="rw-del-emote" data-idx="${i}"
                        style="background:#6b0000;color:#eee;border:none;border-radius:4px;padding:3px 8px;cursor:pointer;">Del</button>
                </td>
            </tr>`
        ).join("");

        return `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
            <h2 style="margin:0;color:#ff69b4;font-family:Arial,sans-serif;">&#9881; Reaction Wheel</h2>
            <button id="rw-close" style="background:none;border:none;color:#aaa;font-size:22px;cursor:pointer;line-height:1;">&#x2715;</button>
        </div>

        <div style="margin-bottom:14px;">
            <label style="display:block;margin-bottom:6px;color:#aaa;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Trigger</label>
            <div style="display:flex;gap:8px;align-items:center;">
                <select id="rw-trigger-mode"
                    style="background:#2a2a3a;color:#eee;border:1px solid #555;border-radius:6px;padding:5px 8px;">
                    <option value="hold" ${triggerMode==="hold"?"selected":""}>Hold key</option>
                    <option value="toggle" ${triggerMode==="toggle"?"selected":""}>Toggle key</option>
                </select>
                <button id="rw-rebind"
                    style="background:#2a2a3a;color:#eee;border:1px solid #555;border-radius:6px;padding:5px 12px;cursor:pointer;">
                    Key: <b id="rw-key-label">${triggerKey}</b>
                </button>
                <span id="rw-rebind-hint" style="color:#ff69b4;font-size:12px;display:none;">Press any key…</span>
            </div>
        </div>

        <div style="margin-bottom:12px;">
            <label style="display:block;margin-bottom:6px;color:#aaa;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Packs</label>
            <div id="rw-pack-tabs">${packTabs}</div>
            <div style="margin-top:7px;display:flex;gap:8px;">
                <button id="rw-add-pack"
                    style="background:#1a1a2e;color:#ff69b4;border:1px solid #ff69b4;border-radius:6px;padding:4px 12px;cursor:pointer;font-size:13px;">+ New Pack</button>
                <button id="rw-del-pack"
                    style="background:#1a1a2e;color:#c44;border:1px solid #c44;border-radius:6px;padding:4px 12px;cursor:pointer;font-size:13px;">Delete Pack</button>
            </div>
        </div>

        <div style="margin-bottom:12px;">
            <label style="display:block;margin-bottom:6px;color:#aaa;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Emotes — ${currentPack}</label>
            <table style="width:100%;border-collapse:collapse;font-size:13px;">
                <thead><tr style="color:#666;">
                    <th style="text-align:left;padding:5px;">Icon</th>
                    <th style="text-align:left;padding:5px;">Name</th>
                    <th style="text-align:left;padding:5px;">Chat</th>
                    <th style="padding:5px;"></th>
                </tr></thead>
                <tbody id="rw-emote-list">${emoteRows}</tbody>
            </table>
            <button id="rw-add-emote"
                style="margin-top:7px;background:#1a1a2e;color:#ff69b4;border:1px solid #ff69b4;border-radius:6px;padding:4px 12px;cursor:pointer;font-size:13px;">+ Add Emote</button>
        </div>

        <div id="rw-emote-form" style="display:none;background:#111;border-radius:8px;padding:14px;margin-bottom:12px;border:1px solid #333;">
            <h4 style="margin:0 0 10px;color:#ff69b4;" id="rw-form-title">Add Emote</h4>
            <input type="hidden" id="rw-form-idx" value="-1">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">
                ${mkInput("rw-f-name",     "Name",         "text",   "Beg")}
                ${mkInput("rw-f-icon",     "Icon (emoji)", "text",   "🙏")}
                ${mkInput("rw-f-color",    "Color",        "color",  "#ff69b4")}
                ${mkInput("rw-f-duration", "Duration (s)", "number", "5")}
                ${mkInput("rw-f-arousal",  "Arousal +",    "number", "5")}
                ${mkDataInput("rw-f-expr",          "Expression",       Object.keys(EXPRESSION_MAP), "Sad")}
                ${mkDataInput("rw-f-pose",          "Pose",             BC_POSES,                    "Kneel")}
                ${mkDataInput("rw-f-followup",      "Follow-up emote",  emoteNames,                  "(none)")}
                ${mkInput(    "rw-f-followup-delay","Follow-up delay(s)","number",                   "0")}
            </div>
            <div>
                <label style="display:block;font-size:12px;color:#aaa;margin-bottom:3px;">Chat / emote text</label>
                <textarea id="rw-f-chat" rows="2"
                    style="width:100%;box-sizing:border-box;background:#222;color:#eee;
                           border:1px solid #555;border-radius:6px;padding:6px;font-size:13px;resize:vertical;"></textarea>
            </div>
            <div style="display:flex;gap:8px;margin-top:10px;">
                <button id="rw-form-save"
                    style="flex:1;background:#ff69b4;color:#000;border:none;border-radius:6px;padding:8px;cursor:pointer;font-weight:bold;">Save</button>
                <button id="rw-form-cancel"
                    style="flex:1;background:#333;color:#eee;border:none;border-radius:6px;padding:8px;cursor:pointer;">Cancel</button>
            </div>
        </div>

        <div style="margin-bottom:12px;">
            <label style="display:block;margin-bottom:6px;color:#aaa;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Pinned slots (keys 1–4)</label>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
                ${[0,1,2,3].map(i => `
                    <div>
                        <label style="display:block;font-size:11px;color:#aaa;margin-bottom:2px;">Slot ${i+1}</label>
                        <select id="rw-pin-${i}"
                            style="width:100%;background:#2a2a3a;color:#eee;border:1px solid #555;border-radius:6px;padding:4px 6px;font-size:12px;">
                            <option value="">— use pack slot</option>
                            ${allEmoteOptions(i)}
                        </select>
                    </div>
                `).join("")}
            </div>
        </div>

        <div style="margin-bottom:12px;">
            <label style="display:block;margin-bottom:6px;color:#aaa;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Idle Auto-emote</label>
            <div style="display:flex;gap:8px;align-items:center;">
                <select id="rw-idle-pack"
                    style="flex:1;background:#2a2a3a;color:#eee;border:1px solid #555;border-radius:6px;padding:5px 8px;font-size:13px;">
                    <option value="">Disabled</option>
                    ${idlePackOptions}
                </select>
                <input id="rw-idle-minutes" type="number" min="1" max="120" value="${idleMinutes || 5}"
                    style="width:56px;background:#2a2a3a;color:#eee;border:1px solid #555;border-radius:6px;padding:5px 7px;font-size:13px;">
                <span style="color:#aaa;font-size:12px;white-space:nowrap;">min idle</span>
            </div>
        </div>

        <div style="display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap;padding-top:10px;border-top:1px solid #2a2a3a;">
            <button id="rw-export-url"
                style="background:#1a1a2e;color:#ff69b4;border:1px solid #ff69b4;border-radius:6px;padding:5px 14px;cursor:pointer;font-size:13px;">Export URL</button>
            <button id="rw-share-copy"
                style="background:#1a1a2e;color:#ff69b4;border:1px solid #ff69b4;border-radius:6px;padding:5px 14px;cursor:pointer;font-size:13px;">Share Pack</button>
            <button id="rw-share-import"
                style="background:#1a1a2e;color:#ff69b4;border:1px solid #ff69b4;border-radius:6px;padding:5px 14px;cursor:pointer;font-size:13px;">Import Code</button>
            <button id="rw-import"
                style="background:#1a1a2e;color:#eee;border:1px solid #555;border-radius:6px;padding:5px 14px;cursor:pointer;font-size:13px;">Import JSON</button>
            <button id="rw-export"
                style="background:#1a1a2e;color:#eee;border:1px solid #555;border-radius:6px;padding:5px 14px;cursor:pointer;font-size:13px;">Export JSON</button>
        </div>
        `;
    }

    function openSettingsModal() {
        if (document.getElementById("rw-modal")) return;
        const overlay = document.createElement("div");
        overlay.id = "rw-modal";
        Object.assign(overlay.style, {
            position: "fixed", inset: "0",
            background: "rgba(0,0,0,0.72)",
            zIndex: "100000",
            display: "flex", alignItems: "center", justifyContent: "center",
        });
        const modal = document.createElement("div");
        Object.assign(modal.style, {
            background: "#1a1a2e", color: "#eee",
            borderRadius: "12px", padding: "22px",
            width: "520px", maxHeight: "82vh", overflowY: "auto",
            fontFamily: "Arial, sans-serif", fontSize: "14px",
            border: "2px solid #ff69b4",
            boxShadow: "0 0 40px rgba(255,105,180,0.35)",
        });
        modal.innerHTML = buildSettingsHTML();
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        overlay.addEventListener("click", e => { if (e.target === overlay) closeSettingsModal(); });
        wireSettingsEvents(modal);
    }

    function wireSettingsEvents(modal) {
        modal.querySelector("#rw-close").onclick = closeSettingsModal;

        modal.querySelector("#rw-trigger-mode").onchange = e => {
            triggerMode = e.target.value; saveData();
        };

        const rebindBtn  = modal.querySelector("#rw-rebind");
        const rebindHint = modal.querySelector("#rw-rebind-hint");
        rebindBtn.onclick = () => {
            rebindHint.style.display = "inline";
            rebindBtn.style.borderColor = "#ff69b4";
            const capture = e => {
                e.preventDefault();
                triggerKey = e.key;
                modal.querySelector("#rw-key-label").textContent = e.key;
                rebindHint.style.display = "none";
                rebindBtn.style.borderColor = "#555";
                window.removeEventListener("keydown", capture, true);
                saveData();
            };
            window.addEventListener("keydown", capture, true);
        };

        modal.querySelectorAll(".rw-pack-tab").forEach(btn => {
            btn.onclick = () => { currentPack = btn.dataset.pack; saveData(); refreshModal(); updatePackSwitcher(); };
        });

        modal.querySelector("#rw-add-pack").onclick = () => {
            const name = prompt("New pack name:");
            if (name && !packs[name]) {
                packs[name] = []; currentPack = name; saveData(); refreshModal(); updatePackSwitcher();
            }
        };

        modal.querySelector("#rw-del-pack").onclick = () => {
            if (Object.keys(packs).length <= 1) { alert("Can't delete the last pack."); return; }
            if (!confirm(`Delete pack "${currentPack}"?`)) return;
            delete packs[currentPack];
            currentPack = Object.keys(packs)[0];
            saveData(); refreshModal(); updatePackSwitcher();
        };

        modal.querySelectorAll(".rw-edit-emote").forEach(btn => {
            btn.onclick = () => openEmoteForm(parseInt(btn.dataset.idx), modal);
        });
        modal.querySelectorAll(".rw-del-emote").forEach(btn => {
            btn.onclick = () => {
                packs[currentPack].splice(parseInt(btn.dataset.idx), 1);
                saveData(); refreshModal();
            };
        });

        modal.querySelector("#rw-add-emote").onclick = () => openEmoteForm(-1, modal);
        modal.querySelector("#rw-form-save").onclick   = () => saveEmoteForm(modal);
        modal.querySelector("#rw-form-cancel").onclick = () => {
            modal.querySelector("#rw-emote-form").style.display = "none";
        };

        [0,1,2,3].forEach(i => {
            modal.querySelector(`#rw-pin-${i}`).onchange = ev => {
                const val = ev.target.value;
                if (!val) { pinnedEmotes[i] = null; }
                else {
                    const sep = val.indexOf("::");
                    pinnedEmotes[i] = {packName: val.slice(0, sep), emoteName: val.slice(sep + 2)};
                }
                saveData();
            };
        });

        modal.querySelector("#rw-export-url").onclick = exportPacksAsURL;

        modal.querySelector("#rw-share-copy").onclick = () => {
            try {
                const code = btoa(unescape(encodeURIComponent(JSON.stringify(packs[currentPack]))));
                if (navigator.clipboard?.writeText) {
                    navigator.clipboard.writeText(code).then(() =>
                        alert("Pack code copied to clipboard!\nSend it to someone and they can paste it with \"Import Code\".")
                    );
                } else {
                    prompt("Copy this pack code and share it:", code);
                }
            } catch(err) { alert("Failed to generate pack code."); }
        };

        modal.querySelector("#rw-share-import").onclick = () => {
            const code = prompt("Paste a pack code:");
            if (!code) return;
            try {
                const emotes = JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
                if (!Array.isArray(emotes)) throw new Error("Not an array");
                const name = prompt("Save as pack name:", "Imported");
                if (!name) return;
                packs[name] = emotes;
                currentPack = name;
                saveData(); refreshModal(); updatePackSwitcher();
            } catch(err) { alert("Invalid pack code — make sure you copied it completely."); }
        };

        modal.querySelector("#rw-idle-pack").onchange = e => {
            idlePackName = e.target.value; saveData();
        };
        modal.querySelector("#rw-idle-minutes").onchange = e => {
            idleMinutes = Math.max(0, parseFloat(e.target.value) || 0); saveData();
        };

        modal.querySelector("#rw-export").onclick = () => {
            const json = JSON.stringify({packs, currentPack, triggerMode, triggerKey}, null, 2);
            const a = Object.assign(document.createElement("a"), {
                href: URL.createObjectURL(new Blob([json], {type:"application/json"})),
                download: "reaction-wheel-config.json",
            });
            a.click();
        };

        modal.querySelector("#rw-import").onclick = () => {
            const input = Object.assign(document.createElement("input"), {type:"file", accept:".json"});
            input.onchange = e => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = ev => {
                    try {
                        const data = JSON.parse(ev.target.result);
                        if (data.packs)      packs       = data.packs;
                        if (data.currentPack && packs[data.currentPack]) currentPack = data.currentPack;
                        if (data.triggerMode) triggerMode = data.triggerMode;
                        if (data.triggerKey)  triggerKey  = data.triggerKey;
                        saveData(); refreshModal(); updatePackSwitcher();
                    } catch(err) { alert("Invalid JSON file."); }
                };
                reader.readAsText(file);
            };
            input.click();
        };
    }

    function openEmoteForm(idx, modal) {
        const form = modal.querySelector("#rw-emote-form");
        form.style.display = "block";
        modal.querySelector("#rw-form-title").textContent = idx < 0 ? "Add Emote" : "Edit Emote";
        modal.querySelector("#rw-form-idx").value = idx;
        const e = idx >= 0 ? packs[currentPack][idx] : null;
        modal.querySelector("#rw-f-name").value     = e?.name     ?? "";
        modal.querySelector("#rw-f-icon").value     = e?.icon     ?? "";
        modal.querySelector("#rw-f-color").value    = e?.color    ?? "#ff69b4";
        modal.querySelector("#rw-f-chat").value     = e?.chat     ?? "";
        modal.querySelector("#rw-f-expr").value     = e?.expr     ?? "";
        modal.querySelector("#rw-f-pose").value     = e?.pose     ?? "";
        modal.querySelector("#rw-f-duration").value      = e?.duration      ?? 5;
        modal.querySelector("#rw-f-arousal").value       = e?.arousal       ?? 0;
        modal.querySelector("#rw-f-followup").value      = e?.followUp      ?? "";
        modal.querySelector("#rw-f-followup-delay").value = e?.followUpDelay ?? 0;
        form.scrollIntoView({behavior:"smooth"});
    }

    function saveEmoteForm(modal) {
        const idx = parseInt(modal.querySelector("#rw-form-idx").value);
        const emote = {
            id:       idx >= 0 ? packs[currentPack][idx].id : Date.now(),
            name:     modal.querySelector("#rw-f-name").value.trim(),
            icon:     modal.querySelector("#rw-f-icon").value.trim() || "❓",
            color:    modal.querySelector("#rw-f-color").value,
            chat:     modal.querySelector("#rw-f-chat").value.trim(),
            expr:     modal.querySelector("#rw-f-expr").value.trim(),
            pose:     modal.querySelector("#rw-f-pose").value.trim(),
            duration:       parseFloat(modal.querySelector("#rw-f-duration").value)       || 5,
            arousal:        parseFloat(modal.querySelector("#rw-f-arousal").value)        || 0,
            followUp:       modal.querySelector("#rw-f-followup").value.trim()            || "",
            followUpDelay:  parseFloat(modal.querySelector("#rw-f-followup-delay").value) || 0,
        };
        if (!emote.name) { alert("Emote name is required."); return; }
        if (idx >= 0) { packs[currentPack][idx] = emote; } else { packs[currentPack].push(emote); }
        saveData(); refreshModal();
    }

    function refreshModal() { closeSettingsModal(); openSettingsModal(); }
    function closeSettingsModal() { document.getElementById("rw-modal")?.remove(); }

    // ====================== QUICK PACK SWITCHER ======================
    // Small ◀ Pack ▶ pill sitting below the gear button.
    // Left-arrow / scroll-up = previous pack.  Right-arrow / scroll-down = next pack.

    function cyclePack(dir) {
        const names = Object.keys(packs);
        const idx = names.indexOf(currentPack);
        currentPack = names[(idx + dir + names.length) % names.length];
        saveData();
        updatePackSwitcher();
        if (wheelActive) drawWheel();
    }

    function updatePackSwitcher() {
        const el = document.getElementById("rw-pack-name");
        if (el) el.textContent = currentPack;
    }

    function createPackSwitcher() {
        if (document.getElementById("rw-pack-switcher")) return;

        const el = document.createElement("div");
        el.id = "rw-pack-switcher";
        Object.assign(el.style, {
            fontFamily: "Arial,sans-serif", fontSize: "12px",
            background: "rgba(20,20,30,0.85)", color: "#ff69b4",
            border: "1.5px solid #ff69b4", borderRadius: "8px",
            padding: "7px 10px", userSelect: "none",
            display: "flex", alignItems: "center", gap: "5px",
        });

        const prev = Object.assign(document.createElement("span"), {textContent: "◀"});
        Object.assign(prev.style, {cursor: "pointer", opacity: "0.7", flexShrink: "0"});
        prev.title = "Previous pack";

        const name = Object.assign(document.createElement("span"), {id: "rw-pack-name", textContent: currentPack});
        name.style.cssText = "overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;text-align:center;";

        const next = Object.assign(document.createElement("span"), {textContent: "▶"});
        Object.assign(next.style, {cursor: "pointer", opacity: "0.7", flexShrink: "0"});
        next.title = "Next pack";

        el.append(prev, name, next);
        sidebarAppend(el);

        prev.addEventListener("click", e => { e.stopPropagation(); cyclePack(-1); });
        next.addEventListener("click", e => { e.stopPropagation(); cyclePack(+1); });
        el.addEventListener("wheel", e => { e.preventDefault(); cyclePack(e.deltaY > 0 ? 1 : -1); }, {passive: false});
    }

    // ====================== EMOTE HISTORY ======================

    function recordHistory(emote) {
        let packName = currentPack;
        for (const [name, emotes] of Object.entries(packs)) {
            if (emotes.some(e => e.id === emote.id)) { packName = name; break; }
        }
        emoteHistory.unshift({emote, packName});
        if (emoteHistory.length > 10) emoteHistory.length = 10;
        saveData();
        refreshHistoryPanel();
    }

    function createHistoryButton() {
        const btn = document.createElement("div");
        btn.id = "rw-history-btn";
        Object.assign(btn.style, {
            fontSize: "18px", cursor: "pointer",
            background: "rgba(20,20,30,0.85)", color: "#ff69b4",
            padding: "7px 12px", borderRadius: "8px",
            border: "1.5px solid #ff69b4", lineHeight: "1.4",
            userSelect: "none", textAlign: "center",
        });
        btn.textContent = "🕐";
        btn.title = "Emote history (last 10) — click to re-fire";
        btn.onclick = toggleHistoryPanel;
        sidebarAppend(btn);
    }

    function toggleHistoryPanel() {
        const existing = document.getElementById("rw-history-panel");
        if (existing) { existing.remove(); return; }

        const sidebar = document.getElementById("rw-sidebar");
        const rect = sidebar ? sidebar.getBoundingClientRect()
                             : {left: window.innerWidth - 160, top: 80};
        const panel = document.createElement("div");
        panel.id = "rw-history-panel";
        Object.assign(panel.style, {
            position: "fixed",
            ...popupPos(rect),
            background: "#1a1a2e", border: "1.5px solid #ff69b4",
            borderRadius: "10px", zIndex: "100001",
            fontFamily: "Arial,sans-serif", fontSize: "13px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
            minWidth: "200px", maxHeight: "320px", overflowY: "auto",
        });
        buildHistoryContent(panel);
        document.body.appendChild(panel);

        setTimeout(() => {
            const close = e => {
                const histBtn = document.getElementById("rw-history-btn");
                if (!panel.contains(e.target) && e.target !== histBtn) {
                    panel.remove(); document.removeEventListener("click", close);
                }
            };
            document.addEventListener("click", close);
        }, 0);
    }

    function buildHistoryContent(panel) {
        panel.innerHTML = "";
        const hdr = document.createElement("div");
        hdr.style.cssText = "padding:8px 14px;color:#aaa;font-size:11px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #2a2a3a;";
        hdr.textContent = "Recent emotes";
        panel.appendChild(hdr);

        if (!emoteHistory.length) {
            const empty = document.createElement("div");
            empty.style.cssText = "padding:14px;color:#555;";
            empty.textContent = "Nothing fired yet";
            panel.appendChild(empty);
            return;
        }
        emoteHistory.forEach(({emote, packName}) => {
            const row = document.createElement("div");
            Object.assign(row.style, {
                padding: "8px 14px", cursor: "pointer",
                display: "flex", alignItems: "center", gap: "8px",
                borderBottom: "1px solid #1e1e2e",
                color: isOnCooldown(emote) ? "#555" : "#eee",
            });
            const dot = document.createElement("span");
            dot.style.cssText = `width:8px;height:8px;border-radius:50%;background:${emote.color||"#ff69b4"};flex-shrink:0;display:inline-block;`;
            const name = document.createElement("span");
            name.style.cssText = "overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;";
            name.textContent = `${emote.icon || ""} ${emote.name}`;
            const pack = document.createElement("span");
            pack.style.cssText = "color:#555;font-size:11px;flex-shrink:0;";
            pack.textContent = packName;
            row.append(dot, name, pack);
            row.onmouseenter = () => row.style.background = "#2a2a3a";
            row.onmouseleave = () => row.style.background = "";
            row.onclick = () => {
                if (!isOnCooldown(emote)) { emoteLastUsed[emote.id] = Date.now(); performEmote(emote); }
            };
            panel.appendChild(row);
        });
    }

    function refreshHistoryPanel() {
        const panel = document.getElementById("rw-history-panel");
        if (panel) buildHistoryContent(panel);
    }

    // ====================== IDLE AUTO-EMOTE ======================
    // Every 30 s check whether the player has been idle for idleMinutes.
    // If so, fire a random emote from idlePackName (if configured).

    function fireIdleEmote() {
        const pack = packs[idlePackName];
        if (!pack || !pack.length || wheelActive) return;
        const emote = pack[Math.floor(Math.random() * pack.length)];
        emoteLastUsed[emote.id] = Date.now();
        performEmote(emote);
        lastActivity = Date.now(); // reset so we don't fire every 30 s
    }

    setInterval(() => {
        if (idleMinutes <= 0 || !idlePackName || !packs[idlePackName]) return;
        if (Date.now() - lastActivity >= idleMinutes * 60 * 1000) fireIdleEmote();
    }, 30000);

    // ====================== OOC SUPPRESS BUTTON ======================

    function createSuppressButton() {
        const btn = document.createElement("div");
        btn.id = "rw-suppress-btn";
        Object.assign(btn.style, {
            fontSize: "18px", cursor: "pointer",
            background: "rgba(20,20,30,0.85)",
            padding: "7px 12px", borderRadius: "8px",
            border: "1.5px solid #ff69b4", lineHeight: "1.4",
            userSelect: "none", textAlign: "center",
        });
        btn.onclick = () => { suppressChat = !suppressChat; saveData(); updateSuppressButton(); };
        sidebarAppend(btn);
        updateSuppressButton();
    }

    function updateSuppressButton() {
        const btn = document.getElementById("rw-suppress-btn");
        if (!btn) return;
        btn.textContent   = suppressChat ? "🔇" : "💬";
        btn.title         = suppressChat ? "Chat muted — emotes fire silently (click to unmute)" : "Chat enabled (click to mute)";
        btn.style.color       = suppressChat ? "#888" : "#ff69b4";
        btn.style.borderColor = suppressChat ? "#555" : "#ff69b4";
    }

    // Returns true when the sidebar's midpoint is in the right half of the viewport
    function sidebarOnRight() {
        const sb = document.getElementById("rw-sidebar");
        if (!sb) return true;
        const r = sb.getBoundingClientRect();
        return (r.left + r.width / 2) > window.innerWidth / 2;
    }

    // Returns position styles for a popup that should open beside the sidebar
    function popupPos(anchorRect) {
        const onRight = sidebarOnRight();
        return onRight
            ? {right: (window.innerWidth - anchorRect.left + 8) + "px", left: "auto",  top: anchorRect.top + "px"}
            : {left:  (anchorRect.right + 8) + "px",                    right: "auto", top: anchorRect.top + "px"};
    }

    // ====================== TARGET SELECTOR ======================

    function createTargetButton() {
        const btn = document.createElement("div");
        btn.id = "rw-target-btn";
        Object.assign(btn.style, {
            fontSize: "13px", cursor: "pointer",
            background: "rgba(20,20,30,0.85)", color: "#ff69b4",
            padding: "7px 10px", borderRadius: "8px",
            border: "1.5px solid #ff69b4", lineHeight: "1.4",
            userSelect: "none", textAlign: "center",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        });
        btn.onclick = openTargetPicker;
        sidebarAppend(btn);
        updateTargetButton();
    }

    function updateTargetButton() {
        const btn = document.getElementById("rw-target-btn");
        if (!btn) return;
        if (currentTarget) {
            btn.textContent       = `🎯 ${currentTarget.name}`;
            btn.title             = `Target: ${currentTarget.name} — [Name] in chat text is replaced (click to change)`;
            btn.style.color       = "#ffd700";
            btn.style.borderColor = "#ffd700";
        } else {
            btn.textContent       = "🎯";
            btn.title             = "No target — click to pick one. Use [Name] in emote text to insert their name.";
            btn.style.color       = "#ff69b4";
            btn.style.borderColor = "#ff69b4";
        }
    }

    function openTargetPicker() {
        document.getElementById("rw-target-picker")?.remove();
        const chars = (typeof ChatRoomCharacter !== "undefined" ? ChatRoomCharacter : [])
            .filter(c => c !== Player && c.Name);

        const btn  = document.getElementById("rw-target-btn");
        const rect = btn ? btn.getBoundingClientRect() : {left: window.innerWidth - 160, top: 232};

        const menu = document.createElement("div");
        menu.id = "rw-target-picker";
        Object.assign(menu.style, {
            position: "fixed",
            ...popupPos(rect),
            background: "#1a1a2e", border: "1.5px solid #ff69b4",
            borderRadius: "8px", zIndex: "100001",
            fontFamily: "Arial,sans-serif", fontSize: "13px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
            overflow: "hidden", minWidth: "130px",
        });

        const makeItem = (label, action, color) => {
            const el = document.createElement("div");
            el.textContent = label;
            Object.assign(el.style, {
                padding: "8px 14px", cursor: "pointer",
                color: color || "#eee", borderBottom: "1px solid #2a2a3a",
            });
            el.onmouseenter = () => el.style.background = "#2a2a3a";
            el.onmouseleave = () => el.style.background = "";
            el.onclick = () => { action(); menu.remove(); };
            return el;
        };

        menu.appendChild(makeItem("✕  No target", () => { currentTarget = null; updateTargetButton(); }, "#aaa"));
        if (!chars.length) {
            menu.appendChild(makeItem("(no one else here)", () => {}, "#555"));
        } else {
            chars.forEach(c => menu.appendChild(
                makeItem(c.Name, () => { currentTarget = {name: c.Name}; updateTargetButton(); })
            ));
        }

        document.body.appendChild(menu);
        setTimeout(() => {
            const close = e => {
                if (!menu.contains(e.target)) { menu.remove(); document.removeEventListener("click", close); }
            };
            document.addEventListener("click", close);
        }, 0);
    }

    // ====================== ITALIC CHAT HOOK ======================
    // Intercepts Enter on BC's chat input: if the message is *wrapped in asterisks*,
    // re-send it as an Emote so BC renders it italic instead of plain text.
    function hookItalicChat() {
        document.addEventListener("keydown", e => {
            if (e.key !== "Enter") return;
            const input = document.getElementById("InputChat");
            if (!input || document.activeElement !== input) return;
            const text = input.value.trim();
            if (!text.startsWith("*") || !text.endsWith("*") || text.length < 3) return;
            if (typeof ServerSend !== "function") return;
            e.preventDefault();
            e.stopImmediatePropagation();
            ServerSend("ChatRoomChat", {Content: text.slice(1, -1), Type: "Emote"});
            input.value = "";
        }, true /* capture phase — runs before BC's own keydown */);
    }

    // ====================== KEYBOARD TRIGGER ======================
    document.addEventListener("keydown", e => {
        if (e.key !== triggerKey || wheelActive) return;
        // Don't trigger while typing in a text field
        const tag = document.activeElement?.tagName?.toLowerCase();
        if (tag === "input" || tag === "textarea") return;
        showWheel();
        e.preventDefault();
    });

    document.addEventListener("keyup", e => {
        if (e.key === triggerKey && triggerMode === "hold") hideWheel();
    });

    function findPinnedEmote(slotIdx) {
        const pin = pinnedEmotes[slotIdx];
        if (!pin) return null;
        const pack = packs[pin.packName];
        return pack ? pack.find(e => e.name === pin.emoteName) || null : null;
    }

    // Keys 1–8: fire emote directly. Slots 1-4 check pins first; `/` opens quick-search.
    document.addEventListener("keydown", e => {
        if (wheelActive) return;
        const tag = document.activeElement?.tagName?.toLowerCase();
        if (tag === "input" || tag === "textarea") return;

        if (e.key === "/") { e.preventDefault(); openQuickSearch(); return; }

        const n = parseInt(e.key);
        if (n >= 1 && n <= 8) {
            let emote = n <= 4 ? findPinnedEmote(n - 1) : null;
            if (!emote) emote = (packs[currentPack] || [])[n - 1];
            if (emote && !isOnCooldown(emote)) {
                emoteLastUsed[emote.id] = Date.now();
                performEmote(emote);
                e.preventDefault();
            }
        }
    });

    // ====================== QUICK-SEARCH ======================

    function openQuickSearch() {
        if (document.getElementById("rw-search")) return;

        const overlay = document.createElement("div");
        overlay.id = "rw-search";
        Object.assign(overlay.style, {
            position: "fixed", inset: "0",
            background: "rgba(0,0,0,0.6)", zIndex: "200000",
            display: "flex", alignItems: "flex-start", justifyContent: "center",
            paddingTop: "80px",
        });

        const box = document.createElement("div");
        Object.assign(box.style, {
            background: "#1a1a2e", border: "1.5px solid #ff69b4", borderRadius: "12px",
            width: "340px", maxWidth: "90vw",
            boxShadow: "0 8px 40px rgba(0,0,0,0.7)", overflow: "hidden",
            fontFamily: "Arial,sans-serif",
        });

        const input = document.createElement("input");
        input.type = "text"; input.placeholder = "Search emotes… (Enter fires first result)";
        Object.assign(input.style, {
            width: "100%", boxSizing: "border-box",
            background: "#222", color: "#eee",
            border: "none", borderBottom: "1px solid #333",
            padding: "12px 16px", fontSize: "14px", outline: "none",
        });

        const results = document.createElement("div");
        results.style.maxHeight = "260px"; results.style.overflowY = "auto";

        box.append(input, results);
        overlay.appendChild(box);
        document.body.appendChild(overlay);

        // Flat list of all emotes across all packs
        const allEmotes = Object.entries(packs).flatMap(([packName, emotes]) =>
            emotes.map(e => ({emote: e, packName}))
        );

        function renderResults(query) {
            results.innerHTML = "";
            const q = query.toLowerCase();
            const filtered = q
                ? allEmotes.filter(({emote: e}) =>
                    e.name.toLowerCase().includes(q) ||
                    (e.icon || "").includes(q) ||
                    (e.chat || "").toLowerCase().includes(q))
                : allEmotes.slice(0, 20);

            if (!filtered.length) {
                results.innerHTML = `<div style="padding:14px 16px;color:#555;">No results</div>`;
                return;
            }
            filtered.forEach(({emote, packName}, i) => {
                const row = document.createElement("div");
                Object.assign(row.style, {
                    padding: "9px 16px", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: "10px",
                    borderBottom: "1px solid #1e1e2e",
                    color: isOnCooldown(emote) ? "#555" : "#eee",
                });
                const dot = document.createElement("span");
                dot.style.cssText = `width:8px;height:8px;border-radius:50%;background:${emote.color||"#ff69b4"};flex-shrink:0;display:inline-block;`;
                const nm  = document.createElement("span"); nm.style.flex = "1";
                nm.textContent = `${emote.icon || ""} ${emote.name}`;
                const pk  = document.createElement("span");
                pk.style.cssText = "color:#555;font-size:11px;";
                pk.textContent = packName;
                row.append(dot, nm, pk);
                row.onmouseenter = () => row.style.background = "#2a2a3a";
                row.onmouseleave = () => row.style.background = "";
                row.onclick = () => {
                    if (!isOnCooldown(emote)) { emoteLastUsed[emote.id] = Date.now(); performEmote(emote); }
                    overlay.remove();
                };
                if (i === 0) row.id = "rw-search-first";
                results.appendChild(row);
            });
        }

        renderResults("");
        requestAnimationFrame(() => input.focus());
        input.oninput = () => renderResults(input.value);
        input.onkeydown = ev => {
            if (ev.key === "Escape") { overlay.remove(); ev.stopPropagation(); }
            if (ev.key === "Enter")  { document.getElementById("rw-search-first")?.click(); }
        };
        overlay.onclick = e => { if (e.target === overlay) overlay.remove(); };
    }

    // ====================== RIGHT-CLICK TO REACT ======================

    function initRightClickReact() {
        document.addEventListener("contextmenu", e => {
            const msg = e.target.closest(".ChatMessage");
            if (!msg) return;

            // Try common BC chat-line sender selectors
            const senderEl = msg.querySelector(".ChatSender, .ChatMessageName, b, strong");
            const senderName = senderEl
                ? senderEl.textContent.replace(/[:\s]+$/, "").trim()
                : null;
            if (!senderName || senderName === (typeof Player !== "undefined" && Player?.Name)) return;

            e.preventDefault();
            showReactMenu(e.clientX, e.clientY, senderName);
        });
    }

    function showReactMenu(x, y, senderName) {
        document.getElementById("rw-react-menu")?.remove();

        const menu = document.createElement("div");
        menu.id = "rw-react-menu";
        Object.assign(menu.style, {
            position: "fixed", left: x + "px", top: y + "px",
            background: "#1a1a2e", border: "1.5px solid #ff69b4",
            borderRadius: "8px", zIndex: "200001",
            fontFamily: "Arial,sans-serif", fontSize: "13px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.7)",
            overflow: "hidden", minWidth: "190px",
        });

        const hdr = document.createElement("div");
        hdr.style.cssText = "padding:7px 14px;color:#aaa;font-size:11px;border-bottom:1px solid #2a2a3a;";
        hdr.textContent = `⚡ React to ${senderName}`;
        menu.appendChild(hdr);

        const emotes = packs[currentPack] || [];
        (emotes.length ? emotes.slice(0, 10) : [{name: "— no emotes —", icon: "", color: "#555", _empty: true}])
            .forEach(emote => {
                const row = document.createElement("div");
                Object.assign(row.style, {
                    padding: "8px 14px", cursor: emote._empty ? "default" : "pointer",
                    color: emote._empty || isOnCooldown(emote) ? "#555" : "#eee",
                    borderBottom: "1px solid #1e1e2e",
                    display: "flex", alignItems: "center", gap: "8px",
                });
                const dot = document.createElement("span");
                dot.style.cssText = `width:7px;height:7px;border-radius:50%;background:${emote.color||"#ff69b4"};flex-shrink:0;display:inline-block;`;
                const lbl = document.createElement("span");
                lbl.textContent = emote._empty ? emote.name : `${emote.icon || ""} ${emote.name}`;
                row.append(dot, lbl);
                if (!emote._empty) {
                    row.onmouseenter = () => row.style.background = "#2a2a3a";
                    row.onmouseleave = () => row.style.background = "";
                    row.onclick = () => {
                        currentTarget = {name: senderName}; updateTargetButton();
                        if (!isOnCooldown(emote)) { emoteLastUsed[emote.id] = Date.now(); performEmote(emote); }
                        menu.remove();
                    };
                }
                menu.appendChild(row);
            });

        document.body.appendChild(menu);
        // Nudge into viewport if needed
        requestAnimationFrame(() => {
            const r = menu.getBoundingClientRect();
            if (r.right  > window.innerWidth)  menu.style.left = (x - r.width)  + "px";
            if (r.bottom > window.innerHeight) menu.style.top  = (y - r.height) + "px";
        });
        setTimeout(() => {
            const close = e => { if (!menu.contains(e.target)) { menu.remove(); document.removeEventListener("click", close); } };
            document.addEventListener("click", close);
        }, 0);
    }

    // ====================== URL EXPORT / IMPORT ======================

    function exportPacksAsURL() {
        try {
            const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(packs))));
            const url = location.href.split("#")[0] + "#rw=" + encoded;
            if (navigator.clipboard?.writeText) {
                navigator.clipboard.writeText(url).then(() =>
                    alert("URL copied!\n\nSend it to someone — when they open it in BC with the script installed, all your packs import automatically.")
                );
            } else {
                prompt("Share this URL:", url);
            }
        } catch(err) { alert("Failed to build export URL."); }
    }

    function checkURLImport() {
        if (!location.hash.startsWith("#rw=")) return;
        try {
            const imported = JSON.parse(decodeURIComponent(escape(atob(location.hash.slice(4)))));
            if (typeof imported !== "object" || Array.isArray(imported)) return;
            let count = 0;
            for (const [name, emotes] of Object.entries(imported)) {
                if (Array.isArray(emotes)) { packs[name] = emotes; count++; }
            }
            if (count) {
                saveData(); updatePackSwitcher();
                alert(`Imported ${count} pack(s) from URL!`);
            }
            history.replaceState(null, "", location.pathname + location.search);
        } catch(err) { /* malformed hash — ignore */ }
    }

    // ====================== START ======================
    setTimeout(() => {
        createSidebar();          // container must exist before children
        createSettingsButton();
        createPackSwitcher();
        createSuppressButton();
        createTargetButton();
        createHistoryButton();
        initRightClickReact();
        checkURLImport();
        hookItalicChat();
        console.log(
            "%c✅ BC Reaction Wheel v1.4.0 loaded! Ctrl=wheel · 1-8=hotkeys · /=search · right-click chat to react.",
            "color:#ff69b4;font-weight:bold"
        );
    }, 2000);

})();