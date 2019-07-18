/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Track the allocation of a room to user
 * @param {org.example.mynetwork.AssignRoom} assignRoom
 * @transaction
 */
async function assignRoomToUser(assignRoom) {
    assignRoom.room.assignedTo = assignRoom.user;
    assignRoom.room.available = false;
    assignRoom.room.startDate = assignRoom.startDate;
    assignRoom.room.endDate = assignRoom.endDate;
    let assetRegistry = await getAssetRegistry('org.example.mynetwork.Room');
    await assetRegistry.update(assignRoom.room);
}

/**
 * Track the allocation of a room to user
 * @param {org.example.mynetwork.DeAllocateRoom} deAllocateRoom
 * @transaction
 */
async function deallocateRoom(deAllocateRoom) {
    deAllocateRoom.room.assignedTo = null;
    deAllocateRoom.room.available = true;
    deAllocateRoom.room.startDate = null;
    deAllocateRoom.room.endDate = null;
    let assetRegistry = await getAssetRegistry('org.example.mynetwork.Room');
    await assetRegistry.update(deAllocateRoom.room);
}
