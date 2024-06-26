from abc import ABC, abstractmethod

class IUserManagementService(ABC):
    @abstractmethod
    def register(self):
        pass

    @abstractmethod
    def login(self):
        pass

    @abstractmethod
    def returnProfile(self):
        pass
