import {
  CHANGING_COLOR,
  CY_CIRCLE_CIRCLE,
  CY_SUBMIT_BTN,
  DEFAULT_COLOR,
  MODIFIED_COLOR,
} from "../constants";

describe("корректная работа кнопки на странице /recursion", () => {
  beforeEach(() => {
    cy.visit(`/recursion`);
  });

  it("должна начинаться с заблокированной кнопки", () => {
    cy.get(CY_SUBMIT_BTN).should("be.disabled");
  });

  it("должна становиться активной при вводе данных", () => {
    cy.get("input").type("test");
    cy.get(CY_SUBMIT_BTN).should("not.be.disabled");
  });

  it("должна становиться снова заблокированной при удалении данных", () => {
    cy.get("input").type("test");
    cy.get(CY_SUBMIT_BTN).should("not.be.disabled");
    cy.get("input").clear();
    cy.get(CY_SUBMIT_BTN).should("be.disabled");
  });
});

describe("визуализация алгоритма", () => {
  beforeEach(() => {
    cy.visit(`/recursion`);
  });

  it("визуализация разворота строки", () => {
    cy.clock();
    cy.get("input").type("test");
    cy.get(CY_SUBMIT_BTN).click();
    cy.get(CY_CIRCLE_CIRCLE).eq(0).as("1");
    cy.get(CY_CIRCLE_CIRCLE).eq(1).as("2");
    cy.get(CY_CIRCLE_CIRCLE).eq(2).as("3");
    cy.get(CY_CIRCLE_CIRCLE).eq(3).as("4");
    cy.get("@1").should("have.css", "border", CHANGING_COLOR).contains("t");
    cy.get("@2").should("have.css", "border", DEFAULT_COLOR).contains("e");
    cy.get("@3").should("have.css", "border", DEFAULT_COLOR).contains("s");
    cy.get("@4").should("have.css", "border", CHANGING_COLOR).contains("t");
    cy.tick(1000);
    cy.get("@1").should("have.css", "border", MODIFIED_COLOR).contains("t");
    cy.get("@2").should("have.css", "border", CHANGING_COLOR).contains("e");
    cy.get("@3").should("have.css", "border", CHANGING_COLOR).contains("s");
    cy.get("@4").should("have.css", "border", MODIFIED_COLOR).contains("t");
    cy.tick(1000);
    cy.get("@1").should("have.css", "border", MODIFIED_COLOR).contains("t");
    cy.get("@2").should("have.css", "border", MODIFIED_COLOR).contains("s");
    cy.get("@3").should("have.css", "border", MODIFIED_COLOR).contains("e");
    cy.get("@4").should("have.css", "border", MODIFIED_COLOR).contains("t");
  });
});
