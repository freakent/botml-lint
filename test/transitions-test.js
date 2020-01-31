const util = require('util');
const assert = require('chai').assert;
const loadbotml= require('../botml')

let botml

describe('Transitions', function() {

    before(async function() {
        botml = await loadbotml()
    })

    it('should have explicit transitions on every state', function() {
        //console.log("BOTML->", util.inspect(botml))
        assert.property(botml, 'states', 'BotMl is invalid, it does not have a states section')
        for (const name in botml.states ) { 
            const state = botml.states[name]
            //console.log("STATE->", util.inspect(state))
            assert.property(state, 'transitions', `state ${name} has no transition property`)
            assert.notEqual(state.transitions.length, 0, `state ${name} transitions property is empty`)
        }
        
    });

});