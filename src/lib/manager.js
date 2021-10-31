"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fls = __importStar(require("./files"));
class Conf {
    constructor() {
        // Functions
        // Conf
        this.returnConf = () => {
            if (fls.pathExists(".bread/breadcrumbs.json")) {
                var read = fls.readFile(".bread/breadcrumbs.json");
                if (read == null || read == "") {
                    fls.appendFile(".bread/breadcrumbs.json", JSON.stringify({ meta: {} }));
                    read = fls.readFile(".bread/breadcrumbs.json");
                }
                return JSON.parse(read);
            }
        };
        this.UpdateConf = () => {
            fls.writeFile(".bread/breadcrumbs.json", JSON.stringify(this.config));
        };
        // Config
        this.SaveConfig = () => {
            this.config = this.returnConf();
        };
        this.fillConfig = () => {
            var nextConfig = this.config;
            if (nextConfig.meta) {
            }
            else {
                nextConfig.meta = {};
            }
            if (!nextConfig.crumbs) {
                nextConfig.crumbs = [];
            }
            this.config = nextConfig;
            this.UpdateConf();
        };
        // BreadCrumbs
        this.returnBreadCrumbs = () => {
            return this.config.crumbs;
        };
        this.config = this.returnConf();
    }
}
exports.default = Conf;
