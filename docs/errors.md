Console TypeError


Failed to fetch

Call Stack
13

DraftTrackerAPI.request
file:///C:/Users/willh/Desktop/draft-tracker/.next/static/chunks/src_2fad4f71._.js (99:32)
Object.draftPlayer
file:///C:/Users/willh/Desktop/draft-tracker/.next/static/chunks/src_2fad4f71._.js (134:64)
handleDraftPlayer
file:///C:/Users/willh/Desktop/draft-tracker/.next/static/chunks/src_99890f21._.js (1766:175)
handleConfirmDraft
file:///C:/Users/willh/Desktop/draft-tracker/.next/static/chunks/src_99890f21._.js (622:13)
handleEvent
file:///C:/Users/willh/Desktop/draft-tracker/.next/static/chunks/node_modules_2bb6070e._.js (5066:85)
executeDispatch
file:///C:/Users/willh/Desktop/draft-tracker/.next/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (8965:13)
runWithFiberInDEV
file:///C:/Users/willh/Desktop/draft-tracker/.next/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (886:74)
processDispatchQueue
file:///C:/Users/willh/Desktop/draft-tracker/.next/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (8991:41)
<unknown>
file:///C:/Users/willh/Desktop/draft-tracker/.next/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (9286:13)
batchedUpdates$1
file:///C:/Users/willh/Desktop/draft-tracker/.next/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (2211:44)
dispatchEventForPluginEventSystem
file:///C:/Users/willh/Desktop/draft-tracker/.next/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (9067:9)
dispatchEvent
file:///C:/Users/willh/Desktop/draft-tracker/.next/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (11224:37)
dispatchDiscreteEvent
file:///C:/Users/willh/Desktop/draft-tracker/.next/static/chunks/node_modules_next_dist_compiled_react-dom_1e674e59._.js (11206:64)

# here is the error from web console:

