const createTask = () => {
  cy.get('button').contains('Create Task').click()
  cy.get('[data-cy="title-input"]').type('Cypress Test!')
  cy.get('[data-cy="description-input"]').type('Cypress Test!')
  cy.get('[data-cy="status-select"]').select(2)
  cy.get('[data-cy="create-button"]').click();
}

const deleteTask = () => {
  cy.get('div').contains('Cypress Test').click()
  cy.get('button').contains('Delete Task').click()
  cy.get('button').contains('Yes, Delete').click()
}

describe('Task creation', () => {
  beforeEach(() => {
    createTask();
  })

  afterEach(() => {
    deleteTask();
  });

  it('creates a new task', () => {
    cy.get('div').contains('Cypress Test!')
  })

  it(`views a new task's details`, () => {
    cy.get('div').contains('Cypress Test!').click()
    cy.get('p').contains('Cypress Test!')
  })
})

describe('Task modification', () => {
  beforeEach(() => {
    createTask();
    cy.get('div').contains('Cypress Test!').click()
    cy.get('div').contains('Edit Task').click()
  })

  afterEach(() => {
    cy.get('div').contains('Cypress Test').click()
    cy.get('button').contains('Delete Task').click()
    cy.get('button').contains('Yes, Delete').click()
  });

  it(`changes a task's title`, () => {
    cy.get('[data-cy="title-input"]').clear().type('Cypress Test 2!')
    cy.get('button').contains('Save Changes').click()
  })

  it(`changes a task's description`, () => {
    cy.get('[data-cy="description-input"]').clear().type('Description changed test!')
    cy.get('button').contains('Save Changes').click()
  })

  it(`changes a task's status`, () => {
    cy.get('[data-cy="status-select"]').select(4)
    cy.get('button').contains('Save Changes').click()
  })
})

describe('Task deletion', () => {
  beforeEach(() => {
    createTask();
  })
  
  it(`deletes a task`, () => {
    cy.get('div').contains('Cypress Test!').click()
    cy.get('div').contains('Delete Task').click()
    cy.get('button').contains('Yes, Delete').click()
  })
})