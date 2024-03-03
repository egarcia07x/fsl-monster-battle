## Backend

### Database

To run the backend, I ran the script `npm run db:reset`
It raised a seed error with missing column `name` in the `monster` table
So created a migration to add the column `name`. [file reference](api\knex\migrations\20240226153906_add_name_to_monster.ts)

### Battle model

The initial backend test was failing at [battle.spec.ts](api\src\models/__tests__\battle.spec.ts) due to missing property `monsterARelation`, `monsterBRelation` and `winnerRelation`.
So added those properties in the [battle.model.ts](api\src\models\battle.model.ts) considering `many-to-one` relation and the column name inside table `battle`

### Monster model

Similarly, the test [monster.spec.ts](api\src\models__tests__\monster.spec.ts) was failing due to missing property `battles` in the [monster.model.ts](api\src\models\monster.model.ts).
So added the property `battles` to the model `monster`

### CORS

There was a cors error when tried to request to the backend running on `localhost:3001` from `localhost:3000`
So

- installed a package `cors` as `dependecy` mode and `@types/cors` as `dev-dependency` mode,
- and used it in [app.ts](api/src/app.ts) to allow cors

### API Route and Controller to list monsters

I added api route and controller to list monsters.
To do so, added [monster.controller.ts](api/src/controllers/monster.controller.ts) to return all monsters querying from db, and added this method `list` to [monster.routes.ts](api/src/router/monster.routes.ts) as method `get`

### Battle algorithm

The battle algorithm is implemented in [battle.service.ts](api/src/services/battle.service.ts)

It accepts a length-2 array of monsters, i.e. `monsterA` and `monsterB`.
And sorts that array by who will attack first. So monsters[0] will attack first. The requirement speed first and then attack first is used for this sort rule.

And then calculated **how many attacks will be required for each monster to kill the other monster**.
Here, I added `- 0.0001` for any possible floating-point error. As `Math.ceil` is used, I used `-` instead of `+`.

And then the number of attack required to kill the other monster - the small number means it will kill the other monster first.

Comment: [0] starts attack first, so if count is same, [0] will kill [1] before [1] does the final attack to [0]

### API Controller and Route to create battle

The controller to create battle is in [battle.controller.ts](api/src/controllers/battle.controller.ts).

It

- gets `monsterAId` and `monsterBId` from the request body
- find those monsters from the database
- get the winner by running the battle algorithm
- insert the result to table `battle`
- return result to the frontend

I considered the `TODO` test requirement here.

- If `monsterAId` or `monsterBId` is undefined, return error message `monsterAId/monsterBId should not be undefined` with statuscode 400(BAD_REQUEST).
- If cannot find 2 monsters `monsterA` and `monsterB` by the provided ids, return error message `Cannot find 2 monsters related to ids` with status code 404(not found)
- If any other error occured, return status code 500(internal server error) to the frontend with corresponding error message.

Added this controller method `create` in the [battle.route.ts](api/src/router/battle.routes.ts), so frontend can send request to `/battle` endpoint as `post` method.

### TODO backend tests

[battle.spec.ts](api/src/controllers/__tests__/battle.spec.ts) vs [battle.controller.ts](api/src/controllers/battle.controller.ts)

I

- created 2 monsters data `strong` with id 1 and `weak` with id 2
- and seeded them into the `monsters` table before all the tests run.

Test: `should fail when trying a battle of monsters with an undefined monster`

- It sends request to the post`battle` endpoint without any params, so the `monsterAId` and `mosnterBId` will be undefined.
- It expectes the error message `monsterAId/monsterBId should not be undefined` with statuscode 400(BAD_REQUEST)

Test: `should fail when trying a battle of monsters with an inexistent monster`

- It posts `battle` with non-existent monster ids 3 and 4.
- As we only have monsters with id 1 and 2 in the db, it expects the error message `Cannot find 2 monsters related to ids` with status code 404(not found)

Test: `should insert a battle of monsters successfully with monster 1 winning`

- It posts `battle` with existing ids 1 and 2.
- As id-1 monster is stronger than id-2 monster, it expects winner as id-1 monster `strongMonster`

Test: `should insert a battle of monsters successfully with monster 2 winning`

- It posts `battle` with ids 2 and 1
- NOTE: monsterAId and monsterBId is changed compared to previous test. Previous it was `1 and 2`, now it's `2 and 1`
- Still it expects `strongMonster` as the winner