src_2fad4f71._.js:99  POST http://localhost:3000/api/drafts/64c7c93d-fbf7-4d81-a92b-7c71d6590d21/picks net::ERR_CONNECTION_REFUSED
request @ src_2fad4f71._.js:99
draftPlayer @ src_2fad4f71._.js:134
handleDraftPlayer @ src_99890f21._.js:1766
handleConfirmDraft @ src_99890f21._.js:622
handleEvent @ node_modules_2bb6070e._.js:5066
executeDispatch @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8965
runWithFiberInDEV @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:886
processDispatchQueue @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8991
(anonymous) @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:9286
batchedUpdates$1 @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:2211
dispatchEventForPluginEventSystem @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:9067
dispatchEvent @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:11224
dispatchDiscreteEvent @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:11206
<button>
exports.jsx @ node_modules_next_dist_compiled_5150ccfd._.js:1949
Primitive.button @ node_modules_2bb6070e._.js:5455
react_stack_bottom_frame @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:13072
renderWithHooksAgain @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:4146
renderWithHooks @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:4097
updateForwardRef @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:5342
beginWork @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:6186
runWithFiberInDEV @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:886
performUnitOfWork @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8298
workLoopSync @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8190
renderRootSync @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8173
performWorkOnRoot @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:7908
performSyncWorkOnRoot @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8890
flushSyncWorkAcrossRoots_impl @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8809
processRootScheduleInMicrotask @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8829
(anonymous) @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8901
<Primitive.button>
exports.jsx @ node_modules_next_dist_compiled_5150ccfd._.js:1949
DialogClose @ node_modules_2bb6070e._.js:8640
react_stack_bottom_frame @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:13072
renderWithHooksAgain @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:4146
renderWithHooks @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:4097
updateForwardRef @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:5342
beginWork @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:6186
runWithFiberInDEV @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:886
performUnitOfWork @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8298
workLoopSync @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8190
renderRootSync @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8173
performWorkOnRoot @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:7908
performSyncWorkOnRoot @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8890
flushSyncWorkAcrossRoots_impl @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8809
processRootScheduleInMicrotask @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8829
(anonymous) @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8901
<DialogClose>
exports.jsx @ node_modules_next_dist_compiled_5150ccfd._.js:1949
AlertDialogAction @ node_modules_2bb6070e._.js:8882
react_stack_bottom_frame @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:13072
renderWithHooksAgain @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:4146
renderWithHooks @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:4097
updateForwardRef @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:5342
beginWork @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:6186
runWithFiberInDEV @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:886
performUnitOfWork @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8298
workLoopSync @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8190
renderRootSync @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8173
performWorkOnRoot @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:7908
performSyncWorkOnRoot @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8890
flushSyncWorkAcrossRoots_impl @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8809
processRootScheduleInMicrotask @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8829
(anonymous) @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8901
<AlertDialogAction>
exports.jsxDEV @ node_modules_acfe698f._.js:1534
AlertDialogAction @ src_99890f21._.js:527
react_stack_bottom_frame @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:13072
renderWithHooksAgain @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:4146
renderWithHooks @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:4097
updateFunctionComponent @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:5523
beginWork @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:6111
runWithFiberInDEV @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:886
performUnitOfWork @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8298
workLoopSync @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8190
renderRootSync @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8173
performWorkOnRoot @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:7908
performSyncWorkOnRoot @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8890
flushSyncWorkAcrossRoots_impl @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8809
processRootScheduleInMicrotask @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8829
(anonymous) @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8901
<AlertDialogAction>
exports.jsxDEV @ node_modules_acfe698f._.js:1534
PlayerTable @ src_99890f21._.js:826
react_stack_bottom_frame @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:13072
renderWithHooksAgain @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:4146
renderWithHooks @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:4097
updateFunctionComponent @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:5523
beginWork @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:6111
runWithFiberInDEV @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:886
performUnitOfWork @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8298
workLoopSync @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8190
renderRootSync @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8173
performWorkOnRoot @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:7908
performSyncWorkOnRoot @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8890
flushSyncWorkAcrossRoots_impl @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8809
processRootScheduleInMicrotask @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8829
(anonymous) @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8901
<PlayerTable>
exports.jsxDEV @ node_modules_acfe698f._.js:1534
DraftAdminPage @ src_99890f21._.js:1869
react_stack_bottom_frame @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:13072
renderWithHooksAgain @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:4146
renderWithHooks @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:4097
updateFunctionComponent @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:5523
beginWork @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:6111
runWithFiberInDEV @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:886
performUnitOfWork @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8298
workLoopSync @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8190
renderRootSync @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8173
performWorkOnRoot @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:7908
performSyncWorkOnRoot @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8890
flushSyncWorkAcrossRoots_impl @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8809
processRootScheduleInMicrotask @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8829
(anonymous) @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8901Understand this error
node_modules_next_dist_b0daae9a._.js:2360 Error drafting player: TypeError: Failed to fetch
    at DraftTrackerAPI.request (src_2fad4f71._.js:99:32)
    at Object.draftPlayer (src_2fad4f71._.js:134:64)
    at handleDraftPlayer (src_99890f21._.js:1766:175)
    at handleConfirmDraft (src_99890f21._.js:622:13)
    at handleEvent (node_modules_2bb6070e._.js:5066:85)
    at executeDispatch (node_modules_next_dist_compiled_react-dom_1e674e59._.js:8965:13)
    at runWithFiberInDEV (node_modules_next_dist_compiled_react-dom_1e674e59._.js:886:74)
    at processDispatchQueue (node_modules_next_dist_compiled_react-dom_1e674e59._.js:8991:41)
    at node_modules_next_dist_compiled_react-dom_1e674e59._.js:9286:13
    at batchedUpdates$1 (node_modules_next_dist_compiled_react-dom_1e674e59._.js:2211:44)
    at dispatchEventForPluginEventSystem (node_modules_next_dist_compiled_react-dom_1e674e59._.js:9067:9)
    at dispatchEvent (node_modules_next_dist_compiled_react-dom_1e674e59._.js:11224:37)
    at dispatchDiscreteEvent (node_modules_next_dist_compiled_react-dom_1e674e59._.js:11206:64)
