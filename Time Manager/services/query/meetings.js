function matchMeetingByName(name) {
    return {
        query: {
            name: name
        }
    }
}

const matchAllMeetings = () => {
    return {
        query: {
            matchAll: {}
        }
    }
}

const matchUserMeetings = (username) => {
    return {
        query: {
            match: {
                username: username
            }
        }
    }
}

const matchMeetingByDate = (startDate, endDate, username) => {
    new Date(startDate).toJSON()
    return {
        query: {
            bool: {
                must: [
                    {
                        match: {
                            username
                        }
                    },
                    {
                        range: {
                           startDate: {
                                gte: new Date(startDate).toJSON(),
                                lte: new Date(endDate).toJSON()
                            }
                        }
                    }
                ]
            }

        }

    }
}

module.exports = {
    matchAllMeetings,
    matchMeetingByName,
    matchUserMeetings,
    matchMeetingByDate
}