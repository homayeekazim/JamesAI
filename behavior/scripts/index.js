'use strict'

exports.handle = (client) => {
  // Create steps
  const sayHello = client.createStep({
    satisfied() {
      return Boolean(client.getConversationState().helloSent)
    },

    prompt() {
      client.addResponse('app:response:name:welcome')
      client.addResponse('app:response:name:provide/documentation', {
        documentation_link: 'https://qreminder-staging.herokuapp.com/',
      })
      client.addResponse('app:response:name:provide/instructions')

      client.updateConversationState({
        helloSent: true
      })

      client.done()
    }
  })

  const untrained = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('app:response:name:provide/instructions')
      client.done()
    }
  })

  const handleGreeting = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addTextResponse('Hello world, I mean human')
      client.done()
    }
  })

  const handleGoodbye = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addTextResponse('See you later!')
      client.done()
    }
  })
  
  client.runFlow({
    classifications: {
      goodbye: 'goodbye',
      greeting: 'greeting'
      // map inbound message classifications to names of streams
    },
    streams: {
      goodbye: handleGoodbye,
      greeting: handleGreeting,
      main: 'onboarding',
      onboarding: [sayHello],
      end: [untrained],
    },
  })
}
