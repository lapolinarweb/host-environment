"use strict";

const { host } = require("../../");
const { expect } = require("chai");

describe("Browser environment", () => {
  /**
   * Returns the one object key from host.browser.
   */
  function getCurrentBrowser () {
    for (let key of Object.keys(host.browser)) {
      let currentBrowser = host.browser[key];
      if (typeof currentBrowser === "object") {
        return currentBrowser;
      }
    }
  }

  if (typeof window === "undefined") {

    it("host.browser should be false", () => {
      expect(host.browser).to.be.false;
    });

  }
  else {

    it("host.browser should be an object", () => {
      expect(host.browser).to.be.an("object");
    });

    it("only one of the properties should be an object", () => {
      let objectKeys = 0;

      for (let key of Object.keys(host.browser)) {
        if (typeof host.browser[key] === "object") {
          objectKeys++;
        }
      }

      expect(objectKeys).to.equal(1);
    });

    it("the other properties should be false", () => {
      for (let key of Object.keys(host.browser)) {
        let value = host.browser[key];

        if (key !== "mobile" && typeof value !== "object") {
          expect(value).to.be.false;
        }
      }
    });

    it("browser.version should be set", () => {
      let browser = getCurrentBrowser();
      expect(browser.version).to.be.a("number").above(0);
    });

    it("browser.majorVersion should be set", () => {
      let browser = getCurrentBrowser();
      expect(browser.majorVersion).to.be.a("number").above(0);
    });

    it("browser.minorVersion should be set", () => {
      let browser = getCurrentBrowser();
      expect(browser.minorVersion).to.be.a("number");
    });

    it("browser.patchVersion should be set", () => {
      let browser = getCurrentBrowser();
      expect(browser.patchVersion).to.be.a("number");
    });

    it("browser.vXX should be set", () => {
      let browser = getCurrentBrowser();
      expect(browser["v" + browser.majorVersion]).to.be.true;
    });

    it("browser.mobile should be set", () => {
      let browser = getCurrentBrowser();
      expect(browser.mobile).to.be.a("boolean");
    });

    it("host.browser.mobile should be set", () => {
      expect(host.browser.mobile).to.be.a("boolean");
    });

    it("host.browser should not have any other properties", () => {
      expect(host.browser).to.have.all.keys([
        "IE",
        "edge",
        "chrome",
        "firefox",
        "safari",
        "mobile"
      ]);
    });

    it("host.browser.XXXXX should not have any other properties", () => {
      let browser = getCurrentBrowser();
      expect(browser).to.have.all.keys([
        "version",
        "majorVersion",
        "minorVersion",
        "patchVersion",
        "v" + browser.majorVersion,
        "mobile",
      ]);
    });

  }
});
