# Account deletion deployment

GitHub Pages alone cannot delete another user's Firebase Authentication account.
The Delete action calls `deleteManagerAccount` in `europe-west1` and removes the
Auth login, Firestore profile, legacy shared profile and player account links.
Player records and historical results remain. Disable/Enable remains separate.

## Required one-time setup

1. From `HoloFyrnManager/functions`, run `npm install`.
2. Sign into Firebase CLI with a project administrator account (`firebase login`).
3. From `HoloFyrnManager`, deploy:
   `firebase deploy --project noctiq-d1020 --only functions:holofyrn-accounts`
   Cloud Functions deployment requires an eligible billing-enabled Firebase project.
4. On a trusted machine with Google Application Default Credentials authorized
   for this project, run from `functions`:
   `node grant-account-admin.cjs FIREBASE_UID`
   Repeat for each existing administrator who should delete accounts, and when
   granting the Admin role to a new administrator. Sign out/in afterwards.
5. Publish the updated web files to GitHub Pages.

The server checks both the `accountAdmin` Auth claim and an enabled Admin profile.
This independent claim is necessary because the existing Firestore rules permit
signed-in clients to edit profile roles. The grant script preserves other claims.
No service-account credentials belong in this repository or in browser code.

Self-deletion is denied on both client and server. The caller remains an enabled
administrator. A partial failure leaves the target disabled with Retry deletion;
retry completes cleanup even if the Authentication account is already absent.
Do not re-enable an account marked deletionPending.

Validation uses mocked Firebase services; no real account is deleted by tests.
After deployment, verify with a disposable test account before regular use.

References:
- https://firebase.google.com/docs/auth/admin/manage-users#delete_a_user
- https://firebase.google.com/docs/functions/callable
