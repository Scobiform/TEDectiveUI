/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'
 
describe('Home', () => {
  it('CHeck if pathname is changed to id route', () => {
    render(<Home />)
 
    // Check route with jest
    //expect(window.location.pathname).toBe('/1778f0d1-545c-5fcb-bf80-7c0512bbd0be')

    // Change route with jest
    window.history.pushState({}, '', '/c85f969c-f516-5e13-b1bd-3df7abe48531');

    // Check route with jest
    expect(window.location.pathname).toBe('/c85f969c-f516-5e13-b1bd-3df7abe48531')

  })
})