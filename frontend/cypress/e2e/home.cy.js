describe('Task Dashboard', () => {
  // it('loads the homepage', () => {
  //   cy.contains('Create Task')   
  // })

  // it('checks that the page asks the user to add a new task', () => {
  //   cy.get('div').contains('There are no tasks. Consider adding some?')
  //   cy.get('button').contains('Add New Task')
  // })

  // it('opens the task creation modal', () => {
  //   cy.get('button').contains('Add New Task').click()
  //   cy.get('h3').should('contain', 'Create Task')
  // })
})
describe('Task Creation', () => {

  beforeEach(() => {
    cy.get('button').contains('Create Task').click()
    cy.get('[data-cy="title-input"]').type('Cypress Test!')
    cy.get('[data-cy="description-input"]').type('Cypress Test!')
    cy.get('[data-cy="status-select"]').select(2)
    cy.get('[data-cy="create-button"]').click();
  });

  afterEach(() => {
    cy.get('div').contains('Cypress Test').click()
    cy.get('button').contains('Delete Task').click()
    cy.get('button').contains('Yes, Delete').click()
  });

  it('creates a new task', () => {
    cy.get('div').contains('Cypress Test!')
  })

  it(`views a new task's details`, () => {
    cy.get('div').contains('Cypress Test!').click()
    cy.get('p').contains('Cypress Test!')
  })

  it(`changes a new task's title`, () => {
    cy.get('div').contains('Cypress Test!').click()
    cy.get('div').contains('Edit Task').click()
    cy.get('[data-cy="title-input"]').clear().type('Cypress Test 2!')
    cy.get('[data-cy="description-input"]').clear().type('Description changed test!')
    cy.get('[data-cy="status-select"]').select(4)
    cy.get('button').contains('Save Changes').click()
  })
})
