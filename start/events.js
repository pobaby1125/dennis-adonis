
const Event = use('Event')

Event.on('user.login', ['user.log'])

Event.on('user.store', ['User.verification'])