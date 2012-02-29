from plone.memoize.instance import memoize
from Products.CMFCore.utils import getToolByName
from babble.client import utils
from actionbar.panel.browser.viewlets import ActionViewlet

class ChatViewlet(ActionViewlet):
    """ """

    @memoize
    def get_num_online_contacts(self):
        """ Return one less to exclude the current user """
        return len(utils.get_online_usernames(self.context))


class ChatRoomsViewlet(ActionViewlet):
    """ """

    @memoize
    def render(self):
        mtool = getToolByName(self.context, 'portal_membership')
        member = mtool.getAuthenticatedMember()
        catalog = getToolByName(self.context, 'portal_catalog')
        self.chatrooms = len(catalog(
                            portal_type='babble.client.chatroom',
                            participants=member.getId()))
        
        if self.chatrooms:
            return self.index()

        return ''

