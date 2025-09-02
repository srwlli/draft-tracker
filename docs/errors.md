Runtime ReferenceError


Button is not defined

src/app/(auth)/dashboard/page.tsx (66:14) @ Dashboard


  64 |               <p className="text-muted-foreground">Welcome back{user?.email ? `, ${user.email}` : ''}</p>
  65 |             </div>
> 66 |             <Button variant="outline" onClick={signOut}>
     |              ^
  67 |               Sign Out
  68 |             </Button>
  69 |           </div>
Call Stack
13

Hide 12 ignore-listed frame(s)
Dashboard
src/app/(auth)/dashboard/page.tsx (66:14)
Object.react_stack_bottom_frame
node_modules/next/dist/compiled/react-dom/cjs/react-dom-client.development.js (23583:20)
renderWithHooks
node_modules/next/dist/compiled/react-dom/cjs/react-dom-client.development.js (6792:22)
updateFunctionComponent
node_modules/next/dist/compiled/react-dom/cjs/react-dom-client.development.js (9246:19)
beginWork
node_modules/next/dist/compiled/react-dom/cjs/react-dom-client.development.js (10857:18)
runWithFiberInDEV
node_modules/next/dist/compiled/react-dom/cjs/react-dom-client.development.js (871:30)
performUnitOfWork
node_modules/next/dist/compiled/react-dom/cjs/react-dom-client.development.js (15726:22)
workLoopSync
node_modules/next/dist/compiled/react-dom/cjs/react-dom-client.development.js (15546:41)
renderRootSync
node_modules/next/dist/compiled/react-dom/cjs/react-dom-client.development.js (15526:11)
performWorkOnRoot
node_modules/next/dist/compiled/react-dom/cjs/react-dom-client.development.js (15033:44)
performWorkOnRootViaSchedulerTask
node_modules/next/dist/compiled/react-dom/cjs/react-dom-client.development.js (16815:7)
MessagePort.performWorkUntilDeadline
node_modules/next/dist/compiled/scheduler/cjs/scheduler.development.js (45:48)
ClientPageRoot
node_modules/next/src/client/components/client-page.tsx (60:12)