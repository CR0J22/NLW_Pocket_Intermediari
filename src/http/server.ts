import fastify from 'fastify'
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider,
} from 'fastify-type-provider-zod'


import { crateGoalRoute } from './routes/create-goal'
import { createGoalCompletionRoute } from './routes/create-completion'
import { getWeekPendingGoalsRoute } from './routes/get-pending-goals'
import { getWeekSummaryRoute } from './routes/get-week-summary'
import fastifyCors from '@fastify/cors'

const app = fastify().withTypeProvider<ZodTypeProvider>()

//cors
app.register(fastifyCors, {
    origin: '*',
})


// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)


//routes
app.register(crateGoalRoute)
app.register(getWeekSummaryRoute)
app.register(getWeekPendingGoalsRoute)
app.register(createGoalCompletionRoute)




app
    .listen({
        port: 3333,
    })
    .then(() => {
        console.log('HTTP server running...')
    })
