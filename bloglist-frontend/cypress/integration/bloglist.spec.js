describe('bloglist app tests', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'root',
      name: 'Shrihan Dadi',
      password: 'urmom420',
    })
    cy.visit('http://localhost:3000')
  })

  it('the application displays the login form by default', () => {
    cy.contains('login to application')
  })

  it('login succeeds with correct credentials', () => {
    cy.get('input.username').type('root')
    cy.get('input.password').type('urmom420')
    cy.get('button.login').click()
    cy.contains('blogs')
  })

  it('login fails with incorrect credentials', () => {
    cy.get('input.username').type('root2')
    cy.get('input.password').type('urdad420')
    cy.get('button.login').click()
    cy.contains('Invalid')
  })

  it('when logged in, a blog can be created', () => {
    cy.login('root', 'urmom420')
    cy.contains('create new blog').click()
    cy.get('input.title').type('How to Delegate Even If You Don’t Have a Team')
    cy.get('input.author').type('Michael Hyatt')
    cy.get('input.url').type(
      'https://michaelhyatt.com/how-to-delegate-even-if-you-dont-have-a-team-2/'
    )
    cy.get('button.create').click()
    cy.contains(
      'How to Delegate Even If You Don’t Have a Team by Michael Hyatt'
    )
  })

  it('a user can like a blog', () => {
    cy.login('root', 'urmom420')
    cy.postblog(
      'How to Delegate Even If You Don’t Have a Team',
      'Michael Hyatt',
      'https://michaelhyatt.com/how-to-delegate-even-if-you-dont-have-a-team-2/'
    )
    cy.get('button.toggleVisibility').click()
    cy.get('button.like').click()
    cy.contains('likes 1')
  })

  it('the user who created a blog can delete it', () => {
    cy.login('root', 'urmom420')
    cy.postblog(
      'How to Delegate Even If You Don’t Have a Team',
      'Michael Hyatt',
      'https://michaelhyatt.com/how-to-delegate-even-if-you-dont-have-a-team-2/'
    )
    cy.get('button.toggleVisibility').click()
    cy.contains('remove')
  })

  it('other users cannot delete a blog created by the user', () => {
    cy.login('root', 'urmom420')
    cy.postblog(
      'How to Delegate Even If You Don’t Have a Team',
      'Michael Hyatt',
      'https://michaelhyatt.com/how-to-delegate-even-if-you-dont-have-a-team-2/'
    )
    cy.logout()
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'root2',
      name: 'John Doe',
      password: 'urdad420',
    })
    cy.login('root2', 'urdad420')
    cy.get('button.toggleVisibility').click()
    cy.get('button.remove').should('not.be.visible')
  })

  it('the blogs are ordered according to likes with the blog with the most likes being first', () => {
    cy.login('root', 'urmom420')
    cy.postblog(
      'How to Delegate Even If You Don’t Have a Team',
      'Michael Hyatt',
      'https://michaelhyatt.com/how-to-delegate-even-if-you-dont-have-a-team-2/',
      5
    )
    cy.postblog(
      'One Simple Way to Motivate Your Team',
      'Michael Hyatt',
      'https://michaelhyatt.com/one-simple-way-to-motivate-your-team/',
      6
    )
    cy.postblog(
      'How to Maximize Remote Meetings',
      'Michael Hyatt',
      'https://michaelhyatt.com/how-to-maximize-remote-meetings/',
      3
    )
    cy.visit('http://localhost:3000')
    let likes = []
    cy.get('button.toggleVisibility')
      .should('have.length', 3)
      .each(button => {
        button.click()
      })
    cy.get('div.likes')
      .should('have.length', 3)
      .each(div => {
        const text = div.text()
        const number = parseInt(text.slice(6))
        likes.push(number)
      }).then(() => {
        assert.deepEqual(likes, [6, 5, 3])
      })
  })
})
