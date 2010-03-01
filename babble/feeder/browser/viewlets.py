from zope.interface import implements
from zope.viewlet.interfaces import IViewlet

from Products.Five.browser import BrowserView

from bottom.feeder.browser.viewlets import ViewletMixin


class ChatViewlet(BrowserView, ViewletMixin):
    """ """
    implements(IViewlet)

    def __init__(self, context, request, view, manager):
        super(ChatViewlet, self).__init__(context, request)
        self.__parent__ = view
        self.context = context
        self.request = request
        self.view = view
        self.manager = manager

    def update(self):
        pass


