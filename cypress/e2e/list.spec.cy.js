/* eslint-disable no-unused-expressions */
/* eslint-disable jest/valid-expect */
import {
  CHANGING_COLOR,
  CY_CIRCLE_CIRCLE,
  CY_CIRCLE_HEAD,
  CY_CIRCLE_LETTER,
  CY_CIRCLE_TAIL,
  CY_REMOVE_BTN,
  CY_RESET_BTN,
  CY_SUBMIT_BTN,
  DEFAULT_COLOR,
  MODIFIED_COLOR,
} from "../constants";

/* describe("корректная работа кнопки на странице /list", () => {
  beforeEach(() => {
    cy.visit(`/list`);
  });

  it("должна начинаться с заблокированных кнопок", () => {
    cy.get(CY_SUBMIT_BTN).each(($button) => {
      expect($button).to.be.disabled;
    });
    cy.get(CY_REMOVE_BTN).eq(2).should("be.disabled");
  });

  it("должны становиться активными при вводе данных(value)", () => {
    cy.get(CY_SUBMIT_BTN).eq(0).should("be.disabled");
    cy.get(CY_SUBMIT_BTN).eq(1).should("be.disabled");
    cy.get("input").eq(0).type("test");
    cy.get(CY_SUBMIT_BTN).eq(0).should("not.be.disabled");
    cy.get(CY_SUBMIT_BTN).eq(1).should("not.be.disabled");
  });

  it("должна становиться активной при вводе данных(index)", () => {
    cy.get(CY_SUBMIT_BTN).eq(2).should("be.disabled");
    cy.get(CY_REMOVE_BTN).eq(2).should("be.disabled");
    cy.get("input").eq(0).type("test");
    cy.get("input").eq(1).type(1);
    cy.get(CY_SUBMIT_BTN).eq(2).should("not.be.disabled");
    cy.get(CY_REMOVE_BTN).eq(2).should("not.be.disabled");
  });
  it("должны становиться снова заблокированными при удалении данных", () => {
    cy.get("input").eq(0).type("test");
    cy.get("input").eq(1).type(1);
    cy.get(CY_SUBMIT_BTN).each(($button) => {
      expect($button).to.not.be.disabled;
    });
    cy.get("input").eq(0).clear();
    cy.get("input").eq(1).clear();
    cy.get(CY_SUBMIT_BTN).each(($button) => {
      expect($button).to.be.disabled;
    });
  });
}); */

describe("визуализация алгоритма", () => {
  beforeEach(() => {
    cy.visit(`/list`);
  });

  it("отрисовки дефолтного списка", () => {
    cy.get(CY_CIRCLE_CIRCLE).each(($circle) => {
      cy.wrap($circle)
        .should("have.css", "border", DEFAULT_COLOR)
        .invoke("text")
        .should("not.be.empty");
    });
    cy.get(CY_CIRCLE_HEAD).eq(0).contains("head");
    cy.get(CY_CIRCLE_TAIL).eq(3).contains("tail");
  });

  it("добавления элемента в head", () => {
    const inputValue = "test";
    cy.clock();
    cy.get("input").eq(0).type(inputValue);
    cy.get(CY_SUBMIT_BTN).eq(0).click();
    cy.get(CY_CIRCLE_CIRCLE).each(($circle, index) => {
      cy.wrap($circle)
        .should(
          "have.css",
          "border",
          index === 0 ? CHANGING_COLOR : DEFAULT_COLOR
        )
        .invoke("text")
        .should("not.be.empty");
      if (index === 0) {
        cy.wrap($circle).contains(inputValue);
      }
    });
    cy.tick(500);
    cy.get(CY_CIRCLE_CIRCLE).each(($circle, index) => {
      cy.wrap($circle)
        .should(
          "have.css",
          "border",
          index === 0 ? MODIFIED_COLOR : DEFAULT_COLOR
        )
        .invoke("text")
        .should("not.be.empty");
      if (index === 0) {
        cy.wrap($circle).contains(inputValue);
      }
    });
    cy.get(CY_CIRCLE_HEAD).eq(0).contains("head");
    cy.get(CY_CIRCLE_TAIL).eq(4).contains("tail");
  });
  it("удаление элемента из head", () => {
    cy.clock();
    
    cy.get(CY_CIRCLE_CIRCLE).eq(0).invoke("text").as('deletedCircleText')
    let a = '@deletedCircleText'
    cy.get(CY_REMOVE_BTN).eq(0).click();
    
    cy.get(CY_CIRCLE_CIRCLE).each(($circle, index) => {
      cy.wrap($circle)
        .should("have.css", "border", index === 1 ? CHANGING_COLOR : DEFAULT_COLOR)
        .invoke("text")
        .should(index === 0 ? "be.empty" : "not.be.empty");
    });
    cy.get(CY_CIRCLE_CIRCLE).eq(1).contains(a) 


  });







  it("добавления и удаление элемента в tail", () => {});
  it("добавления и удаление элемента по индексу", () => {});
});
