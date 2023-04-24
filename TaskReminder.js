const cron = require('node-cron');
const todosSchema = require('./Schemas/Todos');
const sendReminderMail = require('./Email');
const taskReminder = ()=>{
    cron.schedule('*/60 * * * *', async () => {
        try {
            const todos = await todosSchema.find();

            todos.forEach((todo)=>{
                const durationLeft = (Date.now() - todo.creationDatetime)/(1000*60*60);

                if(durationLeft<1){
                    sendReminderMail({todo});
                }
            })

        } catch (error) {
            console.log(error)
        }

      }, {
        scheduled: true,
        timezone: "Asia/Kolkata"
      });
}

module.exports = taskReminder