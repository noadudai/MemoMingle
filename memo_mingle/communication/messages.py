from abc import abstractmethod

class Message:
    # A constant for the string "message_type"
    MESSAGE_TYPE_KEY = "message_type"

    # An abstruct method, the derived class needs to implement the function that
    # will return a dictionary of the message ({type: , reason/exception: }).
    @abstractmethod
    def to_dict(self):
        pass

class SuccessMessage(Message):
    # A constant for the string "reason"
    REASON_KEY = "reason"

    def __init__(self, reason):
        self.reason = reason

    def to_dict(self):
        return {
            Message.MESSAGE_TYPE_KEY: SuccessMessage.__name__,
            SuccessMessage.REASON_KEY: self.reason}

    def __repr__(self):
        return f"SuccessMessage: {self.reason}"


class FailMessage(Message):
    # A constant for the string "exception"
    EXCEPTION_KEY = "exception"

    def __init__(self, exception):
        self.exception = exception

    def to_dict(self):
        return {
            Message.MESSAGE_TYPE_KEY: FailMessage.__name__,
            FailMessage.EXCEPTION_KEY: self.exception}

    def __repr__(self):
        return f"FailMessage: {self.exception}"