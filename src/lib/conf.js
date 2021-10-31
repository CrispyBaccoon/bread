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
        this.UpdateConfig = () => {
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
            this.UpdateConfig();
            return this.config.crumbs ? this.config.crumbs : false;
        };
        this.AddBreadCrumb = (breadcrumb) => {
            var _a;
            var breadcrumbs = this.returnBreadCrumbs();
            var filtered = breadcrumbs.filter((crumb) => crumb.name == breadcrumb.name);
            if (!(filtered.length > 0)) {
                (_a = this.config.crumbs) === null || _a === void 0 ? void 0 : _a.push(breadcrumb);
                this.UpdateConf();
            }
        };
        this.ToggleSolveBreadCrumb = (name) => {
            var breadcrumbs = this.returnBreadCrumbs();
            for (var i = 0; i < breadcrumbs.length; i++) {
                if (breadcrumbs[i].name == name) {
                    breadcrumbs[i].done = !breadcrumbs[i].done;
                    this.config.crumbs = breadcrumbs;
                    return;
                }
            }
            this.UpdateConf();
        };
        this.Mark = (name, done) => {
            var breadcrumbs = this.returnBreadCrumbs();
            for (var i = 0; i < breadcrumbs.length; i++) {
                if (breadcrumbs[i].name == name) {
                    breadcrumbs[i].done = done;
                    this.config.crumbs = breadcrumbs;
                    return;
                }
            }
            this.UpdateConf();
        };
        this.config = this.returnConf();
    }
}
exports.default = Conf;
