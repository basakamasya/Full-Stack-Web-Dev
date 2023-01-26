describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    //create a user
    const user = {
      name: 'Burak',
      username: 'burak',
      password: 'sifre'
    }
    cy.request('POST', 'http://localhost:3000/api/users', user)
    cy.visit('http://localhost:3000/')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('burak')
      cy.get('#password').type('sifre')
      cy.get('#login-button').click()

      cy.contains('Burak logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('burak')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Burak logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('burak')
      cy.get('#password').type('sifre')
      cy.get('#login-button').click()

    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('/cypress')
      cy.get('#create').click()
      cy.contains('a blog created by cypress')
    })

    it('A blog can be created and liked', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('a brand new blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('/cypress2')
      cy.get('#create').click()
      cy.contains('a brand new blog created by cypress')

      cy.get('#view').click()
      cy.contains('likes 0')
      cy.get('#like').click()
      cy.contains('likes 1')
    })
  })

})