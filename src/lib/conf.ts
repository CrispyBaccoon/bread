import * as fls from "./files";

export default class Conf {
  constructor() {
    this.config = this.returnConf();
  }
  config: config;
  // Functions
  // Conf
  returnConf: () => config = () => {
    if (fls.pathExists(".bread/breadcrumbs.json")) {
      var read = fls.readFile(".bread/breadcrumbs.json");
      if (read == null || read == "") {
        fls.appendFile(".bread/breadcrumbs.json", JSON.stringify({ meta: {} }));
        read = fls.readFile(".bread/breadcrumbs.json");
      }
      return JSON.parse(read as string);
    }
  };
  UpdateConf = () => {
    fls.writeFile(".bread/breadcrumbs.json", JSON.stringify(this.config));
  };
  // Config
  UpdateConfig = () => {
    this.config = this.returnConf();
  };

  fillConfig = () => {
    var nextConfig = this.config;
    if (nextConfig.meta) {
    } else {
      nextConfig.meta = {};
    }
    if (!nextConfig.crumbs) {
      nextConfig.crumbs = [];
    }
    this.config = nextConfig;
    this.UpdateConf();
  };

  // BreadCrumbs
  returnBreadCrumbs = () => {
    this.UpdateConfig();
    return this.config.crumbs ? this.config.crumbs : false;
  };
  AddBreadCrumb = (breadcrumb: crumb) => {
    var breadcrumbs: crumb[] = this.returnBreadCrumbs() as crumb[];
    var filtered: crumb[] = breadcrumbs.filter(
      (crumb) => crumb.name == breadcrumb.name
    );
    if (!(filtered.length > 0)) {
      this.config.crumbs?.push(breadcrumb);
      this.UpdateConf();
    }
  };
  ToggleSolveBreadCrumb = (name: string) => {
    var breadcrumbs: crumb[] = this.returnBreadCrumbs() as crumb[];
    for (var i = 0; i < breadcrumbs.length; i++) {
      if (breadcrumbs[i].name == name) {
        breadcrumbs[i].done = !breadcrumbs[i].done;
        this.config.crumbs = breadcrumbs;
        return;
      }
    }
    this.UpdateConf();
  };
  Mark = (name: string, done: boolean) => {
    var breadcrumbs: crumb[] = this.returnBreadCrumbs() as crumb[];
    for (var i = 0; i < breadcrumbs.length; i++) {
      if (breadcrumbs[i].name == name) {
        breadcrumbs[i].done = done;
        this.config.crumbs = breadcrumbs;
        return;
      }
    }
    this.UpdateConf();
  };
}
