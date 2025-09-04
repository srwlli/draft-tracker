api-client.ts:23  PUT http://localhost:3000/api/user-rankings 500 (Internal Server Error)
request @ api-client.ts:23
saveMultiple @ api-client.ts:78
handleDragEnd @ page.tsx:174
DndContext.DndContext.useCallback[instantiateSensor].createHandler.handler @ DndContext.tsx:468
exports.unstable_batchedUpdates @ react-dom.development.js:411
handler @ DndContext.tsx:454
handleEnd @ AbstractPointerSensor.ts:253Understand this error
page.tsx:176 Error saving rankings: Error: Internal server error
    at DraftTrackerAPI.request (api-client.ts:35:13)
    at async handleDragEnd (page.tsx:174:7)
error @ intercept-console-error.ts:44
handleDragEnd @ page.tsx:176
await in handleDragEnd
DndContext.DndContext.useCallback[instantiateSensor].createHandler.handler @ DndContext.tsx:468
exports.unstable_batchedUpdates @ react-dom.development.js:411
handler @ DndContext.tsx:454
handleEnd @ AbstractPointerSensor.ts:253Understand this error
api-client.ts:23  PUT http://localhost:3000/api/user-rankings 500 (Internal Server Error)
request @ api-client.ts:23
saveMultiple @ api-client.ts:78
handleDragEnd @ page.tsx:174
DndContext.DndContext.useCallback[instantiateSensor].createHandler.handler @ DndContext.tsx:468
exports.unstable_batchedUpdates @ react-dom.development.js:411
handler @ DndContext.tsx:454
handleEnd @ AbstractPointerSensor.ts:253Understand this error
page.tsx:176 Error saving rankings: Error: Internal server error
    at DraftTrackerAPI.request (api-client.ts:35:13)
    at async handleDragEnd (page.tsx:174:7)