error @ node_modules_next_dist_b0daae9a._.js:2360
handleDraftPlayer @ src_99890f21._.js:1781
await in handleDraftPlayer
handleConfirmDraft @ src_99890f21._.js:622
handleEvent @ node_modules_2bb6070e._.js:5066
executeDispatch @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8965
runWithFiberInDEV @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:886
processDispatchQueue @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8991
(anonymous) @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:9286
batchedUpdates$1 @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:2211
dispatchEventForPluginEventSystem @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:9067
dispatchEvent @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:11224
dispatchDiscreteEvent @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:11206
<button>
exports.jsx @ node_modules_next_dist_compiled_5150ccfd._.js:1949
Primitive.button @ node_modules_2bb6070e._.js:5455
react_stack_bottom_frame @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:13072
renderWithHooksAgain @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:4146
renderWithHooks @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:4097
updateForwardRef @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:5342
beginWork @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:6186
runWithFiberInDEV @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:886
performUnitOfWork @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8298
workLoopSync @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8190
renderRootSync @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8173
performWorkOnRoot @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:7908
performSyncWorkOnRoot @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8890
flushSyncWorkAcrossRoots_impl @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8809
processRootScheduleInMicrotask @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8829
(anonymous) @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8901
<Primitive.button>
exports.jsx @ node_modules_next_dist_compiled_5150ccfd._.js:1949
DialogClose @ node_modules_2bb6070e._.js:8640
react_stack_bottom_frame @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:13072
renderWithHooksAgain @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:4146
renderWithHooks @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:4097
updateForwardRef @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:5342
beginWork @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:6186
runWithFiberInDEV @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:886
performUnitOfWork @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8298
workLoopSync @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8190
renderRootSync @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8173
performWorkOnRoot @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:7908
performSyncWorkOnRoot @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8890
flushSyncWorkAcrossRoots_impl @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8809
processRootScheduleInMicrotask @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8829
(anonymous) @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8901
<DialogClose>
exports.jsx @ node_modules_next_dist_compiled_5150ccfd._.js:1949
AlertDialogAction @ node_modules_2bb6070e._.js:8882
react_stack_bottom_frame @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:13072
renderWithHooksAgain @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:4146
renderWithHooks @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:4097
updateForwardRef @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:5342
beginWork @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:6186
runWithFiberInDEV @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:886
performUnitOfWork @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8298
workLoopSync @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8190
renderRootSync @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8173
performWorkOnRoot @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:7908
performSyncWorkOnRoot @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8890
flushSyncWorkAcrossRoots_impl @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8809
processRootScheduleInMicrotask @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8829
(anonymous) @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8901
<AlertDialogAction>
exports.jsxDEV @ node_modules_acfe698f._.js:1534
AlertDialogAction @ src_99890f21._.js:527
react_stack_bottom_frame @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:13072
renderWithHooksAgain @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:4146
renderWithHooks @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:4097
updateFunctionComponent @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:5523
beginWork @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:6111
runWithFiberInDEV @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:886
performUnitOfWork @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8298
workLoopSync @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8190
renderRootSync @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8173
performWorkOnRoot @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:7908
performSyncWorkOnRoot @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8890
flushSyncWorkAcrossRoots_impl @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8809
processRootScheduleInMicrotask @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8829
(anonymous) @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8901
<AlertDialogAction>
exports.jsxDEV @ node_modules_acfe698f._.js:1534
PlayerTable @ src_99890f21._.js:826
react_stack_bottom_frame @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:13072
renderWithHooksAgain @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:4146
renderWithHooks @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:4097
updateFunctionComponent @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:5523
beginWork @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:6111
runWithFiberInDEV @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:886
performUnitOfWork @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8298
workLoopSync @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8190
renderRootSync @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8173
performWorkOnRoot @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:7908
performSyncWorkOnRoot @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8890
flushSyncWorkAcrossRoots_impl @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8809
processRootScheduleInMicrotask @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8829
(anonymous) @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8901
<PlayerTable>
exports.jsxDEV @ node_modules_acfe698f._.js:1534
DraftAdminPage @ src_99890f21._.js:1869
react_stack_bottom_frame @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:13072
renderWithHooksAgain @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:4146
renderWithHooks @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:4097
updateFunctionComponent @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:5523
beginWork @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:6111
runWithFiberInDEV @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:886
performUnitOfWork @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8298
workLoopSync @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8190
renderRootSync @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8173
performWorkOnRoot @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:7908
performSyncWorkOnRoot @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8890
flushSyncWorkAcrossRoots_impl @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8809
processRootScheduleInMicrotask @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8829
(anonymous) @ node_modules_next_dist_compiled_react-dom_1e674e59._.js:8901Understand this error
src_99890f21._.js:1738 Using polling fallback (admin), updating draft picks