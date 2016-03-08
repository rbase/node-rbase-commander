/* eslint-env mocha */
import { runCommandFile, runCommand } from '..'
import { expect } from 'chai'

describe('runCommandFile', () => {
  it('should run the command file', () =>
    runCommandFile('test/fixtures/command.rmd')
      .then(result => {
        expect(result.stdout).to.contain('rcommander test')
      })
  )

  it('should run the command file against the DSN', () =>
    runCommandFile('test/fixtures/rrbyw18.rmd', {dsn: 'rrbyw18'})
      .then(result => {
        expect(result.stdout).to.contain('CustID')
      })
  )
})

describe('runCommand', () => {
  it('should run the command', () =>
    runCommand('PAUSE 2 USING \'rcommander test\'')
      .then(result => {
        expect(result.stdout).to.contain('rcommander test')
      })
  )

  it('should run the command against the DSN', () =>
    runCommand('SELECT * FROM Customer', {dsn: 'rrbyw18'})
      .then(result => {
        expect(result.stdout).to.contain('CustID')
      })
  )
})
