// Redux & external redux libs
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

// Auth
import { login, logout } from './auth/actions';
import { authReducers } from './auth/reducers';
import { AuthState } from './auth/types';

// Clients
import { upsertClient, upsertClients, deleteClient } from './clients/actions';
import { clientReducers } from './clients/reducers';
import { ClientState } from './clients/types';

// Entitlements
import {
  upsertEntitlement,
  upsertEntitlements,
  deleteEntitlement
} from './entitlements/actions';
import { entitlementReducers } from './entitlements/reducers';
import { EntitlementState } from './entitlements/types';

//Invitations
import {
  upsertInvitation,
  upsertInvitations,
  deleteInvitation
} from './invitations/actions';
import { invitationReducers } from './invitations/reducers';
import { InvitationState } from './invitations/types';

// Memberships
import {
  upsertMembership,
  upsertMemberships,
  deleteMembership
} from './memberships/actions';
import { membershipReducers } from './memberships/reducers';
import { MembershipState } from './memberships/types';

// Organizations
import {
  upsertOrganization,
  upsertOrganizations,
  deleteOrganization
} from './organizations/actions';
import { organizationReducers } from './organizations/reducers';
import { OrganizationState } from './organizations/types';

// Plans
import { upsertPlan, upsertPlans } from './plans/actions';
import { planReducers } from './plans/reducers';
import { PlanState } from './plans/types';

// Subscriptions
import {
  upsertSubscription,
  upsertSubscriptions
} from './subscriptions/actions';
import { subscriptionReducers } from './subscriptions/reducers';
import { SubscriptionState } from './subscriptions/types';

// Users
import { upsertSelfUser } from './users/actions';
import { usersReducers } from './users/reducers';
import { UsersState } from './users/types';

const reducers = combineReducers({
  auth: authReducers,
  clients: clientReducers,
  entitlements: entitlementReducers,
  organizations: organizationReducers,
  invitations: invitationReducers,
  memberships: membershipReducers,
  plans: planReducers,
  subscriptions: subscriptionReducers,
  users: usersReducers
});

export type State = ReturnType<typeof reducers>;

function configureStore() {
  const middleware = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middleware);
  const store = createStore(reducers, composeWithDevTools(middlewareEnhancer));
  return store;
}

export interface AppActions {
  login: typeof login;
  logout: typeof logout;
  upsertClient: typeof upsertClient;
  upsertClients: typeof upsertClients;
  deleteClient: typeof deleteClient;
  upsertOrganization: typeof upsertOrganization;
  upsertOrganizations: typeof upsertOrganizations;
  deleteOrganization: typeof deleteOrganization;
  upsertMembership: typeof upsertMembership;
  upsertMemberships: typeof upsertMemberships;
  deleteMembership: typeof deleteMembership;
  upsertPlan: typeof upsertPlan;
  upsertPlans: typeof upsertPlans;
  upsertSubscription: typeof upsertSubscription;
  upsertSubscriptions: typeof upsertSubscriptions;
  upsertInvitation: typeof upsertInvitation;
  upsertInvitations: typeof upsertInvitations;
  deleteInvitation: typeof deleteInvitation;
  upsertEntitlement: typeof upsertEntitlement;
  upsertEntitlements: typeof upsertEntitlements;
  deleteEntitlement: typeof deleteEntitlement;
  upsertSelfUser: typeof upsertSelfUser;
}

export interface AppProps {
  auth: AuthState;
  actions: AppActions;
  clients: ClientState;
  entitlements: EntitlementState;
  organizations: OrganizationState;
  invitations: InvitationState;
  memberships: MembershipState;
  plans: PlanState;
  subscriptions: SubscriptionState;
  users: UsersState;
}

export default configureStore;
